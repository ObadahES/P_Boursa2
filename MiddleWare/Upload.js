const multer = require("multer");
const { GridFsStorage } = require("multer-gridfs-storage");
require("dotenv").config();

/******************************************************************************* */
const storage = new GridFsStorage({
  url: "mongodb://localhost:27017/P_Boursa",
  options: {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  file: (req, file) => {
    const match = ["image/png", "image/jpg"];
    if (match.indexOf(file.mimetype) === -1) {
      return `${Date.now()}-any-name-${file.originalname}`;
    }
    return {
      bucketName: "photos",
      filename: `${Date.now()}-any-name-${file.originalname}`,
    };
  },
});

module.exports = multer({ storage });
