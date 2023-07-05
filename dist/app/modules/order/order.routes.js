"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrdersRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const order_controller_1 = require("./order.controller");
const order_validations_1 = require("./order.validations");
const router = express_1.default.Router();
router.post('/', (0, validateRequest_1.default)(order_validations_1.OrdersValidation.createOrdersZodSchema), order_controller_1.OrdersController.createOrders);
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
exports.OrdersRoutes = router;
