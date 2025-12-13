"use client";
import { Button } from "@/components/ui/button";
import { TriangleAlert } from "lucide-react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ServerError } from "@/lib/types/data";

type DialogProps = {
  deleteFn: () => void;
  isPending: boolean;
  errorMessage: ServerError | null;
};

// it's not dynamic dialog because we don't have many dialogs in the app

export function DeleteDialog({ deleteFn, isPending }: DialogProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          type="button"
          variant="destructive"
          className="w-full text-red-600 bg-red-50 hover:text-white"
        >
          Delete My Account
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[558px] h-[402px] flex flex-col justify-between items-center">
        <DialogHeader className="flex flex-col items-center pt-10">
          <div className="bg-red-100 p-4 rounded-full outline outline-[15px] outline-red-50 mb-8">
            <TriangleAlert width={50} height={50} className="text-red-600" />
          </div>
          <DialogTitle className="text-red-600 text-lg">
            Are you sure you want to delete your account?
          </DialogTitle>
          <DialogDescription>
            This action is permanent and cannot be undone.
          </DialogDescription>
        </DialogHeader>

        <form className="w-full" onSubmit={deleteFn}>
          <DialogFooter className="w-full flex text-lg">
            <DialogClose asChild className="flex-1">
              <Button variant="secondary" type="button">
                Cancel
              </Button>
            </DialogClose>

            <Button
              type="submit"
              variant="destructive"
              className="flex-1 text-white bg-red-600"
              disabled={isPending}
            >
              {isPending ? "Deleting..." : "Yes, delete"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
