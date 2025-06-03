export interface IVendorRequest {
  location: {
    type: string;
    coordinates: Array<number>;
  };
  _id: string;
  name: string;
  shopName: string;
  email: string;
  document: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}
