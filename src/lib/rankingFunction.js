/*

Hum yaha Bright Data ka SERP API use karne wale hain for scraping 
          

   - Reason: agar Google apni HTML structure ya system change kare toh Bright Data apni API turant update kar deta hai.

   - Matlab hum API par rely kar sakte hain ki hamesha kaam karegi.

   - API fast hai aur results zyada precise milte hain.



Is API se hum alag-alag search engines ke liye keywords ki positions bhi check kar sakte hain.
     

    - Response JSON kaafi pretty hota hai, aur uske andar bahut saari useful info hoti hai.


--------------------------------------------------


Ab baat aati hai sync vs async requests ki.

   - Agar hum sync request bhejte hain (default), toh flow aisa hota hai:

        - hum ek keyword bhejte hain, woh request process hoti hai

        - aur API kuch seconds ke baad result return karti hai.

        - Problem: agar Vercel par deploy kiya ho,toh ye 5–10 seconds ka run-time hume charge karega. 
   

   - Isliye async request enable karna better hota hai.
       

        -  Async mode mein hum API ko request bhejte hai

        - woh immediately bolta hai: request received, hum check karke ready hone par results bhejenge.

        - Matlab hume wait nahi karna padta.
        
        - Jab unke paas data ready ho jaata hai, woh hume callback endpoint pe notify kar dete hain.  

--------------------------------------------------


     - Ye approach Puppeteer se possible nahi hoti, kyunki Puppeteer mein hum khud Google khol ke parse karte hain.


     - Yaha Bright Data khud Google scrape karke positions, titles, links sab ready kar ke bhejta hai.  


     - Lekin ek dikkat hai: hume ek public callback URL dena padta hai jaha woh results bhejenge.
     

     - Agar hum local dev mein hain (http://localhost:3000), toh woh publically accessible nahi hota.


     - Matlab agar hum friend ko ye link bheje, uske system pe kaam hi nahi karega — error 404 aayega.  



     - Solution: hume ek public URL chahiye hota hai , toh Deploy karenge toh Vercel hume automatically ek public URL dega.  


     - Aur agar abhi development mein hi test karna hai,  toh hum "tunnelmole" (ya ngrok jaise tools) use kar sakte hain jo local server ko ek temporary public URL de dete hain.


--------------------------------------------------


   - ngrok ek tool hai jo tumhare local server ko ek public URL deta hai.
       

       - Matlab agar tumhari app localhost:3000 pe chal rahi hai
       
       - toh ngrok use ek public internet URL bana dega jise tum kahin se access kar sakte ho ( ya Bright Data jaise APIs ko callback URL de sakte ho ).

  
*/

import axios from "axios";
import "dotenv/config";

// So when we add a keyword , we want to fetch a position and every midnight we want to grab a position for all of the keywords

// function to ask them for to do google search for a keyword

export async function doGoogleSearch(keyword) {
  const data = {
    country: "us",
    query: { q: keyword },
    brd_json: "json", // JSON response enable
  };

  const url =
    "https://api.brightdata.com/serp/req?customer=hl_ae9fc608&zone=rankbit";

  const headers = {
    Authorization: `Bearer ${process.env.BRIGHTDATA_API_KEY}`,
  };

  // from this We'll get the result id from this post request to brightdata , to fetch response later when data is ready

  try {
    const res = await axios.post(url, data, { headers });
    const responseId = res.headers["x-response-id"];

    return responseId;
  } catch (error) {
    console.error(
      "BrightData request failed:",
      error.response?.data || error.message
    );
    return null;
  }
}

// Jab unke paas data ready ho jaata hai, woh hume callback endpoint pe notify kar dete hain.

// there is another request because they are going to send req to our callback endpoint API