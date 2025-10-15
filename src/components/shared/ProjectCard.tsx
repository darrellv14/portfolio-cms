import type { Prisma } from "@prisma/client";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";

type ProjectWithUser = Prisma.ProjectGetPayload<{
  include: { createdBy: true };
}>;

type ProjectCardProps = {
  project: ProjectWithUser;
};

export const ProjectCard = ({ project }: ProjectCardProps) => {
  return (
    <Card className="flex flex-col overflow-hidden">
      <div className="relative h-72 w-full">
        <Image
          src={project.imageURL}
          alt={project.title}
          fill
          className="object-contain"
        />
      </div>

      <CardHeader>
        <CardTitle className="text-xl">{project.title}</CardTitle>
      </CardHeader>

      <CardContent className="flex-1">
        <p className="text-muted-foreground text-justify text-sm">
          {project.description}
        </p>
      </CardContent>
    </Card>
  );
};
