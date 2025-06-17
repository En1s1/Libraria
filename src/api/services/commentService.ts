import Comment from '../models/Comment';
import { CommentType } from '../types/Comment'; // sigurohu që e ke këtë

export const getAllComments = () =>
  Comment.find().populate('user').populate('book');

export const createComment = (data: CommentType) =>
  Comment.create(data);

export const deleteComment = (id: string) =>
  Comment.findByIdAndDelete(id);
