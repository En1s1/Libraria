import dbConnect from '../../../lib/mongodb';
import Comment from '../../../models/Comment';

export default async function handler(req, res) {
  const { id } = req.query;
  await dbConnect();

  if (req.method === 'DELETE') {
    await Comment.findByIdAndDelete(id);
    return res.status(204).end();
  }

  if (req.method === 'PUT') {
    const updated = await Comment.findByIdAndUpdate(id, req.body, { new: true });
    return res.status(200).json(updated);
  }

  res.status(405).json({ error: 'Method not allowed' });
}
