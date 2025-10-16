"use client";

import { useSession } from "next-auth/react";
import { AddProjectDialog } from "~/components/shared/AddProjectDialog";
import { ProjectCard } from "~/components/shared/ProjectCard";
import { ProjectCardSkeleton } from "~/components/shared/ProjectCardSkeleton";
import { env } from "~/env";
import { api } from "~/trpc/react";

export default function HomePage() {
  const { data: projects, isLoading, error } = api.project.getAll.useQuery();
  const { data: session } = useSession();

  const isAdmin = session?.user.email === env.NEXT_PUBLIC_ADMIN_EMAIL;

  if (isLoading) {
    return (
      <main className="container mx-auto px-4 py-8">
        <section className="space-y-6">
          <h1 className="text-xl font-bold lg:text-4xl">My Projects</h1>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <ProjectCardSkeleton />
            <ProjectCardSkeleton />
            <ProjectCardSkeleton />
          </div>
        </section>
      </main>
    );
  }

  if (error) {
    return (
      <main className="container mx-auto p-4">
        <p>Error: {error.message}</p>
      </main>
    );
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <section id="projects" className="space-y-6">
        <div className="flex items-center space-x-12">
          <div className="flex flex-col space-y-2">
            <h1 className="text-xl font-bold lg:text-4xl">My Projects</h1>
            <p className="text-muted-foreground text-justify text-sm leading-relaxed font-normal tracking-wide lg:text-xl">
              This section showcases all of Darrell&apos;s project, mainly
              focusing on Web Development, Software Engineering, and Fullstack
              Developer.
            </p>
          </div>
          {isAdmin && <AddProjectDialog />}
        </div>
        {projects?.length === 0 ? (
          <p className="text-muted-foreground">
            Belum ada proyek. Silakan tambahkan proyek pertama Anda.
          </p>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {projects?.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
