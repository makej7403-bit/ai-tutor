// 🧠 FullTask AI Tutor Backend
// By Akin S. Sokpah (Liberia)

import express from "express";
import cors from "cors";
import fetch from "node-fetch";

const app = express();
const PORT = process.env.PORT || 3000;

// Allow requests from your frontend
app.use(cors({ origin: ["https://ai-tutor-1-yv0c.onrender.com", "*"] }));
app.use(express.json());

// Root route (for Render check)
app.get("/", (req, res) => {
  res.send("🧠 FullTask AI Tutor backend is running successfully!");
});

// AI Response Route
app.post("/api/ask", async (req, res) => {
  const { question, subject } = req.body;

  if (!question) {
    return res.status(400).json({ error: "Missing question" });
  }

  try {
    // 👉 Replace below with your real OpenAI or HuggingFace endpoint
    const openaiResponse = await fetch("https://api.openai.com/v1/chat/completions", {
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
            content: `You are Akin S. Sokpah’s FullTask AI Tutor. 
            You teach ${subject} with kindness, clarity, and helpful examples. 
            Always respond clearly and concisely.`,
          },
          { role: "user", content: question },
        ],
      }),
    });

    const data = await openaiResponse.json();

    if (!data.choices || !data.choices[0]) {
      throw new Error("Invalid AI response");
    }

    const answer = data.choices[0].message.content.trim();
    res.json({ answer });
  } catch (error) {
    console.error("AI Error:", error);
    res.status(500).json({
      error: "Failed to fetch AI response. Please try again later.",
    });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
