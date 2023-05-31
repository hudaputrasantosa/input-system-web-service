const express = require("express");
const router = express.Router();
const { Storage } = require("@google-cloud/storage");
const Multer = require("multer");
const {PROJECT_ID, BUCKET} = require('../secret/configureProject.js');


const multer = Multer({
  storage: Multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024, 
  },
});
// let keyFilename = "serviceAccountKey.json";
const storage = new Storage({
  PROJECT_ID,
  keyFilename,
});

// Streams file upload to Google Storage
router.post("/upload", multer.single("imgfile"), (req, res) => {
  try {
    if (req.file) {
      console.log("File found, trying to upload...");
      const blob = BUCKET.file(req.file.originalname);
      const blobStream = blob.createWriteStream();

      blobStream.on("finish", () => {
        res.status(200).send({
            msg: "Upload Success",
          });
        console.log("Upload Success");
      });
      blobStream.end(req.file.buffer);
    } else throw "Error with uploading img";
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get("/", (req, res) => {
  res.sendFile("/index.html");
});

module.exports = router;