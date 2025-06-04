/* eslint-disable @typescript-eslint/no-explicit-any */
import { ICategory } from "@/types";
import { UploadFile } from "antd";
import React from "react";
import { Button, Modal } from "antd";
import FormWrapper from "@/components/form-components/FormWrapper";
import { SubmitHandler } from "react-hook-form";
import UInput from "@/components/form-components/UInput";
import UUpload from "@/components/form-components/UUpload";
import { zodResolver } from "@hookform/resolvers/zod";
import { editCategoryValidationSchema } from "@/zod/category.validation";
import { useEditCategoryMutation } from "@/redux/features/category/categoryApi";
import { toast } from "sonner";

interface EditCategoryModalProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  selectedCategory: ICategory;
}

interface FormValues {
  name: string;
  banner?: UploadFile[];
}

export default function EditCategoryModal({
  open,
  setOpen,
  selectedCategory,
}: EditCategoryModalProps) {
  const [editCategory, { isLoading: isEditing }] = useEditCategoryMutation({});

  const bannerFileList: UploadFile[] = selectedCategory?.banner
    ? [
        {
          uid: "-1",
          name: selectedCategory?.name + " banner",
          status: "done",
          url: selectedCategory.banner,
          type: "image/jpeg", // or appropriate MIME type
        },
      ]
    : [];

  // Set default values
  const defaultValues = selectedCategory
    ? {
        name: selectedCategory?.name,
        banner: bannerFileList,
      }
    : {};

  // Handle form submission
  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    const formData = new FormData();

    if (data?.banner) {
      if (!data?.banner?.[0]?.url) {
        const file = data?.banner?.[0] as UploadFile;
        formData.append("banner", file?.originFileObj as Blob);
      }
      delete data.banner;
    }

    formData.append("data", JSON.stringify(data));

    try {
      await editCategory({
        id: selectedCategory?._id,
        payload: formData,
      }).unwrap();
      toast.success("Category updated successfully!");
      setOpen(false);
    } catch (error: any) {
      toast.error(error?.message || error?.data?.message);
    }
  };

  if (!selectedCategory) {
    return null;
  }

  return (
    <Modal
      open={open}
      onCancel={() => setOpen(false)}
      footer={null}
      title="Edit Category"
    >
      <FormWrapper
        onSubmit={onSubmit}
        defaultValues={defaultValues}
        resolver={zodResolver(editCategoryValidationSchema)}
      >
        <UInput
          name="name"
          label="Category Name"
          placeholder="Enter category name"
          required
        />
        <UUpload
          name="banner"
          uploadTitle="banner"
          label="Banner"
          maxCount={1}
          accept="image/*"
          fileType={"image"}
          required
        />

        <Button
          type="primary"
          htmlType="submit"
          size="middle"
          className="!mt-3 w-full"
          loading={isEditing}
        >
          Update
        </Button>
      </FormWrapper>
    </Modal>
  );
}
