import { z } from "zod";
import {
  adminProcedure,
  createTRPCRouter,
  publicProcedure,
} from "~/server/api/trpc";

export const projectRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.db.project.findMany({
      orderBy: { createdAt: "desc" },
      include: { createdBy: true, tags: true },
    });
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
      const { title, description, imageURL, tags: tagsString } = input;

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
        include: {
          tags: true,
        },
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
      const { id, title, description, imageURL, tags: tagsString } = input;

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
