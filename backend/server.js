import express from "express";
import cors from "cors";
import fetch from "node-fetch";

const app = express();
app.use(cors());
app.use(express.json());

// ✅ Replace this with your actual OpenAI API key (use Render Environment Variables for security)
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

// ✅ Root route — to confirm the backend is running
app.get("/", (req, res) => {
  res.send("🧠 Akin S. Sokpah’s AI Tutor backend is running successfully!");
});

// ✅ Main AI route
app.post("/ask", async (req, res) => {
  const { question, subject } = req.body;

  if (!question || !OPENAI_API_KEY) {
    return res.status(400).json({ error: "Missing question or API key." });
  }

  try {
    // 💬 Combine subject with question for smarter context
    const fullPrompt = `You are FullTask AI Tutor created by Akin S. Sokpah from Liberia. 
    You teach ${subject} clearly and kindly. 
    Question: ${question}`;

    // 🧠 Call OpenAI API (GPT-4o-mini recommended)
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${OPENAI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [{ role: "user", content: fullPrompt }],
        temperature: 0.7,
      }),
    });

    const data = await response.json();

    if (data?.choices?.[0]?.message?.content) {
      res.json({ answer: data.choices[0].message.content.trim() });
    } else {
      res.json({ answer: "⚠️ No valid response from OpenAI." });
    }
  } catch (error) {
    console.error("Error talking to OpenAI:", error);
    res.status(500).json({ answer: "⚠️ AI Tutor failed to respond." });
  }
});

// ✅ Auto port for Render
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`🚀 AI Tutor backend running on port ${PORT}`));
