"use client";

import { useSession } from "next-auth/react";
import { AddTestimonialDialog } from "~/components/shared/AddTestimonialDialog";
import { TestimonialCard } from "~/components/shared/TestimonialCard";
import { Button } from "~/components/ui/button";
import { env } from "~/env";
import { api, type RouterOutputs } from "~/trpc/react";

type TestimonialListProps = {
  initialTestimonialsPage: RouterOutputs["testimonial"]["getAllPublic"];
};

const LIMIT = 3;

export function TestimonialList({
  initialTestimonialsPage,
}: TestimonialListProps) {
  const { data: session } = useSession();
  const isAdmin = session?.user.email === env.NEXT_PUBLIC_ADMIN_EMAIL;

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    api.testimonial.getAllPublic.useInfiniteQuery(
      { limit: LIMIT },
      {
        initialData: {
          pages: [initialTestimonialsPage],
          pageParams: [undefined],
        },
        getNextPageParam: (lastPage) => lastPage.nextCursor,
        refetchOnWindowFocus: false,
        staleTime: Infinity,
      },
    );

  const allTestimonials = data?.pages.flatMap((p) => p.items) ?? [];

  return (
    <>
      <div className="flex flex-col items-start gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex-1 space-y-2">
          <h1 className="text-2xl font-bold 2xl:text-4xl">Testimonials</h1>
          <p className="text-muted-foreground text-justify text-sm leading-relaxed font-normal tracking-wide lg:text-lg 2xl:text-xl">
            What people say about working with me. Feel free to leave one!
          </p>
        </div>
        {!isAdmin && <AddTestimonialDialog />}
      </div>

      {allTestimonials.length > 0 ? (
        <>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {allTestimonials.map((testimonial) => (
              <TestimonialCard key={testimonial.id} testimonial={testimonial} />
            ))}
          </div>
          {hasNextPage && (
            <div className="mt-8 flex justify-center">
              <Button
                onClick={() => fetchNextPage()}
                disabled={isFetchingNextPage}
              >
                {isFetchingNextPage ? "Loading more..." : "Load More"}
              </Button>
            </div>
          )}
        </>
      ) : (
        <p className="text-muted-foreground">
          Be the first to leave a testimonial!
        </p>
      )}
    </>
  );
}
