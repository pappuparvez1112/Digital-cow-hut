import { z } from 'zod';
import { UserRole } from './user.constant';
const createUserZodSchema = z.object({
  body: z.object({
    role: z.enum([...UserRole] as [string, ...string[]], {
      required_error: 'Role is required ',
    }),
  }),
});

const updateUserZodSchema = z
  .object({
    body: z.object({
      role: z
        .enum([...UserRole] as [string, ...string[]], {
          required_error: 'Role is required ',
        })
        .optional(),
    }),
  })
  .refine(data => data.body.role || !data.body.role, {
    message: 'Role should be provided',
  });
export const UserValidation = {
  createUserZodSchema,
  updateUserZodSchema,
};
