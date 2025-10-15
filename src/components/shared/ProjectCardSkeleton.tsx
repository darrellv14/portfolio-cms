import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Skeleton } from "~/components/ui/skeleton";

export const ProjectCardSkeleton = () => {
  return (
    <Card className="flex flex-col overflow-hidden">
      {/* Kita ganti warna default skeleton agar lebih kontras */}
      <Skeleton className="h-72 w-full bg-slate-300/60 dark:bg-gray-800/60" />

      <CardHeader>
        <CardTitle>
          <Skeleton className="h-6 w-3/4 bg-slate-300/60 dark:bg-gray-800/60" />
        </CardTitle>
      </CardHeader>

      <CardContent className="flex-1 space-y-2">
        <Skeleton className="h-4 w-full bg-slate-300/60 dark:bg-gray-800/60" />
        <Skeleton className="h-4 w-5/6 bg-slate-300/60 dark:bg-gray-800/60" />
        <Skeleton className="h-4 w-full bg-slate-300/60 dark:bg-gray-800/60" />
      </CardContent>
    </Card>
  );
};
