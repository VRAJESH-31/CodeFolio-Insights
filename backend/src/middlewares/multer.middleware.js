import multer from "multer";

const upload = multer({ dest: "uploads/" }); // Local temp storage

export default upload;