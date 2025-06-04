"use client";

import FormWrapper from "@/components/Form/FormWrapper";
import UTextEditor from "@/components/Form/UTextEditor";
import useSettingApi from "@/hooks/api/useSettingApi";
import { useUpdateSettingsDataMutation } from "@/redux/api/settingsApi";
import catchAsync from "@/utils/catchAsync";
import { Button } from "antd";
import { Edit } from "lucide-react";
import { toast } from "react-toastify";

export default function AboutUsContainer() {
  const { about_us } = useSettingApi();

  const [updateFn, { isLoading }] = useUpdateSettingsDataMutation();

  const handleSubmit = (data) => {
    catchAsync(async () => {
      await updateFn(data).unwrap();
      toast.success("About Us Updated Successfully");
    });
  };
  return (
    <section>
      <h3 className="mb-6 text-2xl font-semibold">About Us</h3>

      <FormWrapper onSubmit={handleSubmit} defaultValues={{ about_us }}>
        <UTextEditor
          name="about_us"
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
