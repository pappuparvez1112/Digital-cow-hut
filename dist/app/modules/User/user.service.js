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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const user_model_1 = require("./user.model");
const createUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.User.create(payload);
    return result;
});
const getAllUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield user_model_1.User.find();
    return users;
    // const { searchTerm, ...filtersData } = filters;
    // const andConditions = [];
    // if (searchTerm) {
    //   andConditions.push({
    //     $or: academicSemesterSearchableFields.map(field => ({
    //       [field]: {
    //         $regex: searchTerm,
    //         $options: 'i',
    //       },
    //     })),
    //   });
    // }
    // if (Object.keys(filtersData).length) {
    //   andConditions.push({
    //     $and: Object.entries(filtersData).map(([field, value]) => ({
    //       [field]: value,
    //     })),
    //   });
    // }
    // // const andConditions = [
    // //   {
    // //     $or: [
    // //       {
    // //         title: {
    // //           $regex: searchTerm,
    // //           $options: 'i',
    // //         },
    // //       },
    // //       {
    // //         code: {
    // //           $regex: searchTerm,
    // //           $options: 'i',
    // //         },
    // //       },
    // //       {
    // //         year: {
    // //           $regex: searchTerm,
    // //           $options: 'i',
    // //         },
    // //       },
    // //     ],
    // //   },
    // // ];
    // const { page, limit, skip, sortBy, sortOrder } =
    //   paginationHelper.calculatePagination(paginationOptions);
    // const sortConditions: { [key: string]: SortOrder } = {};
    // if (sortBy && sortOrder) {
    //   sortConditions[sortBy] = sortOrder;
    // }
    // const whereCondition =
    //   andConditions.length > 0 ? { $and: andConditions } : {};
    // const result = await AcademicSemester.find(whereCondition)
    //   .sort(sortConditions)
    //   .skip(skip)
    //   .limit(limit);
    // const total = await AcademicSemester.countDocuments();
    // return {
    //   meta: {
    //     page,
    //     limit,
    //     total,
    //   },
    //   data: result,
    // };
});
const getSingleUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.User.findById(id);
    return result;
});
const updateUser = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    if (!payload.role) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Invalid User role');
    }
    const result = yield user_model_1.User.findOneAndUpdate({ _id: id }, payload, {
        new: true,
    });
    return result;
});
const deleteUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.User.findByIdAndDelete(id);
    return result;
});
exports.UserService = {
    createUser,
    getAllUsers,
    getSingleUser,
    updateUser,
    deleteUser,
};
