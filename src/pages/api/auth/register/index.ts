import { hash } from "bcryptjs";
import dbConnect from "@/lib/mongoose";
import  User from "@/api/models/User"
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).end();

  const { name, email, password, role } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: "Të gjitha fushat janë të detyrueshme" });
  }

  try {
    await dbConnect();

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Ky email është i regjistruar" });
    }

    const hashedPassword = await hash(password, 10);

    await User.create({
      name,
      email,
      password: hashedPassword,
      role: role || "user",
    });

    res.status(201).json({ message: "Regjistrimi u krye me sukses" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Gabim në server" });
  }
}

