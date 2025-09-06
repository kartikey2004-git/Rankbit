import { Keyword } from "@/models/Keywords";
import mongoose from "mongoose";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { Result } from "@/models/Results";
import { doGoogleSearch } from "@/lib/rankingFunction";

export async function POST(req) {
  try {
    // connects your app to MongoDB database using Mongoose

    await mongoose.connect(process.env.MONGODB_URI);

    // getServerSessions from nextauth is a function which gives details about particular session

    const session = await getServerSession(authOptions);

    // If the user's email is missing, treat the request as unauthorized.

    if (!session?.user?.email) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
      });
    }

    // reads the incoming HTTP request body (req) and parses it as JSON and then grab the keyword and domain from request

    const { keyword, domain } = await req.json();

    // Check that keyword or Domain is provided by user or not

    if (!keyword || !domain) {
      return new Response(JSON.stringify({ error: "Missing fields" }), {
        status: 400,
      });
    }

    // Create a new keyword document inside the database with domain,keyword and owner

    const keywordDoc = await Keyword.create({
      keyword,
      domain,
      owner: session?.user?.email,
    });

    // doGoogleSearch triggers a BrightData SERP API query , which returns a responseId and that responseId is later used to fetch the keyword’s rank for a given domain.

    const responseId = await doGoogleSearch(keyword);

    // Check whether the API call returns a responseId

    if (!responseId) {
      return Response.json(
        { error: "BrightData search failed" },
        { status: 500 }
      );
    }

    // Create a resultDoc that stores the responseId along with the domain and keyword, so we can later fetch the keyword’s rank for that domain from BrightData Serp API

    await Result.create({
      keyword,
      domain,
      brightDataResponseId: responseId,
    });

    return Response.json(keywordDoc);
  } catch (error) {
    console.error("POST /keyword error:", error.message);
    return new Response(JSON.stringify({ error: "Error creating keyword" }));
  }
}

export async function GET(req) {
  try {
    // connects your app to MongoDB database using Mongoose

    await mongoose.connect(process.env.MONGODB_URI);

    // getServerSessions from nextauth is a function which gives details about particular session

    const session = await getServerSession(authOptions);

    // If the user's email is missing, treat the request as unauthorized.

    if (!session?.user?.email) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
      });
    }

    // console.log(req.url);

    // creates a URL object from the request URL and extracts its searchParams.

    // searchParams lets you easily read query parameters. It’s just a shortcut for accessing query strings from the request.

    // console.log(new URL(req.url));

    const { searchParams } = new URL(req.url);
    const domain = searchParams.get("domain");
    const keyword = searchParams.get("keyword");

    // check if domain is present or not in req.url

    if (!domain) {
      return new Response(JSON.stringify({ error: "Missing domain" }), {
        status: 400,
      });
    }

    const keywordsDocs = await Keyword.find(
      keyword
        ? {
            domain,
            keyword,
            owner: session.user.email,
          }
        : {
            domain,
            owner: session.user.email,
          }
    );

    // Fetch all keywords from the database for a given domain where the owner matches the current user (verified by email)

    // Fetch all resultDocs for a given domain that match the keywords stored in the database for that domain.

    const resultsDocs = await Result.find({
      domain,
      keyword: keywordsDocs.map((doc) => doc.keyword),
    });

    return Response.json({
      keywords: keywordsDocs,
      results: resultsDocs,
    });
  } catch (err) {
    console.error("GET /keywords error:", err.message);
    return new Response(JSON.stringify({ error: "Error in getting keywords" }));
  }
}

export async function DELETE(req) {
  try {
    // connects your app to MongoDB database using Mongoose

    await mongoose.connect(process.env.MONGODB_URI);

    // console.log(req.url)

    // creates a URL object from the request URL and extracts its searchParams.

    // searchParams lets you easily read query parameters. It’s just a shortcut for accessing query strings from the request.

    const { searchParams } = new URL(req.url);

    // Extracts keywords and domain from searchParams

    const keyword = searchParams.get("keyword");
    const domain = searchParams.get("domain");

    // getServerSessions from nextauth is a function which gives details about particular session

    const decodedKeyword = encodeURIComponent(keyword);

    const session = await getServerSession(authOptions);

    // Delete a keyword that belongs to the current user (by email) and matching by the specified domain and keyword.

    await Keyword.deleteOne({
      domain,
      keyword: decodedKeyword,
      owner: session.user?.email,
    });

    return Response.json(true);
  } catch (error) {
    console.error("DELETE /keyword error:", error.message);
    return new Response(
      JSON.stringify({ error: "Error in deleting keyword" }),
      {
        status: 500,
      }
    );
  }
}
