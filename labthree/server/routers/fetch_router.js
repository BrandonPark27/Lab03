const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");
const upload_directory = path.join(__dirname, "../uploads");
const _ = require("lodash");

router.get("/single", (req, res) => {
  let files_array = fs.readdirSync(upload_directory);
  if (files_array.length == 0) {
    return res.status(503).send({
      message: "No images",
    });
  }
  let filename = _.sample(files_array);
  res.sendFile(path.join(upload_directory, filename));
});

router.get("/multiple", (req, res) => {
  let files_array = fs.readdirSync(upload_directory);

  if (files_array.length === 0) {
    return res.status(503).send({
      message: "No images",
    });
  }

  let filenames = _.sampleSize(files_array, 3);

  const fileData = filenames.map((filename) => {
    const filePath = path.join(upload_directory, filename);
    const fileBuffer = fs.readFileSync(filePath);
    const base64Data = fileBuffer.toString("base64");

    return {
      filename,
      data: base64Data, 
    };
  });
  
  res.json({
    files: fileData,
  });
});


router.get("/multiple-path", (req, res) => {
  let files_array = fs.readdirSync(upload_directory);
  if (files_array.length == 0) {
    return res.status(503).send({
      message: "No images",
    });
  }
  let filenames = _.sampleSize(files_array, 3);
  res.json({
    files: filenames,
  });
});

router.get("/file", (req, res)=>{
  res.sendFile(path.join(__dirname, "../uploads", req.body.filename))
})

module.exports = router;