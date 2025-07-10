// 📁 pages/api/comments/user.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import { getCommentsByUser } from "@/api/services/commentService";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getServerSession(req, res, authOptions);
  if (!session) return res.status(401).json({ message: "Jo i kyçur" });

  if (req.method === "GET") {
    try {
      const comments = await getCommentsByUser(session.user.id);
      return res.status(200).json({ comments });
    } catch (err) {
      return res.status(500).json({ message: "Gabim gjatë marrjes së komenteve" });
    }
  }

  return res.status(405).json({ message: "Metodë jo e lejuar" });
}
