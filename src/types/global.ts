export interface IPaginationParams {
  page: string;
  limit?: string;
}

export interface IApiResponseWithMeta<T> {
  success: boolean;
  message: string;
  data: {
    data: T;
    meta: {
      page: number;
      limit: number;
      total: number;
      totalPage: number;
    };
  };
}
