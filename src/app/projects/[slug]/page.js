import Image from "next/image";
import Link from "next/link";
import { getProjectBySlug, getAllProjectSlugs } from "@/data/projects";
import { notFound } from "next/navigation";

// Generate static paths for all projects
export async function generateStaticParams() {
  const slugs = getAllProjectSlugs();
  return slugs.map((slug) => ({
    slug: slug,
  }));
}

// Generate metadata for SEO
export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const project = getProjectBySlug(resolvedParams.slug);

  if (!project) {
    return {
      title: "Project Not Found",
    };
  }

  return {
    title: `${project.title} - SAY Creative`,
    description: project.description,
  };
}

export default async function ProjectPage({ params }) {
  const resolvedParams = await params;
  const project = getProjectBySlug(resolvedParams.slug);

  // If project not found, show 404
  if (!project) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Back Button */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link
          href="/#work"
          className="inline-flex items-center text-gray-600 hover:text-black transition"
        >
          <svg
            className="w-5 h-5 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Back to Projects
        </Link>
      </div>

      {/* Project Title */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-12">
          <p className="text-sm uppercase tracking-wider text-gray-500 mb-4">
            {project.category}
          </p>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8">
            {project.title}
          </h1>

          {/* Project Info */}
          <div className="flex flex-wrap gap-8 text-lg">
            {project.client && (
              <div>
                <span className="text-gray-500">Client:</span>{" "}
                <span className="font-medium">{project.client}</span>
              </div>
            )}
            {project.year && (
              <div>
                <span className="text-gray-500">Year:</span>{" "}
                <span className="font-medium">{project.year}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Project Content - Custom Layouts */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Custom Layout for projects with layout property */}
        {project.layout &&
          project.layout.map((section, index) => {
            // 1. Full Width Image
            if (section.type === "full-image") {
              return (
                <div key={index} className="w-full mb-8">
                  <Image
                    src={section.src}
                    alt={`${project.title} - Image ${index + 1}`}
                    width={1200}
                    height={800}
                    className="w-full h-auto rounded-lg"
                  />
                </div>
              );
            }

            // 2. Text Block + Image - 2x2 Grid (Mobile & Desktop)
            if (section.type === "text-image-row") {
              return (
                <div key={index} className="grid grid-cols-2 gap-8 mb-8">
                  {/* Square Image - Left */}
                  <div className="aspect-square rounded-lg overflow-hidden">
                    <Image
                      src={section.image}
                      alt={`${project.title}`}
                      width={600}
                      height={600}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Text Block - Right - TRANSPARENT */}
                  <div className="aspect-square rounded-lg p-6 md:p-8 lg:p-12 flex items-center justify-center">
                    <p
                      lang="he"
                      dir="rtl"
                      className="text-base md:text-lg lg:text-xl text-gray-700 leading-relaxed whitespace-pre-line text-right"
                    >
                      {section.text}
                    </p>
                  </div>
                </div>
              );
            }

            // 3. Two Square Images Side by Side
            if (section.type === "two-squares") {
              return (
                <div key={index} className="grid grid-cols-2 gap-8 mb-8">
                  {section.images.map((img, imgIndex) => (
                    <div
                      key={imgIndex}
                      className="aspect-square rounded-lg overflow-hidden"
                    >
                      <Image
                        src={img}
                        alt={`${project.title} - Image ${imgIndex + 1}`}
                        width={600}
                        height={600}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              );
            }

            // 4. Four Square Images (2x2 Grid)
            if (section.type === "four-squares") {
              return (
                <div key={index} className="grid grid-cols-2 gap-8 mb-8">
                  {section.images.map((img, imgIndex) => (
                    <div
                      key={imgIndex}
                      className="aspect-square rounded-lg overflow-hidden"
                    >
                      <Image
                        src={img}
                        alt={`${project.title} - Image ${imgIndex + 1}`}
                        width={600}
                        height={600}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              );
            }

            // 5. TEXT ONLY SECTION - NEW! ✨
            if (section.type === "text-only") {
              return (
                <div
                  key={index}
                  className={`max-w-4xl mx-auto px-8 py-16 mb-8 ${
                    section.align === "center"
                      ? "text-center"
                      : section.align === "right"
                      ? "text-right"
                      : "text-left"
                  }`}
                >
                  <p
                    lang={section.lang || "he"}
                    dir={
                      section.align === "right" || section.lang === "he"
                        ? "rtl"
                        : "ltr"
                    }
                    className="text-2xl md:text-3xl lg:text-4xl leading-relaxed whitespace-pre-line"
                  >
                    {section.text}
                  </p>
                </div>
              );
            }

            return null;
          })}

        {/* Fallback: Simple image grid for projects without custom layout */}
        {!project.layout && project.images && (
          <div className="space-y-8">
            {project.images.map((image, index) => (
              <div key={index} className="w-full">
                <Image
                  src={image}
                  alt={`${project.title} - Image ${index + 1}`}
                  width={1200}
                  height={800}
                  className="w-full h-auto rounded-lg"
                />
              </div>
            ))}
          </div>
        )}

        {/* Old content array support */}
        {!project.layout && project.content && (
          <div className="space-y-12">
            {project.content.map((item, index) => {
              if (item.type === "image") {
                return (
                  <div key={index} className="w-full">
                    <Image
                      src={item.src}
                      alt={`${project.title} - Image ${index + 1}`}
                      width={1200}
                      height={800}
                      className="w-full h-auto rounded-lg"
                    />
                  </div>
                );
              }

              if (item.type === "text") {
                return (
                  <div key={index} className="max-w-4xl mx-auto">
                    <p
                      lang="he"
                      dir="rtl"
                      className="text-lg md:text-xl text-gray-700 leading-relaxed whitespace-pre-line text-right"
                    >
                      {item.content}
                    </p>
                  </div>
                );
              }

              return null;
            })}
          </div>
        )}
      </div>

      {/* Video Section */}
      {project.video && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
          <video controls className="w-full rounded-lg">
            <source src={project.video} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      )}

      {/* Back to Projects Button */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-t mt-16">
        <Link
          href="/#work"
          className="inline-block px-8 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition font-medium"
        >
          View All Projects
        </Link>
      </div>
    </div>
  );
}