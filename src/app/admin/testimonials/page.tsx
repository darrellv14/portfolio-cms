"use client";

import { useSession } from "next-auth/react";
import { PendingTestimonialCard } from "~/components/shared/PendingTestimonialCard";
import { PendingTestimonialCardSkeleton } from "~/components/shared/PendingTestimonialCardSkeleton";
import { env } from "~/env";
import { api } from "~/trpc/react";

export default function AdminTestimonialsPage() {
  const { data: session, status: sessionStatus } = useSession();

  const {
    data: pendingTestimonials,
    isLoading,
    error,
  } = api.testimonial.getAllPending.useQuery(undefined, {
    enabled: session?.user.email === env.NEXT_PUBLIC_ADMIN_EMAIL,
  });

  if (sessionStatus === "loading") {
    return (
      <div className="space-y-6">
        <h1 className="text-xl font-bold lg:text-4xl">Pending Testimonials</h1>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <PendingTestimonialCardSkeleton />
          <PendingTestimonialCardSkeleton />
        </div>
      </div>
    );
  }

  if (session?.user.email !== env.NEXT_PUBLIC_ADMIN_EMAIL) {
    return (
      <div className="flex h-60 items-center justify-center">
        <p className="text-destructive">Hey! No no yahh :D</p>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <p className="text-destructive">Error: {error.message}</p>
      </div>
    );
  }

  return (
    <main className="container mx-auto space-y-12 px-4 py-8">
      <h1 className="text-xl font-bold lg:text-4xl">Pending Testimonials</h1>

      {isLoading ? (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <PendingTestimonialCardSkeleton />
          <PendingTestimonialCardSkeleton />
        </div>
      ) : pendingTestimonials?.length === 0 ? (
        <p className="text-muted-foreground">
          There is no pending testimony right now.
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {pendingTestimonials?.map((testimonial) => (
            <PendingTestimonialCard
              key={testimonial.id}
              testimonial={testimonial}
            />
          ))}
        </div>
      )}
    </main>
  );
}
