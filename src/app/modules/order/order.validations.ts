import { z } from 'zod';

const createOrdersZodSchema = z.object({
  body: z.object({
    cow: z.string({
      required_error: 'Cows id is required',
    }),
    buyer: z.string({
      required_error: 'Buyer id is required',
    }),
  }),
});

const updateOrdersZodSchema = z.object({
  body: z.object({
    cow: z.string().optional(),
    buyer: z.string().optional(),
  }),
});

export const OrdersValidation = {
  createOrdersZodSchema,
  updateOrdersZodSchema,
};
