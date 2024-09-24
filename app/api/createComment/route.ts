import type { NextApiRequest, NextApiResponse } from "next";
import { createClient } from "@sanity/client";

const config = {
  dataset: process.env.NEXT_PUBLIC_SANITY_CLIENT,
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  useCdn: process.env.NODE_ENV === "production",
  token: process.env.SANITY_API_TOKEN,
};

const client = createClient(config);

export async function POST(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { _id, name, email, comment } = JSON.parse(req.body);
  try {
    await client.create({
      _type: "comment",
      postId: {
        _type: "refrence",
        _ref: _id,
      },
      name,
      email,
      comment,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Couldn't submit comment",
      err,
    });
  }
  res.status(200).json({ message: "Comment Submited" });
  console.log("Comment submitted");
}


