const backendURL = "https://ai-tutor-e5m3.onrender.com"; // your real backend

async function askAI() {
  const subject = document.getElementById("subject").value;
  const question = document.getElementById("question").value;
  const answerBox = document.getElementById("answer");

  answerBox.textContent = "⏳ Thinking...";

  try {
    const response = await fetch(`${backendURL}/api/ask`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question, subject }),
    });

    const data = await response.json();
    answerBox.textContent = data.answer || "⚠️ No answer from AI.";
  } catch (error) {
    console.error(error);
    answerBox.textContent = "⚠️ Unable to connect to AI Tutor. Try again later.";
  }
}
