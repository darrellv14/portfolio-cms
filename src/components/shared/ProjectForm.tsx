"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import type { inferRouterOutputs } from "@trpc/server";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
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
import { revalidateProjectsAction } from "~/lib/actions";
import type { AppRouter } from "~/server/api/root";
import { api } from "~/trpc/react";

type RouterOutput = inferRouterOutputs<AppRouter>;
type ProjectListItem = RouterOutput["project"]["getAll"]["items"][number];

const projectSchema = z.object({
  title: z.string().min(1, "Title is required."),
  description: z.string().min(1, "Description is required."),
  imageURL: z.string().url("Image is required. Please upload one."),
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
  const router = useRouter();
  const isEditMode = !!initialData;

  const [isUploading, setIsUploading] = useState(false);
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string | null>(
    initialData?.imageURL ?? null,
  );

  const {
    register,
    handleSubmit,
    reset,
    setValue,
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

  useEffect(() => {
    if (initialData?.imageURL) {
      setUploadedImageUrl(initialData.imageURL);
      setValue("imageURL", initialData.imageURL);
    }
  }, [initialData, setValue]);

  const utils = api.useUtils();

  const uploadMutation = api.image.upload.useMutation({
    onSuccess: (data) => {
      toast.success("Image uploaded successfully!");
      setUploadedImageUrl(data.url);
      setValue("imageURL", data.url, { shouldValidate: true });
    },
    onError: (error) => {
      toast.error(`Upload failed: ${error.message}`);
    },
    onSettled: () => {
      setIsUploading(false);
    },
  });

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsUploading(true);

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      if (typeof reader.result === "string") {
        uploadMutation.mutate({ file: reader.result });
      } else {
        toast.error("Failed to read file.");
        setIsUploading(false);
      }
    };
    reader.onerror = () => {
      toast.error("Error reading file.");
      setIsUploading(false);
    };
  };

  const createMutation = api.project.create.useMutation({
    onSuccess: async () => {
      toast.success("Project has been created");
      await utils.project.getAll.invalidate();
      await revalidateProjectsAction();
      router.refresh();
      onFormSubmit();
      reset();
    },
    onError: (error) => toast.error(error.message),
  });

  const updateMutation = api.project.update.useMutation({
    onSuccess: async () => {
      toast.success("Project has been updated");
      await utils.project.getAll.invalidate();
      await revalidateProjectsAction();
      router.refresh();
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

  const isFormPending = createMutation.isPending || updateMutation.isPending;

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
            <FieldLabel>Image</FieldLabel>
            {uploadedImageUrl && (
              <div className="my-2">
                <Image
                  src={uploadedImageUrl}
                  alt="Project image preview"
                  width={160}
                  height={90}
                  className="rounded-md border object-cover"
                />
              </div>
            )}
            <Input
              type="file"
              accept="image/png, image/jpeg, image/webp"
              onChange={handleFileChange}
              disabled={isUploading}
            />
            {isUploading && (
              <p className="text-muted-foreground mt-2 text-sm">Uploading...</p>
            )}
            {errors.imageURL && (
              <FieldError>{errors.imageURL.message}</FieldError>
            )}
          </Field>
          <input type="hidden" {...register("imageURL")} />
        </FieldGroup>
      </FieldSet>

      <Button
        type="submit"
        disabled={isFormPending || isUploading}
        className="w-full"
      >
        {isUploading
          ? "Uploading image..."
          : isFormPending
            ? "Submitting..."
            : isEditMode
              ? "Save Changes"
              : "Add Project"}
      </Button>
    </form>
  );
};
