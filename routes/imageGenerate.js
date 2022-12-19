/** @format */

const express = require("express");
const router = express.Router();
const { imageGenerate } = require("../controller/imageGenerate");
router.post("/generate", imageGenerate);

module.exports = router;
