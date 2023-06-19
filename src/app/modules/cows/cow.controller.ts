import { Request, Response } from 'express';
import httpStatus from 'http-status';

import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { ICow } from './cow.interfaces';
import { CowService } from './cow.service';

const createCow = catchAsync(async (req: Request, res: Response) => {
  const { ...cowData } = req.body;
  const result = await CowService.createCow(cowData);
  sendResponse<ICow>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Cow field created successfully',
    data: result,
  });
});

const getAllCows = catchAsync(async (req: Request, res: Response) => {
  // const filters = pick(req.query, academicFacultyFilterableFields);
  // const paginationOptions = pick(req.query, paginationFields);

  const result = await CowService
    .getAllCows
    // filters,
    // paginationOptions,
    ();

  sendResponse<ICow[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All Cows retrieved successfully',
    // meta: result.meta,
    data: result,
  });
});

// const getSingleFaculty = catchAsync(async (req: Request, res: Response) => {
//   const { id } = req.params;
//   const result = await AcademicFacultyService.getSingleFaculty(id);

//   sendResponse<IAcademicFaculty>(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: 'Academic Faculty fetched successfully',
//     data: result,
//   });
// });

// const updateFaculty = catchAsync(
//   catchAsync(async (req: Request, res: Response) => {
//     const { id } = req.params;
//     const updatedData = req.body;
//     const result = await AcademicFacultyService.updateFaculty(id, updatedData);

//     sendResponse<IAcademicFaculty>(res, {
//       statusCode: httpStatus.OK,
//       success: true,
//       message: 'Academic Faculty updated successfully',
//       data: result,
//     });
//   }),
// );

// const deleteFaculty = catchAsync(async (req: Request, res: Response) => {
//   const { id } = req.params;
//   const result = await AcademicFacultyService.deleteByIdFromDB(id);

//   sendResponse<IAcademicFaculty>(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: 'Academic Faculty deleted successfully',
//     data: result,
//   });
// });

export const CowController = {
  createCow,
  getAllCows,
};
