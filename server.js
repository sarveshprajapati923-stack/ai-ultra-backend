import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 10000;

// ✅ Check server
app.get("/", (req, res) => {
  res.send("Server running 🚀");
});

// ✅ Chat API
app.post("/chat", async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.json({ reply: "No message sent ❌" });
    }

    const API_KEY = process.env.GEMINI_API_KEY;

    if (!API_KEY) {
      return res.json({ reply: "API key missing ❌" });
    }

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${API_KEY}`,
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

    // 🔍 Debug log (Render logs me dikhega)
    console.log("API RAW RESPONSE:", JSON.stringify(data));

    const reply =
      data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "No reply from AI ❌";

    res.json({ reply });

  } catch (error) {
    console.error("ERROR:", error);
    res.json({ reply: "Server error ❌" });
  }
});

// ✅ Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
