import dbConnect from '../../../lib/mongodb';
import Order from '../../../models/Order';

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === 'GET') {
    const orders = await Order.find();
    return res.status(200).json(orders);
  }

  if (req.method === 'POST') {
    const newOrder = await Order.create(req.body);
    return res.status(201).json(newOrder);
  }

  res.status(405).json({ error: 'Method not allowed' });
}
