"use client";

import { Skeleton } from "~/components/ui/skeleton";

export function HeroSectionSkeleton() {
  return (
    <section className="relative isolate">
      {/* Kelas container, mx-auto, max-w, dan px dihapus dari div ini */}
      <div className="mb-8 py-8">
        <div className="grid grid-cols-1 items-center gap-10 md:gap-12 lg:grid-cols-12">
          {/* Kiri: Teks */}
          <div className="lg:col-span-6">
            {/* H1 */}
            <div className="space-y-2">
              <Skeleton className="h-10 w-3/4 md:h-12 lg:h-14" />
              <Skeleton className="h-10 w-1/2 md:h-12 lg:h-14" />
            </div>

            {/* Avatar di mobile */}
            <div className="mt-6 mb-6 flex justify-center md:hidden">
              <Skeleton className="h-44 w-44 rounded-full sm:h-52 sm:w-52" />
            </div>

            {/* Subheading */}
            <div className="mt-3">
              <Skeleton className="h-7 w-4/5 md:h-8" />
            </div>

            {/* Paragraf */}
            <div className="mt-4 space-y-2.5">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-[90%]" />
            </div>

            {/* Badges */}
            <div className="mt-5 flex flex-wrap justify-center gap-2 md:justify-start">
              <Skeleton className="h-6 w-16 rounded-full" />
              <Skeleton className="h-6 w-20 rounded-full" />
              <Skeleton className="h-6 w-24 rounded-full" />
              <Skeleton className="h-6 w-20 rounded-full" />
            </div>

            {/* CTA + Social */}
            <div className="mt-6 flex flex-wrap items-center justify-center gap-4 md:justify-start">
              <Skeleton className="h-12 w-32 rounded-md" />
              <Skeleton className="h-12 w-[150px] rounded-md" />
              <div className="ml-1 flex items-center gap-5">
                <Skeleton className="h-6 w-6 rounded-full" />
                <Skeleton className="h-6 w-6 rounded-full" />
                <Skeleton className="h-6 w-6 rounded-full" />
              </div>
            </div>
          </div>

          {/* Kanan: Visual */}
          <div className="relative hidden md:block lg:col-span-6">
            <div className="mx-auto w-full max-w-[34rem]">
              <div className="mx-auto w-60 sm:w-72 md:w-80">
                <div className="rounded-full p-[3px]">
                  <Skeleton className="aspect-square w-full rounded-full" />
                </div>
              </div>

              {/* Floating cards */}
              <div className="pointer-events-none absolute top-6 -left-2">
                <Skeleton className="h-[70px] w-48 rounded-2xl" />
              </div>
              <div className="pointer-events-none absolute -right-2 bottom-4">
                <Skeleton className="h-[70px] w-52 rounded-2xl" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
