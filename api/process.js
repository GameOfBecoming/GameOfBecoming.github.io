export default async function handler(req, res) {
  try {
    const userInput = req.body.input;

    const systemPrompt = `
You are Game of Becoming.

Respond strictly in:

STATE:
ANALYSIS:
TRANSITION:
NEXT ACTION:
`;

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "gpt-4.1-mini",
        temperature: 0.3,
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userInput }
        ]
      })
    });

    const data = await response.json();

    res.status(200).json({
      output: data.choices[0].message.content
    });

  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
}
