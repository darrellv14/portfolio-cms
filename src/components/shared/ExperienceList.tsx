"use client";

import { useSession } from "next-auth/react";
import { ExperienceCard } from "~/components/shared/ExperienceCard";
import { ExperienceDialog } from "~/components/shared/ExperienceDialog";
import { env } from "~/env";
import { api, type RouterOutputs } from "~/trpc/react";

type ExperienceListProps = {
  initialExperiences: RouterOutputs["experience"]["getAll"];
};

export function ExperienceList({ initialExperiences }: ExperienceListProps) {
  const { data: session } = useSession();
  const isAdmin = session?.user.email === env.NEXT_PUBLIC_ADMIN_EMAIL;

  const { data: experiences } = api.experience.getAll.useQuery(undefined, {
    initialData: initialExperiences,
    refetchOnWindowFocus: false,
    staleTime: Infinity,
  });

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
        {isAdmin && <ExperienceDialog />}
      </div>

      {experiences.length > 0 ? (
        <div className="flex flex-col gap-6">
          {experiences.map((experience, index) => (
            <ExperienceCard
              key={experience.id}
              experience={experience}
              isAdmin={isAdmin}
              index={index}
            />
          ))}
        </div>
      ) : (
        <p className="text-muted-foreground">No experience yet! Coming soon.</p>
      )}
    </>
  );
}
