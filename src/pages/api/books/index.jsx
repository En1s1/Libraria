import dbConnect from '../../../lib/mongoose';
import Book from "../../../api/models/Book"; 

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === "GET") {
    const { q } = req.query;

    const filter = q
      ? { title: { $regex: q, $options: "i" } }
      : {};

    const books = await Book.find(filter).sort({ createdAt: -1 });
    return res.status(200).json(books);
  }

  if (req.method === "POST") {
    try {
      const { title, price, image, description } = req.body;

      if (!title || !price || !image || !description) {
        return res.status(400).json({ message: "Të gjitha fushat janë të detyrueshme" });
      }

      const newBook = await Book.create({
        title,
        price,
        image,
        description,
      });

      return res.status(201).json({ message: "Libri u shtua me sukses", book: newBook });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Gabim gjatë shtimit të librit" });
    }
  }

  // Nëse metoda nuk është as GET as POST
  res.status(405).json({ message: "Method not allowed" });
}
