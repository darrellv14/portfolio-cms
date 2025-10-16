"use client";

import { useState } from "react";
import { MessageSquarePlus } from "lucide-react";
import { signIn, useSession } from "next-auth/react";
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
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Give Testimony</DialogTitle>
          <DialogDescription>
            Share your experience working with Darrell Valentino. Your testimony
            will be posted once it is approved.
          </DialogDescription>
        </DialogHeader>
        <AddTestimonialForm onFormSubmit={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  );
};
