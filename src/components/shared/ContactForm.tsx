"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { api } from "~/trpc/react";
import { motion } from "framer-motion";
import { useSession, signIn } from "next-auth/react";
import { Loader2 } from "lucide-react";
import { useEffect } from "react";

import { Button } from "~/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "~/components/ui/field";
import { Textarea } from "~/components/ui/textarea";
import { Input } from "~/components/ui/input";

const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters long."),
  email: z.string().email("Please enter a valid email address."),
  message: z.string().min(10, "Message must be at least 10 characters long."),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

export function ContactForm() {
  const { data: session, status } = useSession();

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
  });

  useEffect(() => {
    if (status === "authenticated" && session?.user) {
      setValue("name", session.user.name ?? "");
      setValue("email", session.user.email ?? "");
      const pendingMessage = localStorage.getItem("pending-contact-message");
      if (pendingMessage) {
        setValue("message", pendingMessage);
        localStorage.removeItem("pending-contact-name");
        localStorage.removeItem("pending-contact-email");
        localStorage.removeItem("pending-contact-message");
      }
    }
  }, [status, session, setValue]);

  const sendEmailMutation = api.contact.sendEmail.useMutation({
    onSuccess: () => {
      toast.success("Your message has been sent successfully!");
      reset({
        name: session?.user?.name ?? "",
        email: session?.user?.email ?? "",
        message: "",
      });
    },
    onError: (error) => {
      toast.error(`Failed to send message: ${error.message}`);
    },
  });

  const handleFormSubmit = (data: ContactFormValues) => {
    if (status === "authenticated") {
      if (sendEmailMutation.isPending) return;
      // Backend membaca name/email dari session; kirim message saja
      sendEmailMutation.mutate({ message: data.message });
    } else {
      localStorage.setItem("pending-contact-name", data.name);
      localStorage.setItem("pending-contact-email", data.email);
      localStorage.setItem("pending-contact-message", data.message);
      void signIn("google");
    }
  };

  const isPending = sendEmailMutation.isPending;
  const isAuthenticated = status === "authenticated";

  return (
    <motion.form
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      onSubmit={handleSubmit(handleFormSubmit)}
      className="space-y-3"
    >
      <FieldSet>
        <h1 className="text-2xl font-bold 2xl:text-4xl">Contact Me</h1>
        {/* GRID: mobile 1 kolom; md+ 2 kolom x 2 baris.
            Textarea di kanan span 2 baris supaya setinggi Name+Email */}
        <FieldGroup className="grid grid-cols-1 gap-4 md:grid-cols-2 md:grid-rows-2 md:gap-6">
          {/* Your Name - kiri atas */}
          <Field className="md:col-start-1 md:row-start-1">
            <FieldLabel>Your Name</FieldLabel>
            <Input
              {...register("name")}
              placeholder="e.g., John Doe"
              disabled={isAuthenticated || isPending}
            />
            {errors.name && <FieldError>{errors.name.message}</FieldError>}
          </Field>

          {/* Your Email - kiri bawah */}
          <Field className="md:col-start-1 md:row-start-2">
            <FieldLabel>Your Email</FieldLabel>
            <Input
              {...register("email")}
              type="email"
              placeholder="e.g., john.doe@example.com"
              disabled={isAuthenticated || isPending}
            />
            {errors.email && <FieldError>{errors.email.message}</FieldError>}
          </Field>

          {/* Your Message - kanan, spanning 2 baris */}
          <Field className="md:col-start-2 md:row-span-2 md:h-full">
            <FieldLabel>Your Message</FieldLabel>
            <Textarea
              {...register("message")}
              placeholder="Let's talk about..."
              rows={8}
              disabled={isPending}
              className="md:h-full md:resize-none"
            />
            {errors.message && (
              <FieldError>{errors.message.message}</FieldError>
            )}
          </Field>
        </FieldGroup>
      </FieldSet>

      {/* Tombol di bawah grid, rata tengah.
          Full width di mobile, auto width di desktop */}
      <div className="flex justify-center">
        <Button type="submit" disabled={isPending} className="w-full md:w-auto">
          {isPending ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Sending...
            </>
          ) : (
            "Send Message"
          )}
        </Button>
      </div>
    </motion.form>
  );
}
