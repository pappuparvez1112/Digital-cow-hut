import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { OrdersController } from './order.controller';
import { OrdersValidation } from './order.validations';

const router = express.Router();

router.post(
  '/',
  validateRequest(OrdersValidation.createOrdersZodSchema),
  OrdersController.createOrders,
);
router.get('/', OrdersController.getAllOrders);

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
