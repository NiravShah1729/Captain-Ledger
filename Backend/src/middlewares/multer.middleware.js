import multer from 'multer';

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/temp");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
    //user can have same named multiple files, so we can use a unique identifier like timestamp or user id
  },
});

export const upload = multer({ storage });
