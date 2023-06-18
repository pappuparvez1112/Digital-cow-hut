import { IUser } from './user.interface';
import { User } from './user.model';

const createUser = async (payload: IUser): Promise<IUser> => {
  const result = await User.create(payload);
  return result;
};

const getAllUsers = async (): // filters: IAcademicSemesterFilters,
// paginationOptions: IPaginationOptions,
Promise<IUser[]> => {
  const users = await User.find();
  return users;
  // const { searchTerm, ...filtersData } = filters;

  // const andConditions = [];

  // if (searchTerm) {
  //   andConditions.push({
  //     $or: academicSemesterSearchableFields.map(field => ({
  //       [field]: {
  //         $regex: searchTerm,
  //         $options: 'i',
  //       },
  //     })),
  //   });
  // }
  // if (Object.keys(filtersData).length) {
  //   andConditions.push({
  //     $and: Object.entries(filtersData).map(([field, value]) => ({
  //       [field]: value,
  //     })),
  //   });
  // }
  // // const andConditions = [
  // //   {
  // //     $or: [
  // //       {
  // //         title: {
  // //           $regex: searchTerm,
  // //           $options: 'i',
  // //         },
  // //       },
  // //       {
  // //         code: {
  // //           $regex: searchTerm,
  // //           $options: 'i',
  // //         },
  // //       },
  // //       {
  // //         year: {
  // //           $regex: searchTerm,
  // //           $options: 'i',
  // //         },
  // //       },
  // //     ],
  // //   },
  // // ];
  // const { page, limit, skip, sortBy, sortOrder } =
  //   paginationHelper.calculatePagination(paginationOptions);

  // const sortConditions: { [key: string]: SortOrder } = {};
  // if (sortBy && sortOrder) {
  //   sortConditions[sortBy] = sortOrder;
  // }

  // const whereCondition =
  //   andConditions.length > 0 ? { $and: andConditions } : {};
  // const result = await AcademicSemester.find(whereCondition)
  //   .sort(sortConditions)
  //   .skip(skip)
  //   .limit(limit);
  // const total = await AcademicSemester.countDocuments();
  // return {
  //   meta: {
  //     page,
  //     limit,
  //     total,
  //   },
  //   data: result,
  // };
};

// const getSingleSemester = async (
//   id: string,
// ): Promise<IAcademicSemester | null> => {
//   const result = await AcademicSemester.findById(id);
//   return result;
// };

export const UserService = {
  createUser,
  getAllUsers,
};
