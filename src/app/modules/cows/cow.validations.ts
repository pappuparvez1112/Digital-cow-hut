import { z } from 'zod';

const createCowZodSchema = z.object({
  body: z.object({
    location: z.enum(
      [
        'Dhaka',
        'Chattogram',
        'Barishal',
        'Rajshahi',
        'Sylhet',
        'Comilla',
        'Rangpur',
        'Mymensingh',
      ],
      {
        required_error: 'Location is required',
      },
    ),
    breed: z.enum(
      [
        'Brahman',
        'Nellore',
        'Sahiwal',
        'Gir',
        'Indigenous',
        'Tharparkar',
        'Kankrej',
      ],
      {
        required_error: 'Breed is required',
      },
    ),
    category: z.enum(['Dairy', 'Beef', 'Dual Purpose'], {
      required_error: 'Category is required',
    }),
    label: z.enum(['for sale', 'sold out'], {
      required_error: 'Label is required',
    }),
    seller: z.string({
      required_error: 'Seller id is required',
    }),
  }),
});

const updateCowZodSchema = z.object({
  body: z.object({
    location: z.enum(
      [
        'Dhaka',
        'Chattogram',
        'Barishal',
        'Rajshahi',
        'Sylhet',
        'Comilla',
        'Rangpur',
        'Mymensingh',
      ],
      {
        required_error: 'Location is required',
      },
    ),
    breed: z.enum(
      [
        'Brahman',
        'Nellore',
        'Sahiwal',
        'Gir',
        'Indigenous',
        'Tharparkar',
        'Kankrej',
      ],
      {
        required_error: 'Breed is required',
      },
    ),
    category: z.enum(['Dairy', 'Beef', 'Dual Purpose'], {
      required_error: 'Category is required',
    }),
    label: z.enum(['for sale', 'sold out'], {
      required_error: 'Label is required',
    }),
    seller: z.string({
      required_error: 'Seller id is required',
    }),
  }),
});

export const CowValidation = {
  createCowZodSchema,
  updateCowZodSchema,
};
