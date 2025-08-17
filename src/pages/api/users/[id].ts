import dbConnect from "@/lib/mongoose";
import User from "@/api/models/User";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();
  const { id } = req.query;

  if (req.method === "GET") {
    try {
      const user = await User.findById(id);
      if (!user) return res.status(404).json({ message: "User not found" });
      return res.status(200).json(user);
    } catch (error) {
      return res.status(500).json({ message: "Gabim serveri", error });
    }
  }

  res.status(405).json({ error: "Method not allowed" });
}
