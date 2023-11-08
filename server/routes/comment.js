import express from 'express';
import { addComment, getCommentsForPost } from '../controllers/posts.js';

const router = express.Router();

// Add a comment to a post
router.post('/post/:postId/comment', addComment);

// Fetch comments for a post
router.get('/post/:postId/comments', getCommentsForPost);

export default router;
