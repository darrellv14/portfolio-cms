"use server";

import { revalidateTag } from "next/cache";

export async function revalidateProjectsAction() {
  console.log("SERVER ACTION: Attempting to revalidate tag: projects");
  try {
    revalidateTag("projects");
    console.log("SERVER ACTION: Successfully revalidated tag: projects");
  } catch (error) {
    console.error("SERVER ACTION: Error revalidating tag 'projects':", error);
  }
}

export async function revalidateExperiencesAction() {
  console.log("SERVER ACTION: Attempting to revalidate tag: experiences");
  try {
    revalidateTag("experiences");
    console.log("SERVER ACTION: Successfully revalidated tag: experiences");
  } catch (error) {
    console.error(
      "SERVER ACTION: Error revalidating tag 'experiences':",
      error,
    );
  }
}

export async function revalidatePublicTestimonialsAction() {
  console.log(
    "SERVER ACTION: Attempting to revalidate tag: public_testimonials",
  );
  try {
    revalidateTag("public_testimonials");
    console.log(
      "SERVER ACTION: Successfully revalidated tag: public_testimonials",
    );
  } catch (error) {
    console.error(
      "SERVER ACTION: Error revalidating tag 'public_testimonials':",
      error,
    );
  }
}
