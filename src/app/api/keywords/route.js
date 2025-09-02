import { Keyword } from "@/models/Keywords";
import mongoose from "mongoose";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { doGooglesearch } from "@/lib/rankingFunction";
import { Result } from "@/models/Results";

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

    await Keyword.create({
      keyword,
      domain,
      owner: session?.user?.email || "anonymous",
    });

    /* 
    const responseId = await doGooglesearch(keyword);

    if (!responseId) {
      return Response.json(
        { error: "BrightData search failed" },
        { status: 500 }
      );
    }

    const result = await Result.create({
      keyword,
      domain,
      brightDataResponseId: responseId,
    });
    
    */

    return new Response({ status: 201 });
  } catch (error) {
    console.error("Keyword creation error:", error.message);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
    });
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

    // console.log(req.url); // http://localhost:3000/api/keywords?domain=github.com


    // creates a URL object from the request URL and extracts its searchParams.

    // searchParams lets you easily read query parameters. It’s just a shortcut for accessing query strings from the request.


    // console.log(new URL(req.url));

    const { searchParams } = new URL(req.url); 
    const domain = searchParams.get("domain");

    // check if domain is present or not in requrl

    if (!domain) {
      return new Response(JSON.stringify({ error: "Missing domain" }), {
        status: 400,
      });
    }

    // Find all the keywords in the database for particular domain and where owner is current user ( check by email )

    const userKeywords = await Keyword.find({
      domain,
      owner: session.user.email,
    });

    return new Response(JSON.stringify(userKeywords), { status: 200 });
  } catch (err) {
    console.error("GET /keywords error:", err.message);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
    });
  }
}                                                 

export async function DELETE(req) {
  await mongoose.connect(process.env.MONGODB_URI);

  const { searchParams } = new URL(req.url);
  const keyword = searchParams.get("keyword");
  const domain = searchParams.get("domain");

  const session = await getServerSession(authOptions);

  await Keyword.deleteOne({ domain, keyword, owner: session.user?.email });

  return Response.json(true);
}
