"use client";

import { Pencil, PlusCircle } from "lucide-react";
import { useState } from "react";

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

import type { inferRouterOutputs } from "@trpc/server";
import type { AppRouter } from "~/server/api/root";
type RouterOutput = inferRouterOutputs<AppRouter>;
type ProjectListItem = RouterOutput["project"]["getAll"]["items"][number];

interface ProjectDialogProps {
  project?: ProjectListItem;
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

      <DialogContent className="max-h-[85dvh] w-[95vw] overflow-y-auto p-4 sm:max-w-lg sm:p-6">
        <DialogHeader className="bg-background pb-3">
          <DialogTitle>
            {isEditMode ? "Edit Project" : "Add a new project"}
          </DialogTitle>
          <DialogDescription>
            {isEditMode
              ? "Update the details for this project."
              : "Fill in the details below to add a new project."}
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4">
          <ProjectForm
            onFormSubmit={() => setOpen(false)}
            initialData={project}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};
