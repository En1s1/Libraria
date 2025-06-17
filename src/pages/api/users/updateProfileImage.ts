// pages/api/users/updateProfileImage.ts
import { getToken } from "next-auth/jwt";
import clientPromise from "@/lib/mongoose";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const token = await getToken({ req });
  if (!token) return res.status(401).json({ message: "Jo i autorizuar" });

  const { imageUrl } = req.body;
  const client = await clientPromise;
  const db = client.db("bibliotekaOnlineDB");

  await db.collection("users").updateOne(
    { email: token.email },
    { $set: { profileImage: imageUrl } }
  );

  res.status(200).json({ message: "Imazhi u ruajt me sukses" });
}
