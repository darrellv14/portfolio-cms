"use server";

import { revalidateTag } from "next/cache";

export async function revalidateProjectsAction() {
  console.log("Revalidating projects cache...");
  revalidateTag("projects");
}

export async function revalidateExperiencesAction() {
  console.log("Revalidating experiences cache...");
  revalidateTag("experiences");
}

export async function revalidatePublicTestimonialsAction() {
  console.log("Revalidating public testimonials cache...");
  revalidateTag("public_testimonials");
}
