import Post from "../models/Post.js";
import User from "../models/User.js";
import Attachment from "../models/Attachment.js";

/* CREATE */
export const createPost = async (req, res) => {
  try {
    const { userId, description, picturePath } = req.body;
    const user = await User.findById(userId);
    const newPost = new Post({
      userId,
      firstName: user.firstName,
      lastName: user.lastName,
      location: user.location,
      description,
      userPicturePath: user.picturePath,
      picturePath,
      likes: {},
      comments: [],
    });
    await newPost.save();

    const post = await Post.find();
    res.status(201).json(post);
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
};

/* READ */
export const getFeedPosts = async (req, res) => {
  try {
    const post = await Post.find();
    res.status(200).json(post);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const getUserPosts = async (req, res) => {
  try {
    const { userId } = req.params;
    const post = await Post.find({ userId });
    res.status(200).json(post);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

/* UPDATE */
export const likePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;
    const post = await Post.findById(id);
    const isLiked = post.likes.get(userId);

    if (isLiked) {
      post.likes.delete(userId);
    } else {
      post.likes.set(userId, true);
    }

    const updatedPost = await Post.findByIdAndUpdate(
      id,
      { likes: post.likes },
      { new: true }
    );

    res.status(200).json(updatedPost);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

// Upload a new attachment
export const uploadAttachment = async (req, res) => {
  try {
    // Check if a file is provided in the request
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    // Create a new attachment document
    const attachment = new Attachment({
      post: req.body.postId, // Assuming you have a postId in the request body
      fileName: req.file.originalname,
      filePath: req.file.path, // You may want to store this in a dedicated server directory
    });

    await attachment.save();

    return res.status(201).json(attachment);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Attachment upload failed' });
  }
};

// Add a comment to a post
export const addComment = async (req, res) => {
  try {
    const postId = req.params.postId; // Assuming postId is in the route parameters
    const { userId, text } = req.body;

    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    const newComment = {
      userId,
      text,
    };

    post.comments.push(newComment);
    await post.save();

    res.status(201).json(newComment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to add comment' });
  }
};

// Fetch comments for a post
export const getCommentsForPost = async (req, res) => {
  try {
    const postId = req.params.postId; // Assuming postId is in the route parameters
    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    const comments = post.comments;
    res.status(200).json(comments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to retrieve comments' });
  }
};
