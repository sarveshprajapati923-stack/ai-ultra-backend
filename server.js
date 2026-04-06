import express from "express";
import cors from "cors";
import fetch from "node-fetch";

const app = express();
app.use(cors());
app.use(express.json());

// 🔑 Gemini API KEY (Render Environment me set karo)
const API_KEY = process.env.GEMINI_API_KEY;

// Test route
app.get("/", (req, res) => {
  res.send("Nexora AI Backend Running 🚀");
});

// 🔥 Main AI route
app.post("/ask", async (req, res) => {
  try {
    const userMessage = req.body.message;

    if (!userMessage) {
      return res.json({ reply: "Message missing ❌" });
    }

    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${API_KEY}`;

    const result = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [{ text: userMessage }],
          },
        ],
      }),
    });

    const data = await result.json();

    // ✅ Correct Parse (MOST IMPORTANT)
    const reply =
      data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "AI reply nahi de paaya ❌";

    res.json({ reply });

  } catch (error) {
    console.error(error);
    res.json({ reply: "Server error ❌" });
  }
});

// 🚀 Port
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
