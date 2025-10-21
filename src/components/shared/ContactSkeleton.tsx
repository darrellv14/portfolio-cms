import { Skeleton } from "~/components/ui/skeleton";

export function ContactSkeleton() {
  return (
    <section id="contact" className="scroll-mt-24 space-y-6 md:scroll-mt-28">
      {/* Title and Description Skeleton */}
      <div className="space-y-2">
        <Skeleton className="h-8 w-48 md:h-10 2xl:h-12" />
        <Skeleton className="h-5 w-full max-w-lg lg:h-6 2xl:h-7" />
      </div>

      {/* Form Skeleton */}
      <div className="space-y-4">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {/* Name Field Skeleton */}
          <div className="space-y-2">
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-10 w-full" />
          </div>
          {/* Email Field Skeleton */}
          <div className="space-y-2">
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-10 w-full" />
          </div>
        </div>
        {/* Message Field Skeleton */}
        <div className="space-y-2">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-32 w-full" />
        </div>
        {/* Button Skeleton */}
        <Skeleton className="h-10 w-full" />
      </div>
    </section>
  );
}
