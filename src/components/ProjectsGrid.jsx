import Image from "next/image";
import Link from "next/link";
import { projects } from "@/data/projects";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";

// Fetch projects from Sanity
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

export default async function ProjectsGrid() {
  // Get Sanity projects
  const sanityProjects = await getSanityProjects();

  // Combine hardcoded projects with Sanity projects
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
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
      {allProjects.map((project) => (
        <Link
          key={project.source === "sanity" ? project._id : project.id}
          href={`/projects/${project.slug}`}
          className="group cursor-pointer"
        >
          {/* Project Card */}
          <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden mb-4">
            {project.thumbnail ? (
              <Image
                src={project.thumbnail}
                alt={project.title}
                width={400}
                height={400}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            ) : (
              // Placeholder if no thumbnail
              <div className="w-full h-full flex items-center justify-center bg-gray-200 group-hover:bg-gray-300 transition">
                <div className="text-center p-4 sm:p-8">
                  <p className="text-xl sm:text-2xl font-bold text-gray-600 mb-2">
                    {project.title}
                  </p>
                  <p className="text-xs sm:text-sm text-gray-500">
                    Click to view
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Project Info */}
          <h3 className="text-lg sm:text-xl font-semibold mb-1 group-hover:underline">
            {project.title}
          </h3>
          <p className="text-sm sm:text-base text-gray-600">
            {project.category}
          </p>
        </Link>
      ))}
    </div>
  );
}
