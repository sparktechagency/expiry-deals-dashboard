"use client";

import FormWrapper from "@/components/form-components/FormWrapper";
import UInput from "@/components/form-components/UInput";
import { useChangePasswordMutation } from "@/redux/features/auth/authApi";
import { logout } from "@/redux/features/auth/authSlice";
import { changePasswordSchema } from "@/zod/profile.validation";
import catchAsync from "@/utils/catchAsync";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "antd";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { toast } from "sonner";

interface FormValues {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export default function ChangePassForm() {
  const dispatch = useDispatch();
  const router = useRouter();
  const [changePassword, { isLoading }] = useChangePasswordMutation();

  const onSubmit = async (data: FormValues) => {
    if (data?.newPassword === data?.oldPassword) {
      return toast.error("New password can't be same as old password");
    }

    if (data?.newPassword !== data?.confirmPassword) {
      return toast.error("Password doesn't match");
    }

    catchAsync(async () => {
      await changePassword(data).unwrap();
      const willLogout = window.confirm(
        "Password changed successfully. Do you want to logout?",
      );
      if (willLogout) {
        dispatch(logout());
        router.refresh();
        router.push("/login");
      }
    });
  };
  return (
    <section className="mt-5 px-10">
      <FormWrapper
        onSubmit={onSubmit}
        resolver={zodResolver(changePasswordSchema)}
      >
        <UInput
          name="oldPassword"
          type="password"
          label="Old Password"
          placeholder="***********"
        />
        <UInput
          name="newPassword"
          type="password"
          label="New Password"
          placeholder="***********"
        />
        <UInput
          name="confirmPassword"
          type="password"
          label="Confirm Password"
          placeholder="***********"
        />

        <Button
          loading={isLoading}
          htmlType="submit"
          className="w-full"
          size="large"
          type="primary"
        >
          Change Password
        </Button>
      </FormWrapper>
    </section>
  );
}
