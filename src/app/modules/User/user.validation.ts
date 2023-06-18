import { z } from 'zod';
import { UserRole } from './user.constant';
const createUserZodSchema = z.object({
  body: z.object({
    role: z.enum([...UserRole] as [string, ...string[]], {
      required_error: 'Role is required ',
    }),
  }),
});
export const UserValidation = {
  createUserZodSchema,
};
