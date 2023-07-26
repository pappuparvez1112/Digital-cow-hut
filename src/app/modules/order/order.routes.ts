import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { OrdersController } from './order.controller';
import { OrdersValidation } from './order.validations';

const router = express.Router();

router.post(
  '/',
  auth(ENUM_USER_ROLE.BUYER),
  validateRequest(OrdersValidation.createOrdersZodSchema),
  OrdersController.createOrders,
);
router.get('/', auth(ENUM_USER_ROLE.ADMIN), OrdersController.getAllOrders);

// router.get('/:id', AcademicDepartmentController.getSingleDepartment);

// router.patch(
//   '/:id',
//   validateRequest(
//     AcademicDepartmentValidation.updateAcademicDepartmentZodSchema,
//   ),
//   AcademicDepartmentController.updateDepartment,
// );

// router.delete('/:id', AcademicDepartmentController.deleteDepartment);

// router.get('/', AcademicDepartmentController.getAllDepartments);

export const OrdersRoutes = router;
