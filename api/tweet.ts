import { TwitterApi } from "twitter-api-v2";
import type { VercelRequest, VercelResponse } from "@vercel/node";

export default async function handler(
  request: VercelRequest,
  response: VercelResponse
) {
  if (request.method !== "POST") {
    return response.status(405).json({ error: "Method Not Allowed" });
  }

  const { title, date, url } = request.body;

  if (!title || !url) {
    return response.status(400).json({ error: "Missing title or url" });
  }

  const appKey = process.env.X_API_KEY;
  const appSecret = process.env.X_API_KEY_SECRET;
  const accessToken = process.env.X_ACCESS_TOKEN;
  const accessSecret = process.env.X_ACCESS_TOKEN_SECRET;

  if (!appKey || !appSecret || !accessToken || !accessSecret) {
    console.error("Missing Twitter API keys");
    return response.status(500).json({ error: "Server configuration error" });
  }

  const client = new TwitterApi({
    appKey,
    appSecret,
    accessToken,
    accessSecret,
  });

  try {
    // Construct tweet text
    // "Title (Date) URL"
    const tweetText = `${title}\n${date}\n${url}`;

    // Post tweet
    const result = await client.v2.tweet(tweetText);

    return response.status(200).json({ success: true, data: result });
  } catch (error: any) {
    console.error("Twitter API Error:", error);
    return response
      .status(500)
      .json({ error: "Failed to tweet", details: error.message });
  }
}
