// server.js
import express from "express";
import cors from "cors";
import fetch from "node-fetch";

const app = express();
app.use(cors());
app.use(express.json());

// ✅ AI Tutor route
app.post("/api/ask", async (req, res) => {
  try {
    const { subject, question } = req.body;
    const apiKey = process.env.OPENAI_API_KEY;

    if (!question || !subject) {
      return res.status(400).json({ error: "Please provide both subject and question." });
    }

    if (!apiKey) {
      console.error("❌ No OpenAI API key found!");
      return res.status(500).json({ error: "OpenAI API key missing on server." });
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
            content: `You are a friendly and expert ${subject} tutor. Explain concepts clearly and accurately.`,
          },
          { role: "user", content: question },
        ],
      }),
    });

    const data = await aiResponse.json();

    if (data.error) {
      console.error("OpenAI Error:", data.error);
      return res.status(500).json({ error: data.error.message });
    }

    const answer = data.choices?.[0]?.message?.content?.trim() || "No response from AI.";
    res.json({ answer });

  } catch (err) {
    console.error("❌ Server Error:", err);
    res.status(500).json({ error: "AI failed to respond." });
  }
});

// ✅ Root route (Render health check)
app.get("/", (req, res) => {
  res.send("🧠 FullTask AI Backend running successfully!");
});

// ✅ Port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ FullTask AI backend running on port ${PORT}`));
