import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { projects } from "@/data/projects";
import ProjectsPageClient from "@/components/ProjectsPageClient";

async function getSanityProjects() {
  try {
    const sanityProjects = await client.fetch(
      `*[_type == "project"] | order(_createdAt desc) {
        _id,
        title,
        slug,
        category,
        thumbnail
      }`
    );
    return sanityProjects;
  } catch (error) {
    console.error("Error fetching Sanity projects:", error);
    return [];
  }
}

export default async function Home() {
  const sanityProjects = await getSanityProjects();

  const allProjects = [
    ...projects.map((p) => ({ ...p, source: "hardcoded" })),
    ...sanityProjects.map((p) => ({
      ...p,
      source: "sanity",
      slug: p.slug.current,
      thumbnail: p.thumbnail ? urlFor(p.thumbnail).url() : null,
    })),
  ];

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
