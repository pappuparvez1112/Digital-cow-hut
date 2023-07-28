"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminValidation = void 0;
const zod_1 = require("zod");
const admin_constant_1 = require("./admin.constant");
const updateAdmin = zod_1.z.object({
    body: zod_1.z.object({
        password: zod_1.z.string().optional(),
        role: zod_1.z.enum([...admin_constant_1.AdminRole], {
            required_error: 'Role is required ',
        }),
        name: zod_1.z.object({
            firstName: zod_1.z.string({
                required_error: 'First name is required',
            }),
            lastName: zod_1.z.string({
                required_error: 'Last name is required',
            }),
        }),
        phoneNumber: zod_1.z.string({
            required_error: 'Phone number is required',
        }),
        address: zod_1.z.string({
            required_error: ' address is required',
        }),
        profileImage: zod_1.z.string().optional(),
    }),
});
const createAdminZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        password: zod_1.z.string().optional(),
        role: zod_1.z.enum([...admin_constant_1.AdminRole], {
            required_error: 'Role is required ',
        }),
        name: zod_1.z.object({
            firstName: zod_1.z.string({
                required_error: 'First name is required',
            }),
            lastName: zod_1.z.string({
                required_error: 'Last name is required',
            }),
        }),
        phoneNumber: zod_1.z.string({
            required_error: 'Phone number is required',
        }),
        address: zod_1.z.string({
            required_error: ' address is required',
        }),
        profileImage: zod_1.z.string().optional(),
    }),
});
const createLoginZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        phoneNumber: zod_1.z.string({
            required_error: 'PhoneNumber is required',
        }),
        password: zod_1.z.string({
            required_error: 'Password is required',
        }),
    }),
});
const refreshTokenZodSchema = zod_1.z.object({
    cookies: zod_1.z.object({
        refreshToken: zod_1.z.string({
            required_error: 'Refresh Token is required',
        }),
    }),
});
exports.AdminValidation = {
    updateAdmin,
    createAdminZodSchema,
    createLoginZodSchema,
    refreshTokenZodSchema,
};
