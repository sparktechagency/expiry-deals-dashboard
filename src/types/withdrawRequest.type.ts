export interface IWithdrawRequest {
  _id: string;
  vendor: {
    _id: string;
    name: string;
    email: string;
    phoneNumber?: string;
    profile: string;
  };
  amount: number;
  status: "pending" | "approved" | "rejected";
  isDeleted: boolean;
  bankDetails: {
    _id: string;
    vendor: string;
    accountNumber: string;
    routingNumber: string;
    bankName: string;
    bankHolderName: string;
    bankAddress: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
  };
  createdAt: string;
  updatedAt: string;
  reason?: string;
}
