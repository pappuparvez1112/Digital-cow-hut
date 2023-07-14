// export const academicFacultyFilterableFields = ['searchTerm', 'title'];

import { IBreed, ICategory, ICowLocation, ILabel } from './cow.interfaces';

export const cowSearchableFields = ['location', 'breed', 'category'];
export const cowFilterableFields = [
  'searchTerm',
  'location',
  'breed',
  'category',
  'minPrice',
  'maxPrice',
];

export const cowLocation: ICowLocation[] = [
  'Dhaka',
  'Chattogram',
  'Barishal',
  'Rajshahi',
  'Sylhet',
  'Comilla',
  'Rangpur',
  'Mymensingh',
];
export const breed: IBreed[] = [
  'Brahman',
  'Nellore',
  'Sahiwal',
  'Gir',
  'Indigenous',
  'Tharparkar',
  'Kankrej',
];
export const label: ILabel[] = ['for sale', 'sold out'];
export const category: ICategory[] = ['Dairy', 'Beef', 'Dual Purpose'];
