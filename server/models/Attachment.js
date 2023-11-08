// models/Attachment.js

import mongoose from 'mongoose';

const attachmentSchema = new mongoose.Schema({
  post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post', // Reference to the Post model
    required: true,
  },
  fileName: String,
  filePath: String,
  // Add other fields as needed
});

const Attachment = mongoose.model('Attachment', attachmentSchema);

export default Attachment;
