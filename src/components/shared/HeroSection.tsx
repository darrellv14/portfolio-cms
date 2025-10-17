"use client";

import Image from "next/image";
import Link from "next/link";
import { m, LazyMotion, domAnimation, type Variants } from "framer-motion";
import { Button } from "~/components/ui/button";
import {
  Github,
  Linkedin,
  Instagram,
  FileDown,
  Briefcase,
  Sparkles,
} from "lucide-react";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12 } },
};

const itemVariants: Variants = {
  hidden: { y: 18, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.5, ease: "easeOut" } },
};

const floatY: Variants = {
  initial: { y: 0, opacity: 0 },
  animate: {
    y: [0, -10, 0],
    opacity: 1,
    transition: { duration: 6, repeat: Infinity, ease: "easeInOut" },
  },
};

function SocialLink({
  href,
  icon: Icon,
  label,
}: {
  href: string;
  icon: React.ElementType;
  label: string;
}) {
  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="group inline-flex items-center"
    >
      <Icon className="text-muted-foreground group-hover:text-primary h-6 w-6 transition-colors duration-300" />
    </Link>
  );
}

export const HeroSection = () => {
  return (
    <LazyMotion features={domAnimation}>
      <m.section
        id="hero"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        // isolate: supaya efek lokal (conic glow) tidak tercampur layer global
        className="relative isolate overflow-visible py-10 md:py-12 lg:py-20"
      >
        {/* Tidak ada background di sini—pakai GlobalBackground dari layout */}

        <div className="container mx-auto max-w-7xl px-4">
          <div className="grid grid-cols-1 items-center gap-10 md:gap-12 lg:grid-cols-12">
            {/* Kiri: copy & CTA */}
            <div className="lg:col-span-6">
              <m.h1
                variants={itemVariants}
                className="text-4xl font-bold tracking-tight text-balance md:text-5xl lg:text-6xl"
              >
                Hi, I&apos;m{" "}
                <span className="from-primary to-secondary bg-gradient-to-r bg-clip-text text-transparent">
                  Darrell Valentino
                </span>
              </m.h1>

              <m.p
                variants={itemVariants}
                className="text-foreground/90 mt-3 text-xl font-semibold md:text-2xl"
              >
                Full-Stack Web Developer, based in Jakarta.
              </m.p>

              <m.p
                variants={itemVariants}
                className="text-muted-foreground mt-4 max-w-xl md:text-justify"
              >
                I transform ideas into elegant, scalable, and user-centric
                experiences. I love React, TypeScript, and building robust
                backends that just work.
              </m.p>

              {/* Tech badges */}
              <m.div
                variants={itemVariants}
                className="mt-5 flex flex-wrap gap-2"
              >
                {["React", "Next.js", "TypeScript", "Tailwind"].map((t) => (
                  <span
                    key={t}
                    className="bg-muted rounded-full px-3 py-1 text-xs font-medium"
                  >
                    {t}
                  </span>
                ))}
              </m.div>

              {/* CTAs + socials */}
              <m.div
                variants={itemVariants}
                className="mt-6 flex flex-wrap items-center gap-4"
              >
                <Button
                  asChild
                  size="lg"
                  className="shadow-primary/20 shadow-lg"
                >
                  <Link href="mailto:your-email@example.com">Contact Me</Link>
                </Button>

                <Button asChild variant="outline" size="lg">
                  <a href="/Darrell-CV.pdf" download>
                    <FileDown className="mr-2 h-4 w-4" />
                    Download CV
                  </a>
                </Button>

                <div className="ml-1 flex items-center gap-5">
                  <SocialLink
                    href="https://github.com/darrellv14"
                    icon={Github}
                    label="GitHub"
                  />
                  <SocialLink
                    href="https://www.linkedin.com/in/your-profile/"
                    icon={Linkedin}
                    label="LinkedIn"
                  />
                  <SocialLink
                    href="https://www.instagram.com/your-profile/"
                    icon={Instagram}
                    label="Instagram"
                  />
                </div>
              </m.div>
            </div>

            {/* Kanan: visual */}
            <div className="relative lg:col-span-6">
              {/* Conic glow halus di belakang avatar */}
              <div
                aria-hidden
                className="absolute -inset-8 -z-10 rounded-[3rem] opacity-70 blur-2xl"
                style={{
                  background:
                    "conic-gradient(from 180deg at 50% 50%, rgba(99,102,241,0.18), rgba(14,165,233,0.12), rgba(16,185,129,0.16), rgba(99,102,241,0.18))",
                  maskImage:
                    "radial-gradient(60% 60% at 50% 50%, black, transparent)",
                  WebkitMaskImage:
                    "radial-gradient(60% 60% at 50% 50%, black, transparent)",
                }}
              />

              <div className="mx-auto grid w-full max-w-[34rem] grid-cols-12 items-center">
                <m.div variants={itemVariants} className="relative col-span-12">
                  <div className="mx-auto w-60 sm:w-72 md:w-80">
                    <div className="from-primary/30 to-secondary/30 rounded-full bg-gradient-to-b p-[3px]">
                      <div className="bg-background relative aspect-square w-full overflow-hidden rounded-full shadow-xl">
                        <Image
                          src="https://jhoniananta.com/_next/image?url=%2Fimages%2Fhero%2Ffoto-jhoni-porto.png&w=1920&q=75"
                          alt="Darrell's Profile Picture"
                          fill
                          priority
                          sizes="(max-width: 768px) 60vw, (max-width: 1024px) 40vw, 34rem"
                          className="object-cover"
                        />
                      </div>
                    </div>
                  </div>
                </m.div>

                {/* Floating Card: Availability */}
                <m.div
                  variants={floatY}
                  initial="initial"
                  animate="animate"
                  className="pointer-events-none absolute top-6 -left-2 hidden select-none md:block"
                >
                  <div className="bg-background/70 rounded-2xl border border-white/10 px-4 py-3 shadow-lg backdrop-blur">
                    <div className="flex items-center gap-2">
                      <Sparkles className="text-primary h-4 w-4" />
                      <span className="text-sm font-medium">
                        Open to projects
                      </span>
                    </div>
                    <p className="text-muted-foreground mt-1 text-xs">
                      Web apps • Dashboards • CMS
                    </p>
                  </div>
                </m.div>

                {/* Floating Card: Projects */}
                <m.div
                  variants={floatY}
                  initial="initial"
                  animate="animate"
                  transition={{
                    delay: 0.8,
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="pointer-events-none absolute -right-2 bottom-4 hidden select-none md:block"
                >
                  <div className="bg-background/70 rounded-2xl border border-white/10 px-4 py-3 shadow-lg backdrop-blur">
                    <div className="flex items-center gap-2">
                      <Briefcase className="text-secondary h-4 w-4" />
                      <span className="text-sm font-semibold">
                        24+ Projects
                      </span>
                    </div>
                    <p className="text-muted-foreground mt-1 text-xs">
                      FE/BE • CI/CD • DEVOPS • DESIGN
                    </p>
                  </div>
                </m.div>

                {/* Chip stack */}
                <m.div
                  variants={itemVariants}
                  className="pointer-events-none absolute top-1/2 right-0 hidden -translate-y-1/2 select-none lg:block"
                >
                  <div className="flex flex-col items-end gap-2">
                    {["NextAuth", "Prisma", "tRPC", "Postgres"].map((t) => (
                      <span
                        key={t}
                        className="bg-muted/70 rounded-full px-3 py-1 text-xs font-medium backdrop-blur"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </m.div>
              </div>
            </div>
          </div>
        </div>
      </m.section>
    </LazyMotion>
  );
};
