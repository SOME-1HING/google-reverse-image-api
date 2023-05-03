const axios = require("axios");
const cheerio = require("cheerio");
const {
  SuccessResponseObject,
  ErrorResponseObject,
} = require("../common/http");

async function reverse(imageUrl) {
  try {
    /*   const imageExtension = imageUrl.split(".").pop().toLowerCase();
    if (!["jpg", "jpeg", "png", "gif", "bmp"].includes(imageExtension)) {
      return new ErrorResponseObject("Invalid image URL");
    } */

    const headers = {
      "User-Agent":
        "Mozilla/5.0 (Linux; Android 6.0.1; SM-G920V Build/MMB29K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/52.0.2743.98 Mobile Safari/537.36",
    };
    const url = `https://images.google.com/searchbyimage?safe=off&sbisrc=tg&image_url=${imageUrl}`;
    const response = await axios.get(url, { headers });

    const $ = cheerio.load(response.data);
    const result = { similarUrl: "", resultText: "" };

    const similarInput = $("input.gLFyf").first();
    if (similarInput.length) {
      const similarImage = similarInput.attr("value");
      const similarUrl = `https://www.google.com/search?tbm=isch&q=${encodeURIComponent(
        similarImage
      )}`;
      result.similarUrl = similarUrl;
    } else {
      return new ErrorResponseObject("Failed to find similar images");
    }

    const outputDiv = $("div.r5a77d").first();
    if (outputDiv.length) {
      const output = outputDiv.text();
      let decodedText = unescape(encodeURIComponent(output));

      if (decodedText.includes("Â")) {
        decodedText = decodedText.replace(/Â/g, " ");
      }
      result.resultText = decodedText;
    } else {
      return new ErrorResponseObject("Failed to find text output");
    }

    return new SuccessResponseObject("Successfully Got the Result", result);
  } catch (error) {
    return new ErrorResponseObject(`Failed to reverse image: ${error.message}`);
  }
}

module.exports = {
  reverse,
};

// For Testing
/* reverse("https://graph.org/file/1668e5e51e612341b945e.jpg")
  .then((result) => console.log(result["success"]))
  .catch((error) => console.error(error.message));
 */
