import { api } from "~/trpc/server";
import { ProjectList } from "./ProjectList";

const TAKE = 6;

export async function Projects() {
  const initialProjectsPage = await api.project.getAll({ take: TAKE });
  return <ProjectList initialProjectsPage={initialProjectsPage} />;
}
