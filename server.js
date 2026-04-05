const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// TEST route (GET)
app.get("/", (req, res) => {
  res.send("Server is running ✅");
});

// MAIN API (POST)
app.post("/chat", async (req, res) => {
  try {
    const userMsg = req.body.message;

    if (!userMsg) {
      return res.json({ reply: "No message received" });
    }

    // Simple reply (test ke liye)
    res.json({
      reply: "You said: " + userMsg
    });

  } catch (err) {
    res.json({ reply: "Server error" });
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
