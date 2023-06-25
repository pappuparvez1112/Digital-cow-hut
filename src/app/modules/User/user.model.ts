import httpStatus from 'http-status';
import { Schema, model } from 'mongoose';
import ApiError from '../../../errors/ApiError';
import { UserRole } from './user.constant';
import { IUser, IUserModel } from './user.interface';

const UserSchema = new Schema<IUser>(
  {
    role: {
      type: String,
      required: true,
      enum: UserRole,
    },
    password: {
      type: String,
      required: true,
    },
    name: {
      firstName: {
        type: String,
        required: true,
      },
      lastName: {
        type: String,
        required: true,
      },
    },
    phoneNumber: {
      type: String,
      required: true,
      unique: true,
    },
    address: {
      type: String,
      required: true,
    },
    budget: {
      type: Number,
      required: true,
    },
    income: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

UserSchema.pre('save', async function (next) {
  const isExist = await User.findOne({
    phoneNumber: this.phoneNumber,
  });
  if (isExist) {
    throw new ApiError(
      httpStatus.CONFLICT,
      'This Phone number is already exist',
    );
  }
  next();
});

export const User = model<IUser, IUserModel>('User', UserSchema);
