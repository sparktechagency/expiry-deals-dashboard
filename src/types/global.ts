import { GetProp, UploadProps } from "antd";

export interface IQueryParams {
  page?: string;
  limit?: string;
  searchTerm?: string;
  sort?: string;
  filter?: string[];
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

export type TUploadFileType =
  | "image"
  | "video"
  | "audio"
  | "application/pdf"
  | "application/msword"
  | "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
  | "text/plain"
  | ".jpg"
  | ".jpeg"
  | ".png"
  | ".gif"
  | ".mp4"
  | ".mp3"
  | ".wav"
  | ".pdf"
  | ".doc"
  | ".docx"
  | ".txt";

export type AntFileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];
