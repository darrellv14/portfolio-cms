import { TestimonialCardSkeleton } from "~/components/shared/TestimonialCardSkeleton";
import { Button } from "~/components/ui/button";

export function TestimonialListSkeleton() {
  return (
    <>
      <div className="flex flex-col items-start gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex-1 space-y-2">
          <h1 className="text-2xl font-bold 2xl:text-4xl">Testimonials</h1>
          <p className="text-muted-foreground text-justify text-sm leading-relaxed font-normal tracking-wide lg:text-lg 2xl:text-xl">
            What people say about working with me. Feel free to leave one!
          </p>
        </div>
        <div className="bg-muted h-10 w-36 animate-pulse rounded-md" />
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <TestimonialCardSkeleton />
        <TestimonialCardSkeleton />
        <TestimonialCardSkeleton />
      </div>

      <div className="mt-8 flex justify-center">
        <Button disabled>Loading more...</Button>
      </div>
    </>
  );
}
