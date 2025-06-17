import mongoose from 'mongoose';

const BookSchema = new mongoose.Schema({
  title: String,
  author: String,
  description: String,
  image: String,
  price: Number,
});

export default mongoose.models.Book || mongoose.model('Book', BookSchema);