import dbConnect from '../../../lib/mongodb';
import Comment from '../../../models/Comment';

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === 'GET') {
    const comments = await Comment.find();
    return res.status(200).json(comments);
  }

  if (req.method === 'POST') {
    const newComment = await Comment.create(req.body);
    return res.status(201).json(newComment);
  }

  res.status(405).json({ error: 'Method not allowed' });
}
