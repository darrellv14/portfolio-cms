import { z } from "zod";
import { v2 as cloudinary } from "cloudinary";

import { adminProcedure, createTRPCRouter } from "~/server/api/trpc";

export const imageRouter = createTRPCRouter({
  upload: adminProcedure
    .input(
      z.object({
        file: z.string(),
      }),
    )
    .mutation(async ({ input }) => {
      try {
        const result = await cloudinary.uploader.upload(input.file, {});

        return {
          url: result.secure_url,
        };
      } catch (error) {
        console.error("Cloudinary Upload Error:", error);
        throw new Error("Failed to upload image to Cloudinary.");
      }
    }),
});
