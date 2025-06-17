import mongoose from 'mongoose';

const CommentSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  book: { type: mongoose.Schema.Types.ObjectId, ref: 'Book' },
  content: String,
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Comment || mongoose.model('Comment', CommentSchema);