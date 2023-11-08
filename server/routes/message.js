import express from "express";
import { sendMessage, getMessages } from "../controllers/message.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

router.post('/send', verifyToken, sendMessage);
router.get('/messages/:sender/:recipient', verifyToken, getMessages);

export default router;
