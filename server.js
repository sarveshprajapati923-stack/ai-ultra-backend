import express from "express";
import cors from "cors";
import fetch from "node-fetch";

const app = express();
app.use(cors());
app.use(express.json());

const API_KEY = "AIzaSyBKJEf_kVC2-eKvcwVJP2qrHheSLJkMLoM"; // 👈 yaha apni key daalo

app.post("/chat", async (req, res) => {
  try {
    const userMsg = req.body.message;

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=${API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [{ text: userMsg }],
            },
          ],
        }),
      }
    );

    const data = await response.json();

    // 🔥 SAFE RESPONSE
    const reply =
      data.candidates?.[0]?.content?.parts?.[0]?.text ||
      "AI reply nahi de paaya ❌";

    res.json({ reply });
  } catch (err) {
    console.log(err);
    res.json({ reply: "Server error ❌" });
  }
});

app.get("/", (req, res) => {
  res.send("Nexora AI Backend Running 🚀");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Server running..."));
