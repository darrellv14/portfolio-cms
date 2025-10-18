import { api } from "~/trpc/server";
import { TestimonialList } from "./TestimonialList";

const LIMIT = 3;

export async function Testimonials() {
  const initialTestimonialsPage = await api.testimonial.getAllPublic({
    limit: LIMIT,
  });
  return <TestimonialList initialTestimonialsPage={initialTestimonialsPage} />;
}
