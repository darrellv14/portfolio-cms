import z from "zod";
import { adminProcedure, createTRPCRouter, publicProcedure } from "../trpc";

export const experienceRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.db.experience.findMany({
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        title: true,
        company: true,
        dateRange: true,
        description: true,
        logoUrl: true,
      },
      cacheStrategy: { ttl: 3600 },
    });
  }),

  create: adminProcedure
    .input(
      z.object({
        title: z.string().min(1),
        company: z.string().min(1),
        dateRange: z.string().min(1),
        description: z.string().min(1),
        logoUrl: z.string().url(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const newExperience = await ctx.db.experience.create({
        data: {
          title: input.title,
          company: input.company,
          dateRange: input.dateRange,
          description: input.description,
          logoUrl: input.logoUrl,
          createdById: ctx.session.user.id,
        },
      });
      return newExperience;
    }),

  update: adminProcedure
    .input(
      z.object({
        id: z.number(),
        title: z.string().min(1),
        company: z.string().min(1),
        dateRange: z.string().min(1),
        description: z.string().min(1),
        logoUrl: z.string().url(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const updatedExperience = await ctx.db.experience.update({
        where: {
          id: input.id,
        },
        data: {
          title: input.title,
          company: input.company,
          dateRange: input.dateRange,
          description: input.description,
          logoUrl: input.logoUrl,
        },
      });
      return updatedExperience;
    }),

  delete: adminProcedure
    .input(
      z.object({
        id: z.number(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const deletedExperience = await ctx.db.experience.delete({
        where: {
          id: input.id,
        },
      });
      return { success: true, deletedId: deletedExperience.id };
    }),
});
