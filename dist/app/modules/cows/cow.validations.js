"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CowValidation = void 0;
const zod_1 = require("zod");
const createCowZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        location: zod_1.z.enum([
            'Dhaka',
            'Chattogram',
            'Barishal',
            'Rajshahi',
            'Sylhet',
            'Comilla',
            'Rangpur',
            'Mymensingh',
        ], {
            required_error: 'Location is required',
        }),
        breed: zod_1.z.enum([
            'Brahman',
            'Nellore',
            'Sahiwal',
            'Gir',
            'Indigenous',
            'Tharparkar',
            'Kankrej',
        ], {
            required_error: 'Breed is required',
        }),
        category: zod_1.z.enum(['Dairy', 'Beef', 'Dual Purpose'], {
            required_error: 'Category is required',
        }),
        label: zod_1.z.enum(['for sale', 'sold out'], {
            required_error: 'Label is required',
        }),
    }),
});
const updateCowZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        location: zod_1.z.enum([
            'Dhaka',
            'Chattogram',
            'Barishal',
            'Rajshahi',
            'Sylhet',
            'Comilla',
            'Rangpur',
            'Mymensingh',
        ], {
            required_error: 'Location is required',
        }),
        breed: zod_1.z.enum([
            'Brahman',
            'Nellore',
            'Sahiwal',
            'Gir',
            'Indigenous',
            'Tharparkar',
            'Kankrej',
        ], {
            required_error: 'Breed is required',
        }),
        category: zod_1.z.enum(['Dairy', 'Beef', 'Dual Purpose'], {
            required_error: 'Category is required',
        }),
        label: zod_1.z.enum(['for sale', 'sold out'], {
            required_error: 'Label is required',
        }),
    }),
});
exports.CowValidation = {
    createCowZodSchema,
    updateCowZodSchema,
};
