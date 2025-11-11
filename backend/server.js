// server.js
import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

// ✅ Root route (for Render health check)
app.get("/", (req, res) => {
  res.send("🧠 FullTask AI Backend running successfully!");
});

// ✅ AI Tutor route
app.post("/ask", async (req, res) => {
  const { subject, question } = req.body;

  if (!question || !subject) {
    return res.status(400).json({ error: "Please provide both subject and question." });
  }

  try {
    // ✅ Make sure OPENAI_API_KEY is properly set in Render Environment Variables
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      console.error("❌ No OpenAI API key found!");
      return res.status(500).json({
        error: "OpenAI API key missing on server. Please configure environment variable.",
      });
    }

    // ✅ Send the request to OpenAI API
    const aiResponse = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: `You are a smart, friendly AI tutor specializing in ${subject}. Give accurate, simple explanations for nursing, biology, chemistry, and medical questions.`,
          },
          { role: "user", content: question },
        ],
        temperature: 0.7,
      }),
    });

    const data = await aiResponse.json();

    // ✅ Handle any API error gracefully
    if (!aiResponse.ok) {
      console.error("OpenAI API Error:", data);
      return res.status(500).json({
        error: data.error?.message || "OpenAI API returned an error.",
      });
    }

    const aiAnswer = data.choices?.[0]?.message?.content?.trim() || "No response from AI.";
    res.json({ answer: aiAnswer });
  } catch (error) {
    console.error("❌ Server Error:", error);
    res.status(500).json({ error: "Internal server error connecting to AI." });
  }
});

// ✅ Port (Render automatically sets process.env.PORT)
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`✅ FullTask AI backend running on port ${PORT}`);
});
