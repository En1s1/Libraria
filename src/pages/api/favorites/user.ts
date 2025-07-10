import dbConnect from "@/lib/mongoose";
import Favorite from "@/api/models/Favorites";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(req: any, res: any) {
  await dbConnect();
  const session = await getServerSession(req, res, authOptions);
  if (!session) return res.status(401).json({ message: "Jo i autorizuar" });

  if (req.method === "GET") {
    const favorites = await Favorite.find({ user: session.user.id }).populate("book");
    return res.status(200).json(favorites);
  }

  return res.status(405).json({ message: "Metoda nuk lejohet" });
}
