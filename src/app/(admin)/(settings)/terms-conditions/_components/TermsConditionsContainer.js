"use client";

import FormWrapper from "@/components/Form/FormWrapper";
import UTextEditor from "@/components/Form/UTextEditor";
import useSettingApi from "@/hooks/api/useSettingApi";
import { useUpdateSettingsDataMutation } from "@/redux/api/settingsApi";
import catchAsync from "@/utils/catchAsync";
import { Button } from "antd";
import { Edit } from "lucide-react";
import { toast } from "react-toastify";

export default function TermsConditionsContainer() {
  const { terms_conditions } = useSettingApi();

  const [updateFn, { isLoading }] = useUpdateSettingsDataMutation();

  const handleSubmit = (data) => {
    catchAsync(async () => {
      await updateFn(data).unwrap();
      toast.success("Terms and Conditions Updated Successfully");
    });
  };
  return (
    <section>
      <h3 className="mb-6 text-2xl font-semibold">Terms and Conditions</h3>

      <FormWrapper onSubmit={handleSubmit} defaultValues={{ terms_conditions }}>
        <UTextEditor
          name="terms_conditions"
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
