import { Domain } from "@/models/Domain";
import mongoose from "mongoose";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import axios from "axios";
import * as cheerio from "cheerio";
import { Keyword } from "@/models/Keywords";
import { Result } from "@/models/Results";

async function getIconUrl(domain) {
  try {
    // get response from particular domain
    const response = await axios.get(`https://${domain}`);

    // console.log(response): raw HTML string you got back from an HTTP request

    // Cheerio is a Node.js library that lets you work with HTML/XML using a jQuery-like API.

    // Think of it like: you load an HTML document → then you can select, traverse(access each element within a structure) and manipulate elements easily.

    // cheerio.load(html) → takes that HTML string and parses it into a DOM-like structure in memory.

    // $ → becomes your jQuery-style selector function.

    // response.data ka HTML tumne cheerio ko diya, aur ab $ ke through tum uss HTML me se elements nikal sakte ho.

    const $ = cheerio.load(response.data);

    // finds the <link> tag in the HTML whose rel attribute contains "icon" (like favicon links)  and stores its href value (the icon URL) in the variable href

    let href = $("link[rel*='icon']").attr("href");

    // checks if no favicon link (href) was found ,it falls back to a default favicon URL at https://<domain>/favicon.ico.

    if (!href) return `https://${domain}/favicon.ico`;

    // checks if the favicon URL (href) already starts with "http" . If yes, it simply returns that URL.

    if (href.startsWith("http")) return href;

    // handles protocol-relative URLs (like //example.com/favicon.ico).If href starts with //, it prepends https: to make it a complete URL.

    if (href.startsWith("//")) return `https:${href}`;

    // checks if the favicon path starts with / (a relative path). If so, it prepends the domain, making it a full URL like https://domain.com/favicon.ico

    if (href.startsWith("/")) return `https://${domain}${href}`;

    return `https://${domain}/${href}`;
  } catch (error) {
    console.error("Error fetching icon:", error.message);
    return `https://${domain}/favicon.ico`;
  }
}

export async function POST(req) {
  try {
    // reads the incoming HTTP request body (req) and parses it as JSON

    const data = await req.json();

    // Check whether the domain is provided or not

    if (!data?.domain) {
      return new Response(JSON.stringify({ error: "Domain is required" }), {
        status: 400,
      });
    }

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

    // Get the iconUrl of particular domain

    const icon = await getIconUrl(data.domain);

    // Create a new domain document inside the database with domain,owner and icon

    const user = await Domain.create({
      domain: data.domain,
      owner: session.user.email,
      icon,
    });

    // JSON.stringfy : Converts a JavaScript value to a JavaScript Object Notation (JSON) string

    return new Response(JSON.stringify(user), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("POST /domain error:", error.message);
    return new Response(JSON.stringify({ error: "Error in creating  domain" }));
  }
}

export async function GET() {
  try {
    // connects your app to MongoDB database using Mongoose

    await mongoose.connect(process.env.MONGODB_URI);

    // getServerSession from next-auth helps us to grab the current session to extract the user details

    const session = await getServerSession(authOptions);

    // get email of particular user

    const email = session.user?.email;

    // Find all the domains in the database for this current user by email

    const domains = await Domain.find({ owner: email });

    // Fetch all keywords from the database that belong to the current user (matched by email),  and only include those keywords whose domain exists in the 'domains' array

    const keywords = await Keyword.find({
      owner: email,
      domain: domains.map((doc) => doc.domain),
    });

    const results = await Result.find({
      domain: domains.map((doc) => doc.domain),
      keyword: keywords.map((doc) => doc.keyword),
    });

    return Response.json({ domains, keywords , results});
  } catch (error) {
    console.error("GET /domains error:", error.message);
    return new Response(
      JSON.stringify({ error: "Error fetching Domain and keywords" })
    );
  }
}

export async function DELETE(req) {
  try {
    // connects your app to MongoDB database using Mongoose

    await mongoose.connect(process.env.MONGODB_URI);

    // console.log(req.url)

    // creates a URL object from the request URL and extracts its searchParams.

    // searchParams lets you easily read query parameters. It’s just a shortcut for accessing query strings from the request.

    // console.log(new URL(req.url));

    const { searchParams } = new URL(req.url);
    const domain = searchParams.get("domain");

    // getServerSession from next-auth helps us to grab the current session to extract the user details

    const session = await getServerSession(authOptions);

    // Delete the domain from the database that matches the current user and the specified domain to which we had to remove.

    await Domain.deleteOne({ owner: session.user?.email, domain: domain });

    return Response.json(true);
  } catch (error) {
    console.error("DELETE /keyword error:", error.message);
    return new Response(JSON.stringify({ error: "Error in deleting domain" }));
  }
}

/*

- we can also use DOMParser to parse the HTML of the domain but it only parse DOM on frontend

const { default: axios } = require("axios");


async function getIconUrl(domain) {
  const response = await axios.get(`https://` + domain)
  const parser = new DOMParser()
  const parsedHTML = parser.parseFromString(response.data,"text/html")

  const href = parsedHTML.querySelector('head link[rel*="icon"]').href

  if(href.includes("://")){
    return href
  } else {
    return `https://` + domain + href
  }
}

---------------------------------------------------

We also use DOMparser library

import DOMParser from "dom-parser"


async function getIconUrl(domain) {
  const response = await axios.get(`https://` + domain);
  const parser = new DOMParser();
  const parsedHTML = parser.parseFromString(response.data, "text/html");
  const links = parsedHTML.getElementsByTagName("link");

  let href = "";
  for (const link of links) {
    const rel = link.attributes?.find((a) => a.name === "rel")?.value || "";

    if (rel.includes("icon")) {
      href = link.attributes?.find((a) => a.name === "href")?.value;
    }
  }

  if (href.includes("://")) {
    return href;
  } else {
    return `https://` + domain + href;
  }
}

*/
