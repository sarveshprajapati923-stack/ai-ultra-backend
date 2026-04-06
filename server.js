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

    const API_KEY = process.env.GEMINI_API_KEY;

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${API_KEY}`,
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
    console.log("API:", data);

    const reply =
      data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "No reply ❌";

    res.json({ reply });

  } catch (error) {
    res.json({ reply: "Error ❌" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
