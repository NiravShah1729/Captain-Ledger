import Post from "../models/Post.model.js"
import { asyncHandler } from "../utils/asyncHandler.js"
import { apiError } from "../utils/apiError.js"
import { apiResponse } from "../utils/apiResponse.js"

//create a post
const createPost = asyncHandler(async(req,res) => {
    const {title, content,type="public"} = req.body;

    if(!title){
        throw new apiError(400, "Title is required")
    }

    if(type === "announcement" && req.user.role !== "admin"){
        throw new apiError(403,"Only admins can create announcements")
    }

    const post = await Post.create({
        title,
        content,
        type,
        postedBy: req.user._id,
    })

    return res
    .status(201)
    .json(new apiResponse(201,post,"Post created successfully"))
})

//get all post
const getAllPosts = asyncHandler(async(req,res) => {
    const posts = await Post.find()
    .populate("postedBy","name email")
    .sort({createdAt:-1});

    return res
    .status(200)
    .json(new apiResponse(200, posts, "All Post fetched successfully"));
})

//get post by ID
const getPostById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  // Validate MongoDB ObjectId format if needed
  const post = await Post.findById(id).populate("postedBy", "name email");

  if (!post) {
    throw new apiError(404, "Post not found");
  }

  return res
    .status(200)
    .json(new apiResponse(200, post, "Post fetched successfully"));
});

//update post
const updatePost = asyncHandler(async(req,res) => {
    const {title, content} = req.body;
    const post  = await Post.findById(req.params.id);

    if(!post){
        throw new apiError(404, "Post not found");
    }

    //only owner can update
    if(post.postedBy.toString() !== req.user._id.toString()){
        throw new apiError(403,"Not authorised to update this post");
    }

    if(title){
        post.title = title;
    }
    if(content){
        post.content = content;
    }
    await post.save();

    return res
    .status(200)
    .json(new apiResponse(200,post,"Post updated successfully"));
})

//delete post
const deletePost = asyncHandler(async(req,res) => {
    const post = await Post.findById(req.params.id);

    if(!post){
        throw new apiError(404, "Post not found");
    }

    if(post.type === "announcement" && req.user.role !== 'admin'){
        throw new apiError(403,"Only admin can delete announcements");
    }

    if(req.user.role !== "admin" && post.postedBy.toString() !== req.user._id.toString()){
        throw new apiError(403, "You can only delete your own public posts");
    }

    await post.deleteOne();

    return res
    .status(200)
    .json(new apiResponse(200,{},"Post deleted successfully"));
})

//my posts
const getMyPosts = asyncHandler(async(req,res) => {
    const posts = await Post.find({postedBy: req.user._id});

    return res
    .status(200)
    .json(new apiResponse(200, posts,"My posts fetched successfully"));
})

export {
    createPost,
    getAllPosts,
    getPostById,
    updatePost,
    deletePost,
    getMyPosts
}