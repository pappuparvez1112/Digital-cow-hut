import httpStatus from 'http-status';
import { SortOrder } from 'mongoose';
import ApiError from '../../../errors/ApiError';
import { paginationHelper } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { cowSearchableFields } from './cow.constants';
import { ICow, ICowFilters } from './cow.interfaces';
import { Cow } from './cow.model';

const createCow = async (payload: ICow): Promise<ICow | null> => {
  const result = (await Cow.create(payload)).populate('seller');
  return result;
};
// const getAllCows = async (): Promise<ICow[]> => {
//   const cows = await Cow.find();
//   return cows;
// };
const getAllCows = async (
  filters: ICowFilters,
  paginationOptions: IPaginationOptions,
): Promise<IGenericResponse<ICow[]>> => {
  const { searchTerm, ...filtersData } = filters;
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelper.calculatePagination(paginationOptions);

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      $or: cowSearchableFields.map(field => ({
        [field]: {
          $regex: searchTerm,
          $options: 'i',
        },
      })),
    });
  }

  // if (Object.keys(filtersData).length) {
  //   const {maxPrice,minPrice}=filtersData
  //     andConditions.push({
  //       $and: [{ price: { $gte: minPrice } }, { price: { $lte: maxPrice } }],
  //     });
  //   andConditions.push({
  //     $and: Object.entries(filtersData).map(([field, value]) => ({
  //       [field]: value,
  //     })),
  //   });
  // }

  if (Object.keys(filtersData).length) {
    const andConditions = [];
    const { minPrice, maxPrice } = filtersData;

    console.log(filtersData);

    if (minPrice && maxPrice) {
      andConditions.push({
        $and: [{ price: { $gte: minPrice } }, { price: { $lte: maxPrice } }],
      });
    }

    if (Object.keys(filtersData).length) {
      andConditions.push({
        $and: Object.entries(filtersData).map(([field, value]) => ({
          [field]: value,
        })),
      });
    }
  }

  const sortConditions: { [key: string]: SortOrder } = {};

  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }
  const whereConditions =
    andConditions.length > 0 ? { $and: andConditions } : {};

  const result = await Cow.find(whereConditions)
    .populate('seller')
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  const total = await Cow.countDocuments();

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getSingleCow = async (id: string): Promise<ICow | null> => {
  const result = await Cow.findById(id);
  return result;
};

const updateCows = async (
  id: string,
  payload: Partial<ICow>,
): Promise<ICow | null> => {
  if (!payload.label && payload.category && payload.breed && payload.location) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      'Invalid Cow update required label and category',
    );
  }
  const result = await Cow.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return result;
};

const deleteCow = async (id: string): Promise<ICow | null> => {
  const result = await Cow.findByIdAndDelete(id);
  return result;
};

export const CowService = {
  createCow,
  getAllCows,
  getSingleCow,
  updateCows,
  deleteCow,
};
