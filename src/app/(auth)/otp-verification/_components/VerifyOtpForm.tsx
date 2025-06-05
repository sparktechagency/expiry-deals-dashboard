"use client";

import FormWrapper from "@/components/form-components/FormWrapper";
import UOtpInput from "@/components/form-components/UOtpInput";
import { useVerifyOtpMutation } from "@/redux/features/otp/otpApi";
import { Button } from "antd";
import { SubmitHandler } from "react-hook-form";
import { useState } from "react";
import { useRouter } from "nextjs-toploader/app";
import catchAsync from "@/utils/catchAsync";
import { toast } from "sonner";
import { useResendOtpMutation } from "@/redux/features/otp/otpApi";
import { jwtDecode, JwtPayload } from "jwt-decode";
import { getFromSessionStorage } from "@/utils/sessionStorage";
import { setToSessionStorage } from "@/utils/sessionStorage";
import { removeFromSessionStorage } from "@/utils/sessionStorage";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { otpSchema } from "@/zod/auth.validation";

interface IFormValues {
  otp: string;
}

interface IJwtPayload extends JwtPayload {
  email: string;
}

export default function VerifyOtpForm() {
  const [verifyOtp, { isLoading: isVerifyOtpLoading }] = useVerifyOtpMutation();
  const [isResendDisabled, setIsResendDisabled] = useState(false);
  const [timer, setTimer] = useState(180); // Timer in seconds
  const router = useRouter();

  const [resendOtp, { isLoading: isResendOtpLoading }] = useResendOtpMutation();
  const handleResendOtp = async () => {
    catchAsync(async () => {
      const res = await resendOtp({
        email: (
          jwtDecode(getFromSessionStorage("forgotPassToken")) as IJwtPayload
        )?.email,
      }).unwrap();

      if (res?.success) {
        toast.success("OTP re-sent successful");
        setToSessionStorage("forgotPassToken", res?.data?.token);

        // Disable resend button and start the timer
        setIsResendDisabled(true);

        // Set the timer for 3 minutes (180 seconds)
        setTimer(180);

        // Countdown every second
        const countdownInterval = setInterval(() => {
          setTimer((prev) => {
            if (prev === 1) {
              clearInterval(countdownInterval);
              setIsResendDisabled(false); // Re-enable the button after the timer ends
            }
            return prev - 1;
          });
        }, 1000);
      }
    });
  };

  // Format the timer to MM:SS
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };

  const handleVerifyOtp: SubmitHandler<IFormValues> = async (data) => {
    catchAsync(async () => {
      const res = await verifyOtp({ otp: data.otp }).unwrap();

      toast.success("OTP Verification Successful");

      // remove forgotPassToken
      removeFromSessionStorage("forgotPassToken");

      // set change-pass token
      setToSessionStorage("changePassToken", res?.data?.token);

      // navigate to login page
      router.push("/set-new-password");
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
        <h4 className="text-3xl font-semibold">Verify OTP</h4>
        <p className="text-dark-gray">
          Enter the OTP that we&apos;ve sent to your email
        </p>
      </section>

      <FormWrapper resolver={zodResolver(otpSchema)} onSubmit={handleVerifyOtp}>
        <UOtpInput name="otp" />

        <Button
          htmlType="submit"
          type="primary"
          size="large"
          className="!h-10 w-full !font-semibold"
          loading={isVerifyOtpLoading}
        >
          Submit
        </Button>

        <p className="mx-auto mt-2 w-max font-medium text-[#8a8888]">
          Didn&apos;t get the code?{" "}
          <Button
            htmlType="button"
            type="link"
            className="text-primary-blue px-0"
            onClick={handleResendOtp}
            disabled={isResendDisabled || isResendOtpLoading}
          >
            {isResendDisabled ? `Resend in ${formatTime(timer)}` : "Resend"}
          </Button>
        </p>
      </FormWrapper>
    </div>
  );
}
