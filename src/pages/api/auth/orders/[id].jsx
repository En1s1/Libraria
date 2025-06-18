import dbConnect from '../../../lib/mongodb';
import Order from '../../../models/Order';

export default async function handler(req, res) {
  const { id } = req.query;
  await dbConnect();

  if (req.method === 'GET') {
    const order = await Order.findById(id);
    return res.status(200).json(order);
  }

  if (req.method === 'DELETE') {
    await Order.findByIdAndDelete(id);
    return res.status(204).end();
  }

  res.status(405).json({ error: 'Method not allowed' });
}
