import httpStatus from 'http-status';
import { Schema, model } from 'mongoose';
import ApiError from '../../../errors/ApiError';
import { breed, category, label } from './cow.constants';
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
      type: Number,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    breed: {
      type: String,
      required: true,
      enum: breed,
    },
    weight: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      required: true,
      enum: label,
    },
    category: {
      type: String,
      required: true,
      enum: category,
    },
    seller: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  },
);

CowsSchema.pre('save', async function (next) {
  const isExist = await Cow.findOne({
    name: this.name,
  });
  if (isExist) {
    throw new ApiError(httpStatus.CONFLICT, 'This cow fiield is already exist');
  }
  next();
});

export const Cow = model<ICow, CowModel>('Cows', CowsSchema);
