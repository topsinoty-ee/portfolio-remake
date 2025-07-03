import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { Textarea } from "~/components/ui/textarea";
import { Button } from "~/components/ui/button";
import { Toaster } from "~/components/ui/sonner";
import { toast } from "sonner";
import {
  useForm,
  type UseFormReturn,
  type FieldPath,
  type FieldValues,
  type ControllerRenderProps,
  type DefaultValues,
} from "react-hook-form";
import { standardSchemaResolver } from "@hookform/resolvers/standard-schema"; // have to find a way to align properly with zod...
import { cn } from "~/lib/utils";
import { useCallback, useMemo } from "react";
import type { ZodSchema } from "zod";

type FormFieldType = "text" | "email" | "tel" | "textarea";

interface FormFieldConfig<FormValues extends FieldValues> {
  name: FieldPath<FormValues>;
  label?: string;
  placeholder?: string;
  type?: FormFieldType;
  description?: string;
  disabled?: boolean;
  required?: boolean;
  className?: string;
}

interface BetterFormCallbackUtils<FormValues extends FieldValues> extends UseFormReturn<FormValues> {
  toast: typeof toast;
}

interface BetterFormProps<FormValues extends FieldValues> {
  formSchema: ZodSchema<FormValues>; // need to find a stricter solution
  fields: ReadonlyArray<FormFieldConfig<FormValues>>;
  onSubmit: (values: FormValues) => Promise<void>;
  defaultValues?: DefaultValues<FormValues>;
  submitButtonText?: string;
  className?: string;
  onSuccess?: (data: FormValues, utils: BetterFormCallbackUtils<FormValues>) => void;
  onError?: (error: unknown, utils: BetterFormCallbackUtils<FormValues>) => void;
}

export function BetterForm<FormValues extends FieldValues>({
  formSchema,
  fields,
  onSubmit,
  defaultValues,
  submitButtonText = "Submit",
  className = "",
  onSuccess,
  onError,
}: BetterFormProps<FormValues>) {
  const form = useForm<FormValues>({
    resolver: standardSchemaResolver(formSchema),
    defaultValues,
    mode: "onChange",
  });

  const callbackUtils: BetterFormCallbackUtils<FormValues> = useMemo(() => ({ ...form, toast }), [form]);

  const handleSubmit = useCallback(
    async (data: FormValues) => {
      try {
        await onSubmit(data);
        toast.success("Form submitted successfully!");
        onSuccess?.(data, callbackUtils);
      } catch (err) {
        toast.error("Failed to submit form. Please try again.");
        onError?.(err, callbackUtils);
      }
    },
    [onSubmit, onSuccess, onError, callbackUtils],
  );

  const renderField = useCallback(
    (fieldConfig: FormFieldConfig<FormValues>, field: ControllerRenderProps<FormValues, FieldPath<FormValues>>) => {
      const commonProps = {
        disabled: fieldConfig.disabled ?? false,
        placeholder: fieldConfig.placeholder,
      };

      switch (fieldConfig.type) {
        case "textarea":
          return <Textarea {...commonProps} {...field} />;
        default:
          return <Input type={fieldConfig.type ?? "text"} {...commonProps} {...field} />;
      }
    },
    [],
  );

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className={cn("space-y-6", className)}>
          <div className="space-y-4">
            {fields.map((fieldConfig) => (
              <FormField
                key={String(fieldConfig.name)}
                control={form.control}
                name={fieldConfig.name}
                render={({ field }) => (
                  <FormItem className={fieldConfig.className}>
                    {fieldConfig.label && (
                      <FormLabel>
                        {fieldConfig.label}
                        {fieldConfig.required && <span className="text-destructive ml-1">*</span>}
                      </FormLabel>
                    )}
                    <FormControl>{renderField(fieldConfig, field)}</FormControl>
                    {fieldConfig.description && <FormDescription>{fieldConfig.description}</FormDescription>}
                    <FormMessage />
                  </FormItem>
                )}
              />
            ))}
          </div>
          <Button type="submit" className="w-full" disabled={form.formState.isSubmitting || !form.formState.isValid}>
            {form.formState.isSubmitting ? "Submitting..." : submitButtonText}
          </Button>
        </form>
      </Form>
      <Toaster />
    </>
  );
}
