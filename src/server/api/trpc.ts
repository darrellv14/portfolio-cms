/**
 * YOU PROBABLY DON'T NEED TO EDIT THIS FILE, UNLESS:
 * 1. You want to modify request context (see Part 1).
 * 2. You want to create a new middleware or type of procedure (see Part 3).
 *
 * TL;DR - This is where all the tRPC server stuff is created and plugged in. The pieces you will
 * need to use are documented accordingly near the end.
 */
import { initTRPC, TRPCError } from "@trpc/server";
import superjson from "superjson";
import { ZodError } from "zod";

import { auth } from "~/server/auth";
import { db } from "~/server/db";
import { env } from "~/env"; // <-- 1. Impor env

/**
 * 1. CONTEXT
 * ... (tidak ada perubahan di sini)
 */
export const createTRPCContext = async (opts: { headers: Headers }) => {
  const session = await auth();

  return {
    db,
    session,
    ...opts,
  };
};

/**
 * 2. INITIALIZATION
 * ... (tidak ada perubahan di sini)
 */
const t = initTRPC.context<typeof createTRPCContext>().create({
  transformer: superjson,
  errorFormatter({ shape, error }) {
    return {
      ...shape,
      data: {
        ...shape.data,
        zodError:
          error.cause instanceof ZodError ? error.cause.flatten() : null,
      },
    };
  },
});

/**
 * 3. ROUTER & PROCEDURE (THE IMPORTANT BIT)
 */
export const createTRPCRouter = t.router;

// ... (timingMiddleware tidak ada perubahan)
const timingMiddleware = t.middleware(async ({ next, path }) => {
  const start = Date.now();
  if (t._config.isDev) {
    const waitMs = Math.floor(Math.random() * 400) + 100;
    await new Promise((resolve) => setTimeout(resolve, waitMs));
  }
  const result = await next();
  const end = Date.now();
  console.log(`[TRPC] ${path} took ${end - start}ms to execute`);
  return result;
});

export const publicProcedure = t.procedure.use(timingMiddleware);

// --- PERUBAHAN DIMULAI DI SINI ---

/**
 * Middleware untuk memastikan user sudah login.
 */
const enforceUserIsAuthed = t.middleware(({ ctx, next }) => {
  if (!ctx.session?.user) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }
  return next({
    ctx: {
      session: { ...ctx.session, user: ctx.session.user },
    },
  });
});

/**
 * Protected (authenticated) procedure
 */
export const protectedProcedure = t.procedure
  .use(timingMiddleware)
  .use(enforceUserIsAuthed);

/**
 * 2. Buat middleware khusus untuk admin.
 * Ini berjalan SETELAH user dipastikan login.
 */
const adminMiddleware = t.middleware(({ ctx, next }) => {
  if (ctx.session?.user.email !== env.ADMIN_EMAIL) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "Hanya admin yang bisa melakukan aksi ini.",
    });
  }
  return next({
    ctx: {
      session: ctx.session,
    },
  });
});

/**
 * 3. Buat dan ekspor adminProcedure.
 * Ini adalah gabungan dari protectedProcedure + adminMiddleware.
 */
export const adminProcedure = protectedProcedure.use(adminMiddleware);

// --- PERUBAHAN SELESAI ---
