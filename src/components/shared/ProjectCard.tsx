"use client";

import type { inferRouterOutputs } from "@trpc/server";
import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import type { AppRouter } from "~/server/api/root";
import { DeleteProjectDialog } from "./DeleteProjectDialog";
import { ProjectDialog } from "./ProjectDialog";
type RouterOutput = inferRouterOutputs<AppRouter>;
type ProjectListItem = RouterOutput["project"]["getAll"]["items"][number];

interface ProjectCardProps {
  project: ProjectListItem;
  isAdmin: boolean;
}

export const ProjectCard = ({ project, isAdmin }: ProjectCardProps) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="group bg-card text-card-foreground relative overflow-hidden rounded-xl border shadow-sm transition-all duration-300 hover:shadow-lg"
    >
      {isAdmin && (
        <div className="bg-card/80 absolute top-2 right-2 z-20 flex gap-1 rounded-md opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100">
          <ProjectDialog project={project} />
          <DeleteProjectDialog projectId={project.id} />
        </div>
      )}

      <div className="relative h-84 w-full md:h-86">
        <Image
          src={project.imageURL}
          alt={project.title}
          fill
          className="object-cover brightness-95 transition-all duration-300 group-hover:brightness-85"
        />
      </div>

      <motion.div
        layout
        className="from-background/90 via-background/50 absolute inset-0 flex flex-col justify-end bg-gradient-to-t to-transparent p-4 md:p-6"
      >
        <h3 className="text-foreground cursor-default text-lg font-semibold sm:text-xl">
          {project.title}
        </h3>

        <p
          className={`text-foreground cursor-default text-justify text-sm leading-relaxed sm:text-base ${expanded ? "line-clamp-none" : "line-clamp-3"}`}
        >
          {project.description}
        </p>

        <div className="flex items-center justify-between">
          <Button
            variant="link"
            size="sm"
            className="text-primary hover:text-accent-foreground mt-1 h-auto self-start p-0 font-medium"
            onClick={() => setExpanded(!expanded)}
          >
            {expanded ? "Show less" : "Read more"}
          </Button>

          {!!project.tags?.length && (
            <div className="mt-[0.15rem] flex flex-wrap gap-1.5">
              {project.tags.map((tag) => (
                <Badge key={tag.id} className="px-2 py-0.5 text-xs">
                  {tag.name}
                </Badge>
              ))}
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};
