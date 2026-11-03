import { getAllProjects } from "@/lib/projects";
import SpatialProjects from "@/components/SpatialProjects";

export const metadata = { title: "SAY — Spatial gallery preview", robots: { index: false, follow: false } };
export const dynamic = "force-dynamic";

export default async function SpatialPreview() {
  const projects = await getAllProjects({ thumbnailWidth: 1400 });
  return <SpatialProjects projects={projects} />;
}
