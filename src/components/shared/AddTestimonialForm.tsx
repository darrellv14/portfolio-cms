"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { api } from "~/trpc/react";
import { Button } from "../ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "../ui/field";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";

const testimonialSchema = z.object({
  description: z
    .string()
    .min(10, "Testimoninya panjangan dikit atuh :(")
    .max(500),
  position: z
    .string()
    .min(5, "Kamu CEO @ Bank Indonesia yh")
    .max(100, "Jabatan apaan tuh panjang bener"),
});

type TestimonialFormValues = z.infer<typeof testimonialSchema>;

interface AddTestimonialFormProps {
  onFormSubmit: () => void;
}

export const AddTestimonialForm = ({
  onFormSubmit,
}: AddTestimonialFormProps) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TestimonialFormValues>({
    resolver: zodResolver(testimonialSchema),
  });

  const createTestimonialMutation = api.testimonial.create.useMutation({
    onSuccess: () => {
      toast.success(
        "Thank you! Your testimony has been sucessfully sent and is waiting for review.",
      );
      reset();
      onFormSubmit();
    },
    onError: (error) => {
      if (error.data?.code === "UNAUTHORIZED") {
        toast.error("You must login to send a testimony..");
      } else {
        toast.error(`Failed to send testimony, reason: ${error.message}`);
      }
    },
  });

  const onSubmit = (data: TestimonialFormValues) => {
    createTestimonialMutation.mutate(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <FieldSet>
        <FieldGroup>
          <Field>
            <FieldLabel>Role / Position</FieldLabel>
            <Input
              {...register("position")}
              placeholder="e.g., SR IT Specialist@ IT BCA"
            />
            {errors.position && (
              <FieldError>{errors.position.message}</FieldError>
            )}
          </Field>

          <Field>
            <FieldLabel>Your Testimony</FieldLabel>
            <Textarea
              {...register("description")}
              placeholder="Darrell Valentino is an eager individual that is very professional in his field..."
            />
            {errors.description && (
              <FieldError>{errors.description.message}</FieldError>
            )}
          </Field>
        </FieldGroup>
      </FieldSet>

      <Button
        type="submit"
        disabled={createTestimonialMutation.isPending}
        className="w-full"
      >
        {createTestimonialMutation.isPending ? "Sending..." : "Send Testimony"}
      </Button>
    </form>
  );
};
