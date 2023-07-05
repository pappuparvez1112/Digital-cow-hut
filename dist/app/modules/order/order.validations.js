"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrdersValidation = void 0;
const zod_1 = require("zod");
const createOrdersZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        cow: zod_1.z.string({
            required_error: 'Cows id is required',
        }),
        buyer: zod_1.z.string({
            required_error: 'Buyer id is required',
        }),
    }),
});
const updateOrdersZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        cow: zod_1.z.string().optional(),
        buyer: zod_1.z.string().optional(),
    }),
});
exports.OrdersValidation = {
    createOrdersZodSchema,
    updateOrdersZodSchema,
};
