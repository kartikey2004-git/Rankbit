/*


const puppeteer = require("puppeteer");

async function getKeywordRank(domain, keyword) {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  await page.setUserAgent(
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/91.0.4472.124 Safari/537.36"
  );
  await page.setViewport({ width: 1280, height: 800 });
  await page.goto(
    `https://www.google.com/search?q=${encodeURIComponent(keyword)}`,
    {
      waitUntil: "networkidle2",
    }
  );
  const results = await page.$$eval("#search a > h3", (elems) => {
    return elems.map((h3) => {
      const title = h3.innerText;
      const link = h3.parentElement.href;
      return { title, link };
    });
  });
  const rank = results.findIndex((r) => r.link.includes(domain)) + 1;
  console.log(results);
  console.log(
    `\n"${domain}" ranked at position:`,
    rank === 0 ? "Not Found" : rank
  );
  await browser.close();
}
(async () => {
  await getKeywordRank("github.com", "git");
})();

----------------------------------------------------

const SerpApi = require('google-search-results-nodejs');
const search = new SerpApi.GoogleSearch("YOUR_API_KEY_HERE"); // 🔑 Add your API key here
async function getKeywordRank(keyword, domain) {
 return new Promise((resolve, reject) => {
 search.json({
 q: keyword,
 location: "India", // optional
 num: 100 // fetch top 100 results
 }, (data) => {
 if (!data.organic_results) {
 return resolve("No results");
 }
 const index = data.organic_results.findIndex((result) =>
 result.link && result.link.includes(domain)
 );
 resolve(index === -1 ? "Not Found" : index + 1);
 });
 });
}
(async () => {
 const position = await getKeywordRank("github", "github.com");
 console.log(`"github.com" ranked at position: ${position}`);
})();

*/

const axios = require("axios");
const dotenv = require("dotenv");

dotenv.config();

export async function doGooglesearch(keyword) {
  const data = {
    country: "us",
    query: { q: keyword },
  };

  const url =
    "https://api.brightdata.com/serp/req?customer=hl_0342ed83&zone=rankbitt";

  const headers = {
    Authorization: "Bearer " + process.env.BRIGHTDATA_API_KEY,
  };

  try {
    const res = await axios.post(url, data, { headers });

    return res.headers.get("x-response-id");
  } catch (error) {
    console.error(
      "BrightData request failed:",
      error.response?.data || error.message
    );
    return null;
  }
}

