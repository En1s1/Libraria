export interface Comment {
  _id: string;
  content: string;
  createdAt: string;
  book: {
    _id: string;
    title: string;
  };
}
