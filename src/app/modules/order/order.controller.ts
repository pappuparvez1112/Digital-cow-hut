import { Request, Response } from 'express';
import httpStatus from 'http-status';

import { paginationFields } from '../../../constant/pagination';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { orderFilterableFields } from './order.constants';
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

const getAllOrders = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, orderFilterableFields);
  const paginationOptions = pick(req.query, paginationFields);

  const result = await OrdersService.getAllOrders(filters, paginationOptions);

  sendResponse<IOrders[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Orders fetched successfully',
    meta: result.meta,
    data: result.data,
  });
});

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
  getAllOrders,
};
