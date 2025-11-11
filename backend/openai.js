// simple OpenAI helper (server-side)
import fetch from "node-fetch";

export async function openaiChat({ messages, model = "gpt-4o-mini", temperature = 0.4 }) {
  const key = process.env.OPENAI_API_KEY;
  if (!key) throw new Error("OPENAI_API_KEY not set in environment");

  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model,
      messages,
      temperature,
      max_tokens: 800
    })
  });

  const data = await res.json();
  if (!res.ok) {
    const message = data?.error?.message || JSON.stringify(data);
    const err = new Error(`OpenAI error: ${message}`);
    err.data = data;
    throw err;
  }
  return data;
}
