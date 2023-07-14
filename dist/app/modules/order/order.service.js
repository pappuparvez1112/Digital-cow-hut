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
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrdersService = void 0;
const paginationHelper_1 = require("../../../helpers/paginationHelper");
const order_constants_1 = require("./order.constants");
const order_model_1 = require("./order.model");
const createOrders = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = (yield (yield order_model_1.Orders.create(payload)).populate('cow')).populate('buyer');
    return result;
});
const getAllOrders = (filters, paginationOptions) => __awaiter(void 0, void 0, void 0, function* () {
    const { searchTerm } = filters, filtersData = __rest(filters, ["searchTerm"]);
    const { page, limit, skip, sortBy, sortOrder } = paginationHelper_1.paginationHelper.calculatePagination(paginationOptions);
    const andConditions = [];
    if (searchTerm) {
        andConditions.push({
            $or: order_constants_1.orderSearchableFields.map(field => ({
                [field]: {
                    $regex: searchTerm,
                    $options: 'i',
                },
            })),
        });
    }
    if (Object.keys(filtersData).length) {
        andConditions.push({
            $and: Object.entries(filtersData).map(([field, value]) => ({
                [field]: value,
            })),
        });
    }
    const sortConditions = {};
    if (sortBy && sortOrder) {
        sortConditions[sortBy] = sortOrder;
    }
    const whereConditions = andConditions.length > 0 ? { $and: andConditions } : {};
    const result = yield order_model_1.Orders.find(whereConditions)
        .populate('cow')
        .populate('buyer')
        .sort(sortConditions)
        .skip(skip)
        .limit(limit);
    const total = yield order_model_1.Orders.countDocuments();
    return {
        meta: {
            page,
            limit,
            total,
        },
        data: result,
    };
});
// const getSingleDepartment = async (
//   id: string,
// ): Promise<IAcademicDepartment | null> => {
//   const result = await AcademicDepartment.findById(id).populate(
//     'academicFaculty',
//   );
//   return result;
// };
// const updateDepartment = async (
//   id: string,
//   payload: Partial<IAcademicDepartment>,
// ): Promise<IAcademicDepartment | null> => {
//   const result = await AcademicDepartment.findOneAndUpdate(
//     { _id: id },
//     payload,
//     {
//       new: true,
//     },
//   ).populate('academicFaculty');
//   return result;
// };
// const deleteDepartment = async (
//   id: string,
// ): Promise<IAcademicDepartment | null> => {
//   const result = await AcademicDepartment.findByIdAndDelete(id);
//   return result;
// };
exports.OrdersService = {
    // getAllDepartments,
    // getSingleDepartment,
    // updateDepartment,
    // deleteDepartment,
    createOrders,
    getAllOrders,
};
