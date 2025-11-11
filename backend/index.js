import express from "express";
import cors from "cors";
import fetch from "node-fetch";

const app = express();
app.use(cors({
  origin: ["https://ai-tutor-1-yv0c.onrender.com"],
  methods: ["GET", "POST"],
}));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("🧠 FullTask AI Backend running successfully!");
});

app.post("/ask", async (req, res) => {
  const { subject, question } = req.body;
  if (!question) {
    return res.status(400).json({ error: "Question required" });
  }

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: `You are a professional ${subject} tutor. Explain clearly and give examples.`,
          },
          { role: "user", content: question },
        ],
      }),
    });

    const data = await response.json();

    if (data.error) {
      console.error("OpenAI Error:", data.error);
      return res.status(500).json({ error: data.error.message });
    }

    const answer = data.choices?.[0]?.message?.content || "No response from AI.";
    res.json({ answer });
  } catch (err) {
    console.error("Server Error:", err);
    res.status(500).json({ error: "AI Tutor request failed." });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
