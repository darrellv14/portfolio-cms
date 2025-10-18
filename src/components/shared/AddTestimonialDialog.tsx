"use client";

import { MessageSquarePlus } from "lucide-react";
import { signIn, useSession } from "next-auth/react";
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
import { AddTestimonialForm } from "./AddTestimonialForm";

export const AddTestimonialDialog = () => {
  const [open, setOpen] = useState(false);
  const { status } = useSession();

  if (status !== "authenticated") {
    return (
      <Button variant="outline" onClick={() => signIn("google")}>
        <MessageSquarePlus className="mr-2 h-4 w-4" />
        Write Testimony
      </Button>
    );
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <MessageSquarePlus className="mr-2 h-4 w-4" />
          Write Testimony
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[85dvh] w-[95vw] overflow-y-auto p-4 sm:max-w-[425px] sm:p-6">
        <DialogHeader className="bg-background sticky top-0 z-10 pb-3">
          <DialogTitle>Give Testimony</DialogTitle>
          <DialogDescription>
            Share your experience working with Darrell Valentino. Your testimony
            will be posted once it is approved.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4">
          <AddTestimonialForm onFormSubmit={() => setOpen(false)} />
        </div>
      </DialogContent>
    </Dialog>
  );
};
