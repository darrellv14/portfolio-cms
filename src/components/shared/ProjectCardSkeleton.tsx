import { Skeleton } from "~/components/ui/skeleton";

export const ProjectCardSkeleton = () => {
  return (
    <div className="bg-card text-card-foreground relative animate-pulse overflow-hidden rounded-xl border shadow-sm">
      {/* Image placeholder */}
      <div className="relative h-60 w-full sm:h-72 md:h-80">
        <Skeleton className="bg-muted/60 dark:bg-muted/30 absolute inset-0 h-full w-full" />
      </div>

      {/* Overlay skeleton */}
      <div className="from-background/95 via-background/70 absolute inset-0 flex flex-col justify-end bg-gradient-to-t to-transparent p-4 md:p-6">
        {/* Title placeholder */}
        <Skeleton className="bg-muted/70 dark:bg-muted/40 mb-3 h-5 w-3/4 rounded" />

        {/* Description lines */}
        <div className="space-y-2">
          <Skeleton className="bg-muted/60 dark:bg-muted/30 h-4 w-full rounded" />
          <Skeleton className="bg-muted/60 dark:bg-muted/30 h-4 w-5/6 rounded" />
          <Skeleton className="bg-muted/60 dark:bg-muted/30 hidden h-4 w-4/6 rounded md:block" />
        </div>

        {/* Read more placeholder */}
        <Skeleton className="bg-primary/40 dark:bg-primary/30 mt-3 h-3 w-16 rounded" />
      </div>
    </div>
  );
};
