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
// OrdersSchema.statics.isUserExist = async function (
//   id: string,
// ): Promise<Pick<IOrders, 'buyer' | 'cow'> | null> {
//   // console.log(phoneNumber, 'phoneNumber');
//   return await Orders.findOne({ id }, { cow: 1, buyer: '1' });
// };

export const Orders = model<IOrders, OrdersModel>('Orders', OrdersSchema);
