"use client";

import { useSession } from "next-auth/react";
import { ProjectCard } from "~/components/shared/ProjectCard";
import { ProjectDialog } from "~/components/shared/ProjectDialog";
import { Button } from "~/components/ui/button";
import { env } from "~/env";
import { api, type RouterOutputs } from "~/trpc/react";

type ProjectListProps = {
  initialProjectsPage: RouterOutputs["project"]["getAll"];
};

const TAKE = 6;

export function ProjectList({ initialProjectsPage }: ProjectListProps) {
  const { data: session } = useSession();
  const isAdmin = session?.user.email === env.NEXT_PUBLIC_ADMIN_EMAIL;

  const {
    data: projectPages,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = api.project.getAll.useInfiniteQuery(
    { take: TAKE },
    {
      initialData: {
        pages: [initialProjectsPage],
        pageParams: [null],
      },
      getNextPageParam: (lastPage) => lastPage.nextCursor ?? undefined,
      refetchOnWindowFocus: false,
      staleTime: Infinity,
    },
  );

  const projects = projectPages?.pages.flatMap((p) => p.items) ?? [];

  return (
    <>
      <div className="grid grid-cols-[1fr_auto] items-start gap-3">
        <h1 className="text-2xl font-bold 2xl:text-4xl">My Projects</h1>
        {isAdmin && (
          <div className="justify-self-end">
            <ProjectDialog />
          </div>
        )}
        <p className="text-muted-foreground col-span-2 text-justify text-sm leading-relaxed font-normal tracking-wide lg:text-lg 2xl:text-xl">
          This section showcases all of Darrell&apos;s project, mainly focusing
          on Web Development, Software Engineering, and Fullstack Developer.
        </p>
      </div>

      {projects.length > 0 ? (
        <>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                isAdmin={isAdmin}
              />
            ))}
          </div>

          <div className="mt-8 flex justify-center">
            <Button
              onClick={() => fetchNextPage()}
              disabled={!hasNextPage || isFetchingNextPage}
            >
              {isFetchingNextPage
                ? "Loading more..."
                : hasNextPage
                  ? "Load More"
                  : "No more projects"}
            </Button>
          </div>
        </>
      ) : (
        <p className="text-muted-foreground">No projects yet! Coming soon.</p>
      )}
    </>
  );
}

import { unstable_cache } from "next/cache";
import { api as serverApi } from "~/trpc/server";

const getCachedProjects = unstable_cache(
  async (take: number) => {
    return serverApi.project.getAll({ take });
  },
  ["projects_list"],
  {
    revalidate: 600,
  },
);

export async function Projects() {
  const initialProjectsPage = await getCachedProjects(TAKE);
  return <ProjectList initialProjectsPage={initialProjectsPage} />;
}
