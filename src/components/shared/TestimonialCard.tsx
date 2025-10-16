import type { AppRouter } from "~/server/api/root";
import type { inferRouterOutputs } from "@trpc/server";
import { motion } from "framer-motion";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

type RouterOutput = inferRouterOutputs<AppRouter>;
type TestimonialWithUser =
  RouterOutput["testimonial"]["getAllPublic"]["items"][number];

interface TestimonialCardProps {
  testimonial: TestimonialWithUser;
}

export function TestimonialCard({ testimonial }: TestimonialCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="h-full"
    >
      <Card className="flex h-full flex-col">
        <CardHeader className="flex flex-row items-center gap-4">
          <Avatar className="h-12 w-12">
            <AvatarImage
              src={testimonial.createdBy.image ?? ""}
              alt={testimonial.createdBy.name ?? "User"}
            />
            <AvatarFallback>
              {(testimonial.createdBy.name ?? "A").charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <CardTitle>{testimonial.createdBy.name ?? "Anonymous"}</CardTitle>
            <CardDescription>{testimonial.position}</CardDescription>
          </div>
        </CardHeader>
        <CardContent className="flex-1">
          <blockquote className="mt-2 border-l-2 pl-6 italic">
            &quot;{testimonial.description}&quot;
          </blockquote>
        </CardContent>
      </Card>
    </motion.div>
  );
}
