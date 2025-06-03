"use client";

import Link from "next/link";
import { Button } from "antd";
import { useDispatch } from "react-redux";
import catchAsync from "@/utils/catchAsync";
import { setUser } from "@/redux/features/auth/authSlice";
import { jwtDecode } from "jwt-decode";
import FormWrapper from "@/components/form-components/FormWrapper";
import UInput from "@/components/form-components/UInput";
import { SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import { useLoginMutation } from "@/redux/features/auth/authApi";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "@/zod/auth.validation";
import { useRouter } from "nextjs-toploader/app";

interface IFormValues {
  email: string;
  password: string;
}

export default function LoginForm() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [signIn, { isLoading }] = useLoginMutation();

  const onLoginSubmit: SubmitHandler<IFormValues> = async (data) => {
    await catchAsync(async () => {
      const res = await signIn(data).unwrap();
      //   return console.log({ res });

      dispatch(
        setUser({
          user: jwtDecode(res?.data?.accessToken),
          token: res?.data?.accessToken,
        }),
      );

      router.refresh();
      toast.success("Successfully Logged In!");
      router.push("/dashboard");
    });
  };
  return (
    <div className="w-full rounded-xl bg-white px-6 py-8">
      <section className="mb-6 space-y-2">
        <h4 className="text-3xl font-semibold">Login</h4>
        <p className="text-gray-600">
          Enter your email and password to access admin panel
        </p>
      </section>

      <FormWrapper onSubmit={onLoginSubmit} resolver={zodResolver(loginSchema)}>
        <UInput
          name="email"
          type="email"
          label="Email"
          placeholder="Enter your email"
          size="large"
          className="!h-10"
        />

        <UInput
          name="password"
          label="Password"
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
          Log In
        </Button>

        <Link
          href="/forgot-password"
          className="text-primary-blue hover:text-primary-blue/85 mt-2 block text-center font-medium"
        >
          Forgot Password?
        </Link>
      </FormWrapper>
    </div>
  );
}
