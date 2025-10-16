"use client";

import { useState } from "react";
import type { Prisma } from "@prisma/client";
import Image from "next/image";
import { Button } from "../ui/button";
import { DeleteExperienceDialog } from "./DeleteExperienceDialog";
import { ExperienceDialog } from "./ExperienceDialog";

type ExperienceWithUser = Prisma.ExperienceGetPayload<{
  include: { createdBy: true };
}>;

interface ExperienceCardProps {
  experience: ExperienceWithUser;
  isAdmin: boolean;
}

export const ExperienceCard = ({
  experience,
  isAdmin,
}: ExperienceCardProps) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="bg-card text-card-foreground flex flex-col items-start gap-4 rounded-lg border p-4 transition-shadow hover:shadow-md md:flex-row md:items-center md:space-x-4 md:p-6">
      <div className="relative mx-auto h-20 w-20 flex-shrink-0 md:mx-0 md:h-16 md:w-16">
        <Image
          src={experience.logoUrl}
          alt={`${experience.company} logo`}
          fill
          className="object-contain"
        />
      </div>

      <div className="flex-1 space-y-2 text-center md:text-left">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <h3 className="text-base font-semibold md:text-lg">
            {experience.title} at {experience.company}
          </h3>
          <p className="text-foreground mt-1 text-sm font-semibold md:mt-0 md:text-base">
            {experience.dateRange}
          </p>
        </div>

        <div className="text-muted-foreground text-justify text-sm leading-relaxed md:text-base">
          <p
            className={`transition-all duration-300 ${expanded ? "" : "line-clamp-3"}`}
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
        <div className="ml-auto flex shrink-0 self-start md:self-center">
          <ExperienceDialog experience={experience} />
          <DeleteExperienceDialog experienceId={experience.id} />
        </div>
      )}
    </div>
  );
};
