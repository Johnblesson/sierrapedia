import multer from "multer";

// FILE STORAGE
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "public/assets");
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    },
  });
  export const upload = multer({ storage });
  
  // ATTACHMENT STORAGE 
  const attachmentStorage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/'); // Set the directory where attachments will be stored
    },
    filename: (req, file, cb) => {
      cb(null, new Date().toISOString() + file.originalname);
    },
  });
  
  export const attachmentUpload = multer({ attachmentStorage });