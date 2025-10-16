import { Skeleton } from "~/components/ui/skeleton";

export const ExperienceCardSkeleton = () => {
  return (
    <div className="flex flex-col items-start gap-4 rounded-lg border p-4 md:flex-row md:items-center md:space-x-4 md:p-6">
      {/* Logo Placeholder */}
      <Skeleton className="mx-auto h-20 w-20 rounded bg-slate-300/60 md:mx-0 md:h-16 md:w-16 dark:bg-gray-800/60" />

      {/* Text Placeholder */}
      <div className="flex-1 space-y-3 text-center md:text-left">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <Skeleton className="mx-auto h-5 w-3/4 bg-slate-300/60 md:mx-0 md:w-1/2 dark:bg-gray-800/60" />
          <Skeleton className="mx-auto mt-2 h-4 w-1/3 bg-slate-300/60 md:mx-0 md:mt-0 md:w-1/4 dark:bg-gray-800/60" />
        </div>

        <div className="space-y-2">
          <Skeleton className="h-4 w-full bg-slate-300/60 dark:bg-gray-800/60" />
          <Skeleton className="h-4 w-5/6 bg-slate-300/60 dark:bg-gray-800/60" />
          <Skeleton className="hidden h-4 w-4/6 bg-slate-300/60 md:block dark:bg-gray-800/60" />
        </div>
      </div>
    </div>
  );
};
