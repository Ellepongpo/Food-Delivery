import multer from "multer";
import fs from "fs";

if (!fs.existsSync("uploads")) fs.mkdirSync("uploads");

export const upload = multer({
  storage: multer.diskStorage({
    destination: "uploads/",
    filename: (req, file, cb) => cb(null, file.originalname)
  })
});

