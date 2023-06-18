import { Request, Response } from 'express';

import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { IUser } from './user.interface';
import { UserService } from './user.service';

const createUser = catchAsync(async (req: Request, res: Response) => {
  const { ...userData } = req.body;
  const result = await UserService.createUser(userData);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Semester is created successfully',
    data: result,
  });
});
const getAllUsers = catchAsync(async (req: Request, res: Response) => {
  // const filters = pick(req.query, academicSemesterFilterableFields);
  // const paginationOptions = pick(req.query, paginationFields);

  const result = await UserService
    .getAllUsers
    // filters,
    // paginationOptions,
    ();
  sendResponse<IUser[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User retrieved successfully',
    // meta: result.meta,
    data: result,
  });
});

// const getSingleSemester = catchAsync(async (req: Request, res: Response) => {
//   const id = req.params.id;
//   const result = await AcademicSemesterService.getSingleSemester(id);

//   sendResponse<IAcademicSemester>(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: 'Semester retrieved successfully',
//     data: result,
//   });
// });

export const UserController = {
  createUser,
  getAllUsers,
};
