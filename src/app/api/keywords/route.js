import { Keyword } from "@/models/Keywords";
import mongoose from "mongoose";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { doGooglesearch } from "@/lib/rankingFunction";
import { Result } from "@/models/Results";

export async function POST(req) {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
      });
    }

    const { keyword, domain } = await req.json();

    if (!keyword || !domain) {
      return new Response(JSON.stringify({ error: "Missing fields" }), {
        status: 400,
      });
    }

    await Keyword.create({
      keyword,
      domain,
      owner: session?.user?.email || "anonymous",
    });

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
    await mongoose.connect(process.env.MONGODB_URI);

    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
      });
    }

    const { searchParams } = new URL(req.url);
    const domain = searchParams.get("domain");

    if (!domain) {
      return new Response(JSON.stringify({ error: "Missing domain" }), {
        status: 400,
      });
    }
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
