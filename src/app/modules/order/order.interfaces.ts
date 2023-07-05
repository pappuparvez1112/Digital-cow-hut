import { Model, Types } from 'mongoose';
import { IUser } from '../User/user.interface';
import { ICow } from '../cows/cow.interfaces';

export type IOrders = {
  cow: Types.ObjectId | ICow;
  buyer: Types.ObjectId | IUser;
};

export type OrdersModel = Model<IOrders, Record<string, unknown>>;

// export type IAcademicDepartmentFilters = {
//   searchTerm?: string;
//   academicFaculty?: Types.ObjectId;
// };
