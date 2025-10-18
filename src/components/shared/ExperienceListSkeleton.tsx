import { ExperienceCardSkeleton } from "~/components/shared/ExperienceCardSkeleton";

export function ExperienceListSkeleton() {
  return (
    <>
      <div className="flex flex-col items-start gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex-1 space-y-2">
          <h1 className="text-2xl font-bold 2xl:text-4xl">Work Experience</h1>
          <p className="text-muted-foreground text-justify text-sm leading-relaxed font-normal tracking-wide lg:text-lg 2xl:text-xl">
            My professional journey and key roles I&apos;ve undertaken in the
            tech industry.
          </p>
        </div>
        <div className="bg-muted hidden h-10 w-36 animate-pulse rounded-md md:block" />
      </div>

      <div className="flex flex-col gap-6">
        <ExperienceCardSkeleton isEven={false} />
        <ExperienceCardSkeleton isEven={true} />
        <ExperienceCardSkeleton isEven={false} />
      </div>
    </>
  );
}
