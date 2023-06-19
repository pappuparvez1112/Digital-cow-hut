import { ICow } from './cow.interfaces';
import { Cow } from './cow.model';

const createCow = async (payload: ICow): Promise<ICow | null> => {
  const result = await Cow.create(payload);
  return result;
};
const getAllCows = async (): Promise<ICow[]> => {
  const cows = await Cow.find();
  return cows;
};
// const getAllCows = async (
//   filters: IAcademicFacultyFilters,
//   paginationOptions: IPaginationOptions,
// ): Promise<IGenericResponse<IAcademicFaculty[]>> => {
//   const { searchTerm, ...filtersData } = filters;
//   const { page, limit, skip, sortBy, sortOrder } =
//     paginationHelper.calculatePagination(paginationOptions);

//   const andConditions = [];

//   if (searchTerm) {
//     andConditions.push({
//       $or: academicFacultySearchableFields.map(field => ({
//         [field]: {
//           $regex: searchTerm,
//           $options: 'i',
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

//   const result = await AcademicFaculty.find(whereConditions)
//     .sort(sortConditions)
//     .skip(skip)
//     .limit(limit);

//   const total = await AcademicFaculty.countDocuments();

//   return {
//     meta: {
//       page,
//       limit,
//       total,
//     },
//     data: result,
//   };
// };

// const getSingleFaculty = async (
//   id: string,
// ): Promise<IAcademicFaculty | null> => {
//   const result = await AcademicFaculty.findById(id);
//   return result;
// };

// const updateFaculty = async (
//   id: string,
//   payload: Partial<IAcademicFaculty>,
// ): Promise<IAcademicFaculty | null> => {
//   const result = await AcademicFaculty.findOneAndUpdate({ _id: id }, payload, {
//     new: true,
//   });
//   return result;
// };

// const deleteByIdFromDB = async (
//   id: string,
// ): Promise<IAcademicFaculty | null> => {
//   const result = await AcademicFaculty.findByIdAndDelete(id);
//   return result;
// };

export const CowService = {
  createCow,
  getAllCows,
};
