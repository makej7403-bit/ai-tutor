import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Health check
app.get("/", (req, res) => {
  res.send("🧠 FullTask AI Backend running successfully!");
});

// Chat endpoint
app.post("/api/ask", async (req, res) => {
  try {
    const { message } = req.body;
    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            "You are FullTask AI Tutor — a professional assistant that helps students with Biology, Chemistry, and Nursing. Give clear, practical explanations and definitions.",
        },
        { role: "user", content: message },
      ],
    });

    const reply = completion.choices[0].message.content;
    res.json({ reply });
  } catch (error) {
    console.error("AI Error:", error);
    res.status(500).json({ reply: "Sorry, the AI service is temporarily unavailable." });
  }
});

const port = process.env.PORT || 10000;
app.listen(port, () => console.log(`✅ FullTask AI backend running on port ${port}`));
