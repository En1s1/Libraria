import { NextApiRequest, NextApiResponse } from "next";
import { getUser } from "@/api/services/userService";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") return res.status(405).end();

  const { email } = req.query;

  if (!email || typeof email !== "string")
    return res.status(400).json({ message: "Email mungon ose është i pasaktë" });

  const user = await getUser(email);
  if (!user) return res.status(404).json({ message: "Nuk u gjet përdoruesi" });

  res.status(200).json(user);
}
