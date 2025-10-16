import type { AppRouter } from "~/server/api/root";
import type { inferRouterOutputs } from "@trpc/server";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

type RouterOutput = inferRouterOutputs<AppRouter>;
type TestimonialWithUser = RouterOutput["testimonial"]["getAllPublic"][number];

interface TestimonialCardProps {
  testimonial: TestimonialWithUser;
}

export function TestimonialCard({ testimonial }: TestimonialCardProps) {
  return (
    <Card className="flex h-full flex-col">
      <CardHeader className="flex flex-row items-center gap-4">
        <Avatar className="h-12 w-12">
          <AvatarImage src={testimonial.avatarURL} alt={testimonial.title} />
          <AvatarFallback>
            {testimonial.title.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <CardTitle>{testimonial.title}</CardTitle>
          <CardDescription>{testimonial.position}</CardDescription>
        </div>
      </CardHeader>
      <CardContent className="flex-1">
        <blockquote className="mt-2 border-l-2 pl-6 italic">
          &quot;{testimonial.description}&quot;
        </blockquote>
      </CardContent>
    </Card>
  );
}
