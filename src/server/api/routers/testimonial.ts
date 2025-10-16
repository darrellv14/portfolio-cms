import z from "zod";
import {
  adminProcedure,
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "../trpc";

export const testimonialRouter = createTRPCRouter({
  getAllPublic: publicProcedure.query(({ ctx }) => {
    return ctx.db.testimonial.findMany({
      where: {
        isApproved: true,
      },
      include: {
        createdBy: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }),

  getAllPending: adminProcedure.query(({ ctx }) => {
    return ctx.db.testimonial.findMany({
      where: {
        isApproved: false,
      },
      include: {
        createdBy: true,
      },
      orderBy: {
        createdAt: "asc",
      },
    });
  }),

  create: protectedProcedure
    .input(
      z.object({
        description: z.string().min(10, "Testimoninya panjangan dikit atuh :("),
        position: z.string().min(5, "Kamu CEO @ Bank Indonesia yh"),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { user } = ctx.session;
      const newTestimonial = await ctx.db.testimonial.create({
        data: {
          title: user.name ?? "Anonymous",
          description: input.description,
          position: input.position,
          avatarURL: user.image ?? "",
          createdById: user.id,
        },
      });
      return newTestimonial;
    }),

  approve: adminProcedure
    .input(
      z.object({
        id: z.number(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const updatedTestimonial = ctx.db.testimonial.update({
        where: {
          id: input.id,
        },
        data: {
          isApproved: true,
        },
      });
      return updatedTestimonial;
    }),

  delete: adminProcedure
    .input(
      z.object({
        id: z.number(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const deletedTestimonial = ctx.db.testimonial.delete({
        where: {
          id: input.id,
        },
      });
      return { success: true, deletedId: (await deletedTestimonial).id };
    }),
});
