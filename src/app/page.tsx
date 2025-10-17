"use client";

import { useSession } from "next-auth/react";
import { useEffect, useRef, useState } from "react";
import { env } from "~/env";
import { api } from "~/trpc/react";

import { Button } from "~/components/ui/button";
import { Separator } from "~/components/ui/separator";

import { ProjectCard } from "~/components/shared/ProjectCard";
import { ProjectCardSkeleton } from "~/components/shared/ProjectCardSkeleton";
import { ProjectDialog } from "~/components/shared/ProjectDialog";

import { AddTestimonialDialog } from "~/components/shared/AddTestimonialDialog";
import { TestimonialCard } from "~/components/shared/TestimonialCard";
import { TestimonialCardSkeleton } from "~/components/shared/TestimonialCardSkeleton";

import { ExperienceCard } from "~/components/shared/ExperienceCard";
import { ExperienceCardSkeleton } from "~/components/shared/ExperienceCardSkeleton";
import { ExperienceDialog } from "~/components/shared/ExperienceDialog";

import { HeroSection } from "~/components/shared/HeroSection";

/* ----------------- hook kecil: in-view once ----------------- */
function useInViewOnce<T extends HTMLElement = HTMLElement>(
  rootMargin = "200px",
) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    if (!ref.current || inView) return;
    const el = ref.current;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setInView(true);
            io.disconnect();
            break;
          }
        }
      },
      { root: null, rootMargin, threshold: 0.01 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [inView, rootMargin]);

  return { ref, inView };
}

const TAKE = 12;

export default function HomePage() {
  const { data: session } = useSession();
  const isAdmin = session?.user.email === env.NEXT_PUBLIC_ADMIN_EMAIL;

  // Section anchors: kita baru fetch saat hampir terlihat
  const exp = useInViewOnce<HTMLDivElement>("300px"); // experience
  const proj = useInViewOnce<HTMLDivElement>("300px"); // projects
  const testi = useInViewOnce<HTMLDivElement>("300px"); // testimonials

  /* ----------------- QUERIES: enabled hanya saat in-view ----------------- */
  const {
    data: experiences,
    isLoading: isExperiencesLoading,
    error: experiencesError,
  } = api.experience.getAll.useQuery(undefined, {
    enabled: exp.inView, // <— pentiiiing
    staleTime: 5 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
    refetchOnWindowFocus: false,
    retry: 1,
  });

  const {
    data: projectPages,
    isLoading: isProjectsLoading,
    error: projectsError,
    hasNextPage: hasNextProjects,
    fetchNextPage: fetchNextProjects,
    isFetchingNextPage: isFetchingNextProjects,
  } = api.project.getAll.useInfiniteQuery(
    { take: TAKE }, // param ke backend
    {
      enabled: proj.inView,
      getNextPageParam: (lastPage) => lastPage.nextCursor ?? undefined,
      staleTime: 5 * 60 * 1000,
      gcTime: 30 * 60 * 1000,
      refetchOnWindowFocus: false,
      placeholderData: (prev) => prev,
      retry: 1,
    },
  );

  const projects = projectPages?.pages.flatMap((p) => p.items) ?? [];

  const {
    data: testimonialsData,
    isLoading: isTestimonialsLoading,
    error: testimonialsError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = api.testimonial.getAllPublic.useInfiniteQuery(
    { limit: 3 },
    {
      enabled: testi.inView, // <—
      getNextPageParam: (lastPage) => lastPage.nextCursor,
      staleTime: 5 * 60 * 1000,
      gcTime: 30 * 60 * 1000,
      refetchOnWindowFocus: false,
      retry: 1,
    },
  );

  const allTestimonials = testimonialsData?.pages.flatMap((p) => p.items);

  /* ----------------- HERO: tampil instan ----------------- */
  return (
    <>
      <div id="hero" className="relative mb-12 scroll-mt-24 md:scroll-mt-28">
        <HeroSection />
        <div className="container mx-auto px-4">
          <Separator className="relative z-10" />
        </div>
      </div>

      <main className="container mx-auto space-y-12 px-4 py-8">
        {/* ===================== EXPERIENCE ===================== */}
        <section
          id="experience"
          ref={exp.ref}
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

          {/* Belum inView → tampilkan placeholder ringan (atau kosong) */}
          {!exp.inView && (
            <div className="flex flex-col gap-6">
              <ExperienceCardSkeleton />
            </div>
          )}

          {/* Sudah inView: loading / error / data */}
          {exp.inView && isExperiencesLoading && (
            <div className="flex flex-col gap-6">
              <ExperienceCardSkeleton />
              <ExperienceCardSkeleton />
              <ExperienceCardSkeleton />
            </div>
          )}

          {exp.inView && experiencesError && (
            <p className="text-destructive">
              Error loading experiences: {experiencesError.message}
            </p>
          )}

          {exp.inView &&
            !isExperiencesLoading &&
            !experiencesError &&
            (experiences?.length ? (
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
              <p className="text-muted-foreground">
                No experience yet! Coming soon.
              </p>
            ))}
        </section>

        <Separator />

        {/* ===================== PROJECTS ===================== */}
        <section
          id="projects"
          ref={proj.ref}
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

          {!proj.inView && (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <ProjectCardSkeleton />
            </div>
          )}

          {proj.inView && isProjectsLoading && (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <ProjectCardSkeleton />
              <ProjectCardSkeleton />
              <ProjectCardSkeleton />
            </div>
          )}

          {proj.inView && projectsError && (
            <p className="text-destructive">
              Error loading projects: {projectsError.message}
            </p>
          )}

          {proj.inView &&
            !isProjectsLoading &&
            !projectsError &&
            (projects.length ? (
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

                {/* Load More (pagination) */}
                <div className="mt-8 flex justify-center">
                  <Button
                    onClick={() => fetchNextProjects()}
                    disabled={!hasNextProjects || isFetchingNextProjects}
                  >
                    {isFetchingNextProjects
                      ? "Loading more..."
                      : hasNextProjects
                        ? "Load More"
                        : "No more projects"}
                  </Button>
                </div>
              </>
            ) : (
              <p className="text-muted-foreground">
                No projects yet! Coming soon.
              </p>
            ))}
        </section>

        <Separator />

        {/* ===================== TESTIMONIALS ===================== */}
        <section
          id="testimonials"
          ref={testi.ref}
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

          {!testi.inView && (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <TestimonialCardSkeleton />
            </div>
          )}

          {testi.inView && isTestimonialsLoading && (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <TestimonialCardSkeleton />
              <TestimonialCardSkeleton />
              <TestimonialCardSkeleton />
            </div>
          )}

          {testi.inView && testimonialsError && (
            <p className="text-destructive">
              Error loading testimonials: {testimonialsError.message}
            </p>
          )}

          {testi.inView &&
            !isTestimonialsLoading &&
            !testimonialsError &&
            (allTestimonials?.length ? (
              <>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {allTestimonials.map((testimonial) => (
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
            ) : (
              <p className="text-muted-foreground">
                Be the first to leave a testimonial!
              </p>
            ))}
        </section>

        {/* Contact section nanti */}
        {/* <section id="contact" className="scroll-mt-24 md:scroll-mt-28" /> */}
      </main>
    </>
  );
}
