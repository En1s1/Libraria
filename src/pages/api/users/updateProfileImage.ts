// pages/api/users/updateProfileImage.ts
import { getToken } from "next-auth/jwt";
import dbConnect from "@/lib/mongoose";
import User from "@/api/models/User"; // sigurohu qe kjo rrugë është e saktë
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const token = await getToken({ req });
  if (!token) return res.status(401).json({ message: "Jo i autorizuar" });

  const { imageUrl } = req.body;
  if (!imageUrl) {
    return res.status(400).json({ message: "URL e imazhit mungon" });
  }

  await dbConnect();

  const updatedUser = await User.findOneAndUpdate(
    { email: token.email },
    { $set: { profileImage: imageUrl } },
    { new: true }
  );

  if (!updatedUser) {
    return res.status(404).json({ message: "Përdoruesi nuk u gjet" });
  }

  res.status(200).json({ message: "Imazhi u ruajt me sukses" });
}
