import { Suspense } from "react";
import { HeroSection } from "~/components/shared/HeroSection";
import { HeroSectionSkeleton } from "~/components/shared/HeroSectionSkeleton";
import { Separator } from "~/components/ui/separator";

import { Experiences } from "~/components/shared/Experiences";
import { Projects } from "~/components/shared/Projects";
import { Testimonials } from "~/components/shared/Testimonials";

import { ExperienceListSkeleton } from "~/components/shared/ExperienceListSkeleton";
import { ProjectListSkeleton } from "~/components/shared/ProjectListSkeleton";
import { TestimonialListSkeleton } from "~/components/shared/TestimonialListSkeleton";
import { FloatingSocials } from "~/components/shared/FloatingSocials";
import { ContactSkeleton } from "~/components/shared/ContactSkeleton";
import { Contact } from "~/components/shared/Contact";

export default function HomePage() {
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
          <Suspense fallback={<ExperienceListSkeleton />}>
            <Experiences />
          </Suspense>
        </section>

        <Separator />

        <section
          id="projects"
          className="scroll-mt-24 space-y-6 md:scroll-mt-28"
        >
          <Suspense fallback={<ProjectListSkeleton />}>
            <Projects />
          </Suspense>
        </section>

        <Separator />

        <section
          id="testimonials"
          className="scroll-mt-24 space-y-6 md:scroll-mt-28"
        >
          <Suspense fallback={<TestimonialListSkeleton />}>
            <Testimonials />
          </Suspense>
        </section>

        <Separator />

        <section
          id="contact"
          className="scroll-mt-24 space-y-6 md:scroll-mt-28"
        >
          <Suspense fallback={<ContactSkeleton />}>
            <Contact />
          </Suspense>
        </section>
      </div>
      <FloatingSocials />
    </>
  );
}
