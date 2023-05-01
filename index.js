const express = require("express");
const { json } = require("express");
const { googleReverseImageSearch } = require("./googleReverseImageSearch");

const app = express();
const port = process.env.PORT || 3000;

app.use(json());

app.post("/reverse", async (req, res) => {
  try {
    const { imageUrl } = req.body;
    const result = await googleReverseImageSearch(imageUrl);
    res.json(result);
  } catch (error) {
    console.error("/reverse error:", error);
    res.status(500).json({ error: "Failed to reverse image" });
  }
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
