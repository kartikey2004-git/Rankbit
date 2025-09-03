/*

- google-search-results-nodejs package (the classic SerpApi client for Node.js) : 
    
    - the latest version is 2.1.0,
    - released around late 2021—so it's not been updated in years


- SerpApi has moved on , The new go-to library is simply called serpapi , and its latest version is 2.2.1, published just a month ago (circa August 2025)

*/


// Yeh function API call karega aur hume JSON results dega

import { getJson } from "serpapi";
import "dotenv/config";

const apiKey = process.env.SERP_API_KEY;


// Ek async function banaya jo keyword aur domain leta hai aur domain ki Google ranking return karta hai

const getKeywordRank = async (keyword, domain) => {

  // Step 1: SerpApi ko call kar rahe hain

  const data = await getJson({

    engine: "google",  // google" matlab Google search use karna

    q: keyword, // keyword jo search karna hai

    location: "India", // agar tumhe India ke results chahiye

    num: 100, // fetch top 100 results
    api_key: apiKey,
  });


   // Step 2: Check karo ki organic_results aaye bhi hain ya nahi

  if (!data.organic_results) {
    return "No results";  // Agar nahi aaye toh "No results" return kar do
  }


  // Step 3: Organic results ke andar tumhara domain dhoondo , findIndex use kar rahe hain jo index (position) dega jaha domain mila

  const rank = data.organic_results.findIndex(
    (result) => result.link && result.link.includes(domain)  // condition: result.link exist karta ho aur usme domain ka naam ho
  );

  //  Step 4: Agar domain mila hi nahi toh -1 return karega and then -1 mila toh "Not Found" warna rank + 1 (kyunki array index 0-based hota hai, ranking 1-based hoti hai)

  return rank === -1 ? "Not Found" : rank + 1;
};

(async () => {

  // "github" keyword search karenge aur dekhenge "github.com" kis rank pe hai

  const position = await getKeywordRank("github", "github.com");

  // Result console mein print karenge
  
  console.log(`"github.com" ranked at position: ${position}`);
})();
