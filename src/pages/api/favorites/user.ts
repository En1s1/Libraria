import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/lib/mongoose";
import Favorite from "@/api/models/Favorites";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";
import Book from  "@/api/models/Book";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    await dbConnect();
    const session = await getServerSession(req, res, authOptions);

    if (!session) return res.status(401).json({ error: "Not authenticated" });

    const favorites = await Favorite.find({ user: session.user.id }).populate("book");
    return res.status(200).json(favorites);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal server error" });
  }
}
