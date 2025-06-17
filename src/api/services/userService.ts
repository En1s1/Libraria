 import clientPromise from "@/lib/mongoose";
import { ObjectId } from "mongodb";

export async function getAllUsers() {
  const client = await clientPromise;
  const db = client.db("bibliotekaOnlineDB");
  const users = await db.collection("users").find({}).toArray();
  return users;
}

export async function getUserById(id: string) {
  const client = await clientPromise;
  const db = client.db("bibliotekaOnlineDB");
  const user = await db.collection("users").findOne({ _id: new ObjectId(id) });
  return user;
}

export async function createUser(userData: {
  name: string;
  email: string;
  password: string;
  role: string;
}) {
  const client = await clientPromise;
  const db = client.db("bibliotekaOnlineDB");
  const result = await db.collection("users").insertOne(userData);
  return result.insertedId;
}

export async function updateUser(id: string, updateData: any) {
  const client = await clientPromise;
  const db = client.db("bibliotekaOnlineDB");
  const result = await db.collection("users").updateOne(
    { _id: new ObjectId(id) },
    { $set: updateData }
  );
  return result.modifiedCount > 0;
}

export async function deleteUser(id: string) {
  const client = await clientPromise;
  const db = client.db("bibliotekaOnlineDB");
  const result = await db.collection("users").deleteOne({ _id: new ObjectId(id) });
  return result.deletedCount > 0;
}

 
