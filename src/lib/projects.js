import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
// import { projects } from "@/data/projects"; // Seed data disabled

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

  // Hardcoded seed data disabled — projects are now managed entirely via Sanity CMS
  // To re-enable, uncomment the hardcoded line below:
  // ...projects.map((p) => ({ ...p, source: "hardcoded" })),
  return [
    ...sanityProjects.map((p) => ({
      ...p,
      source: "sanity",
      slug: p.slug.current,
      thumbnail: p.thumbnail ? urlFor(p.thumbnail).width(500).quality(80).auto("format").url() : null,
    })),
  ];
}
