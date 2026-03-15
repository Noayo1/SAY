import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";

async function getSanityProjects() {
  try {
    const sanityProjects = await client.fetch(
      `*[_type == "project"] | order(orderRank asc, _createdAt desc) {
        _id,
        title,
        slug,
        categories,
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
    ...sanityProjects.map((p) => ({
      ...p,
      source: "sanity",
      slug: p.slug.current,
      thumbnail: p.thumbnail ? urlFor(p.thumbnail).width(500).quality(80).auto("format").url() : null,
    })),
  ];
}
