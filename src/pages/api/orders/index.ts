// pages/api/orders/index.ts

import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../lib/mongoose";
import Order from "../../../api/models/Order";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await dbConnect();

  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    return res.status(401).json({ message: "Jo i autorizuar" });
  }

  if (req.method === "GET") {
    const role = session.user.role;
    let orders;

    if (role === "admin") {
      orders = await Order.find({})
        .populate("books")
        .populate("userId", "email");
    } else {
      orders = await Order.find({ userId: session.user.id }).populate("books");
    }

    return res.status(200).json(orders);
  }

  if (req.method === "POST") {
    const { books, total } = req.body;

    try {
      const newOrder = await Order.create({
        userId: session.user.id,
        books,
        total,
      });

      return res.status(201).json(newOrder);
    } catch (error) {
      console.error("Gabim gjatë krijimit të porosisë:", error);
      return res.status(500).json({ message: "Gabim gjatë krijimit të porosisë" });
    }
  }

  return res.status(405).json({ message: "Metoda nuk lejohet" });
}
