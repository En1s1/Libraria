import dbConnect from "@/lib/mongoose";
import Comment from "@/api/models/Comment";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(req: any, res: any) {
  await dbConnect();
  const session = await getServerSession(req, res, authOptions);
  if (!session) return res.status(401).json({ message: "Jo i autorizuar" });

  if (req.method === "POST") {
    const { book, content } = req.body;
    const newComment = await Comment.create({
      user: session.user.id,
      book,
      content,
    });
    return res.status(201).json(newComment);
  }

  if (req.method === "GET") {
    const comments = await Comment.find({})
      .populate("user", "name email")
      .populate("book", "title");
    return res.status(200).json(comments);
  }

  res.status(405).json({ message: "Metoda nuk lejohet" });
}
