import { Schema, model } from 'mongoose';
import { breed, category, cowLocation, label } from './cow.constants';
import { CowModel, ICow } from './cow.interfaces';

const CowsSchema = new Schema<ICow, CowModel>(
  {
    name: {
      type: String,
      required: true,
    },
    age: {
      type: String,
      required: true,
    },
    price: {
      type: String,
      required: true,
      unique: true,
    },
    location: {
      type: String,
      required: true,
      unique: true,
      enum: cowLocation,
    },
    breed: {
      type: String,
      required: true,
      unique: true,
      enum: breed,
    },
    weight: {
      type: String,
      required: true,
      unique: true,
    },
    label: {
      type: String,
      required: true,
      unique: true,
      enum: label,
    },
    category: {
      type: String,
      required: true,
      unique: true,
      enum: category,
    },
    seller: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  },
);

export const Cow = model<ICow, CowModel>('Cows', CowsSchema);
