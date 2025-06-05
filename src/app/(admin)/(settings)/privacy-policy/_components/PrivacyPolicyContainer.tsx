/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import FormWrapper from "@/components/form-components/FormWrapper";
import UTextEditor from "@/components/form-components/UTextEditor";
import {
  useGetSettingsDataQuery,
  useUpdateSettingsDataMutation,
} from "@/redux/features/settings/settingsApi";
import catchAsync from "@/utils/catchAsync";
import { Button } from "antd";
import { Edit } from "lucide-react";
import { toast } from "sonner";

export default function PrivacyPolicyContainer() {
  const { data } = useGetSettingsDataQuery({});
  console.log({ data });

  const [updateFn, { isLoading }] = useUpdateSettingsDataMutation();

  const handleSubmit = (data: any) => {
    catchAsync(async () => {
      await updateFn(data).unwrap();
      toast.success("Privacy Policy Updated Successfully");
    });
  };

  return (
    <section>
      <h3 className="mb-6 text-2xl font-semibold">Privacy Policy</h3>

      <FormWrapper
        onSubmit={handleSubmit}
        defaultValues={{ privacyPolicy: data?.privacyPolicy }}
      >
        <UTextEditor
          name="privacyPolicy"
          placeholder="Note: Enter details about your privacy policy here."
        />

        <Button
          htmlType="submit"
          type="primary"
          size="large"
          className="w-full rounded-xl"
          icon={<Edit size={18} />}
          loading={isLoading}
        >
          Save Changes
        </Button>
      </FormWrapper>
    </section>
  );
}
