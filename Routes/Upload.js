const Grid = require("gridfs-stream");
const Upload = require("../MiddleWare/Upload");
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
/*************************************************** */
let gfs;
const conn = mongoose.connection;
conn.once("open", function () {
  console.log("Connected to MongoDB for GridFS");
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection("photos");
});

router.post("/upload", Upload.single("file"), (req, res) => {
  if (req.file === undefined) {
    return res.send("You must select a file");
  }
  const imgURL = `http://localhost:8050/api/file/${req.file.filename}`;
  return res.send(imgURL);
});

router.get("/:filename", async (req, res) => {
  try {
    console.log(`Looking for file with filename: ${req.params.filename}`);
    const file = await gfs.files.findOne({ filename: req.params.filename });
    if (!file) {
      console.log("File not found");
      return res.status(404).send("File not found!");
    }
    console.log("File found:", file);
    const readStream = gfs.createReadStream({ _id: file._id });
    readStream.pipe(res);
  } catch (error) {
    console.error("Error retrieving file:", error);
    res.status(500).send("An error occurred!");
  }
});

// app.delete("/api/file/:filename", async (req, res) => {
//   try {
//     await gfs.files.deleteOne({ filename: req.params.filename });
//     res.send("Success");
//   } catch (error) {
//     console.log(error);
//     res.send("An Error Occured");
//   }
// });

module.exports = router;
