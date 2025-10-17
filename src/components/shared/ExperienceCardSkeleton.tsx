import { Skeleton } from "~/components/ui/skeleton";
import { cn } from "~/lib/utils";

interface ExperienceCardSkeletonProps {
  isEven?: boolean;
}

export const ExperienceCardSkeleton = ({
  isEven = false,
}: ExperienceCardSkeletonProps) => {
  return (
    <div className="bg-card text-card-foreground flex w-full flex-col gap-4 rounded-lg border p-4 transition-shadow md:flex-row md:items-center md:gap-6 md:p-6">
      {/* Logo Placeholder */}
      <div
        className={cn(
          "relative mx-auto h-20 w-20 flex-shrink-0 md:mx-0 md:h-16 md:w-16",
          isEven && "md:order-3",
        )}
      >
        <Skeleton className="h-full w-full rounded" />
      </div>

      {/* Konten Utama (Judul, Tanggal, Deskripsi) */}
      <div
        className={cn(
          "flex-1 space-y-2 text-center md:text-left",
          isEven && "md:order-2",
        )}
      >
        <div
          className={cn(
            "flex flex-col-reverse md:flex-row md:items-center md:justify-between",
            isEven && "md:flex-row-reverse",
          )}
        >
          <Skeleton className="mx-auto h-5 w-3/4 md:mx-0 md:w-1/2" />
          <Skeleton className="mx-auto mb-1 h-4 w-1/3 md:mx-0 md:mb-0 md:w-1/4" />
        </div>

        {/* Deskripsi */}
        <div className="space-y-2 text-justify">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
          <Skeleton className="hidden h-4 w-4/6 md:block" />
        </div>
      </div>

      {/* Admin Buttons Placeholder (conditional to maintain spacing) */}
      <div
        className={cn(
          "ml-auto hidden shrink-0 self-start md:flex md:self-center",
          isEven && "md:order-1",
        )}
      >
        <Skeleton className="mr-1 h-9 w-9 rounded-md" />
        <Skeleton className="h-9 w-9 rounded-md" />
      </div>
    </div>
  );
};
