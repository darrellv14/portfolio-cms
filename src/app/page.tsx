"use client";

import { useSession } from "next-auth/react";
import { ProjectDialog } from "~/components/shared/ProjectDialog";
import { ProjectCard } from "~/components/shared/ProjectCard";
import { ProjectCardSkeleton } from "~/components/shared/ProjectCardSkeleton";
import { env } from "~/env";
import { api } from "~/trpc/react";

import { Button } from "~/components/ui/button";
import { Separator } from "~/components/ui/separator";
import { AddTestimonialDialog } from "~/components/shared/AddTestimonialDialog";
import { TestimonialCard } from "~/components/shared/TestimonialCard";
import { TestimonialCardSkeleton } from "~/components/shared/TestimonialCardSkeleton";
import { ExperienceDialog } from "~/components/shared/ExperienceDialog";
import { ExperienceCard } from "~/components/shared/ExperienceCard";
import { ExperienceCardSkeleton } from "~/components/shared/ExperienceCardSkeleton";
import { HeroSection } from "~/components/shared/HeroSection";
import { HeroSectionSkeleton } from "~/components/shared/HeroSectionSkeleton";

export default function HomePage() {
  const {
    data: projects,
    isLoading: isProjectsLoading,
    error: projectsError,
  } = api.project.getAll.useQuery();

  const {
    data: experiences,
    isLoading: isExperiencesLoading,
    error: experiencesError,
  } = api.experience.getAll.useQuery();

  const {
    data: testimonialsData,
    isLoading: isTestimonialsLoading,
    error: testimonialsError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = api.testimonial.getAllPublic.useInfiniteQuery(
    { limit: 3 },
    { getNextPageParam: (lastPage) => lastPage.nextCursor },
  );

  const { data: session } = useSession();
  const isAdmin = session?.user.email === env.NEXT_PUBLIC_ADMIN_EMAIL;
  const allTestimonials = testimonialsData?.pages.flatMap((page) => page.items);

  if (
    isProjectsLoading ||
    isExperiencesLoading ||
    (isTestimonialsLoading && !allTestimonials)
  ) {
    return (
      <>
        <section id="hero" className="mb-12 scroll-mt-24 md:scroll-mt-28">
          <HeroSectionSkeleton />
        </section>

        <main className="container mx-auto space-y-12 px-4 py-8">
          <section className="space-y-6">
            <h1 className="text-2xl font-bold 2xl:text-4xl">Work Experience</h1>
            <div className="flex flex-col gap-6">
              <ExperienceCardSkeleton />
              <ExperienceCardSkeleton />
              <ExperienceCardSkeleton />
            </div>
          </section>

          <Separator />

          <section className="space-y-6">
            <h1 className="text-2xl font-bold 2xl:text-4xl">My Projects</h1>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <ProjectCardSkeleton />
              <ProjectCardSkeleton />
              <ProjectCardSkeleton />
            </div>
          </section>

          <Separator />

          <section className="space-y-6">
            <h1 className="text-2xl font-bold 2xl:text-4xl">Testimonials</h1>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <TestimonialCardSkeleton />
              <TestimonialCardSkeleton />
              <TestimonialCardSkeleton />
            </div>
          </section>
        </main>
      </>
    );
  }

  if (projectsError || testimonialsError || experiencesError) {
    return (
      <>
        <section id="hero" className="mb-12 scroll-mt-24 md:scroll-mt-28">
          <HeroSectionSkeleton />
        </section>

        <main className="container mx-auto p-4">
          <p className="text-destructive">
            Error loading data:{" "}
            {projectsError?.message ??
              testimonialsError?.message ??
              experiencesError?.message}
          </p>
        </main>
      </>
    );
  }

  return (
    <>
      <section id="hero" className="mb-12 scroll-mt-24 md:scroll-mt-28">
        <HeroSection />
      </section>

      <Separator />

      <main className="container mx-auto space-y-12 px-4 py-8">
        <section
          id="experience"
          className="scroll-mt-24 space-y-6 md:scroll-mt-28"
        >
          <div className="flex flex-col items-start gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex-1 space-y-2">
              <h1 className="text-2xl font-bold 2xl:text-4xl">
                Work Experience
              </h1>
              <p className="text-muted-foreground text-justify text-sm leading-relaxed font-normal tracking-wide lg:text-lg 2xl:text-xl">
                My professional journey and key roles I&apos;ve undertaken in
                the tech industry.
              </p>
            </div>
            {isAdmin && <ExperienceDialog />}
          </div>

          {experiences?.length === 0 ? (
            <p className="text-muted-foreground">
              No experience yet! Coming soon.
            </p>
          ) : (
            <div className="flex flex-col gap-6">
              {experiences?.map((experience, index) => (
                <ExperienceCard
                  key={experience.id}
                  experience={experience}
                  isAdmin={isAdmin}
                  index={index}
                />
              ))}
            </div>
          )}
        </section>

        <Separator />

        <section
          id="projects"
          className="scroll-mt-24 space-y-6 md:scroll-mt-28"
        >
          <div className="grid grid-cols-[1fr_auto] items-start gap-3">
            <h1 className="text-2xl font-bold 2xl:text-4xl">My Projects</h1>
            {isAdmin && (
              <div className="justify-self-end">
                <ProjectDialog />
              </div>
            )}

            <p className="text-muted-foreground col-span-2 text-justify text-sm leading-relaxed font-normal tracking-wide lg:text-lg 2xl:text-xl">
              This section showcases all of Darrell&apos;s project, mainly
              focusing on Web Development, Software Engineering, and Fullstack
              Developer.
            </p>
          </div>

          {projects?.length === 0 ? (
            <p className="text-muted-foreground">
              No projects yet! Coming soon.
            </p>
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {projects?.map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  isAdmin={isAdmin}
                />
              ))}
            </div>
          )}
        </section>

        <Separator />

        <section
          id="testimonials"
          className="scroll-mt-24 space-y-6 md:scroll-mt-28"
        >
          <div className="flex flex-col items-start gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex-1 space-y-2">
              <h1 className="text-2xl font-bold 2xl:text-4xl">Testimonials</h1>
              <p className="text-muted-foreground text-justify text-sm leading-relaxed font-normal tracking-wide lg:text-lg 2xl:text-xl">
                What people say about working with me. Feel free to leave one!
              </p>
            </div>
            {!isAdmin && <AddTestimonialDialog />}
          </div>

          {allTestimonials?.length === 0 ? (
            <p className="text-muted-foreground">
              Be the first to leave a testimonial!
            </p>
          ) : (
            <>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {allTestimonials?.map((testimonial) => (
                  <TestimonialCard
                    key={testimonial.id}
                    testimonial={testimonial}
                  />
                ))}
              </div>

              {hasNextPage && (
                <div className="mt-8 flex justify-center">
                  <Button
                    onClick={() => fetchNextPage()}
                    disabled={isFetchingNextPage}
                  >
                    {isFetchingNextPage ? "Loading more..." : "Load More"}
                  </Button>
                </div>
              )}
            </>
          )}
        </section>

        {/* Contact nanti aja; id disiapkan untuk future-proof */}
        {/* <section id="contact" className="scroll-mt-24 md:scroll-mt-28">...</section> */}
      </main>
    </>
  );
}
