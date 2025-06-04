/* eslint-disable @typescript-eslint/no-explicit-any */
import { UploadFile } from "antd";
import React from "react";
import { Button, Modal } from "antd";
import FormWrapper from "@/components/form-components/FormWrapper";
import { SubmitHandler } from "react-hook-form";
import UInput from "@/components/form-components/UInput";
import UUpload from "@/components/form-components/UUpload";
import { zodResolver } from "@hookform/resolvers/zod";
import { addCategoryValidationSchema } from "@/zod/category.validation";
import { useAddCategoryMutation } from "@/redux/features/category/categoryApi";
import { toast } from "sonner";

interface AddCategoryModalProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

interface FormValues {
  name: string;
  banner: UploadFile[];
}

export default function AddCategoryModal({
  open,
  setOpen,
}: AddCategoryModalProps) {
  const [addCategory, { isLoading: isAdding }] = useAddCategoryMutation({});

  // Handle form submission
  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    const formData = new FormData();

    const file = data?.banner?.[0] as UploadFile;
    formData.append("banner", file?.originFileObj as Blob);

    formData.append("data", JSON.stringify(data));

    try {
      await addCategory(formData).unwrap();
      toast.success("Category added successfully!");
      setOpen(false);
    } catch (error: any) {
      toast.error(error?.message || error?.data?.message);
    }
  };

  if (!open) {
    return null;
  }

  return (
    <Modal
      open={open}
      onCancel={() => setOpen(false)}
      title="Add New Category"
      width={600}
      footer={null}
    >
      <FormWrapper
        onSubmit={onSubmit}
        resolver={zodResolver(addCategoryValidationSchema)}
      >
        <UInput
          name="name"
          label="Category Name"
          placeholder="Enter category name"
          required
        />

        <UUpload
          name="banner"
          label="Category Banner"
          uploadTitle="banner"
          maxCount={1}
          fileType="image"
          accept="image/*"
          required
        />

        <Button
          type="primary"
          htmlType="submit"
          size="middle"
          className="!mt-3 w-full"
          loading={isAdding}
        >
          Add Category
        </Button>
      </FormWrapper>
    </Modal>
  );
}
