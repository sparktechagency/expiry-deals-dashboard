"use client";

import FormWrapper from "@/components/Form/FormWrapper";
import UTextEditor from "@/components/Form/UTextEditor";
import useSettingApi from "@/hooks/api/useSettingApi";
import { useUpdateSettingsDataMutation } from "@/redux/api/settingsApi";
import catchAsync from "@/utils/catchAsync";
import { Button } from "antd";
import { Edit } from "lucide-react";
import { toast } from "react-toastify";

export default function PrivacyPolicyContainer() {
  const { privacy_policy } = useSettingApi();

  const [updateFn, { isLoading }] = useUpdateSettingsDataMutation();

  const handleSubmit = (data) => {
    catchAsync(async () => {
      await updateFn(data).unwrap();
      toast.success("Privacy Policy Updated Successfully");
    });
  };

  return (
    <section>
      <h3 className="mb-6 text-2xl font-semibold">Privacy Policy</h3>

      <FormWrapper onSubmit={handleSubmit} defaultValues={{ privacy_policy }}>
        <UTextEditor
          name="privacy_policy"
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
