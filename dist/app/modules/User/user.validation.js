'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.UserValidation = void 0;
const zod_1 = require('zod');
const user_constant_1 = require('./user.constant');
const createUserZodSchema = zod_1.z.object({
  body: zod_1.z.object({
    role: zod_1.z.enum([...user_constant_1.UserRole], {
      required_error: 'Role is required ',
    }),
  }),
});
const updateUserZodSchema = zod_1.z
  .object({
    body: zod_1.z.object({
      role: zod_1.z
        .enum([...user_constant_1.UserRole], {
          required_error: 'Role is required ',
        })
        .optional(),
    }),
  })
  .refine(data => data.body.role || !data.body.role, {
    message: 'Role should be provided',
  });
exports.UserValidation = {
  createUserZodSchema,
  updateUserZodSchema,
};
