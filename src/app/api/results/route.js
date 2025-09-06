import { Result } from "@/models/Results";
import axios from "axios";
import mongoose from "mongoose";

export async function POST(req) {
  try {
    // connects your app to MongoDB database using Mongoose

    await mongoose.connect(process.env.MONGODB_URI);

    // Parse the incoming request body as JSON
    const data = await req.json();

    // console.log(data);

    // Get response_id from the parsed request body
    const response_id = data.response_id;

    const url = `https://api.brightdata.com/serp/get_result?customer=hl_ae9fc608&zone=rankbit&response_id=${response_id}`;

    console.log("Fetching result for:" + response_id); //  Fetching data from BrightData API using this responseId

    // Use this responseId to fetch rank data from BrightData API for the given keyword and domain

    const res = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${process.env.BRIGHTDATA_API_KEY}`,
        "Content-Type": "application/json",
      },
    });

    // Find the result document in the database using the BrightData responseId

    const ourResultDoc = await Result.findOne({
      brightDataResponseId: response_id,
    });

    // If a result document is found using the BrightData responseId,

    if (ourResultDoc) {
      console.log("our result found");

      // extract its domain and keyword from resultDoc

      const domain = ourResultDoc.domain;
      const keyword = ourResultDoc.keyword;

      // From the BrightData SERP API response (fetched using responseId), set the organic results data

      const organicData = res.data.organic;

      // Search organicData for a result where the link includes the domain, then get its rank

      const rank = organicData.find((result) =>
        result.link.includes(domain)
      )?.rank;

      // If rank is found, update the resultDoc with it and save the document

      if (rank) {
        ourResultDoc.rank = rank;
        console.log(
          `Rank ${rank} saved for keyword ${keyword} and domain ${domain}`
        );
        await ourResultDoc.save();
      }
    } else {
      console.log("our result NOT found");
    }

    return Response.json(true);
  } catch (error) {
    console.error("POST /results error:", error.message);
    return new Response(JSON.stringify({ error: "Error in updating results" }));
  }
}

export async function GET(req) {
  try {
    // connects your app to MongoDB database using Mongoose

    await mongoose.connect(process.env.MONGODB_URI);

    // console.log(req.url);

    // creates a URL object from the request URL and extracts its searchParams.

    // searchParams lets you easily read query parameters. It’s just a shortcut for accessing query strings from the request.

    // console.log(new URL(req.url));

    const { searchParams } = new URL(req.url);

    // Extract brightResponseId from searchParams
    const id = searchParams.get("id");

    // Find the resultDoc in the database using the brightDataResId

    const result = await Result.findOne({ brightDataResponseId: id });

    return Response.json(result);
  } catch (error) {
    console.error("GET /results error:", error.message);
    return new Response(JSON.stringify({ error: "Error in getting results" }));
  }
}
