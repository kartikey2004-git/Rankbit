import puppeteer from "puppeteer";

// puppeteer server headless browser

// Yeh function ek keyword ke liye Google search karke domain ki rank check karta hai

async function getKeywordRank(domain, keyword) {
  // 1. Browser launch karo (headless mode = true matlab UI nahi dikhega)

  const browser = await puppeteer.launch({ headless: true });

  console.log(browser); // browser object

  // 2. Browser ke andar ek naya page open karo

  const page = await browser.newPage();

  // 3. User-Agent set karo (Google ko lagna chahiye ki ek normal browser se request aayi hai)

  await page.setUserAgent(
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/91.0.4472.124 Safari/537.36"
  );

  // 4. Page ka viewport (screen size) set karo

  await page.setViewport({ width: 1280, height: 800 });

  console.log(page); // Page object

  // 5. Google search results page open karo

  const res = await page.goto(
    `https://www.google.com/search?q=${encodeURIComponent(keyword)}`,
    {
      waitUntil: "networkidle2", // Matlab tab tak wait karo jab tak network mostly idle na ho
    }
  );

  // 6. Pura HTML content lo (taaki inspect kar sako)

  const html = await page.content();

  console.log("Status:", res.status()); // Response ka status code

  console.log("HTML length:", html.length); // Kitna bada HTML aaya

  console.log("Sample HTML:\n", html.slice(0, 500)); // Starting 500 chars print karo preview ke liye

  // 7. Sare search results nikaalo (Google search ke andar h3 headings hoti hain jo links ke saath hoti hain)

  const results = await page.$$eval("#search a > h3", (elements) => {
    return elements.map((h3) => {
      const title = h3.innerText; // Result ka title

      const link = h3.parentElement.href; // Parent <a> ka href (actual link)

      return { title, link }; // Ek object return karte hain
    });
  });

  console.log(results);

  // 8. Find karo rank ki kis position pe tumhara domain aaya hai

  const rank = results.findIndex((r) => r.link.includes(domain)) + 1;

  console.log(
    `\n"${domain}" ranked at position:`,
    rank === 0 ? "Not Found" : rank
  );

  console.log(res); // Response object
  await browser.close(); // 10. Browser band karo

  return rank; // returns the rank of domain in google search for a particular keyword
}

// Test call: yahan domain = github.com aur keyword = "git"

(async () => {
  await getKeywordRank("github.com", "git").then((rank) => console.log(rank));
})();

/* 

Arrays of response we got after scraping google results 

[
  {
    title: "Git",
    link: "https://git-scm.com"
  },
  {
    title: "Git - Wikipedia",
    link: "https://en.wikipedia.org/wiki/Git"
  },
  {
    title: "Github: Let's build from here - Github",
    link: "https://github.com"
  },
]

--------------------------------------------------

Code Flow:

1. Puppeteer browser launch hota hai (headless mode = background mein)

2. Ek naya page open hota hai.

3. Fake user-agent set karte hain taaki Google ko bot na lage.

4. Google search results ke URL par jaate hain.

5. HTML content fetch karte hain.

6. #search a > h3 selector se sare search result titles + links nikalte hain.

7. Usme tumhara domain dhoondhte hain.

8. Agar mila toh uski position return kar dete hain, warna "Not Found".

9. Finally browser band kar dete hain.

--------------------------------------------------


   - 429 = Too Many Requests → Google has flagged your Puppeteer request as automated traffic and is serving you a CAPTCHA page  instead of real search results.


  - That’s why the HTML dump you saw is just a simple page asking you to prove you’re not a bot.


- Google search is heavily protected. Even with Puppeteer, if you hit it directly:
     
    - You’ll almost instantly get blocked (especially from localhost or datacenter IPs).

    - 429 is their “slow down / blocked” status.


--------------------------------------------------


Better approach (production grade):
   
    - Use a search API (e.g. SerpAPI, BrightData, ZenRows, ScraperAPI).

    - These services handle IP rotation + CAPTCHA solving for you.


- If you insist on Puppeteer-only:
    
   - You’ll need rotating proxies + possibly CAPTCHA solving services (like 2Captcha)

   - Otherwise, Google will block you within 1–2 requests.


*/
