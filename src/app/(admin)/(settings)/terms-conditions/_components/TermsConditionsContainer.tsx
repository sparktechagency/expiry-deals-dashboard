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

export default function TermsConditionsContainer() {
  const { data } = useGetSettingsDataQuery({});

  const [updateFn, { isLoading }] = useUpdateSettingsDataMutation();

  const handleSubmit = (data: any) => {
    catchAsync(async () => {
      await updateFn(data).unwrap();
      toast.success("Terms and Conditions Updated Successfully");
    });
  };
  return (
    <section>
      <h3 className="mb-6 text-2xl font-semibold">Terms and Conditions</h3>

      <FormWrapper
        onSubmit={handleSubmit}
        defaultValues={{ termsAndConditions: data?.termsAndConditions }}
      >
        <UTextEditor
          name="termsAndConditions"
          placeholder="Note: Enter details about your terms and conditions here."
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
