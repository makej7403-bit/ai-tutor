import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import fetch from "node-fetch"; // if you use native fetch, remove this line

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("🧠 FullTask AI Backend running successfully!");
});

app.post("/ask", async (req, res) => {
  const { subject, question } = req.body;

  if (!question) {
    return res.status(400).json({ error: "No question provided" });
  }

  try {
    // ✨ Connect to OpenAI (replace with your actual API key)
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          { role: "system", content: `You are a professional ${subject} tutor.` },
          { role: "user", content: question }
        ],
      }),
    });

    const data = await response.json();

    res.json({
      answer: data.choices?.[0]?.message?.content || "No response from AI."
    });

  } catch (err) {
    console.error("AI error:", err);
    res.status(500).json({ error: "AI request failed" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
