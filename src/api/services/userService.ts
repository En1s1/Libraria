import dbConnect from "@/lib/mongoose";
import User from "@/api/models/User"; // ose ku e ke Modelin tënd

export async function getAllUsers() {
  await dbConnect();
  return User.find();
}

export async function getUserByEmail(email: string) {
  await dbConnect();
  return User.findOne({ email });
}


export async function createUser(userData: {
  name: string;
  email: string;
  password: string;
  role: string;
}) {
  await dbConnect();
  const newUser = new User(userData);
  await newUser.save();
  return newUser._id;
}

export async function updateUser(id: string, updateData: any) {
  await dbConnect();
  const updated = await User.findByIdAndUpdate(id, updateData, { new: true });
  return !!updated;
}

export async function deleteUser(id: string) {
  await dbConnect();
  const result = await User.findByIdAndDelete(id);
  return !!result;
}

export const getUser = getUserByEmail;
