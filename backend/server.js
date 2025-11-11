// server.js
import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import { openaiChat } from "./openai.js";
import { quizPrompt } from "./quizPromptTemplates.js";

const app = express();
app.use(helmet());
app.use(cors()); // for production, restrict origins if desired
app.use(express.json());
app.use(morgan("tiny"));

// Health
app.get("/", (req, res) => res.send("🧠 FullTask AI Backend running successfully!"));

// API: ask (main Q/A)
app.post("/api/ask", async (req, res) => {
  try {
    const { subject = "General", question } = req.body;
    if (!question) return res.status(400).json({ error: "question required" });

    const messages = [
      {
        role: "system",
        content: `You are FullTask AI Tutor, an expert tutor for ${subject}. Be clear, concise, include examples when helpful, and safe.`
      },
      { role: "user", content: question }
    ];

    const ai = await openaiChat({ messages });
    const answer = ai.choices?.[0]?.message?.content ?? null;
    if (!answer) return res.status(502).json({ error: "No answer from AI" });

    res.json({ answer });
  } catch (err) {
    console.error("/api/ask error:", err.message || err);
    res.status(500).json({ error: err.message || "server error" });
  }
});

// API: quiz generator (returns JSON)
app.post("/api/quiz", async (req, res) => {
  try {
    const { subject = "General", topic = "", num = 5, difficulty = "medium" } = req.body;
    const prompt = quizPrompt(subject, topic, num, difficulty);

    const ai = await openaiChat({ messages: [{ role: "user", content: prompt }], temperature: 0.2 });
    const text = ai.choices?.[0]?.message?.content ?? "";
    // try parse JSON block
    let parsed;
    try {
      parsed = JSON.parse(text);
    } catch (e) {
      const m = text.match(/(\{[\s\S]*\})/);
      if (m) parsed = JSON.parse(m[1]);
    }
    if (!parsed || !Array.isArray(parsed.quiz)) {
      return res.status(500).json({ error: "Invalid quiz JSON", raw: text });
    }
    res.json(parsed);
  } catch (err) {
    console.error("/api/quiz error:", err.message || err);
    res.status(500).json({ error: err.message || "server error" });
  }
});

// API: summary (return short summary)
app.post("/api/summary", async (req, res) => {
  try {
    const { text = "" } = req.body;
    if (!text) return res.status(400).json({ error: "text required" });
    const messages = [
      { role: "system", content: "You summarize educational text into a concise study note." },
      { role: "user", content: `Summarize this text for a student:\n\n${text}` }
    ];
    const ai = await openaiChat({ messages, temperature: 0.2 });
    res.json({ summary: ai.choices?.[0]?.message?.content ?? "" });
  } catch (err) {
    console.error("/api/summary error:", err.message || err);
    res.status(500).json({ error: err.message || "server error" });
  }
});

// Simple flashcard generator (returns array of {front,back})
app.post("/api/flashcards", async (req, res) => {
  try {
    const { subject = "General", text = "" } = req.body;
    if (!text) return res.status(400).json({ error: "text required" });

    const prompt = `Create up to 10 concise flashcards from the following text about ${subject}. Return JSON: {"cards":[{"front":"Q","back":"A"}, ...]}\n\n${text}`;
    const ai = await openaiChat({ messages: [{ role: "user", content: prompt }], temperature: 0.2 });
    let parsed;
    try { parsed = JSON.parse(ai.choices[0].message.content); } catch {
      const m = ai.choices[0].message.content.match(/(\{[\s\S]*\})/);
      parsed = m ? JSON.parse(m[1]) : null;
    }
    if (!parsed || !Array.isArray(parsed.cards)) return res.status(500).json({ error: "invalid flashcard output", raw: ai.choices[0].message.content });
    res.json(parsed);
  } catch (err) {
    console.error("/api/flashcards error:", err.message || err);
    res.status(500).json({ error: err.message || "server error" });
  }
});

// Basic admin: usage ping (placeholder)
app.get("/api/admin/health", (req, res) => res.json({ ok: true, ts: Date.now() }));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ FullTask AI backend running on port ${PORT}`));
