import { AlertTriangle } from "lucide-react";
import Link from "next/link";
import { Button } from "~/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center space-y-6 text-center">
      <AlertTriangle className="h-24 w-24 text-yellow-500" />
      <div className="space-y-2">
        <h1 className="text-2xl font-extrabold tracking-tight lg:text-4xl">
          404 - Page Not Found, No noo yahh!
        </h1>
        <p className="text-muted-foreground text-lg">
          Oops, you are lost in the dark rainforest, let&apos;s go back!
        </p>
      </div>
      <Button asChild>
        <Link href="/">Back to Homepage!</Link>
      </Button>
    </div>
  );
}
