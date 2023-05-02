const { Router } = require("express");
const {
  SuccessResponseObject,
  ErrorResponseObject,
} = require("../common/http");
const { reverse } = require("../modules");

const r = Router();

r.get("/", (req, res) =>
  res
    .status(200)
    .json(
      new SuccessResponseObject(
        "https://github.com/SOME-1HING/google-reverse-image-api"
      )
    )
);
module.exports = r;

r.post("/reverse", async (req, res) => {
  try {
    const { imageUrl } = req.body;

    const result = await reverse(imageUrl);

    if (result["success"]) {
      res.status(200).json(result);
    } else {
      res.status(401).json(result);
    }
  } catch (error) {
    console.error("/reverse error:", error);
    res.status(402).json(new ErrorResponseObject("Failed to reverse image"));
  }
});
