const express = require("express");
const fetch = require("node-fetch");
const app = express();

app.use(express.json());

app.post("/download", async (req, res) => {
    try {
        const response = await fetch("https://auto-download-all-in-one.p.rapidapi.com/v1/social/autolink", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "x-rapidapi-host": "auto-download-all-in-one.p.rapidapi.com",
                "x-rapidapi-key": "27c80bc115msh1c21bd2f096b06ap1629f8jsnadfc6c4e9775"
            },
            body: JSON.stringify({ url: req.body.url })
        });

        const data = await response.json();
        res.json(data);

    } catch (err) {
        res.status(500).json({ error: "Failed" });
    }
});

app.listen(3000, () => console.log("Running"));
