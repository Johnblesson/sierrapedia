// controllers/messageController.js
import Message from "../models/Message.js";

// Create and send a new message
export const sendMessage = async (req, res) => {
  try {
    const { sender, recipient, content, attachments } = req.body;

    const newMessage = new Message({ sender, recipient, content, attachments });
    await newMessage.save();

    res.status(201).json(newMessage);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Message send failed' });
  }
};

// Fetch messages between two users
export const getMessages = async (req, res) => {
  try {
    const { sender, recipient } = req.params;

    const messages = await Message.find({
      $or: [
        { sender, recipient },
        { sender: recipient, recipient: sender },
      ],
    }).sort({ createdAt: 'asc' });

    res.status(200).json(messages);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Message retrieval failed' });
  }
};
