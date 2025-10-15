"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";

import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Textarea } from "~/components/ui/textarea";
import {
  Field,
  FieldLabel,
  FieldError,
  FieldGroup,
  FieldSet,
  FieldLegend,
} from "~/components/ui/field";
import { api } from "~/trpc/react";

const projectSchema = z.object({
  title: z.string().min(1, "Title is required."),
  description: z.string().min(1, "Description is required."),
  imageURL: z.string().url("Please enter a valid URL."),
});

type ProjectFormValues = z.infer<typeof projectSchema>;

export const AddProjectForm = ({
  onFormSubmit,
}: {
  onFormSubmit: () => void;
}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProjectFormValues>({
    resolver: zodResolver(projectSchema),
  });

  const utils = api.useUtils();

  const createProjectMutation = api.project.create.useMutation({
    onSuccess: async () => {
      toast.success("Project has been created");
      reset();
      await utils.project.getAll.invalidate();
      onFormSubmit();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const onSubmit = (data: ProjectFormValues) => {
    createProjectMutation.mutate(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <FieldSet>
        <FieldLegend className="text-2xl font-semibold">
          Add New Project
        </FieldLegend>

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
            />
            {errors.description && (
              <FieldError>{errors.description.message}</FieldError>
            )}
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

      <Button type="submit" disabled={createProjectMutation.isPending}>
        {createProjectMutation.isPending ? "Submitting..." : "Add Project"}
      </Button>
    </form>
  );
};
