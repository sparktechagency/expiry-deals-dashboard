import { TUploadFileType } from "@/types";
import { cn } from "@/utils/cn";
import { Icon } from "@iconify/react";
import { Upload, UploadProps } from "antd";
import { Controller, useFormContext } from "react-hook-form";
import { toast } from "sonner";
interface UUploadProps {
  name: string;
  label?: string;
  uploadTitle: string;
  labelStyles?: React.CSSProperties;
  fileType?: TUploadFileType;
  fileSize?: number;
  required?: boolean;
  maxCount?: number;
  borderClassName?: string;
}

export default function UUpload({
  name,
  label,
  uploadTitle,
  maxCount = 1,
  labelStyles = {},
  fileList,
  fileType = "image",
  fileSize = 5,
  required = true,
  borderClassName = "",
}: UUploadProps & UploadProps) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={fileList}
      rules={{
        required: {
          value: required,
          message: `${label} is required`,
        },
      }}
      render={({ field, fieldState: { error } }) => (
        <div className="mb-3">
          <label
            style={labelStyles}
            className="mb-2 flex items-center gap-x-1 font-medium"
          >
            {required && <span className="text-[#ff4d4f]">*</span>} {label}
          </label>

          <div
            className={cn(
              "flex-center scroll-hide h-32 w-full overflow-auto rounded-xl border-2 border-dashed border-[#a2a2a3]",
              borderClassName,
            )}
          >
            <Upload
              name={field.name}
              listType="picture"
              maxCount={maxCount}
              fileList={field.value || []}
              onChange={(info) => {
                field.onChange(info.fileList);
              }}
              multiple={maxCount > 1}
              beforeUpload={(file) => {
                // const isValidFileType = file.type.startsWith(fileType);
                const isValidFileSize = file.size / 1024 / 1024 < fileSize; // default 5 MB

                if (!file.type.startsWith(fileType)) {
                  toast.error(
                    `Invalid file type!! Only ${fileType} files are allowed.`,
                  );
                  return Upload.LIST_IGNORE;
                }

                if (!isValidFileSize) {
                  toast.error("File size exceeds 5MB!!");
                  return Upload.LIST_IGNORE;
                }

                return true;
              }}
              className="mx-auto flex !min-h-32 !w-full flex-col justify-center gap-y-2 !py-10 !text-white hover:!text-black"
            >
              <button
                type="button"
                className="!mx-auto flex w-max gap-x-2 rounded-md border border-black/10 bg-white px-4 py-2 font-medium !text-black shadow-sm transition-all duration-300 ease-in-out active:scale-95"
              >
                <Icon icon="lets-icons:upload-fill" height={20} width={20} />{" "}
                Upload {uploadTitle}
              </button>
            </Upload>
          </div>

          {error && <p className="text-danger">{error.message}</p>}
        </div>
      )}
    />
  );
}
