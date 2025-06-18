import dbConnect from '../../../lib/mongoose';
import Book from "../../../api/models/Book"; 

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === 'GET') {
    const books = await Book.find();
    return res.status(200).json(books);
  }

  if (req.method === 'POST') {
    const newBook = await Book.create(req.body);
    return res.status(201).json(newBook);
  }

  res.status(405).json({ error: 'Method not allowed' });
}
