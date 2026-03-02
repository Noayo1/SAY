import { getAllProjects } from "@/lib/projects";
import ProjectsPageClient from "@/components/ProjectsPageClient";

export const metadata = {
  title: "Projects - SAY Creative",
  description: "Selected work by SAY Creative.",
};

export default async function ProjectsPage() {
  const allProjects = await getAllProjects();

  return <ProjectsPageClient projects={allProjects} />;
}
