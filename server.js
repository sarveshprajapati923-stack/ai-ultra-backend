const express = require("express");
const cors = require("cors");
const fetch = require("node-fetch");

const app = express();
app.use(cors());
app.use(express.json());

const API_KEY = "AIzaSyBKJEf_kVC2-eKvcwVJP2qrHheSLJkMLoM"; // 👈 apna API key

app.post("/chat", async (req, res) => {
  const userMsg = req.body.message;

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: `
You are Nexora AI 🤖
- Answer in Hinglish
- Short + clear + helpful
- Use points if needed
- Highlight main words with ** **
- End with suggestion like: "Agar chaho to main aur simple tarike se bhi samjha du"
`
          },
          { role: "user", content: userMsg }
        ]
      })
    });

    const data = await response.json();

    res.json({
      reply: data.choices[0].message.content
    });

  } catch (err) {
    res.json({
      reply: "Error aa gaya ⚠️"
    });
  }
});

app.listen(3000, () => {
  console.log("Server running 🚀");
});
