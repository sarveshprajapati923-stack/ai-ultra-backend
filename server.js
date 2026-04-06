import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

const API_KEY = process.env.GEMINI_API_KEY;

// test route
app.get("/", (req, res) => {
  res.send("Server running 🚀");
});

// main chat route
app.post("/chat", async (req, res) => {
  try {
    const { message } = req.body;

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`,
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

    console.log("Gemini Response:", JSON.stringify(data, null, 2));

    const reply =
      data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "No reply from AI ❌";

    res.json({ reply });

  } catch (error) {
    console.log("Error:", error);
    res.json({ reply: "Server error ❌" });
  }
});

// port
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log("Server running 🚀 on port", PORT);
          });
