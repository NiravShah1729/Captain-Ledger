import User from "../models/User.model.js";

import { asyncHandler } from "../utils/asyncHandler.js";
import { apiError } from "../utils/apiError.js";
import { apiResponse } from "../utils/apiResponse.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import bcrypt from "bcryptjs";
import path from "path";

const generateAccessAndRefreshTokens = async (userId) => {
  try {
    const user = await User.findById(userId);
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    throw new apiError(
      500,
      "Something went wrong while generating access or refresh tokens"
    );
  }
};

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, role } = req.body;

  // 1. Check for required fields
  if (!name || !email || !password) {
    throw new apiError(400, "All fields are required (name, email, password)");
  }

  // 2. Check if user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new apiError(409, "User already exists with this email");
  }

  // 3. Handle optional coverImage upload or fallback to default
  let coverImagePath;
  if (
    req.files &&
    Array.isArray(req.files.coverImage) &&
    req.files.coverImage.length > 0
  ) {
    coverImagePath = req.files.coverImage[0].path;
  } else {
    coverImagePath = path.resolve("public/temp/default-cover.jpg");
  }

  const coverImageUpload = await uploadOnCloudinary(coverImagePath);
  if (!coverImageUpload) {
    throw new apiError(500, "Cover image upload failed");
  }

  // 4. Hash the password securely
  const hashedPassword = await bcrypt.hash(password, 10);

  // 5. Create new user
  const createdUser = await User.create({
    name,
    email,
    password: hashedPassword,
    role: (role || "user").toLowerCase(),
    coverImage: coverImageUpload.url,
  });

  // 6. Remove password before sending user object
  const userResponse = createdUser.toObject();
  delete userResponse.password;

  return res
    .status(201)
    .json(new apiResponse(201, userResponse, "User registered successfully"));
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  //1 check required feilds
  if (!email || !password) {
    throw new apiError(400, "Both feilds are required");
  }

  //2. find the user in the database
  const user = await User.findOne({ email });
  if (!user) {
    throw new apiError(404, "User not found");
  }

  //3. compore passwords
  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    throw new apiError(401, "Invalid crednetials");
  }

  //4. generate refresh and access token
  const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(
    user._id
  );

  const loggedInUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  const options = {
    //cookies modifiable by servers only not by the frontend
    httpOnly: true,
    secure: true,
    sameSite: "None",
  };

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new apiResponse(
        200,
        {
          user: loggedInUser,
          accessToken,
          refreshToken,
        },
        "User looged in successfully"
      )
    );
});

const getMyProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).select("-password");

  if (!user) {
    throw new apiError(404, "User not found");
  }
  return res
    .status(200)
    .json(new apiResponse(200, user, "User profile fetched successfully"));
});

export { registerUser, loginUser, getMyProfile };
