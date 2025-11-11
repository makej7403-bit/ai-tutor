export const speak = (text) => {
  const utter = new SpeechSynthesisUtterance(text);
  speechSynthesis.speak(utter);
};

export const recordSpeech = () =>
  new Promise((resolve, reject) => {
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = "en-US";
    recognition.onresult = (e) => resolve(e.results[0][0].transcript);
    recognition.onerror = reject;
    recognition.start();
  });
