const express = require("express");
const app = express();
const multer = require("multer");
const cors = require("cors");
// const fs = require("fs");
const filePath = "/Users/tumolabsstudent/Desktop/test_player/database.json";
// Set up multer for file uploads
app.use(cors());
const storage = multer.memoryStorage(); // Store files in memory (you might want to use a more sophisticated storage strategy in production)
const upload = multer({ storage: storage });
// Store uploaded files in-memory (you might want to use a more permanent storage solution in production)
const uploadedFiles = [];


// File upload endpoint
app.post("/api/upload", upload.single("music"), (req, res) => {
  const file = req.file;
  if (!file) {
    return res.status(400).json({ error: "No file uploaded" });
  }

  // Store the uploaded file in memory
  uploadedFiles.push({ name: file.originalname, buffer: file.buffer });

  res.json({ message: "File uploaded successfully" });
});

// Serve uploaded music files
app.get("/api/music/:index", (req, res) => {
  const index = req.params.index;
  const fileData = uploadedFiles[index];

  if (!fileData) {
    return res.status(404).json({ error: "File not found" });
  }

  res.set({
    "Content-Type": "audio/mpeg", // Set the appropriate content type
    "Content-Disposition": `inline; filename="${fileData.name}"`, // Set the filename for download
  });

  // Send the file to the client
  res.end(fileData.buffer);
});


// Sample API for music metadata
app.get("/api/music", (req, res) => {
  const musicList = uploadedFiles.map((file, index) => ({
    index,
    name: file.name,
  }));


  res.json(musicList);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
