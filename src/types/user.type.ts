/* eslint-disable @typescript-eslint/no-explicit-any */
export interface IUser {
  verification: {
    otp: number;
    expiresAt: string;
    status: boolean;
  };
  _id: string;
  status: "active" | "blocked";
  name: string;
  shop: string;
  email: string;
  phoneNumber: any;
  password: string;
  gender: string;
  dateOfBirth: any;
  loginWth: string;
  profile: string;
  document: any;
  role: string;
  address: any;
  city: any;
  state: any;
  country: any;
  zipCode: any;
  isDeleted: boolean;
  balance: number;
  expireAt: any;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface IMyProfile {
  verification: {
    otp: string;
    expiresAt: string;
    status: boolean;
  };
  shop: any;
  city: any;
  state: any;
  country: any;
  zipCode: any;
  _id: string;
  status: string;
  name: string;
  email: string;
  phoneNumber: string;
  password: string;
  gender: any;
  dateOfBirth: any;
  isGoogleLogin: boolean;
  profile: any;
  document: any;
  role: string;
  address: any;
  isDeleted: boolean;
  balance: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
  loginWth: string;
  expireAt: string;
}
