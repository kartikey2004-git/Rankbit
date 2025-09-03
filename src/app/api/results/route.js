import { Result } from "@/models/Results";
import axios from "axios";
import mongoose from "mongoose";

export async function POST(req) {
  await mongoose.connect(process.env.MONGODB_URI);

  const data = await req.json();
  // console.log(data);

  const response_id = data.response_id;

  // to parse version of the result HTML
  const url = `https://api.brightdata.com/serp/get_result?&output=json&customer=hl_ae9fc608&zone=rankbit&response_id=${response_id}`;

  console.log("Fetching result for:" + response_id);

  const res = await axios.get(url, {
    headers: {
      Authorization: `Bearer ${process.env.BRIGHTDATA_API_KEY}`,
      "Content-Type": "application/json",
    },
  });

  const ourResultDoc = await Result.findOne({
    brightDataResponseId: response_id,
  });

  if (ourResultDoc) {
    const domain = ourResultDoc.domain;
    const keyword = ourResultDoc.keyword;

    const organicData = res.data.organic;

    const rank = organicData.find((result) =>
      result.link.includes(domain)
    )?.rank;

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
}

export async function GET(req) {
  await mongoose.connect(process.env.MONGODB_URI);

  // console.log(req.url);

  // creates a URL object from the request URL and extracts its searchParams.

  // searchParams lets you easily read query parameters. It’s just a shortcut for accessing query strings from the request.

  // console.log(new URL(req.url));

  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  const result = Result.findOne({ brightDataResponseId: id });

  return new Response(JSON.stringify(result), { status: 200 });
}
