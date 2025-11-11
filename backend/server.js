import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// health
app.get("/", (req,res) => res.send("🧠 FullTask AI Backend running"));

// POST /api/ask  (existing)
app.post("/api/ask", async (req, res) => {
  try {
    const { message, subject } = req.body;
    if (!message) return res.status(400).json({ error: "message required" });

    const system = `You are FullTask AI Tutor — an expert tutor for Biology, Chemistry and Nursing. Answer in clear helpful steps. Subject: ${subject || 'general'}.`;
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: system },
        { role: "user", content: message }
      ],
      max_tokens: 800
    });

    const reply = completion.choices?.[0]?.message?.content ?? "";
    return res.json({ reply });
  } catch (err) {
    console.error("ask err:", err);
    return res.status(500).json({ error: "AI error" });
  }
});

// POST /api/quiz  - returns JSON { quiz: [{q, choices:[], answerIndex}, ...] }
app.post("/api/quiz", async (req, res) => {
  try {
    const { subject = "general biology", num_questions = 5, difficulty = "medium" } = req.body;

    // Prompt to produce a strict JSON only response (very important)
    const prompt = `You are to generate a ${num_questions}-question multiple-choice quiz on "${subject}" for ${difficulty} learners.
Return ONLY JSON with the key "quiz" mapping to an array of question objects.
Each question object must have:
- "q": the question text (max 160 chars)
- "choices": array of 4 answer strings
- "answerIndex": integer 0-3 for the correct choice
Do not add extra text outside the JSON.`;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "You are a strict JSON output generator." },
        { role: "user", content: prompt }
      ],
      max_tokens: 800,
      temperature: 0.2
    });

    const text = completion.choices?.[0]?.message?.content ?? "";
    // Try to parse JSON; if model returns html or text, we attempt to extract JSON block
    let json = null;
    try {
      json = JSON.parse(text);
    } catch (e) {
      // try to extract {...}
      const m = text.match(/(\{[\s\S]*\})/);
      if (m) {
        json = JSON.parse(m[1]);
      } else {
        // fallback: return an error with raw text for debugging
        return res.status(500).json({ error: "Could not parse quiz JSON", raw: text });
      }
    }

    // Basic validation
    if (!Array.isArray(json.quiz)) return res.status(500).json({ error: "Invalid quiz format", raw: json });

    return res.json({ quiz: json.quiz });
  } catch (err) {
    console.error("quiz err:", err);
    return res.status(500).json({ error: "AI quiz error", detail: err.message });
  }
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Backend listening ${port}`));
