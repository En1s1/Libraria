// 📁 src/services/commentService.ts
import dbConnect from "@/lib/mongoose";
import Comment from "@/api/models/Comment";

export async function getCommentsByUser(userId: string) {
  await dbConnect();
  const comments = await Comment.find({ user: userId })
    .populate("book", "title")  // vetem titulli i librit
    .sort({ createdAt: -1 });   // komentet më të reja të parat

  return comments;
}
