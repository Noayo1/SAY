import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { projects } from "@/data/projects";

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

export async function getAllProjects() {
  const sanityProjects = await getSanityProjects();

  return [
    ...projects.map((p) => ({ ...p, source: "hardcoded" })),
    ...sanityProjects.map((p) => ({
      ...p,
      source: "sanity",
      slug: p.slug.current,
      thumbnail: p.thumbnail ? urlFor(p.thumbnail).url() : null,
    })),
  ];
}
