const express = require("express");
const axios = require("axios");
const router = express.Router();

const OPENAI_KEY = process.env.OPENAI_API_KEY;
const MODEL = process.env.AI_MODEL || "gpt-4o-mini";

/*
POST /api/ai/ask
body: { subject: "biology"|"chemistry"|"nursing", question: string, context?: string }
*/
router.post("/ask", async (req, res) => {
  try {
    const { subject, question, context } = req.body;
    if (!question) return res.status(400).json({ error: "Question is required." });

    // Build a subject-aware system prompt
    const systemPrompt = `You are an expert tutor for ${subject || "science"}. Be clear, step-by-step, cite reputable textbooks or guidelines when relevant, and include short practice questions. If question is clinical (nursing), include a clear disclaimer and encourage consulting professionals.`;

    // Customize the payload to your model provider
    const payload = {
      model: MODEL,
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: `${question}\n\nContext: ${context || "none"}` }
      ],
      max_tokens: 800
    };

    // Example using OpenAI's chat completions (adjust if you use other provider)
    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      payload,
      {
        headers: {
          "Authorization": `Bearer ${OPENAI_KEY}`,
          "Content-Type": "application/json"
        }
      }
    );

    const aiText = response.data.choices?.[0]?.message?.content ?? "";

    res.json({ answer: aiText });
  } catch (err) {
    console.error("AI error:", err?.response?.data || err.message || err);
    res.status(500).json({ error: "AI request failed", detail: err?.response?.data || err.message });
  }
});

module.exports = router;
