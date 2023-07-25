import { z } from 'zod';
import { AdminRole } from './admin.constant';

const updateAdmin = z.object({
  body: z.object({
    password: z.string().optional(),
    role: z.enum([...AdminRole] as [string, ...string[]], {
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
    profileImage: z.string().optional(),
  }),
});

const createAdminZodSchema = z.object({
  body: z.object({
    password: z.string().optional(),
    role: z.enum([...AdminRole] as [string, ...string[]], {
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

    profileImage: z.string().optional(),
  }),
});

const createLoginZodSchema = z.object({
  body: z.object({
    phoneNumber: z.string({
      required_error: 'PhoneNumber is required',
    }),
    password: z.string({
      required_error: 'Password is required',
    }),
  }),
});
const refreshTokenZodSchema = z.object({
  cookies: z.object({
    refreshToken: z.string({
      required_error: 'Refresh Token is required',
    }),
  }),
});

export const AdminValidation = {
  updateAdmin,
  createAdminZodSchema,
  createLoginZodSchema,
  refreshTokenZodSchema,
};
