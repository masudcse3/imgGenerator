/** @format */
require("dotenv").config();
const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const imageGenerate = async (req, res) => {
  const { prompt, size, count = 1 } = req.body;
  const imageSize =
    size === "medium" ? "512x512" : size === "small" ? "256x256" : "1024x1024";
  try {
    const response = await openai.createImage({
      prompt,
      n: +count,
      size: imageSize,
    });

    const image_url = response.data.data;
    res.status(200).json({
      success: true,
      data: image_url,
    });
  } catch (error) {
    if (error.response) {
      console.log(error.response.status);
      console.log(error.response.data);
    } else {
      console.log(error.message);
    }
    res.status(400).json({
      success: false,
      message: "Image generate cound not be possible.",
    });
  }
};

module.exports = { imageGenerate };
