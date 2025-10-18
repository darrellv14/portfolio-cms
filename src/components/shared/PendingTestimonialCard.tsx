"use client";

import type { inferRouterOutputs } from "@trpc/server";
import { toast } from "sonner";
import type { AppRouter } from "~/server/api/root";
import { api } from "~/trpc/react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { revalidatePublicTestimonialsAction } from "~/lib/actions";

type RouterOutput = inferRouterOutputs<AppRouter>;
type TestimonialWithUser = RouterOutput["testimonial"]["getAllPending"][number];

interface PendingTestimonialCardProps {
  testimonial: TestimonialWithUser;
}

export const PendingTestimonialCard = ({
  testimonial,
}: PendingTestimonialCardProps) => {
  const utils = api.useUtils();

  const { mutate: approveMutate, isPending: isApproving } =
    api.testimonial.approve.useMutation({
      onSuccess: async () => {
        toast.success("Testimony has been approved!");
        await utils.testimonial.getAllPending.invalidate();
        await utils.testimonial.getAllPublic.invalidate();
        await revalidatePublicTestimonialsAction();
      },
      onError: (err) => {
        toast.error(`Failed to approve, reason: ${err.message}`);
      },
    });

  const { mutate: deleteMutate, isPending: isDeleting } =
    api.testimonial.delete.useMutation({
      onSuccess: async () => {
        toast.warning("Testimony has been deleted!");
        await utils.testimonial.getAllPending.invalidate();
        await utils.testimonial.getAllPublic.invalidate();
        await revalidatePublicTestimonialsAction();
      },
      onError: (err) => {
        toast.error(`Failed to Delete, reason: ${err.message}`);
      },
    });

  const handleApprove = () => {
    approveMutate({ id: testimonial.id });
  };

  const handleDelete = () => {
    deleteMutate({ id: testimonial.id });
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center gap-4">
        <Avatar className="h-12 w-12">
          <AvatarImage src={testimonial.avatarURL} alt={testimonial.title} />
          <AvatarFallback>{testimonial.title.charAt(0)}</AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <CardTitle>{testimonial.title}</CardTitle>
          <CardDescription>{testimonial.position}</CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <p className="italic">&quot;{testimonial.description}&quot;</p>
      </CardContent>
      <CardFooter className="flex justify-end gap-2">
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="destructive" disabled={isApproving || isDeleting}>
              Delete
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be cancelled, this testimony will be deleted
                permanently.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Batal</AlertDialogCancel>
              <AlertDialogAction onClick={handleDelete}>
                Yes, delete.
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        <Button onClick={handleApprove} disabled={isApproving || isDeleting}>
          {isApproving ? "Approving..." : "Approve"}
        </Button>
      </CardFooter>
    </Card>
  );
};
