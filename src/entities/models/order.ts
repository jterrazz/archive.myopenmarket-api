import mongoose, { Document, Schema } from 'mongoose';
import { UserInterface } from '~/entities/models/user';

export enum OrderStatus {
  cancelled = 'cancelled',
  completed = 'completed',
  waitingForMerchant = 'waitingForMerchant',
}

export interface OrderInterface extends Document {
  buyer: UserInterface;
  product: string;
  price: number;
  status: OrderStatus;
}

const OrderSchema: Schema = new Schema({
  buyer: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  product: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
  price: { type: Number, required: true },
  status: { type: OrderStatus, required: true },
  delivery: {
    address: { type: String, required: true }, // TODO Maybe use array
  },
});

const Order = mongoose.model<OrderInterface>('Order', OrderSchema);

export default Order;
