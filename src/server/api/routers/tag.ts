import { createTRPCRouter, publicProcedure } from "../trpc";

export const tagRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.db.tag.findMany({
      orderBy: { name: "asc" },
      cacheStrategy: { ttl: 3600 },
    });
  }),
});
