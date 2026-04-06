const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// Home route
app.get("/", (req, res) => {
  res.send("Server is running ✅");
});

// Chat route
app.post("/chat", async (req, res) => {
  const userMsg = req.body.message.toLowerCase();

  let reply = "";

  if (userMsg.includes("english")) {
    reply = "English seekhne ke liye daily practice karo, videos dekho aur bolne ki habit banao 👍";
  } 
  else if (userMsg.includes("ai")) {
    reply = "AI ka concept 1950s me start hua tha 🤖 aur aaj bahut advance ho chuka hai.";
  } 
  else if (userMsg.includes("money")) {
    reply = "Online paise kamane ke liye skills sikho jaise coding, editing ya freelancing 💰";
  } 
  else {
    reply = "Good question 👍 main abhi basic AI hu, aur improve ho raha hu.";
  }

  // delay (typing feel)
  setTimeout(() => {
    res.json({ reply });
  }, 1500);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
