import { Separator } from "~/components/ui/separator";
import { HeroSection } from "~/components/shared/HeroSection";
import { api } from "~/trpc/server";
import { ExperienceList } from "~/components/shared/ExperienceList";
import { ProjectList } from "~/components/shared/ProjectList";
import { TestimonialList } from "~/components/shared/TestimonialList";
import { Suspense } from "react";
import { HeroSectionSkeleton } from "~/components/shared/HeroSectionSkeleton";

export default async function HomePage() {
  const initialExperiences = await api.experience.getAll();
  const initialProjectsPage = await api.project.getAll({ take: 6 });
  const initialTestimonialsPage = await api.testimonial.getAllPublic({
    limit: 3,
  });

  return (
    <>
      <div id="hero" className="relative mb-12 scroll-mt-24 md:scroll-mt-28">
        <Suspense fallback={<HeroSectionSkeleton />}>
          <HeroSection />
        </Suspense>
        <Separator className="relative z-10" />
      </div>

      <div className="space-y-12 py-8">
        <section
          id="experience"
          className="scroll-mt-24 space-y-6 md:scroll-mt-28"
        >
          <ExperienceList initialExperiences={initialExperiences} />
        </section>

        <Separator />

        <section
          id="projects"
          className="scroll-mt-24 space-y-6 md:scroll-mt-28"
        >
          <ProjectList initialProjectsPage={initialProjectsPage} />
        </section>

        <Separator />

        <section
          id="testimonials"
          className="scroll-mt-24 space-y-6 md:scroll-mt-28"
        >
          <TestimonialList initialTestimonialsPage={initialTestimonialsPage} />
        </section>
      </div>
    </>
  );
}
