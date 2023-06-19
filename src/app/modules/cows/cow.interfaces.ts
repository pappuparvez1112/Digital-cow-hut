import { Model } from 'mongoose';

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
  price: string;
  location: ICowLocation;
  breed: IBreed;
  weight: string;
  label: ILabel;
  category: ICategory;
  seller: string;
};

export type CowModel = Model<ICow, Record<string, unknown>>;

export type ICowFilters = {
  searchTerm?: string;
};
