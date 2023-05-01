const express = require("express");
const { json } = require("express");
const { googleReverseImageSearch } = require("./googleReverseImageSearch");

const app = express();
const port = process.env.PORT || 3000;

app.use(json());

app.get("/", async (req, res) => {
  res.json({
    info: "https://github.com/SOME-1HING/google-reverse-image-api",
  });
});

app.post("/reverse", async (req, res) => {
  try {
    const { imageUrl } = req.body;

    res.setHeader("Connection", "keep-alive");
    res.setHeader("Content-Type", "application/json");

    const result = await googleReverseImageSearch(imageUrl);

    res.write(JSON.stringify(result));
    res.end();
  } catch (error) {
    console.error("/reverse error:", error);
    res.status(500).json({ error: "Failed to reverse image" });
  }
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
