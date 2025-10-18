import { z } from "zod";
import {
  adminProcedure,
  createTRPCRouter,
  publicProcedure,
} from "~/server/api/trpc";

export const projectRouter = createTRPCRouter({
  getAll: publicProcedure
    .input(
      z
        .object({
          take: z.number().min(1).max(48).default(12),
          cursor: z.number().optional(),
        })
        .optional(),
    )
    .query(async ({ ctx, input }) => {
      const take = input?.take ?? 12;
      const cursor = input?.cursor;

      const rows = await ctx.db.project.findMany({
        take: take + 1,
        ...(cursor ? { cursor: { id: cursor } } : {}),
        orderBy: { id: "desc" },
        select: {
          id: true,
          title: true,
          description: true,
          imageURL: true,
          tags: { select: { id: true, name: true } },
        },
        cacheStrategy: { ttl: 3600 },
      });

      let nextCursor: number | undefined;
      if (rows.length > take) {
        const next = rows.pop()!;
        nextCursor = next.id;
      }

      return { items: rows, nextCursor };
    }),

  create: adminProcedure
    .input(
      z.object({
        title: z.string().min(1),
        description: z.string().min(1),
        imageURL: z.string().url(),
        tags: z.string().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { tags: tagsString } = input;
      const tagNames = tagsString
        ? tagsString
            .split(",")
            .map((tag) => tag.trim().toLowerCase())
            .filter((tag) => tag.length > 0)
        : [];
      const newProject = await ctx.db.project.create({
        data: {
          title: input.title,
          description: input.description,
          imageURL: input.imageURL,
          createdById: ctx.session.user.id,
          tags: {
            connectOrCreate: tagNames.map((name) => ({
              where: { name },
              create: { name },
            })),
          },
        },
        include: { tags: true },
      });
      return newProject;
    }),

  update: adminProcedure
    .input(
      z.object({
        id: z.number(),
        title: z.string().min(1),
        description: z.string().min(1),
        imageURL: z.string().url(),
        tags: z.string().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { tags: tagsString } = input;
      const tagNames = tagsString
        ? tagsString
            .split(",")
            .map((tag) => tag.trim().toLowerCase())
            .filter((tag) => tag.length > 0)
        : [];
      const updatedProject = await ctx.db.project.update({
        where: { id: input.id },
        data: {
          title: input.title,
          description: input.description,
          imageURL: input.imageURL,
          tags: {
            set: [],
            connectOrCreate: tagNames.map((name) => ({
              where: { name },
              create: { name },
            })),
          },
        },
      });
      return updatedProject;
    }),

  delete: adminProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ ctx, input }) => {
      const deletedProject = await ctx.db.project.delete({
        where: { id: input.id },
      });
      return { success: true, deletedId: deletedProject.id };
    }),
});
