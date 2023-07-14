import { z } from 'zod';
import { UserRole } from './user.constant';

const createUserZodSchema = z.object({
  body: z.object({
    password: z.string().optional(),
    role: z.enum([...UserRole] as [string, ...string[]], {
      required_error: 'Role is required ',
    }),
    name: z.object({
      firstName: z.string({
        required_error: 'First name is required',
      }),
      lastName: z.string({
        required_error: 'Last name is required',
      }),
    }),

    phoneNumber: z.string({
      required_error: 'Phone number is required',
    }),
    address: z.string({
      required_error: ' address is required',
    }),
    budget: z.string({
      required_error: 'budget is required',
    }),
    income: z.string({
      required_error: 'income is required',
    }),
    profileImage: z.string().optional(),
  }),
});
const updateUserZodSchema = z.object({
  body: z.object({
    name: z.object({
      firstName: z.string().optional(),
      lastName: z.string().optional(),
    }),

    phoneNumber: z.string().optional(),
    address: z.string().optional(),
    budget: z.string().optional(),

    income: z.string().optional(),

    profileImage: z.string().optional(),
  }),
});

export const UserValidation = {
  createUserZodSchema,
  updateUserZodSchema,
};
