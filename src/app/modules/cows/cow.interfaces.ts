import { Model, Types } from 'mongoose';
import { IUser } from '../User/user.interface';

export type ICowLocation =
  | 'Dhaka'
  | 'Chattogram'
  | 'Barishal'
  | 'Rajshahi'
  | 'Sylhet'
  | 'Comilla'
  | 'Rangpur'
  | 'Mymensingh';
export type IBreed =
  | 'Brahman'
  | 'Nellore'
  | 'Sahiwal'
  | 'Gir'
  | 'Indigenous'
  | 'Tharparkar'
  | 'Kankrej';
export type ILabel = 'for sale' | 'sold out';
export type ICategory = 'Dairy' | 'Beef' | 'Dual Purpose';
export type ICow = {
  name: string;
  age: string;
  price: number;
  location: ICowLocation;
  breed: IBreed;
  weight: string;
  label: ILabel;
  category: ICategory;
  seller: Types.ObjectId | IUser;
};

export type CowModel = Model<ICow, Record<string, unknown>>;

export type ICowFilters = {
  searchTerm?: string;
  location?: string;
  breed?: string;
  category?: string;
  price?: number;
  maxPrice?: number;
  minPrice?: number;
};
