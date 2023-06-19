import { z } from 'zod';

const createCowZodSchema = z.object({
  body: z.object({
    location: z.string({
      required_error: 'Location is required',
    }),
    breed: z.string({
      required_error: 'Breed is required',
    }),
    category: z.string({
      required_error: 'Category is required',
    }),
    label: z.string({
      required_error: 'Label is required',
    }),
  }),
});

const updateCowZodSchema = z.object({
  body: z.object({
    location: z.string({
      required_error: 'Location is required',
    }),
    breed: z.string({
      required_error: 'Breed is required',
    }),
    category: z.string({
      required_error: 'Category is required',
    }),
    label: z.string({
      required_error: 'Label is required',
    }),
  }),
});

export const CowValidation = {
  createCowZodSchema,
  updateCowZodSchema,
};
