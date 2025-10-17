import { Skeleton } from "~/components/ui/skeleton";

export const ProjectCardSkeleton = () => {
  return (
    <div className="group bg-card text-card-foreground relative overflow-hidden rounded-xl border shadow-sm transition-all duration-300">
      {/* Admin buttons placeholder (optional) */}
      <div className="absolute top-2 right-2 z-20 flex gap-1 opacity-0">
        <Skeleton className="h-8 w-8 rounded-md" />
        <Skeleton className="h-8 w-8 rounded-md" />
      </div>

      {/* Image placeholder */}
      <div className="relative h-84 w-full md:h-86">
        <Skeleton className="absolute inset-0 h-full w-full" />
      </div>

      {/* Content overlay */}
      <div className="from-background/90 via-background/50 absolute inset-0 flex flex-col justify-end bg-gradient-to-t to-transparent p-4 md:p-6">
        {/* Title placeholder */}
        <Skeleton className="mb-3 h-6 w-2/3 rounded" />

        {/* Description lines */}
        <div className="space-y-2">
          <Skeleton className="h-4 w-full rounded" />
          <Skeleton className="h-4 w-5/6 rounded" />
          <Skeleton className="h-4 w-4/5 rounded" />
        </div>

        {/* Read more + Badges row */}
        <div className="mt-3 flex items-center justify-between">
          <Skeleton className="h-4 w-20 rounded" />

          {/* Tags placeholder */}
          <div className="flex flex-wrap gap-1.5">
            <Skeleton className="h-5 w-12 rounded-full" />
            <Skeleton className="h-5 w-14 rounded-full" />
            <Skeleton className="h-5 w-10 rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
};
