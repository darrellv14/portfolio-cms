"use client";

import { Trash2 } from "lucide-react";
import { toast } from "sonner";
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
} from "~/components/ui/alert-dialog";
import { Button } from "~/components/ui/button";
import { api } from "~/trpc/react";
import { revalidateExperiencesAction } from "~/lib/actions";
import { useRouter } from "next/navigation";

interface DeleteExperienceDialogProps {
  experienceId: number;
}

export const DeleteExperienceDialog = ({
  experienceId,
}: DeleteExperienceDialogProps) => {
  const router = useRouter();
  const utils = api.useUtils();
  const deleteMutation = api.experience.delete.useMutation({
    onSuccess: async () => {
      toast.success("Experience deleted successfully.");
      await utils.experience.getAll.invalidate();
      await revalidateExperiencesAction();
      router.refresh();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const handleDelete = () => {
    deleteMutation.mutate({ id: experienceId });
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="text-destructive hover:text-destructive"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="max-h-[80dvh] w-[95vw] overflow-y-auto p-4 sm:max-w-md sm:p-6">
        <AlertDialogHeader className="bg-background pb-3">
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete this
            experience record from the database.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="pt-3">
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
            disabled={deleteMutation.isPending}
          >
            {deleteMutation.isPending ? "Deleting..." : "Continue"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
