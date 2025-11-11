export function quizPrompt(subject, topic = "", num = 5, difficulty = "medium") {
  return `You are a quiz generator for ${subject}. Create exactly ${num} multiple-choice questions (4 choices each) about ${topic || subject} at ${difficulty} difficulty. Respond ONLY with JSON in this format:

{"quiz":[{"q":"question text","choices":["A","B","C","D"],"answerIndex":0}, ...]}

Do not output any explanatory text.`;
}
