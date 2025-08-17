import mongoose from "mongoose";

const FavoriteSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  book: { type: mongoose.Schema.Types.ObjectId, ref: "Book", required: true },
});

export default mongoose.models.Favorite || mongoose.model("Favorite", FavoriteSchema);
