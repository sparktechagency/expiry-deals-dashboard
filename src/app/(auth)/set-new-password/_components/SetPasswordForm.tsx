"use client";

import FormWrapper from "@/components/form-components/FormWrapper";
import UInput from "@/components/form-components/UInput";
import { Button } from "antd";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useRouter } from "nextjs-toploader/app";
import catchAsync from "@/utils/catchAsync";
import { toast } from "sonner";
import { useResetPasswordMutation } from "@/redux/features/auth/authApi";
import { removeFromSessionStorage } from "@/utils/sessionStorage";
import { resetPassSchema } from "@/zod/auth.validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler } from "react-hook-form";

interface IFormValues {
  newPassword: string;
  confirmPassword: string;
}

export default function SetPasswordForm() {
  const [updatePassword, { isLoading }] = useResetPasswordMutation();
  const router = useRouter();

  const onSubmit: SubmitHandler<IFormValues> = (data) => {
    if (data.newPassword !== data.confirmPassword) {
      return toast.error("Passwords do not match!");
    }

    catchAsync(async () => {
      await updatePassword({
        newPassword: data.newPassword,
        confirmPassword: data.confirmPassword,
      }).unwrap();

      toast.success("Password Updated Successfully");

      // Remove forget password token
      removeFromSessionStorage("changePassToken");

      // Send to login page
      router.push("/login");
    });
  };

  return (
    <div className="w-full rounded-xl bg-white px-6 py-8">
      <Link
        href="/login"
        className="text-primary-blue flex-center-start hover:text-primary-blue/85 mb-4 gap-x-2 font-medium"
      >
        <ArrowLeft size={18} /> Back to login
      </Link>

      <section className="mb-8 space-y-2">
        <h4 className="text-3xl font-semibold">Set New Password</h4>
        <p className="text-dark-gray">Enter your new password login</p>
      </section>

      <FormWrapper onSubmit={onSubmit} resolver={zodResolver(resetPassSchema)}>
        <UInput
          name="newPassword"
          label="New Password"
          type="password"
          placeholder="*************"
          size="large"
          className="!mb-0 !h-10"
        />

        <UInput
          name="confirmPassword"
          label="Confirm Password"
          type="password"
          placeholder="*************"
          size="large"
          className="!mb-0 !h-10"
        />

        <Button
          htmlType="submit"
          type="primary"
          size="large"
          className="!h-10 w-full !font-semibold"
          loading={isLoading}
        >
          Submit
        </Button>
      </FormWrapper>
    </div>
  );
}
