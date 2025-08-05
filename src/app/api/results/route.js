import { Result } from "@/models/Results";
import axios from "axios";

export async function POST(req) {
  try {
    const { response_id } = await req.json();

    if (!response_id) {
      return new Response(JSON.stringify({ error: "Missing response_id" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const url = `https://api.brightdata.com/serp/get_result?output=json&customer=hl_0342ed83&zone=rankbitt&response_id=${response_id}`;

    const headers = {
      Authorization: `Bearer ${process.env.BRIGHTDATA_API_KEY}`,
    };

    const res = await axios.get(url, { headers });

    const ourResultDoc = await Result.findOne({
      brightDataResponseId: response_id,
    });

    const domain = ourResultDoc.domain;
    const keyword = ourResultDoc.keyword;

    const rank = res?.data?.organic?.find((result) =>
      result.link.includes(domain)
    )?.rank;

    if (rank) {
      ourResultDoc.rank = rank;
      console.log(
        `Rank ${rank} saved for keyword ${keyword} and domain ${domain}`
      );

      await ourResultDoc.save();
    }

    return new Response(JSON.stringify(res.data), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error(
      "BrightData request failed:",
      error.response?.data || error.message
    );

    return new Response(
      JSON.stringify({
        error: "BrightData request failed",
        detail: error.response?.data || error.message,
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
