"use client";

import { m } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import { cn } from "~/lib/utils";
import { Button } from "../ui/button";
import { DeleteExperienceDialog } from "./DeleteExperienceDialog";
import { ExperienceDialog } from "./ExperienceDialog";

type ExperienceListItem = {
  id: number;
  title: string;
  company: string;
  dateRange: string;
  description: string;
  logoUrl: string;
};

interface ExperienceCardProps {
  experience: ExperienceListItem;
  isAdmin: boolean;
  index: number;
}

export const ExperienceCard = ({
  experience,
  isAdmin,
  index,
}: ExperienceCardProps) => {
  const [expanded, setExpanded] = useState(false);

  const isEven = index % 2 === 1;

  return (
    <m.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="bg-card text-card-foreground flex w-full flex-col gap-4 rounded-lg border p-4 transition-shadow hover:shadow-md md:flex-row md:items-center md:gap-6 md:p-6"
    >
      {/* Logo Perusahaan */}
      <div
        className={cn(
          "relative mx-auto h-20 w-20 flex-shrink-0 md:mx-0 md:h-16 md:w-16",
          isEven && "md:order-3",
        )}
      >
        <Image
          src={experience.logoUrl}
          alt={`${experience.company} logo`}
          fill
          className="object-contain"
        />
      </div>

      {/* Konten Utama (Judul, Tanggal, Deskripsi) */}
      <div
        className={cn(
          "flex-1 space-y-2 text-center md:text-left",
          isEven && "md:order-2",
        )}
      >
        <div
          className={cn(
            "flex flex-col-reverse md:flex-row md:items-center md:justify-between",
            isEven && "md:flex-row-reverse",
          )}
        >
          <h3 className="text-base font-semibold md:text-lg">
            {experience.title} at {experience.company}
          </h3>
          <p className="text-foreground mb-1 text-sm font-bold md:mb-0 md:text-base">
            {experience.dateRange}
          </p>
        </div>

        {/* Deskripsi */}
        <div className="text-muted-foreground text-justify text-sm leading-relaxed md:text-base">
          <p
            className={`transition-all duration-300 ${
              expanded ? "" : "line-clamp-3 md:line-clamp-none"
            }`}
          >
            {experience.description}
          </p>

          {experience.description.length > 120 && (
            <Button
              variant="link"
              size="sm"
              className="text-accent-foreground mt-1 h-auto p-0 font-medium hover:underline md:hidden"
              onClick={() => setExpanded(!expanded)}
            >
              {expanded ? "Show less" : "Read more"}
            </Button>
          )}
        </div>
      </div>

      {/* Tombol Admin */}
      {isAdmin && (
        <div
          className={cn(
            "ml-auto flex shrink-0 self-start md:self-center",
            isEven && "md:order-1",
          )}
        >
          <ExperienceDialog experience={experience} />
          <DeleteExperienceDialog experienceId={experience.id} />
        </div>
      )}
    </m.div>
  );
};
