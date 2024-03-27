import express from "express";
import * as dotenv from 'dotenv';
import { OpenAI } from "openai";

dotenv.config();

const router = express.Router();

// Initialize OpenAI instance outside of the route handler
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

router.route('/').post(async (req,res) => {
  try {
    const response = await openai.images.generate({
      model: "dall-e-3",
      prompt: "man on the moon",
      n: 1,
      size: "1024x1024",
    });

    res.status(200).json({
      success: true,
      data: response.data,
    });
  } catch (error) {
    // Handle errors appropriately
    console.error(error);

    res.status(500).json({
      success: false,
      error: "An error occurred while generating the image",
    });
  }
});

export default router;
