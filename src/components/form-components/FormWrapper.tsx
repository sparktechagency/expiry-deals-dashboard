/* eslint-disable  @typescript-eslint/no-explicit-any */
"use client";

import { envConfig } from "@/config/envConfig";
import { Form } from "antd";
import { useEffect } from "react";
import {
  FieldValues,
  FormProvider,
  Resolver,
  SubmitHandler,
  useForm,
  UseFormProps,
} from "react-hook-form";

interface FormWrapperProps {
  onSubmit: SubmitHandler<any>;
  children: React.ReactNode;
  defaultValues?: FieldValues;
  resolver?: Resolver<any>;
  className?: string;
}

export default function FormWrapper({
  onSubmit,
  children,
  defaultValues,
  resolver,
  className,
}: FormWrapperProps) {
  const formConfig: UseFormProps = {};

  if (resolver) {
    formConfig["resolver"] = resolver;
  }

  // Set default values
  const methods = useForm(formConfig);

  useEffect(() => {
    if (defaultValues) {
      methods.reset(defaultValues);
    }
  }, [defaultValues, methods]);

  const handleSubmit = (data: FieldValues) => {
    onSubmit(data);

    if (envConfig.nodeEnv !== "development") {
      methods.reset();
    }
  };

  return (
    <FormProvider {...methods}>
      <Form
        layout="vertical"
        onFinish={methods.handleSubmit(handleSubmit)}
        className={className}
      >
        {children}
      </Form>
    </FormProvider>
  );
}
