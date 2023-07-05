import { IOrders } from './order.interfaces';
import { Orders } from './order.model';

// const getAllDepartments = async (
//   filters: IAcademicDepartmentFilters,
//   paginationOptions: IPaginationOptions,
// ): Promise<IGenericResponse<IAcademicDepartment[]>> => {
//   const { limit, page, skip, sortBy, sortOrder } =
//     paginationHelper.calculatePagination(paginationOptions);

//   const { searchTerm, ...filtersData } = filters;

//   const andConditions = [];

//   if (searchTerm) {
//     andConditions.push({
//       $or: academicDepartmentSearchableFields.map(field => ({
//         [field]: {
//           $regex: searchTerm,
//           $paginationOptions: 'i',
//         },
//       })),
//     });
//   }

//   if (Object.keys(filtersData).length) {
//     andConditions.push({
//       $and: Object.entries(filtersData).map(([field, value]) => ({
//         [field]: value,
//       })),
//     });
//   }

//   const sortConditions: { [key: string]: SortOrder } = {};

//   if (sortBy && sortOrder) {
//     sortConditions[sortBy] = sortOrder;
//   }
//   const whereConditions =
//     andConditions.length > 0 ? { $and: andConditions } : {};

//   const result = await AcademicDepartment.find(whereConditions)
//     .populate('academicFaculty')
//     .sort(sortConditions)
//     .skip(skip)
//     .limit(limit);

//   const total = await AcademicDepartment.countDocuments();

//   return {
//     meta: {
//       page,
//       limit,
//       total,
//     },
//     data: result,
//   };
// };

const createOrders = async (payload: IOrders): Promise<IOrders | null> => {
  const result = await Orders.create(payload);
  return result;
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
};