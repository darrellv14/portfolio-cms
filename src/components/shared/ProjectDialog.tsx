"use client";

import { useState } from "react";
import { PlusCircle, Pencil } from "lucide-react";
import type { inferRouterOutputs } from "@trpc/server";

import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { ProjectForm } from "./ProjectForm";
import type { AppRouter } from "~/server/api/root";

type RouterOutput = inferRouterOutputs<AppRouter>;
type Project = RouterOutput["project"]["getAll"][number];

interface ProjectDialogProps {
  project?: Project;
}

export const ProjectDialog = ({ project }: ProjectDialogProps) => {
  const [open, setOpen] = useState(false);
  const isEditMode = !!project;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {isEditMode ? (
          <Button variant="ghost" size="icon">
            <Pencil className="h-4 w-4" />
          </Button>
        ) : (
          <Button className="font-bold">
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Project
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>
            {isEditMode ? "Edit Project" : "Add a new project"}
          </DialogTitle>
          <DialogDescription>
            {isEditMode
              ? "Update the details for this project."
              : "Fill in the details below to add a new project."}
          </DialogDescription>
        </DialogHeader>
        <ProjectForm
          onFormSubmit={() => setOpen(false)}
          initialData={project}
        />
      </DialogContent>
    </Dialog>
  );
};
