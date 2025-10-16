"use client";

import { useSession } from "next-auth/react";
import { AddProjectDialog } from "~/components/shared/AddProjectDialog";
import { ProjectCard } from "~/components/shared/ProjectCard";
import { ProjectCardSkeleton } from "~/components/shared/ProjectCardSkeleton";
import { env } from "~/env";
import { api } from "~/trpc/react";

import { Separator } from "~/components/ui/separator";
import { AddTestimonialDialog } from "~/components/shared/AddTestimonialDialog";
import { TestimonialCard } from "~/components/shared/TestimonialCard";
import { TestimonialCardSkeleton } from "~/components/shared/TestimonialCardSkeleton";

export default function HomePage() {
  const {
    data: projects,
    isLoading: isProjectsLoading,
    error: projectsError,
  } = api.project.getAll.useQuery();

  const {
    data: testimonials,
    isLoading: isTestimonialsLoading,
    error: testimonialsError,
  } = api.testimonial.getAllPublic.useQuery();

  const { data: session, status: sessionStatus } = useSession();

  const isAdmin = session?.user.email === env.NEXT_PUBLIC_ADMIN_EMAIL;
  const isLoggedIn = sessionStatus === "authenticated";

  if (isProjectsLoading || isTestimonialsLoading) {
    return (
      <main className="container mx-auto space-y-12 px-4 py-8">
        <section className="space-y-6">
          <h1 className="text-xl font-bold lg:text-4xl">My Projects</h1>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <ProjectCardSkeleton />
            <ProjectCardSkeleton />
            <ProjectCardSkeleton />
          </div>
        </section>

        <Separator />

        <section className="space-y-6">
          <h1 className="text-xl font-bold lg:text-4xl">Testimonials</h1>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <TestimonialCardSkeleton />
            <TestimonialCardSkeleton />
            <TestimonialCardSkeleton />
          </div>
        </section>
      </main>
    );
  }

  if (projectsError || testimonialsError) {
    return (
      <main className="container mx-auto p-4">
        <p className="text-destructive">
          Error loading data:{" "}
          {projectsError?.message ?? testimonialsError?.message}
        </p>
      </main>
    );
  }

  return (
    <main className="container mx-auto space-y-12 px-4 py-8">
      <section id="projects" className="space-y-6">
        <div className="flex flex-col items-start gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex-1 space-y-2">
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
          <p className="text-muted-foreground">No projects yet! Coming soon.</p>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {projects?.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        )}
      </section>

      <Separator />

      <section id="testimonials" className="space-y-6">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 space-y-2">
            <h1 className="text-xl font-bold lg:text-4xl">Testimonials</h1>
            <p className="text-muted-foreground text-justify text-sm leading-relaxed font-normal tracking-wide lg:text-xl">
              What people say about working with me. Feel free to leave one if
              you&apos;re logged in!
            </p>
          </div>
          {isLoggedIn && !isAdmin && <AddTestimonialDialog />}
        </div>
        {testimonials?.length === 0 ? (
          <p className="text-muted-foreground">
            Be the first to leave a testimonial!
          </p>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {testimonials?.map((testimonial) => (
              <TestimonialCard key={testimonial.id} testimonial={testimonial} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
