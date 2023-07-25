import { IAdminRole } from './admin.interface';

export const adminFilterableFields = ['searchTerm', 'id'];

export const adminSearchableFields = [
  'contactNo',
  'emergencyContactNo',
  'name.firstName',
  'name.lastName',
  'name.middleName',
];
export const AdminRole: IAdminRole[] = ['Admin'];
