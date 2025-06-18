import Book from '../models/Book';
import { BookType } from '../types/Book';

export const getAllBooks = () => Book.find();

export const getBookById = (id: string) =>
  Book.findById(id);

export const createBook = (data: BookType) =>
  Book.create(data);

export const updateBook = (id: string, data: Partial<BookType>) =>
  Book.findByIdAndUpdate(id, data, { new: true });

export const deleteBook = (id: string) =>
  Book.findByIdAndDelete(id);
