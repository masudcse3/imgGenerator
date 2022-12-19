/** @format */

const express = require("express");
const path = require("path");
const router = require("./routes/imageGenerate");
const dotenv = require("dotenv").config();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/image", router);

// use the public directory
app.use("/", express.static(path.join(__dirname, "public")));

const port = process.env.PORT || 5000;
app.listen(port, () =>
  console.log(`Server started and listen on port ${port}`)
);
