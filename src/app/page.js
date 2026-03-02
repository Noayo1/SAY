import { getAllProjects } from "@/lib/projects";
import ProjectsPageClient from "@/components/ProjectsPageClient";

export default async function Home() {
  const allProjects = await getAllProjects();

  return (
    <>
      {/* Hero - Full Screen Video (sticky so projects overlap it) */}
      <section className="sticky top-0 h-screen w-full overflow-hidden z-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/videos/hero.mp4" type="video/mp4" />
        </video>
      </section>

      {/* Projects with sidebar filter */}
      <div className="relative z-10 bg-white">
        <ProjectsPageClient projects={allProjects} noPadTop />
      </div>
    </>
  );
}
