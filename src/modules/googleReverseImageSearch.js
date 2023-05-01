const edgeChromium = require("chrome-aws-lambda");
const puppeteer = require("puppeteer-core");

const LOCAL_CHROME_EXECUTABLE =
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";

let browser;

async function googleReverseImageSearch(imageUrl) {
  try {
    const executablePath =
      (await edgeChromium.executablePath) || LOCAL_CHROME_EXECUTABLE;

    if (!browser) {
      browser = await puppeteer.launch({
        executablePath,
        args: [
          ...edgeChromium.args,
          "--disable-features=site-per-process,TranslateUI,BlinkGenPropertyTrees",
        ],
        headless: true,
      });
    }

    const page = await browser.newPage();

    await page.setExtraHTTPHeaders({
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36",
    });

    const timeoutPromise = new Promise((_, reject) => {
      setTimeout(() => {
        reject(new Error("Function timed out"));
      }, 9900);
    });

    const searchPromise = (async () => {
      await page.goto(`https://lens.google.com/uploadbyurl?url=${imageUrl}`);

      await page.waitForSelector(".WpHeLc", { timeout: 10000 });
      const href = await page.$eval(".WpHeLc", (a) => a.getAttribute("href"));

      await page.waitForSelector(".DeMn2d", { timeout: 10000 });
      const divText = await page.$eval(
        ".DeMn2d",
        (element) => element.textContent
      );

      return { title: divText, link: href };
    })();

    const result = await Promise.race([timeoutPromise, searchPromise]);
    await page.close();
    return result;
  } catch (error) {
    console.error("googleReverseImageSearch error:", error);
    throw new Error("Failed to search for image");
  }
}

module.exports = {
  googleReverseImageSearch,
};
