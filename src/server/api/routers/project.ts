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
      include: { createdBy: true },
    });
  }),

  create: adminProcedure
    .input(
      z.object({
        title: z.string().min(1),
        description: z.string().min(1),
        imageURL: z.string().url(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const newProject = await ctx.db.project.create({
        data: {
          title: input.title,
          description: input.description,
          imageURL: input.imageURL,
          createdById: ctx.session.user.id,
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
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const updatedProject = await ctx.db.project.update({
        where: { id: input.id },
        data: {
          title: input.title,
          description: input.description,
          imageURL: input.imageURL,
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
