import bcrypt from 'bcrypt';
import httpStatus from 'http-status';
import { Schema, model } from 'mongoose';
import ApiError from '../../../errors/ApiError';
import { IUser, UserModel } from './user.interface';

const UserSchema = new Schema<IUser, UserModel>(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    role: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
      select: 0,
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
      type: Number,
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
    profileImage: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);

UserSchema.statics.isUserExist = async function (
  phoneNumber: string,
): Promise<Pick<IUser, 'phoneNumber' | 'password' | 'role'> | null> {
  // console.log(phoneNumber, 'phoneNumber');
  return await User.findOne(
    { phoneNumber },
    { phoneNumber: 1, password: 1, role: 1 },
  );
};

UserSchema.statics.isPasswordMatched = async function (
  givenPassword: string,
  savedPassword: string,
): Promise<boolean> {
  console.log(givenPassword, savedPassword);
  return await bcrypt.compare(givenPassword, savedPassword);
};

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

export const User = model<IUser, UserModel>('User', UserSchema);
