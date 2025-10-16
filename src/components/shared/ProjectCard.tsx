"use client";
import { useState } from "react";
import type { Prisma } from "@prisma/client";
import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "~/components/ui/button";
import { DeleteProjectDialog } from "./DeleteProjectDialog";
import { ProjectDialog } from "./ProjectDialog";

type ProjectWithUser = Prisma.ProjectGetPayload<{
  include: { createdBy: true };
}>;

interface ProjectCardProps {
  project: ProjectWithUser;
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
      {/* Admin Buttons */}
      {isAdmin && (
        <div className="bg-card/80 absolute top-2 right-2 z-20 flex gap-1 rounded-md opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100">
          <ProjectDialog project={project} />
          <DeleteProjectDialog projectId={project.id} />
        </div>
      )}

      {/* Image */}
      <div className="relative h-72 w-full md:h-80">
        <Image
          src={project.imageURL}
          alt={project.title}
          fill
          className="object-cover brightness-95 transition-all duration-300 group-hover:brightness-85"
        />
      </div>

      {/* Overlay */}
      <motion.div
        layout
        className="from-background/90 via-background/50 absolute inset-0 flex flex-col justify-end bg-gradient-to-t to-transparent p-4 md:p-6"
      >
        <h3 className="text-foreground text-lg font-semibold sm:text-xl">
          {project.title}
        </h3>

        {/* Deskripsi */}
        <motion.div
          layout
          initial={{ maxHeight: "3rem" }}
          animate={{ maxHeight: expanded ? "200px" : "3rem" }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          className="text-foreground overflow-hidden text-justify text-sm leading-relaxed sm:text-base"
        >
          {project.description}
        </motion.div>

        <Button
          variant="link"
          size="sm"
          className="text-primary hover:text-accent-foreground mt-1 h-auto self-start p-0 font-medium"
          onClick={() => setExpanded(!expanded)}
        >
          {expanded ? "Show less" : "Read more"}
        </Button>
      </motion.div>
    </motion.div>
  );
};
