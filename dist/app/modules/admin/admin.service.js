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
exports.AdminService = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
const bcrypt_1 = __importDefault(require("bcrypt"));
const http_status_1 = __importDefault(require("http-status"));
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = __importDefault(require("../../../config"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const jwtHelper_1 = require("../../../helpers/jwtHelper");
const paginationHelper_1 = require("../../../helpers/paginationHelper");
const user_utils_1 = require("../User/user.utils");
const admin_constant_1 = require("./admin.constant");
const admin_model_1 = require("./admin.model");
const createAdmin = (admin) => __awaiter(void 0, void 0, void 0, function* () {
    //generate user id
    admin.password = yield bcrypt_1.default.hash(admin.password, Number(config_1.default.bcrypt_salt_rounds));
    // console.log(admin.password);
    let newUserAllData = null;
    const session = yield mongoose_1.default.startSession();
    try {
        session.startTransaction();
        const id = yield (0, user_utils_1.generateAdminId)();
        admin.id = id;
        const newUser = yield admin_model_1.Admin.create([admin], { session });
        if (!newUser.length) {
            throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Failed to create User');
        }
        newUserAllData = newUser[0];
        yield session.commitTransaction();
        yield session.endSession();
    }
    catch (error) {
        yield session.abortTransaction();
        yield session.endSession();
        throw error;
    }
    if (newUserAllData) {
        newUserAllData = yield admin_model_1.Admin.findOne({ id: newUserAllData.id });
    }
    return newUserAllData;
});
const loginAdmin = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { phoneNumber, password } = payload;
    //**** access to our static method */
    const isUserExist = yield admin_model_1.Admin.isUserExist(phoneNumber);
    console.log(isUserExist);
    if (!isUserExist) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'User does not exist');
    }
    const PasswordMatched = yield admin_model_1.Admin.isPasswordMatched(password, isUserExist.password);
    if (!PasswordMatched) {
        throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, 'Password is incorrect');
    }
    //create access token & refresh token
    const { phoneNumber: adminPhoneNumber, role } = isUserExist;
    const accessToken = jwtHelper_1.jwtHelpers.createToken({ adminPhoneNumber, role }, config_1.default.jwt.secret, config_1.default.jwt.expires_in);
    const refreshToken = jwtHelper_1.jwtHelpers.createToken({ adminPhoneNumber, role }, config_1.default.jwt.refresh_secret, config_1.default.jwt.expires_in);
    // console.log({
    //   accessToken,
    //   refreshToken,
    // });
    return {
        accessToken,
        refreshToken,
    };
});
const refreshToken = (token) => __awaiter(void 0, void 0, void 0, function* () {
    // console.log(token);
    //verify token
    // invalid token - synchronous
    let verifiedToken = null;
    try {
        verifiedToken = jwtHelper_1.jwtHelpers.verifyToken(token, config_1.default.jwt.refresh_secret);
    }
    catch (err) {
        throw new ApiError_1.default(http_status_1.default.FORBIDDEN, 'Invalid Refresh Token');
    }
    const { adminPhoneNumber } = verifiedToken;
    // console.log(adminPhoneNumber, 'AdminId', verifiedToken);
    // user delete hoice kintu  refresh token ase
    // checking deleted user's refresh token
    const isUserExist = yield admin_model_1.Admin.isUserExist(adminPhoneNumber);
    console.log(isUserExist);
    if (!isUserExist) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'User does not exist');
    }
    //generate new token
    const newAccessToken = jwtHelper_1.jwtHelpers.createToken({
        id: isUserExist.id,
        role: isUserExist.role,
    }, config_1.default.jwt.secret, config_1.default.jwt.expires_in);
    console.log(newAccessToken);
    return {
        accessToken: newAccessToken,
    };
});
const getSingleAdmin = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield admin_model_1.Admin.findOne({ id });
    return result;
});
const getAllAdmins = (filters, paginationOptions) => __awaiter(void 0, void 0, void 0, function* () {
    // Extract searchTerm to implement search query
    const { searchTerm } = filters, filtersData = __rest(filters, ["searchTerm"]);
    const { page, limit, skip, sortBy, sortOrder } = paginationHelper_1.paginationHelper.calculatePagination(paginationOptions);
    const andConditions = [];
    // Search needs $or for searching in specified fields
    if (searchTerm) {
        andConditions.push({
            $or: admin_constant_1.adminSearchableFields.map(field => ({
                [field]: {
                    $regex: searchTerm,
                    $options: 'i',
                },
            })),
        });
    }
    // Filters needs $and to fullfill all the conditions
    if (Object.keys(filtersData).length) {
        andConditions.push({
            $and: Object.entries(filtersData).map(([field, value]) => ({
                [field]: value,
            })),
        });
    }
    // Dynamic sort needs  fields to  do sorting
    const sortConditions = {};
    if (sortBy && sortOrder) {
        sortConditions[sortBy] = sortOrder;
    }
    // If there is no condition , put {} to give all data
    const whereConditions = andConditions.length > 0 ? { $and: andConditions } : {};
    const result = yield admin_model_1.Admin.find(whereConditions)
        .sort(sortConditions)
        .skip(skip)
        .limit(limit);
    const total = yield admin_model_1.Admin.countDocuments(whereConditions);
    return {
        meta: {
            page,
            limit,
            total,
        },
        data: result,
    };
});
const updateAdmin = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield admin_model_1.Admin.findOne({ id });
    if (!isExist) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Admin not found !');
    }
    const { name } = payload, adminData = __rest(payload, ["name"]);
    const updatedStudentData = Object.assign({}, adminData);
    if (name && Object.keys(name).length > 0) {
        Object.keys(name).forEach(key => {
            const nameKey = `name.${key}`;
            updatedStudentData[nameKey] = name[key];
        });
    }
    const result = yield admin_model_1.Admin.findOneAndUpdate({ id }, updatedStudentData, {
        new: true,
    });
    return result;
});
const deleteAdmin = (id) => __awaiter(void 0, void 0, void 0, function* () {
    // check if the faculty is exist
    const isExist = yield admin_model_1.Admin.findOne({ id });
    if (!isExist) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Faculty not found !');
    }
    const session = yield mongoose_1.default.startSession();
    try {
        session.startTransaction();
        //delete student first
        const student = yield admin_model_1.Admin.findOneAndDelete({ id }, { session });
        if (!student) {
            throw new ApiError_1.default(404, 'Failed to delete student');
        }
        session.commitTransaction();
        session.endSession();
        return student;
    }
    catch (error) {
        session.abortTransaction();
        throw error;
    }
});
exports.AdminService = {
    createAdmin,
    loginAdmin,
    refreshToken,
    getSingleAdmin,
    getAllAdmins,
    updateAdmin,
    deleteAdmin,
};
