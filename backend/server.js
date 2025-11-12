import express from "express";
import cors from "cors";
import fetch from "node-fetch";

const app = express();
app.use(express.json());
app.use(cors());

// ✅ Root check
app.get("/", (req, res) => {
  res.send("🧠 FullTask AI Backend running successfully!");
});

// ✅ AI endpoint
app.post("/api/ask", async (req, res) => {
  const { question, subject } = req.body;

  if (!question) return res.status(400).json({ error: "No question provided" });

  try {
    // Example: using a realistic public AI endpoint (can replace with OpenAI key)
    const aiRes = await fetch("https://api.mistral.ai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.MISTRAL_API_KEY}`, // or your OpenAI key
      },
      body: JSON.stringify({
        model: "mistral-small-latest",
        messages: [
          { role: "system", content: `You are FullTask AI Tutor for ${subject}` },
          { role: "user", content: question },
        ],
      }),
    });

    const data = await aiRes.json();
    const answer = data.choices?.[0]?.message?.content || "No answer from AI.";

    res.json({ answer });
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ error: "AI service unavailable." });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
