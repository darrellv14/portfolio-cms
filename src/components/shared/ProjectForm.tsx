"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import type { inferRouterOutputs } from "@trpc/server";

import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Textarea } from "~/components/ui/textarea";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "~/components/ui/field";
import { api } from "~/trpc/react";
import type { AppRouter } from "~/server/api/root";

type RouterOutput = inferRouterOutputs<AppRouter>;
type ProjectListItem = RouterOutput["project"]["getAll"]["items"][number];

const projectSchema = z.object({
  title: z.string().min(1, "Title is required."),
  description: z.string().min(1, "Description is required."),
  imageURL: z.string().url("Please enter a valid URL."),
  tags: z.string().optional(),
});

type ProjectFormValues = z.infer<typeof projectSchema>;

interface ProjectFormProps {
  onFormSubmit: () => void;
  initialData?: ProjectListItem;
}

export const ProjectForm = ({
  onFormSubmit,
  initialData,
}: ProjectFormProps) => {
  const isEditMode = !!initialData;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProjectFormValues>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      title: initialData?.title ?? "",
      description: initialData?.description ?? "",
      imageURL: initialData?.imageURL ?? "",
      tags:
        initialData?.tags
          ?.map((tag: { id: number; name: string }) => tag.name)
          .join(", ") ?? "",
    },
  });

  const utils = api.useUtils();

  const createMutation = api.project.create.useMutation({
    onSuccess: async () => {
      toast.success("Project has been created");
      await utils.project.getAll.invalidate();
      onFormSubmit();
      reset();
    },
    onError: (error) => toast.error(error.message),
  });

  const updateMutation = api.project.update.useMutation({
    onSuccess: async () => {
      toast.success("Project has been updated");
      await utils.project.getAll.invalidate();
      onFormSubmit();
    },
    onError: (error) => toast.error(error.message),
  });

  const onSubmit = (data: ProjectFormValues) => {
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
            <Input {...register("title")} placeholder="My Awesome Project" />
            {errors.title && <FieldError>{errors.title.message}</FieldError>}
          </Field>

          <Field>
            <FieldLabel>Description</FieldLabel>
            <Textarea
              {...register("description")}
              placeholder="A brief description of the project."
              rows={5}
            />
            {errors.description && (
              <FieldError>{errors.description.message}</FieldError>
            )}
          </Field>

          <Field>
            <FieldLabel>Tags (pisahkan dengan koma)</FieldLabel>
            <Input
              {...register("tags")}
              placeholder="e.g., React, Next.js, Tailwind CSS"
            />
            {errors.tags && <FieldError>{errors.tags.message}</FieldError>}
          </Field>

          <Field>
            <FieldLabel>Image URL</FieldLabel>
            <Input
              {...register("imageURL")}
              placeholder="https://example.com/image.png"
            />
            {errors.imageURL && (
              <FieldError>{errors.imageURL.message}</FieldError>
            )}
          </Field>
        </FieldGroup>
      </FieldSet>

      <Button type="submit" disabled={isPending} className="w-full">
        {isPending
          ? "Submitting..."
          : isEditMode
            ? "Save Changes"
            : "Add Project"}
      </Button>
    </form>
  );
};
