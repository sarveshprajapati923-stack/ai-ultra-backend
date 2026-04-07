import express from "express";
import cors from "cors";
import fetch from "node-fetch";

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 10000;

// 🔑 API KEYS
const KEYS = [
  process.env.KEY1,
  process.env.KEY2,
  process.env.KEY3
].filter(Boolean);

// ✅ ROOT CHECK (IMPORTANT)
app.get("/", (req, res) => {
  res.send("Server running 🚀");
});

// ✅ CHAT API
app.post("/chat", async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.json({ reply: "No message ❌" });
    }

    if (KEYS.length === 0) {
      return res.json({ reply: "No API keys ❌" });
    }

    for (let key of KEYS) {
      try {
        const response = await fetch(
          `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-pro-latest:generateContent?key=${key}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              contents: [
                {
                  parts: [{ text: message }]
                }
              ]
            })
          }
        );

        const data = await response.json();

        if (!data.error) {
          const reply =
            data?.candidates?.[0]?.content?.parts?.[0]?.text;

          if (reply) {
            return res.json({ reply });
          }
        }

      } catch (err) {
        console.log("Key failed, trying next...");
      }
    }

    res.json({ reply: "All API keys exhausted ❌" });

  } catch (error) {
    console.error(error);
    res.json({ reply: "Server error ❌" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
