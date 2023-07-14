"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userFilterableFields = exports.userSearchableFields = exports.UserBudget = exports.UserRole = void 0;
exports.UserRole = ['Buyer', 'Seller'];
exports.UserBudget = 30000;
exports.userSearchableFields = [
    'id',
    'phoneNumber',
    'name.firstName',
    'name.lastName',
];
exports.userFilterableFields = [
    'searchTerm',
    'id',
    'phoneNumber',
    'name.firstName',
    'name.lastName',
];
