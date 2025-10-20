import { Suspense } from "react";
import { PendingTestimonialCardSkeleton } from "~/components/shared/PendingTestimonialCardSkeleton";
import { PendingTestimonialList } from "~/components/shared/PendingTestimonialList";
import { auth } from "~/server/auth";
import { api } from "~/trpc/server";
import { env } from "~/env";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin",
};

export default async function AdminTestimonialsPage() {
  const session = await auth();

  if (session?.user.email !== env.ADMIN_EMAIL) {
    return (
      <div className="flex h-60 items-center justify-center">
        <p className="text-destructive">Hey! No no yahh :D</p>
      </div>
    );
  }

  const initialPendingTestimonials = await api.testimonial.getAllPending();

  return (
    <main className="space-y-12 py-8">
      <h1 className="text-xl font-bold lg:text-4xl">Pending Testimonials</h1>

      <Suspense
        fallback={
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <PendingTestimonialCardSkeleton />
            <PendingTestimonialCardSkeleton />
          </div>
        }
      >
        <PendingTestimonialList
          initialPendingTestimonials={initialPendingTestimonials}
        />
      </Suspense>
    </main>
  );
}
