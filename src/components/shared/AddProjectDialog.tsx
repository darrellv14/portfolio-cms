"use client";

import { useState } from "react";
import { PlusCircle } from "lucide-react";
import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { AddProjectForm } from "./AddProjectForm";

export const AddProjectDialog = () => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="font-bold">
          <PlusCircle className="mr-2 h-4 w-4" />
          Add New Project
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add a new project</DialogTitle>
          <DialogDescription>
            Fill in the details below to add a new project to your portfolio.
          </DialogDescription>
        </DialogHeader>
        <AddProjectForm onFormSubmit={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  );
};
