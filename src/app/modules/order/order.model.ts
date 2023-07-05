import { Schema, model } from 'mongoose';
import { IOrders, OrdersModel } from './order.interfaces';

const OrdersSchema = new Schema<IOrders, OrdersModel>(
  {
    cow: {
      type: Schema.Types.ObjectId,
      ref: 'Cows',
      required: true,
    },
    buyer: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  },
);

export const Orders = model<IOrders, OrdersModel>('Orders', OrdersSchema);
