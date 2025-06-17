export interface OrderType {
  _id?: string;
  user: string;              // ID e përdoruesit
  books: string[];           // Array me ID të librave
  totalPrice?: number;
  status?: 'pending' | 'completed' | 'cancelled';
  createdAt?: Date;
}