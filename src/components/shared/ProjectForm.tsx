"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import type { inferRouterOutputs } from "@trpc/server";
import NextImage from "next/image"; // ⬅️ alias
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

const MAX_BYTES = 1_000_000;
const MAX_START_DIM = 1920;
const MIN_DIM = 720;
const MIME_OUT = "image/webp";

async function blobToDataURL(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const fr = new FileReader();
    fr.onloadend = () =>
      typeof fr.result === "string" ? resolve(fr.result) : reject(new Error("Failed to convert blob"));
    fr.onerror = () => reject(new Error("Failed to convert blob"));
    fr.readAsDataURL(blob);
  });
}

function fitWithin(w: number, h: number, maxW: number, maxH: number) {
  const scale = Math.min(maxW / w, maxH / h, 1);
  return { w: Math.round(w * scale), h: Math.round(h * scale) };
}

function loadImageFromFile(file: File): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img: HTMLImageElement = new window.Image(); // ⬅️ gunakan global constructor
    img.decoding = "async";
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error("Failed to load image"));
    img.src = URL.createObjectURL(file);
  });
}

async function compressToUnder1MB(file: File): Promise<Blob> {
  if (file.size <= MAX_BYTES) return file;

  const img = await loadImageFromFile(file);
  let { w, h } = fitWithin(
    img.naturalWidth || img.width,
    img.naturalHeight || img.height,
    MAX_START_DIM,
    MAX_START_DIM
  );

  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d", { alpha: true });
  if (!ctx) throw new Error("Canvas not supported");

  let quality = 0.92;

  for (;;) {
    canvas.width = w;
    canvas.height = h;
    ctx.clearRect(0, 0, w, h);
    ctx.drawImage(img, 0, 0, w, h);

    const blob: Blob | null = await new Promise((resolve) =>
      canvas.toBlob(resolve, MIME_OUT, quality)
    );
    if (!blob) throw new Error("Failed to compress image");

    if (blob.size <= MAX_BYTES) return blob;

    if (quality > 0.5) {
      quality = Math.max(0.5, quality - 0.12);
      continue;
    }

    if (w > MIN_DIM || h > MIN_DIM) {
      w = Math.max(MIN_DIM, Math.round(w * 0.85));
      h = Math.max(MIN_DIM, Math.round(h * 0.85));
      quality = 0.9;
      continue;
    }

    return blob; // fallback
  }
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
    onError: (error: unknown) => {
      const msg = error instanceof Error ? error.message : "Upload failed.";
      toast.error(`Upload failed: ${msg}`);
    },
    onSettled: () => {
      setIsUploading(false);
    },
  });

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      setIsUploading(true);
      toast.message("Optimizing image...", { description: "Compressing to ≤ 1 MB" });

      const blob = await compressToUnder1MB(file);
      const dataUrl = await blobToDataURL(blob);

      uploadMutation.mutate({ file: dataUrl });
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : "Failed to process image.";
      toast.error(message);
      setIsUploading(false);
    }
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
    onError: (error: unknown) => {
      const msg = error instanceof Error ? error.message : "Failed to create.";
      toast.error(msg);
    },
  });

  const updateMutation = api.project.update.useMutation({
    onSuccess: async () => {
      toast.success("Project has been updated");
      await utils.project.getAll.invalidate();
      await revalidateProjectsAction();
      router.refresh();
      onFormSubmit();
    },
    onError: (error: unknown) => {
      const msg = error instanceof Error ? error.message : "Failed to update.";
      toast.error(msg);
    },
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
                <NextImage
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
