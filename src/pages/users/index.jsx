import dbConnect from '../../../lib/mongodb';
import User from '../../../models/User';

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === 'GET') {
    const users = await User.find();
    return res.status(200).json(users);
  }

  res.status(405).json({ error: 'Method not allowed' });
}
