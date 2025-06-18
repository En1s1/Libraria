import dbConnect from '../../../lib/mongodb';
import User from '../../../models/User';

export default async function handler(req, res) {
  const { id } = req.query;
  await dbConnect();

  if (req.method === 'GET') {
    const user = await User.findById(id);
    return res.status(200).json(user);
  }

  if (req.method === 'PUT') {
    const updated = await User.findByIdAndUpdate(id, req.body, { new: true });
    return res.status(200).json(updated);
  }

  if (req.method === 'DELETE') {
    await User.findByIdAndDelete(id);
    return res.status(204).end();
  }

  res.status(405).json({ error: 'Method not allowed' });
}
