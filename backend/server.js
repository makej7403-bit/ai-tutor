import OpenAI from "openai";
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.post("/api/ask", async (req, res) => {
  const { question, subject } = req.body;

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: `You are an AI tutor specializing in ${subject}. Answer as a professional teacher in simple, clear English.` },
        { role: "user", content: question }
      ],
    });

    const answer = completion.choices[0].message.content;
    res.json({ answer });
  } catch (error) {
    console.error("AI error:", error);
    res.status(500).json({ answer: "Sorry, I couldn’t connect to the AI tutor right now." });
  }
});
