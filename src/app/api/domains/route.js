import { Domain } from "@/models/Domain";
import mongoose from "mongoose";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import axios from "axios";
import * as cheerio from "cheerio";
import { NextResponse } from "next/server";

async function getIconUrl(domain) {
  try {
    const response = await axios.get(`https://${domain}`);
    const $ = cheerio.load(response.data);

    let href = $("link[rel*='icon']").attr("href");

    if (!href) return `https://${domain}/favicon.ico`;

    if (href.startsWith("http")) return href;
    if (href.startsWith("//")) return `https:${href}`;
    if (href.startsWith("/")) return `https://${domain}${href}`;
    return `https://${domain}/${href}`;
  } catch (error) {
    console.error("Error fetching icon:", error.message);
    return `https://${domain}/favicon.ico`;
  }
}

export async function POST(req) {
  try {
    const data = await req.json();

    if (!data?.domain) {
      return new Response(JSON.stringify({ error: "Domain is required" }), {
        status: 400,
      });
    }

    await mongoose.connect(process.env.MONGODB_URI);

    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
      });
    }

    const icon = await getIconUrl(data.domain);

    const doc = await Domain.create({
      domain: data.domain,
      owner: session.user.email,
      icon,
    });

    return new Response(JSON.stringify(doc), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("POST error:", error.message);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
    });
  }
}

export async function GET() {
  await mongoose.connect(process.env.MONGODB_URI);

  const session = await getServerSession(authOptions);

  const user = await Domain.find({ owner: session.user?.email });

  return Response.json(user);
}

export async function DELETE(req) {
  await mongoose.connect(process.env.MONGODB_URI);

  const { searchParams } = new URL(req.url);
  const domain = searchParams.get("domain");

  const session = await getServerSession(authOptions);

  await Domain.deleteOne({ owner: session.user?.email, domain: domain });

  return Response.json(true)
}
