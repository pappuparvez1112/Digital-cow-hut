"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrdersController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const pagination_1 = require("../../../constant/pagination");
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const pick_1 = __importDefault(require("../../../shared/pick"));
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const order_constants_1 = require("./order.constants");
const order_service_1 = require("./order.service");
const createOrders = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const ordersData = __rest(req.body, []);
    console.log(ordersData);
    const result = yield order_service_1.OrdersService.createOrders(ordersData);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Orders created successfully',
        data: result,
    });
}));
const getAllOrders = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const filters = (0, pick_1.default)(req.query, order_constants_1.orderFilterableFields);
    const paginationOptions = (0, pick_1.default)(req.query, pagination_1.paginationFields);
    const result = yield order_service_1.OrdersService.getAllOrders(filters, paginationOptions);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Orders fetched successfully',
        meta: result.meta,
        data: result.data,
    });
}));
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
exports.OrdersController = {
    // getAllDepartments,
    // getSingleDepartment,
    // updateDepartment,
    // deleteDepartment,
    createOrders,
    getAllOrders,
};
