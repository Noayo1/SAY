import ProjectsGrid from "@/components/ProjectsGrid";

export default function Home() {
  return (
    <>
      {/* Hero - Full Screen Video */}
      <section className="relative h-screen w-full overflow-hidden">
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

      {/* Projects */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <ProjectsGrid />
      </section>
    </>
  );
}
