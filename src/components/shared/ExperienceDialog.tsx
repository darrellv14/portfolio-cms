"use client";

import type { inferRouterOutputs } from "@trpc/server";
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
import type { AppRouter } from "~/server/api/root";
import { ExperienceForm } from "./ExperienceForm";

type RouterOutput = inferRouterOutputs<AppRouter>;
type Experience = RouterOutput["experience"]["getAll"][number];

interface ExperienceDialogProps {
  experience?: Experience;
}

export const ExperienceDialog = ({ experience }: ExperienceDialogProps) => {
  const [open, setOpen] = useState(false);
  const isEditMode = !!experience;

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
            Add Experience
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-h-[85dvh] w-[95vw] overflow-y-auto p-4 sm:max-w-lg sm:p-6">
        <DialogHeader className="bg-background pb-3">
          <DialogTitle>
            {isEditMode ? "Edit Experience" : "Add a new experience"}
          </DialogTitle>
          <DialogDescription>
            {isEditMode
              ? "Update the details for this experience record."
              : "Fill in the details below to add a new experience."}
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4">
          <ExperienceForm
            onFormSubmit={() => setOpen(false)}
            initialData={experience}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};
