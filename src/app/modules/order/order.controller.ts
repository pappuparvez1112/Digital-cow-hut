import { Request, Response } from 'express';
import httpStatus from 'http-status';

import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { IOrders } from './order.interfaces';
import { OrdersService } from './order.service';

const createOrders = catchAsync(async (req: Request, res: Response) => {
  const { ...ordersData } = req.body;
  console.log(ordersData);
  const result = await OrdersService.createOrders(ordersData);

  sendResponse<IOrders>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Orders created successfully',
    data: result,
  });
});

// const getAllDepartments = catchAsync(async (req: Request, res: Response) => {
//   const filters = pick(req.query, academicDepartmentFilterableFields);
//   const paginationOptions = pick(req.query, paginationFields);

//   const result = await AcademicDepartmentService.getAllDepartments(
//     filters,
//     paginationOptions,
//   );

//   sendResponse<IAcademicDepartment[]>(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: 'Academic departments fetched successfully',
//     meta: result.meta,
//     data: result.data,
//   });
// });

// const getSingleDepartment = catchAsync(async (req: Request, res: Response) => {
//   const { id } = req.params;
//   const result = await AcademicDepartmentService.getSingleDepartment(id);

//   sendResponse<IAcademicDepartment>(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: 'Academic Department fetched successfully',
//     data: result,
//   });
// });

// const updateDepartment = catchAsync(async (req: Request, res: Response) => {
//   const { id } = req.params;
//   const result = await AcademicDepartmentService.updateDepartment(id, req.body);

//   sendResponse<IAcademicDepartment>(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: 'Academic Department updated successfully',
//     data: result,
//   });
// });

// const deleteDepartment = catchAsync(async (req: Request, res: Response) => {
//   const { id } = req.params;
//   const result = await AcademicDepartmentService.deleteDepartment(id);

//   sendResponse<IAcademicDepartment>(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: 'Academic Department deleted successfully',
//     data: result,
//   });
// });

export const OrdersController = {
  // getAllDepartments,
  // getSingleDepartment,
  // updateDepartment,
  // deleteDepartment,
  createOrders,
};
