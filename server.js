import express from "express";
import cors from "cors";
import fetch from "node-fetch";

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 10000;

// 🔑 Multiple Keys
const KEYS = [
  process.env.KEY1,
  process.env.KEY2,
  process.env.KEY3
].filter(Boolean);

app.get("/", (req, res) => {
  res.send("Nexora Backend Running 🚀");
});

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
          `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${key}`,
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

        // ✅ Success
        if (!data.error) {
          const reply =
            data?.candidates?.[0]?.content?.parts?.[0]?.text;

          if (reply) {
            return res.json({ reply });
          }
        }

      } catch (e) {
        console.log("Key failed → trying next");
      }
    }

    // ❌ All keys failed
    res.json({ reply: "All API keys exhausted ❌" });

  } catch (error) {
    console.error(error);
    res.json({ reply: "Server crash ❌" });
  }
});

app.listen(PORT, () => {
  console.log(`Server runninServer{PORT}`);
});
