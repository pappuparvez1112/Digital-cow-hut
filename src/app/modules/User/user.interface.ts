import { Model } from 'mongoose';

// export type IAcademicSemesterMonths =
//   | 'January'
//   | 'February'
//   | 'March'
//   | 'April'
//   | 'May'
//   | 'June'
//   | 'July'
//   | 'August'
//   | 'September'
//   | 'October'
//   | 'November'
//   | 'December';
export type IUserRole = 'Seller' | 'Buyer';

export type IUser = {
  password: string;
  role: IUserRole;
  name: string;
  phoneNumber: string;
  address: string;
  budget: string;
  income: string;
};
export type IAcademicSemesterFilters = {
  searchTerm?: string;
};

export type IUserModel = Model<IUser>;
