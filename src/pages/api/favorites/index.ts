import dbConnect from "@/lib/mongoose";
import Favorite from "@/api/models/Favorites";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(req: any, res: any) {
  await dbConnect();
  const session = await getServerSession(req, res, authOptions);
  if (!session) return res.status(401).json({ message: "Jo i autorizuar" });

  if (req.method === "POST") {
    const { bookId } = req.body;
    const userId = session.user.id;

    const existing = await Favorite.findOne({ user: userId, book: bookId });

    if (existing) {
      await Favorite.findByIdAndDelete(existing._id);
      return res.status(200).json({ success: true, message: "U hoq nga të preferuarat" });
    } else {
      await Favorite.create({ user: userId, book: bookId });
      return res.status(201).json({ success: true, message: "U shtua në të preferuarat" });
    }
  }

  return res.status(405).json({ message: "Metoda nuk lejohet" });
}
