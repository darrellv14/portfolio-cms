"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import type { inferRouterOutputs } from "@trpc/server";
import NextImage from "next/image"; // ⬅️ alias, hindari bentrok dengan global Image()
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
import { revalidateExperiencesAction } from "~/lib/actions";
import type { AppRouter } from "~/server/api/root";
import { api } from "~/trpc/react";

type RouterOutput = inferRouterOutputs<AppRouter>;
type Experience = RouterOutput["experience"]["getAll"][number];

const experienceSchema = z.object({
  title: z.string().min(1, "Title is required."),
  company: z.string().min(1, "Company name is required."),
  dateRange: z.string().min(1, "Date range is required."),
  description: z.string().min(1, "Description is required."),
  logoUrl: z.string().url("Logo is required. Please upload one."),
});

type ExperienceFormValues = z.infer<typeof experienceSchema>;

interface ExperienceFormProps {
  onFormSubmit: () => void;
  initialData?: Experience;
}

/** ——— Kompresi gambar: target ≤ 1 MB ——— */
const MAX_BYTES = 1_000_000;
const MAX_START_DIM = 1024;
const MIN_DIM = 256;
const MIME_OUT = "image/webp";

function fitWithin(w: number, h: number, maxW: number, maxH: number) {
  const scale = Math.min(maxW / w, maxH / h, 1);
  return { w: Math.round(w * scale), h: Math.round(h * scale) };
}

async function blobToDataURL(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const fr = new FileReader();
    fr.onloadend = () =>
      typeof fr.result === "string" ? resolve(fr.result) : reject(new Error("Failed to convert blob"));
    fr.onerror = () => reject(new Error("Failed to convert blob"));
    fr.readAsDataURL(blob);
  });
}

function loadImageFromBlob(blob: Blob): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(blob);
    const img: HTMLImageElement = new window.Image(); // ⬅️ gunakan global constructor
    img.decoding = "async";
    img.onload = () => {
      URL.revokeObjectURL(url);
      resolve(img);
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("Failed to load image"));
    };
    img.src = url;
  });
}

async function compressRasterToUnder1MB(file: File): Promise<Blob> {
  if (file.size <= MAX_BYTES) return file;

  const img = await loadImageFromBlob(file);
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

  // turunkan quality → kecilkan dimensi → loop sampai ≤ 1 MB
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
      quality = 0.88;
      continue;
    }

    return blob;
  }
}

async function compressSvgToUnder1MB(file: File): Promise<Blob> {
  if (file.size <= MAX_BYTES) return file;

  const img = await loadImageFromBlob(file);
  const natW = img.naturalWidth || 1024;
  const natH = img.naturalHeight || 1024;
  let { w, h } = fitWithin(natW, natH, MAX_START_DIM, MAX_START_DIM);

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

    if (quality > 0.6) {
      quality = Math.max(0.6, quality - 0.12);
      continue;
    }

    if (w > MIN_DIM || h > MIN_DIM) {
      w = Math.max(MIN_DIM, Math.round(w * 0.85));
      h = Math.max(MIN_DIM, Math.round(h * 0.85));
      quality = 0.9;
      continue;
    }

    return blob;
  }
}

async function compressToUnder1MB(file: File): Promise<Blob> {
  if (file.type === "image/svg+xml") return compressSvgToUnder1MB(file);
  return compressRasterToUnder1MB(file);
}

export const ExperienceForm = ({
  onFormSubmit,
  initialData,
}: ExperienceFormProps) => {
  const router = useRouter();
  const isEditMode = !!initialData;

  const [isUploading, setIsUploading] = useState(false);
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string | null>(
    initialData?.logoUrl ?? null,
  );

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<ExperienceFormValues>({
    resolver: zodResolver(experienceSchema),
    defaultValues: initialData ?? {},
  });

  useEffect(() => {
    if (initialData?.logoUrl) {
      setUploadedImageUrl(initialData.logoUrl);
      setValue("logoUrl", initialData.logoUrl);
    }
  }, [initialData, setValue]);

  const utils = api.useUtils();

  const uploadMutation = api.image.upload.useMutation({
    onSuccess: (data) => {
      toast.success("Logo uploaded successfully!");
      setUploadedImageUrl(data.url);
      setValue("logoUrl", data.url, { shouldValidate: true });
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
      toast.message("Optimizing logo...", { description: "Compressing to ≤ 1 MB" });

      const blob = await compressToUnder1MB(file);
      const dataUrl = await blobToDataURL(blob);

      uploadMutation.mutate({ file: dataUrl });
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : "Failed to process logo.";
      toast.error(message);
      setIsUploading(false);
    }
  };

  const createMutation = api.experience.create.useMutation({
    onSuccess: async () => {
      toast.success("Experience has been added");
      await utils.experience.getAll.invalidate();
      await revalidateExperiencesAction();
      router.refresh();
      onFormSubmit();
      reset();
    },
    onError: (error: unknown) => {
      const msg = error instanceof Error ? error.message : "Failed to create.";
      toast.error(msg);
    },
  });

  const updateMutation = api.experience.update.useMutation({
    onSuccess: async () => {
      toast.success("Experience has been updated");
      await utils.experience.getAll.invalidate();
      await revalidateExperiencesAction();
      router.refresh();
      onFormSubmit();
    },
    onError: (error: unknown) => {
      const msg = error instanceof Error ? error.message : "Failed to update.";
      toast.error(msg);
    },
  });

  const onSubmit = (data: ExperienceFormValues) => {
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
            <FieldLabel>Logo</FieldLabel>
            {uploadedImageUrl && (
              <div className="my-2">
                <NextImage
                  src={uploadedImageUrl}
                  alt="Logo preview"
                  width={80}
                  height={80}
                  className="rounded-md border object-contain"
                />
              </div>
            )}
            <Input
              type="file"
              accept="image/png, image/jpeg, image/webp, image/svg+xml"
              onChange={handleFileChange}
              disabled={isUploading}
            />
            {isUploading && (
              <p className="text-muted-foreground mt-2 text-sm">Uploading...</p>
            )}
            {errors.logoUrl && (
              <FieldError>{errors.logoUrl.message}</FieldError>
            )}
          </Field>
          <input type="hidden" {...register("logoUrl")} />
        </FieldGroup>
      </FieldSet>

      <Button
        type="submit"
        disabled={isFormPending || isUploading}
        className="w-full"
      >
        {isUploading
          ? "Uploading logo..."
          : isFormPending
            ? "Submitting..."
            : isEditMode
              ? "Save Changes"
              : "Add Experience"}
      </Button>
    </form>
  );
};
