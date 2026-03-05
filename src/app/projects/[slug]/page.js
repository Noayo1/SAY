import Image from "next/image";
import Link from "next/link";
import { getProjectBySlug, getAllProjectSlugs } from "@/data/projects";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { notFound } from "next/navigation";

export const dynamicParams = true;

// Fetch project data from Sanity
async function getProjectFromSanity(slug) {
  try {
    const project = await client.fetch(
      `*[_type == "project" && slug.current == $slug][0]{
        _id,
        title,
        slug,
        client,
        year,
        category,
        mainImage,
        description,
        contentBlocks
      }`,
      { slug }
    );
    return project;
  } catch (error) {
    return null;
  }
}

// Generate static paths for all projects (both hardcoded and Sanity)
export async function generateStaticParams() {
  // Get hardcoded project slugs
  const hardcodedSlugs = getAllProjectSlugs();

  // Get Sanity project slugs
  let sanityProjects = [];
  try {
    sanityProjects = await client.fetch(
      `*[_type == "project"]{ "slug": slug.current }`
    );
  } catch (error) {
    console.error("Error fetching Sanity projects:", error);
  }

  const sanitySlugObjects = sanityProjects.map((project) => ({
    slug: project.slug,
  }));

  const hardcodedSlugObjects = hardcodedSlugs.map((slug) => ({
    slug: slug,
  }));

  // Combine both
  return [...hardcodedSlugObjects, ...sanitySlugObjects];
}

// Generate metadata for SEO
export async function generateMetadata({ params }) {
  const resolvedParams = await params;

  // Try hardcoded first
  const hardcodedProject = getProjectBySlug(resolvedParams.slug);
  if (hardcodedProject) {
    return {
      title: `${hardcodedProject.title} - SAY Creative`,
      description: hardcodedProject.description,
    };
  }

  // Try Sanity
  const sanityProject = await getProjectFromSanity(resolvedParams.slug);
  if (sanityProject) {
    return {
      title: `${sanityProject.title} - SAY Creative`,
      description: sanityProject.description,
    };
  }

  return {
    title: "Project Not Found",
  };
}

export default async function ProjectPage({ params }) {
  const resolvedParams = await params;

  // Try to get hardcoded project first
  let project = getProjectBySlug(resolvedParams.slug);
  let isSanityProject = false;

  // If not found in hardcoded, try Sanity
  if (!project) {
    project = await getProjectFromSanity(resolvedParams.slug);
    isSanityProject = true;
  }

  // If still not found, show 404
  if (!project) {
    notFound();
  }

  // SANITY PROJECT RENDERING
  if (isSanityProject) {
    return (
      <div className="min-h-screen bg-white">
        {/* Back Button */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Link
            href="/projects"
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

        {/* Project Title Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="mb-12">
            {/* Category */}
            {project.category && (
              <p className="text-sm uppercase tracking-wider text-gray-500 mb-4">
                {project.category}
              </p>
            )}

            {/* Title */}
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8">
              {project.title}
            </h1>

            {/* Client and Year */}
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

        {/* Hero Image */}
        {project.mainImage && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
            <div className="w-full aspect-video relative rounded-lg overflow-hidden">
              <Image
                src={urlFor(project.mainImage).width(1400).quality(80).auto("format").url()}
                alt={project.title}
                fill
                sizes="(max-width: 768px) 100vw, 1280px"
                className="object-cover"
                priority
              />
            </div>
          </div>
        )}

        {/* Description Text */}
        {project.description && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
            <div className="text-center max-w-3xl mx-auto">
              <p className="text-lg text-gray-700 leading-relaxed">
                {project.description}
              </p>
            </div>
          </div>
        )}

        {/* Content Blocks */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {project.contentBlocks && project.contentBlocks.length > 0 && (
            <div className="space-y-8">
              {project.contentBlocks.map((block, index) => {
                // Block Type 1: Full Width Image
                if (block._type === "fullWidthImage") {
                  return (
                    <div key={index} className="w-full">
                      <div className="relative aspect-video rounded-lg overflow-hidden">
                        <Image
                          src={urlFor(block.image).width(1400).quality(80).auto("format").url()}
                          alt={`${project.title} - Image ${index + 1}`}
                          fill
                          sizes="(max-width: 768px) 100vw, 1280px"
                          className="object-cover"
                        />
                      </div>
                    </div>
                  );
                }

                // Block Type 2: Two Images Side by Side
                if (block._type === "twoImages") {
                  return (
                    <div key={index} className="grid grid-cols-2 gap-8">
                      <div className="relative aspect-square rounded-lg overflow-hidden">
                        <Image
                          src={urlFor(block.imageLeft).width(700).quality(80).auto("format").url()}
                          alt={`${project.title} - Image ${index + 1}`}
                          fill
                          sizes="(max-width: 768px) 50vw, 600px"
                          className="object-cover"
                        />
                      </div>
                      <div className="relative aspect-square rounded-lg overflow-hidden">
                        <Image
                          src={urlFor(block.imageRight).width(700).quality(80).auto("format").url()}
                          alt={`${project.title} - Image ${index + 2}`}
                          fill
                          sizes="(max-width: 768px) 50vw, 600px"
                          className="object-cover"
                        />
                      </div>
                    </div>
                  );
                }

                // Block Type 3: Four Images Grid
                if (block._type === "fourImagesGrid") {
                  return (
                    <div key={index} className="grid grid-cols-2 gap-8">
                      <div className="relative aspect-square rounded-lg overflow-hidden">
                        <Image
                          src={urlFor(block.image1).width(700).quality(80).auto("format").url()}
                          alt={`${project.title} - Image ${index + 1}`}
                          fill
                          sizes="(max-width: 768px) 50vw, 600px"
                          className="object-cover"
                        />
                      </div>
                      <div className="relative aspect-square rounded-lg overflow-hidden">
                        <Image
                          src={urlFor(block.image2).width(700).quality(80).auto("format").url()}
                          alt={`${project.title} - Image ${index + 2}`}
                          fill
                          sizes="(max-width: 768px) 50vw, 600px"
                          className="object-cover"
                        />
                      </div>
                      <div className="relative aspect-square rounded-lg overflow-hidden">
                        <Image
                          src={urlFor(block.image3).width(700).quality(80).auto("format").url()}
                          alt={`${project.title} - Image ${index + 3}`}
                          fill
                          sizes="(max-width: 768px) 50vw, 600px"
                          className="object-cover"
                        />
                      </div>
                      <div className="relative aspect-square rounded-lg overflow-hidden">
                        <Image
                          src={urlFor(block.image4).width(700).quality(80).auto("format").url()}
                          alt={`${project.title} - Image ${index + 4}`}
                          fill
                          sizes="(max-width: 768px) 50vw, 600px"
                          className="object-cover"
                        />
                      </div>
                    </div>
                  );
                }

                // Block Type 4: Image + Text
                if (block._type === "imageText") {
                  return (
                    <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      {block.imagePosition === "left" ? (
                        <>
                          <div className="relative aspect-square rounded-lg overflow-hidden order-2 md:order-none">
                            <Image
                              src={urlFor(block.image).width(700).quality(80).auto("format").url()}
                              alt={`${project.title}`}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div className="md:aspect-square flex items-center justify-center p-6 md:p-8 order-1 md:order-none">
                            <p
                              lang="he"
                              dir="rtl"
                              className="text-base md:text-lg text-gray-700 leading-relaxed whitespace-pre-line text-right"
                            >
                              {block.text}
                            </p>
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="md:aspect-square flex items-center justify-center p-6 md:p-8">
                            <p
                              lang="he"
                              dir="rtl"
                              className="text-base md:text-lg text-gray-700 leading-relaxed whitespace-pre-line text-right"
                            >
                              {block.text}
                            </p>
                          </div>
                          <div className="relative aspect-square rounded-lg overflow-hidden">
                            <Image
                              src={urlFor(block.image).width(700).quality(80).auto("format").url()}
                              alt={`${project.title}`}
                              fill
                              className="object-cover"
                            />
                          </div>
                        </>
                      )}
                    </div>
                  );
                }

                // Block Type 5: Text Only
                if (block._type === "textBlock") {
                  return (
                    <div
                      key={index}
                      className={`max-w-4xl mx-auto py-8 ${
                        block.alignment === "center"
                          ? "text-center"
                          : block.alignment === "left"
                            ? "text-left"
                            : "text-right"
                      }`}
                    >
                      <p
                        lang="he"
                        dir={block.alignment === "right" ? "rtl" : "ltr"}
                        className="text-xl md:text-2xl text-gray-700 leading-relaxed whitespace-pre-line"
                      >
                        {block.text}
                      </p>
                    </div>
                  );
                }

                return null;
              })}
            </div>
          )}
        </div>

        {/* Back to Projects Button */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-t mt-16">
          <Link
            href="/projects"
            className="inline-block px-8 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition font-medium"
          >
            View All Projects
          </Link>
        </div>
      </div>
    );
  }

  // HARDCODED PROJECT RENDERING (unchanged)
  return (
    <div className="min-h-screen bg-white">
      {/* Back Button */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link
          href="/projects"
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
        {project.layout &&
          project.layout.map((section, index) => {
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

            if (section.type === "text-image-row") {
              return (
                <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                  <div className="aspect-square rounded-lg overflow-hidden order-2 md:order-none">
                    <Image
                      src={section.image}
                      alt={`${project.title}`}
                      width={600}
                      height={600}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="md:aspect-square rounded-lg p-6 md:p-8 lg:p-12 flex items-center justify-center order-1 md:order-none">
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

      {project.video && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
          <video controls className="w-full rounded-lg">
            <source src={project.video} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-t mt-16">
        <Link
          href="/projects"
          className="inline-block px-8 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition font-medium"
        >
          View All Projects
        </Link>
      </div>
    </div>
  );
}
