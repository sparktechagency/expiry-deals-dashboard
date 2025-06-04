"use client";

import FormWrapper from "@/components/form-components/FormWrapper";
import UInput from "@/components/form-components/UInput";
import { useChangePasswordMutation } from "@/redux/features/auth/authApi";
import { logout } from "@/redux/features/auth/authSlice";
import { changePasswordSchema } from "@/zod/profile.validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "antd";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { toast } from "sonner";
import { useForm } from "react-hook-form";

type PasswordFormData = {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
};

export default function ChangePassForm() {
  const dispatch = useDispatch();
  const router = useRouter();
  const [changePassword, { isLoading }] = useChangePasswordMutation();
  const { handleSubmit } = useForm<PasswordFormData>({
    resolver: zodResolver(changePasswordSchema),
    mode: "onChange",
  });

  const onSubmit = async (data: PasswordFormData) => {
    if (data.newPassword === data.oldPassword) {
      return toast.error("New password can't be same as old password");
    }

    if (data.newPassword !== data.confirmPassword) {
    };

    try {
      await changePassword(data).unwrap();
      toast.success("Password changed successfully");
      dispatch(logout());
      router.push("/auth/login");
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : "Failed to change password";
      toast.error(errorMessage);
    }
  };

  return (
    <section className="mt-5 px-10">
      <FormWrapper
        onSubmit={handleSubmit(onSubmit)}
        resolver={zodResolver(changePasswordSchema)}
      >
        <UInput
          name="oldPassword"
          label="Old Password"
          type="password"
          placeholder="Enter your old password"
        />
        <UInput
          name="newPassword"
          label="New Password"
          type="password"
          placeholder="Enter your new password"
        />
        <UInput
          name="confirmPassword"
          label="Confirm Password"
          type="password"
          placeholder="Confirm your new password"
        />

        <div className="mt-4 flex justify-end">
          <Button
            type="primary"
            htmlType="submit"
            loading={isLoading}
          >
            Change Password
          </Button>
        </div>
      </FormWrapper>
    </section>
  );
}


