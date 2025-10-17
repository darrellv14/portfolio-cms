import { createTRPCRouter } from "~/server/api/trpc";
import { projectRouter } from "~/server/api/routers/project";
import { testimonialRouter } from "./routers/testimonial";
import { experienceRouter } from "./routers/experience";
import { tagRouter } from "./routers/tag";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  project: projectRouter,
  testimonial: testimonialRouter,
  experience: experienceRouter,
  tag: tagRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

/**
 * Create a server-side caller for the tRPC API.
 * @example
 * const trpc = createCaller(createContext);
 * const res = await trpc.project.all();
 * ^? Project[]
 */
// Ganti cara kita membuat createCaller
export const createCaller = appRouter.createCaller;
