/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import FormWrapper from "@/components/form-components/FormWrapper";
import UUpload from "@/components/form-components/UUpload";
import { useUpdateMyProfileMutation } from "@/redux/features/user/usersApi";
import { IMyProfile } from "@/types";
import catchAsync from "@/utils/catchAsync";
import { Modal } from "antd";
import { Button } from "antd";
import { toast } from "sonner";

interface ChangeProfilePicModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  profile: IMyProfile;
}

export default function ChangeProfilePicModal({
  open,
  setOpen,
  profile,
}: ChangeProfilePicModalProps) {
  const [updateProfile, { isLoading: isUpdating }] =
    useUpdateMyProfileMutation();

  const handleSubmit = async (data: any) => {
    if (data?.profile?.length > 0) {
      if (!data?.profile[0]?.originFileObj) {
        return toast.error("Please select a new image!!");
      }
    }

    const formData = new FormData();
    formData.append("profile", data?.profile[0]?.originFileObj);

    catchAsync(async () => {
      await updateProfile(formData).unwrap();
      setOpen(false);
      toast.success("Profile picture updated successfully!!");
    });
  };

  if (!profile?._id) {
    return;
  }

  const defaultValues = {
    profile: profile?.profile
      ? [
          {
            uid: "-1",
            name: "profile",
            url: profile?.profile,
            status: "completed",
          },
        ]
      : [],
  };

  return (
    <Modal
      centered
      onCancel={() => setOpen(false)}
      open={open}
      footer={null}
      title="Change Profile Picture"
    >
      <FormWrapper defaultValues={defaultValues} onSubmit={handleSubmit}>
        <UUpload
          name={"profile"}
          label={"Profile Picture"}
          maxCount={1}
          uploadTitle={"profile picture"}
        />

        <Button
          type="primary"
          htmlType="submit"
          className="w-full"
          loading={isUpdating}
        >
          Submit
        </Button>
      </FormWrapper>
    </Modal>
  );
}
