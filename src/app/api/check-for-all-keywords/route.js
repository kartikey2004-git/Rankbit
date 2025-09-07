import { doGoogleSearch } from "@/lib/rankingFunction.js";
import { Keyword } from "@/models/Keywords";
import { Result } from "@/models/Results";
import mongoose from "mongoose";

export async function GET() {
  try {
    // 1. Connect to MongoDB

    await mongoose.connect(process.env.MONGODB_URI);

    // 2. Fetch all keywords from the database

    const keywordsDocs = [...(await Keyword.find())];

    // Arrays to keep track of promises

    const googleSearchPromises = [];
    const savePromises = [];

    // 3. Loop over each keyword and trigger Google search

    for (const keywordDoc of keywordsDocs) {
      // Call BrightData API for this keyword

      const googleSearchPromise = doGoogleSearch(keywordDoc.keyword);

      // Once the search promise resolves, save result in DB

      googleSearchPromise.then((responseId) => {
        // Save to Result collection
        const savePromise = Result.create({
          domain: keywordDoc.domain,
          keyword: keywordDoc.keyword,
          brightDataResponseId: responseId, // Make sure responseId is a string here
        });

        savePromises.push(savePromise);
      });

      // Push the search promise to array
      googleSearchPromises.push(googleSearchPromise);
    }

    // 4. Wait for all Google searches and all DB saves

    await Promise.allSettled([...googleSearchPromises, ...savePromises]);

    return Response.json(true);
  } catch (error) {
    console.error("Error fetching keywords:", error);
    return Response.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
