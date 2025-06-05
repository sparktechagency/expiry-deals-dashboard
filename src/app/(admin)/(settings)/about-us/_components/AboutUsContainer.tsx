/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import FormWrapper from "@/components/form-components/FormWrapper";
import UTextEditor from "@/components/form-components/UTextEditor";
import { useUpdateSettingsDataMutation } from "@/redux/features/settings/settingsApi";
import { useGetSettingsDataQuery } from "@/redux/features/settings/settingsApi";
import catchAsync from "@/utils/catchAsync";
import { Button } from "antd";
import { Edit } from "lucide-react";
import { toast } from "sonner";

export default function AboutUsContainer() {
  const { data } = useGetSettingsDataQuery({});

  const [updateFn, { isLoading }] = useUpdateSettingsDataMutation();

  const handleSubmit = (data: any) => {
    catchAsync(async () => {
      await updateFn(data).unwrap();
      toast.success("About Us Updated Successfully");
    });
  };
  return (
    <section>
      <h3 className="mb-6 text-2xl font-semibold">About Us</h3>

      <FormWrapper
        onSubmit={handleSubmit}
        defaultValues={{ aboutUs: data?.aboutUs }}
      >
        <UTextEditor
          name="aboutUs"
          placeholder="Note: Enter details about the website here. (e.g How and why did you come up with the idea? etc)"
        />

        <Button
          loading={isLoading}
          htmlType="submit"
          type="primary"
          size="large"
          className="w-full rounded-xl"
          icon={<Edit size={18} />}
        >
          Save Changes
        </Button>
      </FormWrapper>
    </section>
  );
}
