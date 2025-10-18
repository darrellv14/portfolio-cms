import { unstable_cache } from "next/cache";
import { staticCaller } from "~/trpc/server";
import { ExperienceList } from "./ExperienceList";

const getCachedExperiences = unstable_cache(
  async () => {
    return staticCaller.experience.getAll();
  },
  ["experiences_list"],
  {
    revalidate: 3600,
  },
);

export async function Experiences() {
  const initialExperiences = await getCachedExperiences();
  return <ExperienceList initialExperiences={initialExperiences} />;
}
