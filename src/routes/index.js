const { Router } = require("express");
const { SuccessResponseObject } = require("../common/http");
const { googleReverseImageSearch } = require("../modules");

const r = Router();

r.get("/", (req, res) =>
  res.json(new SuccessResponseObject("express vercel boiler plate"))
);
module.exports = r;

r.post("/reverse", async (req, res) => {
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
