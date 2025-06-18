import { getToken } from "next-auth/jwt";
import clientPromise from "@/lib/mongoose";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const token = await getToken({ req });
  if (!token) return res.status(401).json({ message: "Not authenticated" });

  const client = await clientPromise;
  const db = client.db("bibliotekaOnlineDB");

  const user = await db.collection("users").findOne({ email: token.email });

  if (!user) return res.status(404).json({ message: "User not found" });

  res.status(200).json({ profileImage: user.profileImage || null });
}

