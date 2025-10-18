"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import type { inferRouterOutputs } from "@trpc/server";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { Button } from "~/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "~/components/ui/field";
import { Input } from "~/components/ui/input";
import { Textarea } from "~/components/ui/textarea";
import type { AppRouter } from "~/server/api/root";
import { api } from "~/trpc/react";
import { revalidateExperiencesAction } from "~/lib/actions";

type RouterOutput = inferRouterOutputs<AppRouter>;
type Experience = RouterOutput["experience"]["getAll"][number];

const experienceSchema = z.object({
  title: z.string().min(1, "Title is required."),
  company: z.string().min(1, "Company name is required."),
  dateRange: z.string().min(1, "Date range is required."),
  description: z.string().min(1, "Description is required."),
  logoUrl: z.string().url("Please enter a valid logo URL."),
});

type ExperienceFormValues = z.infer<typeof experienceSchema>;

interface ExperienceFormProps {
  onFormSubmit: () => void;
  initialData?: Experience;
}

export const ExperienceForm = ({
  onFormSubmit,
  initialData,
}: ExperienceFormProps) => {
  const isEditMode = !!initialData;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ExperienceFormValues>({
    resolver: zodResolver(experienceSchema),
    defaultValues: initialData ?? {},
  });

  const utils = api.useUtils();

  const createMutation = api.experience.create.useMutation({
    onSuccess: async () => {
      toast.success("Experience has been added");
      await utils.experience.getAll.invalidate();
      await revalidateExperiencesAction();
      onFormSubmit();
      reset();
    },
    onError: (error) => toast.error(error.message),
  });

  const updateMutation = api.experience.update.useMutation({
    onSuccess: async () => {
      toast.success("Experience has been updated");
      await utils.experience.getAll.invalidate();
      await revalidateExperiencesAction();
      onFormSubmit();
    },
    onError: (error) => toast.error(error.message),
  });

  const onSubmit = (data: ExperienceFormValues) => {
    if (isEditMode && initialData) {
      updateMutation.mutate({ id: initialData.id, ...data });
    } else {
      createMutation.mutate(data);
    }
  };

  const isPending = createMutation.isPending || updateMutation.isPending;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <FieldSet>
        <FieldGroup>
          <Field>
            <FieldLabel>Title</FieldLabel>
            <Input
              {...register("title")}
              placeholder="e.g., Backend Developer"
            />
            {errors.title && <FieldError>{errors.title.message}</FieldError>}
          </Field>

          <Field>
            <FieldLabel>Company</FieldLabel>
            <Input
              {...register("company")}
              placeholder="e.g., PT Bank Central Asia Tbk"
            />
            {errors.company && (
              <FieldError>{errors.company.message}</FieldError>
            )}
          </Field>

          <Field>
            <FieldLabel>Date Range</FieldLabel>
            <Input
              {...register("dateRange")}
              placeholder="e.g., July 2025 - Now"
            />
            {errors.dateRange && (
              <FieldError>{errors.dateRange.message}</FieldError>
            )}
          </Field>

          <Field>
            <FieldLabel>Description</FieldLabel>
            <Textarea
              {...register("description")}
              placeholder="Describe your role..."
              rows={5}
            />
            {errors.description && (
              <FieldError>{errors.description.message}</FieldError>
            )}
          </Field>

          <Field>
            <FieldLabel>Logo URL</FieldLabel>
            <Input
              {...register("logoUrl")}
              placeholder="https://example.com/logo.png"
            />
            {errors.logoUrl && (
              <FieldError>{errors.logoUrl.message}</FieldError>
            )}
          </Field>
        </FieldGroup>
      </FieldSet>

      <Button type="submit" disabled={isPending} className="w-full">
        {isPending
          ? "Submitting..."
          : isEditMode
            ? "Save Changes"
            : "Add Experience"}
      </Button>
    </form>
  );
};
