import express from "express";
import cors from "cors";
import fetch from "node-fetch";

const app = express();
app.use(express.json());

// ✅ Allow all frontend origins (for Render frontend)
app.use(cors({
  origin: "*",
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));

// ✅ Root route (for testing)
app.get("/", (req, res) => {
  res.send("🧠 Akin S. Sokpah’s AI Tutor backend is running successfully!");
});

// ✅ AI Tutor endpoint
app.post("/ask", async (req, res) => {
  const { question, subject } = req.body;
  const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

  if (!OPENAI_API_KEY) {
    return res.status(500).json({ answer: "⚠️ Missing API key in backend." });
  }

  if (!question) {
    return res.status(400).json({ answer: "⚠️ Missing question." });
  }

  try {
    const prompt = `You are FullTask AI Tutor created by Akin S. Sokpah from Liberia.
You are a professional teacher of ${subject}. Give a clear, detailed, and polite answer.

Question: ${question}`;

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${OPENAI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.7,
      }),
    });

    const data = await response.json();

    if (data?.choices?.[0]?.message?.content) {
      res.json({ answer: data.choices[0].message.content.trim() });
    } else {
      res.status(500).json({ answer: "⚠️ No valid response from AI Tutor." });
    }
  } catch (error) {
    console.error("AI Tutor Error:", error);
    res.status(500).json({ answer: "⚠️ Error connecting to OpenAI API." });
  }
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`🚀 AI Tutor backend running on port ${PORT}`));
