"use client";

import { PendingTestimonialCard } from "~/components/shared/PendingTestimonialCard";
import { PendingTestimonialCardSkeleton } from "~/components/shared/PendingTestimonialCardSkeleton";
import { api, type RouterOutputs } from "~/trpc/react";

type TestimonialWithUser =
  RouterOutputs["testimonial"]["getAllPending"][number];

type PendingTestimonialListProps = {
  initialPendingTestimonials: TestimonialWithUser[];
};

export function PendingTestimonialList({
  initialPendingTestimonials,
}: PendingTestimonialListProps) {
  const {
    data: pendingTestimonials,
    isLoading,
    error,
  } = api.testimonial.getAllPending.useQuery(undefined, {
    initialData: initialPendingTestimonials,
    refetchOnWindowFocus: false,
    staleTime: 60 * 1000,
  });

  if (error) {
    return (
      <div>
        <p className="text-destructive">Error: {error.message}</p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <PendingTestimonialCardSkeleton />
        <PendingTestimonialCardSkeleton />
      </div>
    );
  }

  if (pendingTestimonials.length === 0) {
    return (
      <p className="text-muted-foreground">
        There is no pending testimony right now.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
      {pendingTestimonials.map((testimonial) => (
        <PendingTestimonialCard
          key={testimonial.id}
          testimonial={testimonial}
        />
      ))}
    </div>
  );
}
