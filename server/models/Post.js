// import mongoose from "mongoose";

// const postSchema = mongoose.Schema(
//   {
//     userId: {
//       type: String,
//       required: true,
//     },
//     firstName: {
//       type: String,
//       required: true,
//     },
//     lastName: {
//       type: String,
//       required: true,
//     },
//     location: String,
//     description: String,
//     picturePath: String,
//     userPicturePath: String,
//     likes: {
//       type: Map,
//       of: Boolean,
//     },
//     comments: {
//       type: Array,
//       default: [],
//     },
//   },
//   { timestamps: true }
// );

// const Post = mongoose.model("Post", postSchema);

// export default Post;

// models/Post.js
import mongoose from 'mongoose';

const postSchema = mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    location: String,
    description: String,
    picturePath: String,
    userPicturePath: String,
    likes: {
      type: Map,
      of: Boolean,
    },
    comments: [
      {
        userId: { type: String, required: true },
        text: String,
        // You can add more fields like timestamps here if needed
      },
    ],
  },
  { timestamps: true }
);

const Post = mongoose.model('Post', postSchema);

export default Post;

