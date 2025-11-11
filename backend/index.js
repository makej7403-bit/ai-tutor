import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import fetch from "node-fetch";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("🧠 FullTask AI Tutor Backend is running!");
});

app.post("/api/ask", async (req, res) => {
  try {
    const { question, subject } = req.body;

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: `You are a professional ${subject} tutor who explains clearly and kindly.`,
          },
          { role: "user", content: question },
        ],
      }),
    });

    const data = await response.json();
    if (!data.choices) throw new Error("No response from OpenAI");

    res.json({ answer: data.choices[0].message.content });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "AI failed to respond" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
