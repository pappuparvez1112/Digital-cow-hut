import bcrypt from 'bcrypt';
import httpStatus from 'http-status';
import { Schema, model } from 'mongoose';
import ApiError from '../../../errors/ApiError';
import { AdminModel, IAdmin } from './admin.interface';

const AdminSchema = new Schema<IAdmin, AdminModel>(
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
    profileImage: {
      type: String,
      // required: true,
    },
  },
  {
    timestamps: true,
  },
);

AdminSchema.statics.isUserExist = async function (
  phoneNumber: string,
): Promise<Pick<IAdmin, 'phoneNumber' | 'password' | 'role'> | null> {
  // console.log(phoneNumber, 'phoneNumber');
  return await Admin.findOne(
    { phoneNumber },
    { phoneNumber: 1, password: 1, role: 1 },
  );
};

AdminSchema.statics.isPasswordMatched = async function (
  givenPassword: string,
  savedPassword: string,
): Promise<boolean> {
  // console.log(givenPassword, savedPassword);
  return await bcrypt.compare(givenPassword, savedPassword);
};

AdminSchema.pre('save', async function (next) {
  const isExist = await Admin.findOne({
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

export const Admin = model<IAdmin, AdminModel>('Admin', AdminSchema);
