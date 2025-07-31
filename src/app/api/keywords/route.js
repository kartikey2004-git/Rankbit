import { Keyword } from "@/models/Keywords";
import mongoose from "mongoose";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

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

    const created = await Keyword.create({
      keyword,
      domain,
      owner: session.user.email,
    });

    return new Response(JSON.stringify(created), {
      status: 201,
    });
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
