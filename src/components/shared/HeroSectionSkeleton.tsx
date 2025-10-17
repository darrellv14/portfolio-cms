"use client";

import { Skeleton } from "~/components/ui/skeleton";

export function HeroSectionSkeleton() {
  return (
    <section className="relative isolate">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="grid grid-cols-1 items-center gap-10 md:gap-12 lg:grid-cols-12">
          {/* Kiri */}
          <div className="lg:col-span-6">
            {/* H1 */}
            <div className="space-y-3">
              <Skeleton className="h-9 w-64 md:h-12 md:w-96" />
              <Skeleton className="h-9 w-52 md:hidden" />
            </div>

            {/* Subheading */}
            <div className="mt-4">
              <Skeleton className="h-6 w-72 md:h-7 md:w-80" />
            </div>

            {/* Paragraf */}
            <div className="mt-4 space-y-2">
              <Skeleton className="h-4 w-[90%]" />
              <Skeleton className="h-4 w-[85%]" />
              <Skeleton className="h-4 w-[70%]" />
            </div>

            {/* Avatar mobile di bawah paragraf */}
            <div className="mt-6 flex justify-center md:hidden">
              <Skeleton className="h-44 w-44 rounded-full" />
            </div>

            {/* Badges */}
            <div className="mt-5 flex flex-wrap justify-center gap-2 md:justify-start">
              {Array.from({ length: 4 }).map((_, i) => (
                <Skeleton key={i} className="h-6 w-20 rounded-full" />
              ))}
            </div>

            {/* CTA + Social */}
            <div className="mt-6 flex flex-wrap items-center justify-center gap-4 md:justify-start">
              <Skeleton className="h-10 w-36 rounded-md" />
              <Skeleton className="h-10 w-40 rounded-md" />
              <div className="ml-1 flex items-center gap-5">
                <Skeleton className="h-6 w-6 rounded-full" />
                <Skeleton className="h-6 w-6 rounded-full" />
                <Skeleton className="h-6 w-6 rounded-full" />
              </div>
            </div>
          </div>

          {/* Kanan (desktop only) */}
          <div className="relative hidden md:block lg:col-span-6">
            <div className="mx-auto w-full max-w-[34rem]">
              <div className="mx-auto w-60 sm:w-72 md:w-80">
                <div className="rounded-full p-[3px]">
                  <Skeleton className="aspect-square w-full rounded-full" />
                </div>
              </div>

              {/* Floating cards skeleton (opsional) */}
              <div className="pointer-events-none absolute top-6 -left-2 hidden select-none md:block">
                <Skeleton className="h-16 w-44 rounded-2xl" />
              </div>
              <div className="pointer-events-none absolute -right-2 bottom-4 hidden select-none md:block">
                <Skeleton className="h-16 w-48 rounded-2xl" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
