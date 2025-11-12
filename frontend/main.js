document.getElementById('ask-btn').addEventListener('click', async () => {
  const subject = document.getElementById('subject').value;
  const question = document.getElementById('question').value;
  const responseElement = document.getElementById('response');
  const history = document.getElementById('history');

  responseElement.textContent = 'Thinking... 🤔';

  try {
    const res = await fetch('https://ai-tutor-e5m3.onrender.com/api/ask', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ subject, question }),
    });

    const data = await res.json();
    responseElement.textContent = data.answer || 'No response from AI.';

    // Save to history
    history.textContent = `Q: ${question}\nA: ${data.answer}`;
  } catch (error) {
    responseElement.textContent = '⚠️ Network error, please try again later.';
  }
});

document.getElementById('read-btn').addEventListener('click', () => {
  const text = document.getElementById('response').textContent;
  const speech = new SpeechSynthesisUtterance(text);
  speech.rate = 1;
  speech.pitch = 1;
  window.speechSynthesis.speak(speech);
});
