import dbConnect from '../../../lib/mongoose';
import Book from "../../../api/models/Book"; 

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === "GET") {
    const { q } = req.query;

    const filter = q
      ? { title: { $regex: q, $options: "i" } } // 👈 full-text search
      : {};

    const books = await Book.find(filter).sort({ createdAt: -1 });

    return res.status(200).json(books);
  }

  res.status(405).json({ message: "Method not allowed" });
}
