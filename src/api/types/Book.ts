export interface BookType {
  _id?: string;
  title: string;
  author: string;
  description?: string;
  price: number;
  category?: string;
  coverImage?: string;     // URL e imazhit
  createdAt?: Date;
}
