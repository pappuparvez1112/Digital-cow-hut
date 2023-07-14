import { SortOrder } from 'mongoose';
import { paginationHelper } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { ICowFilters } from '../cows/cow.interfaces';
import { orderSearchableFields } from './order.constants';
import { IOrders } from './order.interfaces';
import { Orders } from './order.model';

const createOrders = async (payload: IOrders): Promise<IOrders | null> => {
  const result = (
    await (await Orders.create(payload)).populate('cow')
  ).populate('buyer');
  return result;
};
const getAllOrders = async (
  filters: ICowFilters,
  paginationOptions: IPaginationOptions,
): Promise<IGenericResponse<IOrders[]>> => {
  const { searchTerm, ...filtersData } = filters;
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelper.calculatePagination(paginationOptions);

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      $or: orderSearchableFields.map(field => ({
        [field]: {
          $regex: searchTerm,
          $options: 'i',
        },
      })),
    });
  }

  if (Object.keys(filtersData).length) {
    andConditions.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }

  const sortConditions: { [key: string]: SortOrder } = {};

  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }
  const whereConditions =
    andConditions.length > 0 ? { $and: andConditions } : {};

  const result = await Orders.find(whereConditions)
    .populate('cow')
    .populate('buyer')
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  const total = await Orders.countDocuments();

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

// const getSingleDepartment = async (
//   id: string,
// ): Promise<IAcademicDepartment | null> => {
//   const result = await AcademicDepartment.findById(id).populate(
//     'academicFaculty',
//   );
//   return result;
// };

// const updateDepartment = async (
//   id: string,
//   payload: Partial<IAcademicDepartment>,
// ): Promise<IAcademicDepartment | null> => {
//   const result = await AcademicDepartment.findOneAndUpdate(
//     { _id: id },
//     payload,
//     {
//       new: true,
//     },
//   ).populate('academicFaculty');
//   return result;
// };

// const deleteDepartment = async (
//   id: string,
// ): Promise<IAcademicDepartment | null> => {
//   const result = await AcademicDepartment.findByIdAndDelete(id);
//   return result;
// };

export const OrdersService = {
  // getAllDepartments,
  // getSingleDepartment,
  // updateDepartment,
  // deleteDepartment,
  createOrders,
  getAllOrders,
};
