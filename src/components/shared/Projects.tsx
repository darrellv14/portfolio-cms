import { unstable_cache } from "next/cache";
import { staticCaller } from "~/trpc/static-caller";
import { ProjectList } from "./ProjectList";

const TAKE = 6;

const getCachedProjects = unstable_cache(
  async (take: number) => {
    return staticCaller.project.getAll({ take });
  },
  ["projects_list"],
  {
    revalidate: 600,
  },
);

export async function Projects() {
  const initialProjectsPage = await getCachedProjects(TAKE);
  return <ProjectList initialProjectsPage={initialProjectsPage} />;
}
