/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import FormWrapper from "@/components/form-components/FormWrapper";
import UInput from "@/components/form-components/UInput";
import { editProfileSchema } from "@/zod/profile.validation";
import catchAsync from "@/utils/catchAsync";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "antd";
import { toast } from "sonner";
import { useUpdateMyProfileMutation } from "@/redux/features/user/usersApi";
import { IMyProfile } from "@/types";

interface EditProfileFormProps {
  myProfile: IMyProfile;
}

export default function EditProfileForm({ myProfile }: EditProfileFormProps) {
  console.log(myProfile);
  const [editProfile, { isLoading: isUpdating }] = useUpdateMyProfileMutation();
  const handleSubmit = (data: any) => {
    const formData = new FormData();
    formData.append("payload", JSON.stringify(data));

    catchAsync(async () => {
      await editProfile(formData).unwrap();
      toast.success("Profile Updated Successfully");
    });
  };

  const defaultValues = {
    name: myProfile?.name,
    email: myProfile?.email,
    phoneNumber: myProfile?.phoneNumber,
  };
  return (
    <section className="mt-5 px-10">
      <FormWrapper
        onSubmit={handleSubmit}
        resolver={zodResolver(editProfileSchema)}
        defaultValues={defaultValues}
      >
        <UInput
          name="name"
          label="Name"
          type="text"
          placeholder="Enter your name"
        />
        <UInput name="email" label="Email" type="email" disabled />
        <UInput
          name="phoneNumber"
          label="Contact"
          type="contact"
          placeholder="Enter your phone number"
        />

        <Button
          loading={isUpdating}
          htmlType="submit"
          className="w-full"
          size="large"
          type="primary"
        >
          Save
        </Button>
      </FormWrapper>
    </section>
  );
}
