import { unstable_cache } from "next/cache";
import { staticCaller } from "~/trpc/static-caller";
import { TestimonialList } from "./TestimonialList";

const LIMIT = 3;

const getCachedTestimonials = unstable_cache(
  async (limit: number) => {
    return staticCaller.testimonial.getAllPublic({ limit });
  },
  ["public_testimonials_list"],
  {
    revalidate: 3600,
    tags: ["public_testimonials"],
  },
);

export async function Testimonials() {
  const initialTestimonialsPage = await getCachedTestimonials(LIMIT);
  return <TestimonialList initialTestimonialsPage={initialTestimonialsPage} />;
}
