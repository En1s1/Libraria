import Order from '../models/Order';
import { OrderType } from '../types/Order'; 

export const getAllOrders = () =>
  Order.find().populate('user').populate('books');

export const createOrder = (data: OrderType) =>
  Order.create(data);

export const getOrderById = (id: string) =>
  Order.findById(id);

export const deleteOrder = (id: string) =>
  Order.findByIdAndDelete(id);

