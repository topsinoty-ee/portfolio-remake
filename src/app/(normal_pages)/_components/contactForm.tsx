"use client";
import { z } from "zod";
import { BetterForm } from "~/components/ui/betterForm";
import { toast } from "sonner";

const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  email: z.string().email("Please enter a valid email address."),
  message: z.string().min(10, "Message must be at least 10 characters."),
});

export const ContactForm = () => {
  const handleSubmit = async (values: z.infer<typeof contactFormSchema>) => {
    try {
      console.log("Form submitted with values:", values);
      toast.success("Message sent successfully!");
    } catch (error) {
      console.error(error);
      toast.error("Failed to send message. Please try again later.");
      return error instanceof Error ? Promise.reject(error) : Promise.reject(new Error(String(error)));
    }
  };

  return (
    <BetterForm
      className="bg-card border-card drop-shadow-accent h-full w-full max-w-md rounded-2xl p-5 drop-shadow-sm"
      formSchema={contactFormSchema}
      fields={[
        { name: "name", placeholder: "John Doe", required: true },
        { name: "email", placeholder: "mail@example.com", required: true },
        {
          name: "message",
          placeholder: "Your message here...",
          type: "textarea",
          required: true,
        },
      ]}
      defaultValues={{
        name: "",
        email: "",
        message: "",
      }}
      onSubmit={handleSubmit}
      onSuccess={(_, { reset }) => reset()}
    />
  );
};
