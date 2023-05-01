const edgeChromium = require("chrome-aws-lambda");
const puppeteer = require("puppeteer-core");

const LOCAL_CHROME_EXECUTABLE =
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";

async function googleReverseImageSearch(imageUrl) {
  try {
    const executablePath =
      (await edgeChromium.executablePath) || LOCAL_CHROME_EXECUTABLE;

    const browser = await puppeteer.launch({
      executablePath,
      args: edgeChromium.args,
      headless: false,
    });

    const page = await browser.newPage();

    await page.setExtraHTTPHeaders({
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36",
    });

    await page.goto(`https://lens.google.com/uploadbyurl?url=${imageUrl}`);
    await page.waitForNavigation();

    await page.waitForSelector(".WpHeLc", { timeout: 20000 });
    const href = await page.$eval(".WpHeLc", (a) => a.getAttribute("href"));

    await page.waitForSelector(".DeMn2d", { timeout: 20000 });
    const divText = await page.$eval(
      ".DeMn2d",
      (element) => element.textContent
    );

    await browser.close();
    return { title: divText, link: href };
  } catch (error) {
    console.error("googleReverseImageSearch error:", error);
    throw new Error("Failed to search for image");
  }
}

module.exports = {
  googleReverseImageSearch,
};
