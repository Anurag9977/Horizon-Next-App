"use client";

import { formAction } from "@/utils/types";
import { UseFormReturn } from "react-hook-form";
import { z, ZodSchema } from "zod";
import { useEffect, useState } from "react";
import { toast } from "../ui/use-toast";
import { Form } from "../ui/form";

type FormContainerProps = {
  form: UseFormReturn<any>;
  formSchema: ZodSchema;
  action: formAction;
  children: React.ReactNode;
};

function FormContainer({
  form,
  formSchema,
  action,
  children,
}: FormContainerProps) {
  const [message, setMessage] = useState("");

  async function onSubmit(data: z.infer<typeof formSchema>) {
    const formData = new FormData();
    Object.keys(data).forEach((key) => formData.append(key, data[key]));
    const result = await action(formData);
    setMessage(result?.message);
  }

  useEffect(() => {
    if (message) {
      toast({ description: message });
    }
  }, [message]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>{children}</form>
    </Form>
  );
}
export default FormContainer;
