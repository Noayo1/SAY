import { getAllProjects } from "@/lib/projects";
import ProjectsPageClient from "@/components/ProjectsPageClient";
import HeroVideo from "@/components/HeroVideo";

export default async function Home() {
  const allProjects = await getAllProjects();

  return (
    <>
      {/* Hero - Full Screen Video (sticky so projects overlap it) */}
      <section className="sticky top-0 h-screen w-full overflow-hidden z-0">
        <HeroVideo />
      </section>

      {/* Projects with sidebar filter */}
      <div className="relative z-10 bg-white">
        <ProjectsPageClient projects={allProjects} noPadTop />
      </div>
    </>
  );
}
