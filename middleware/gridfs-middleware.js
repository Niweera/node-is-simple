const multer = require("multer");
const { storage } = require("../database/gridfs-service");

const upload = multer({
  storage
});

module.exports = () => {
  return upload.single("image");
};
