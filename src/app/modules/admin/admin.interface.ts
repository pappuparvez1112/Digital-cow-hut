import { Model } from 'mongoose';

export type IAdminRole = 'Admin';

export type IAdmin = {
  id: string;
  password: string;
  role: IAdminRole;
  name: string;
  phoneNumber: number;
  address: string;
  profileImage?: string;
};

export type ILoginAdmin = {
  phoneNumber: string;
  password: string;
};
export type ILoginAdminResponse = {
  accessToken: string;
  refreshToken?: string;
};
export type IRefreshTokenResponse = {
  accessToken: string;
};

export type AdminModel = {
  isUserExist(
    phoneNumber: string,
  ): Promise<Pick<IAdmin, 'id' | 'phoneNumber' | 'password' | 'role'>>;
  isPasswordMatched(
    givenPassword: string,
    savedPassword: string,
  ): Promise<boolean>;
} & Model<IAdmin>;

export type IAdminFilters = {
  searchTerm?: string;
};
