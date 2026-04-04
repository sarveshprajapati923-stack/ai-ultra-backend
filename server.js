const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;

// test route
app.get("/", (req, res) => {
  res.send("Gemini Server running 🚀");
});

// chat route (Gemini API)
app.post("/chat", async (req, res) => {
  try {
    const userMsg = req.body.message;

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [{ text: userMsg }]
            }
          ]
        })
      }
    );

    const data = await response.json();

    const reply =
      data.candidates?.[0]?.content?.parts?.[0]?.text ||
      "No response";

    res.json({ reply });

  } catch (err) {
    console.log(err);
    res.json({ reply: "Error ❌" });
  }
});

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
