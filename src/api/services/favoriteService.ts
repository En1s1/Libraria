import axios from "axios";
import { Favorite } from "@/api/types/Favorites";

export const getUserFavorites = async (): Promise<Favorite[]> => {
  const res = await axios.get("/api/favorites/user");
  return res.data;
};

export const toggleFavorite = async (bookId: string): Promise<{ success: boolean }> => {
  const res = await axios.post("/api/favorites/toggle", { bookId });
  return res.data;
};
