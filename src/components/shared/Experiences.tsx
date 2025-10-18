import { api } from "~/trpc/server";
import { ExperienceList } from "./ExperienceList";

export async function Experiences() {
  const initialExperiences = await api.experience.getAll();
  return <ExperienceList initialExperiences={initialExperiences} />;
}
