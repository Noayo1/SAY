import { getAllProjects } from "@/lib/projects";
import SpatialProjects from "@/components/SpatialProjects";
import HeroVideo from "@/components/HeroVideo";
import ArrowIcon from "@/components/ArrowIcon";

export const metadata = { title: "SAY — Spatial gallery preview", robots: { index: false, follow: false } };
export const dynamic = "force-dynamic";

export default async function SpatialPreview() {
  const projects = await getAllProjects({ thumbnailWidth: 1400 });
  return (
    <>
      <section className="spatial-intro" aria-label="SAY Creative studio showreel">
        <HeroVideo />
        <div className="spatial-intro-caption">
          <p>Good ideas.<br />A different point of view.</p>
          <a href="#spatial-work">Explore the projects <span><ArrowIcon direction="down" /></span></a>
        </div>
      </section>
      <div id="spatial-work"><SpatialProjects projects={projects} /></div>
    </>
  );
}
