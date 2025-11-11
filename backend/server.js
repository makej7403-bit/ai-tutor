app.post("/ask", async (req, res) => {
  const { subject, question } = req.body;

  if (!question) {
    return res.status(400).json({ error: "Question required" });
  }

  try {
    const aiResponse = await fetch("https://api.openai.com/v1/chat/completions", {
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
            content: `You are a helpful ${subject} tutor. Answer simply and clearly.`,
          },
          { role: "user", content: question },
        ],
      }),
    });

    const data = await aiResponse.json();

    if (!aiResponse.ok) {
      console.error("OpenAI Error:", data);
      return res.status(500).json({ error: data.error?.message || "OpenAI error" });
    }

    res.json({ answer: data.choices[0].message.content.trim() });
  } catch (error) {
    console.error("Backend error:", error);
    res.status(500).json({ error: "⚠️ Unable to reach OpenAI API." });
  }
});
