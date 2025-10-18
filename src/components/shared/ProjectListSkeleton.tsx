import { ProjectCardSkeleton } from "~/components/shared/ProjectCardSkeleton";
import { Button } from "~/components/ui/button";

export function ProjectListSkeleton() {
  return (
    <>
      <div className="grid grid-cols-[1fr_auto] items-start gap-3">
        <h1 className="text-2xl font-bold 2xl:text-4xl">My Projects</h1>
        <div className="bg-muted hidden h-10 w-36 animate-pulse rounded-md md:block" />
        <p className="text-muted-foreground col-span-2 text-justify text-sm leading-relaxed font-normal tracking-wide lg:text-lg 2xl:text-xl">
          This section showcases all of Darrell&apos;s project, mainly focusing
          on Web Development, Software Engineering, and Fullstack Developer.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <ProjectCardSkeleton />
        <ProjectCardSkeleton />
        <ProjectCardSkeleton />
        <ProjectCardSkeleton />
        <ProjectCardSkeleton />
        <ProjectCardSkeleton />
      </div>

      <div className="mt-8 flex justify-center">
        <Button disabled>Loading more...</Button>
      </div>
    </>
  );
}
