/* eslint-disable @typescript-eslint/no-explicit-any */
export interface IEarnings {
  totalEarnings: number;
  todayEarnings: number;
  allData: Array<IEarning>;
}

export interface IEarning {
  _id: string;
  status: string;
  trnId: string;
  price: number;
  createdAt: string;
  updatedAt: string;
  user: {
    _id: string;
    status: string;
    name: string;
    shop: any;
    email: string;
    phoneNumber: any;
    password: string;
    gender: any;
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
    verification: {
      otp: number;
      expiresAt: string;
      status: boolean;
    };
    balance: number;
    expireAt: any;
    createdAt: string;
    updatedAt: string;
    __v: number;
    customer: string;
  };
  author: {
    _id: string;
    status: string;
    name: string;
    email: string;
    phoneNumber: string;
    password: string;
    gender: string;
    dateOfBirth: string;
    isGoogleLogin: boolean;
    profile: string;
    document: string;
    role: string;
    address: string;
    isDeleted: boolean;
    verification: {
      otp: string;
      expiresAt: string;
      status: boolean;
    };
    balance: number;
    createdAt: string;
    updatedAt: string;
    __v: number;
    loginWth: string;
    shop: string;
  };
}

export interface IDashboardData {
  totalUsers: number;
  totalRegistration: number;
  totalVendor: number;
  totalIncome: number;
  totalProducts: number;
  monthlyIncome: Array<{
    month: string;
    income: number;
  }>;
  monthlyUsers: Array<{
    month: string;
    total: number;
  }>;
  userDetails: Array<{
    _id: string;
    name: string;
    email: string;
    phoneNumber?: string;
    role: string;
    createdAt: string;
    profile?: string;
  }>;
}
