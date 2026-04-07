import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 10000;

app.get("/", (req, res) => {
  res.send("Server running 🚀");
});

app.post("/chat", async (req, res) => {
  try {
    const { message } = req.body;

    const API_KEY = process.env.GEMINI_API_KEY;AIzaSyCP1E2A1GTg3PAdDtzJoAzYLiiCFyKHGQs

    if (!API_KEY) {
      return res.json({ reply: "API KEY missing ❌" });
    }

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1/models/gemini-2.0-flash:generateContent?key=${API_KEY}`,
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

    console.log("FULL API RESPONSE:", data);

    if (data.error) {
      return res.json({ reply: "API Error: " + data.error.message });
    }

    const reply =
      data?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!reply) {
      return res.json({ reply: "Empty AI response ❌" });
    }

    res.json({ reply });

  } catch (error) {
    console.error(error);
    res.json({ reply: "Server crash ❌" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
