const multer = require("multer");
const { storage } = require("../database/gridfs-service");

const upload = multer({
  storage
});

module.exports = function GridFSMiddleware() {
  return upload.single("image");
};
