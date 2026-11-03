import ProjectGallery from "@/components/ProjectGallery";
import Image from "next/image";
import Link from "next/link";
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
        categories,
        heroVideoUrl,
        "heroMediaUrl": heroMedia.asset->url,
        "heroMediaType": heroMedia.asset->mimeType,
        description,
        contentBlocks[]{
          ...,
          images[]{ ..., "dimensions": asset->metadata.dimensions },
          "image1Dimensions": image1.asset->metadata.dimensions,
          "image2Dimensions": image2.asset->metadata.dimensions,
          "image3Dimensions": image3.asset->metadata.dimensions,
          "image4Dimensions": image4.asset->metadata.dimensions,
          "videoFileUrl": video.asset->url,
          "videoLeftFileUrl": videoLeftFile.asset->url,
          "videoRightFileUrl": videoRightFile.asset->url,
          "video1FileUrl": video1File.asset->url,
          "video2FileUrl": video2File.asset->url,
          "video3FileUrl": video3File.asset->url,
          "video4FileUrl": video4File.asset->url
        }
      }`,
      { slug }
    );
    return project;
  } catch (error) {
    return null;
  }
}

export async function generateStaticParams() {
  let sanityProjects = [];
  try {
    sanityProjects = await client.fetch(
      `*[_type == "project"]{ "slug": slug.current }`
    );
  } catch (error) {
    console.error("Error fetching Sanity projects:", error);
  }

  return sanityProjects.map((project) => ({
    slug: project.slug,
  }));
}

// Generate metadata for SEO
export async function generateMetadata({ params }) {
  const resolvedParams = await params;

  const project = await getProjectFromSanity(resolvedParams.slug);
  if (project) {
    return {
      title: `${project.title} - SAY Creative`,
      description: project.description,
    };
  }

  return {
    title: "Project Not Found",
  };
}

export default async function ProjectPage({ params }) {
  const resolvedParams = await params;

  const project = await getProjectFromSanity(resolvedParams.slug);

  if (!project) {
    notFound();
  }

  {
    const aspectMap = {
      "1/1": "aspect-square",
      "3/4": "aspect-[3/4]",
      "9/16": "aspect-[9/16]",
      "16/9": "aspect-video",
      "4/3": "aspect-[4/3]",
    };
    const aspectClass = (ratio) => aspectMap[ratio] || "aspect-square";

    const getEmbedUrl = (url) => {
      if (!url) return null;
      // YouTube
      let match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/shorts\/)([\w-]+)/);
      if (match) return `https://www.youtube.com/embed/${match[1]}?autoplay=1&mute=1&loop=1&playlist=${match[1]}`;
      // Vimeo
      match = url.match(/vimeo\.com\/(\d+)/);
      if (match) return `https://player.vimeo.com/video/${match[1]}?autoplay=1&muted=1&loop=1`;
      return null;
    };

    const VideoPlayer = ({ src, aspect = "aspect-video", controls = false, fullSize = false, contain = false }) => {
      const embedUrl = getEmbedUrl(src);
      if (embedUrl) {
        return (
          <div className={`${aspect} relative rounded-lg overflow-hidden`}>
            <iframe
              src={embedUrl}
              className="absolute inset-0 w-full h-full"
              allow="autoplay; fullscreen"
              allowFullScreen
            />
          </div>
        );
      }
      return (
        <div className={`${fullSize ? "" : aspect} relative rounded-lg overflow-hidden`}>
          <video
            {...(!controls
              ? { autoPlay: true, muted: true, loop: true, playsInline: true }
              : { controls: true })}
            className={fullSize ? "block w-full h-auto" : `absolute inset-0 w-full h-full ${contain ? "object-contain" : "object-cover"}`}
          >
            <source src={src} />
          </video>
        </div>
      );
    };

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
            {/* Categories */}
            {project.categories && project.categories.length > 0 && (
              <p className="text-sm uppercase tracking-wider text-gray-500 mb-4">
                {project.categories.join(" / ")}
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

        {/* Hero Media */}
        {(() => {
          const videoUrl = project.heroVideoUrl;
          const mediaUrl = project.heroMediaUrl;
          const isVideo = videoUrl || (project.heroMediaType && project.heroMediaType.startsWith("video/"));

          if (videoUrl || (isVideo && mediaUrl)) {
            return (
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
                <div className="rounded-lg overflow-hidden">
                  <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="w-full h-auto"
                  >
                    <source src={videoUrl || mediaUrl} />
                  </video>
                </div>
              </div>
            );
          }
          if (mediaUrl) {
            return (
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
                <div className="w-full aspect-video relative rounded-lg overflow-hidden">
                  <Image
                    src={mediaUrl}
                    alt={project.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 1280px"
                    className="object-cover"
                    priority
                  />
                </div>
              </div>
            );
          }
          return null;
        })()}

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
                const wrapLink = (content, link) => {
                  if (!link) return content;
                  return (
                    <a href={link} target="_blank" rel="noopener noreferrer" className="block">
                      {content}
                    </a>
                  );
                };

                if (["imageCarousel", "masonryGallery", "imageStrip"].includes(block._type)) {
                  const images = (block.images || []).filter((image) => image.asset).map((image) => ({
                    key: image._key || image.asset._ref,
                    src: urlFor(image.asset).width(1600).quality(85).auto("format").url(),
                    width: image.dimensions?.width || 1000,
                    height: image.dimensions?.height || 1000,
                    alt: image.alt || project.title,
                    caption: image.caption || "",
                    link: image.link || "",
                  }));
                  return <ProjectGallery key={block._key || index} layout={block._type} heading={block.heading} columns={block.columns} aspectRatio={block.aspectRatio} showCaptions={block.showCaptions} images={images} />;
                }

                // Block Type 1: Full Width Image
                if (block._type === "fullWidthImage") {
                  return (
                    <div key={index} className="w-full">
                      {wrapLink(
                        <div className="relative aspect-video rounded-lg overflow-hidden">
                          <Image
                            src={urlFor(block.image).width(1400).quality(80).auto("format").url()}
                            alt={`${project.title} - Image ${index + 1}`}
                            fill
                            sizes="(max-width: 768px) 100vw, 1280px"
                            className="object-cover"
                          />
                        </div>,
                        block.postLink
                      )}
                    </div>
                  );
                }

                // Full Width Video
                if (block._type === "fullWidthVideo") {
                  const src = block.videoUrl || block.videoFileUrl;
                  if (!src) return null;
                  return (
                    <div key={index} className="w-full">
                      {wrapLink(
                        <VideoPlayer src={src} controls={block.autoplay === false} fullSize={block.displaySize === "original"} aspect={aspectClass(block.displaySize === "original" ? "16/9" : block.displaySize || "16/9")} contain={Boolean(block.displaySize && block.displaySize !== "default")} />,
                        block.postLink
                      )}
                    </div>
                  );
                }

                // Block Type 2: Two Media Side by Side
                if (block._type === "twoImages") {
                  const aspect = aspectClass(block.aspectRatio);
                  const renderSlot = (image, videoUrl, alt, postLink) => {
                    let content = null;
                    if (image) {
                      content = (
                        <div className={`relative ${aspect} rounded-lg overflow-hidden`}>
                          <Image
                            src={urlFor(image).width(700).quality(80).auto("format").url()}
                            alt={alt}
                            fill
                            sizes="(max-width: 768px) 50vw, 600px"
                            className="object-cover"
                          />
                        </div>
                      );
                    } else if (videoUrl) {
                      content = <VideoPlayer src={videoUrl} aspect={aspect} />;
                    }
                    if (!content) return null;
                    return wrapLink(content, postLink);
                  };
                  return (
                    <div key={index} className="grid grid-cols-2 gap-8">
                      {renderSlot(block.imageLeft, block.videoLeftUrl || block.videoLeftFileUrl, `${project.title} - ${index + 1}`, block.postLinkLeft)}
                      {renderSlot(block.imageRight, block.videoRightUrl || block.videoRightFileUrl, `${project.title} - ${index + 2}`, block.postLinkRight)}
                    </div>
                  );
                }

                // Block Type 3: Four Images Grid
                if (block._type === "fourImagesGrid") {
                  const renderGridSlot = (slot) => {
                    const image = block[`image${slot}`];
                    const videoUrl = block[`video${slot}Url`] || block[`video${slot}FileUrl`];
                    const postLink = block[`postLink${slot}`];
                    const dimensions = block[`image${slot}Dimensions`];
                    const ratio = block[`image${slot}AspectRatio`] || "original";
                    let content = null;
                    if (image?.asset) {
                      // Use the asset directly so saved Sanity crops cannot trim the full image.
                      const src = urlFor(image.asset).width(1400).quality(80).auto("format").url();
                      const alt = `${project.title} - Image ${slot}`;
                      content = ratio === "original" ? (
                        <Image
                          src={src}
                          alt={alt}
                          width={dimensions?.width || 700}
                          height={dimensions?.height || 700}
                          sizes="(max-width: 768px) 50vw, 600px"
                          className="block w-full h-auto rounded-lg"
                        />
                      ) : (
                        <div className={`relative ${ratio === "4/3" ? "aspect-[4/3]" : aspectClass(ratio)} rounded-lg overflow-hidden`}>
                          <Image
                            src={src}
                            alt={alt}
                            fill
                            sizes="(max-width: 768px) 50vw, 600px"
                            className="object-contain"
                          />
                        </div>
                      );
                    } else if (videoUrl) {
                      content = <VideoPlayer src={videoUrl} aspect={aspectClass(block.aspectRatio)} />;
                    }
                    if (!content) return null;
                    return <div key={slot} className="min-w-0">{wrapLink(content, postLink)}</div>;
                  };
                  return (
                    <div key={index} className="grid grid-cols-2 items-start gap-8">
                      {[1, 2, 3, 4].map(renderGridSlot)}
                    </div>
                  );
                }

                // Block Type 4: Image + Text
                if (block._type === "imageText") {
                  const imageEl = (
                    <div className="relative aspect-square rounded-lg overflow-hidden order-2 md:order-none">
                      <Image
                        src={urlFor(block.image).width(700).quality(80).auto("format").url()}
                        alt={`${project.title}`}
                        fill
                        className="object-cover"
                      />
                    </div>
                  );
                  const textEl = (
                    <div className={`md:aspect-square flex items-center justify-center p-6 md:p-8 ${block.imagePosition === "left" ? "order-1 md:order-none" : ""}`}>
                      <p
                        lang="he"
                        dir="rtl"
                        className="text-base md:text-lg text-gray-700 leading-relaxed whitespace-pre-line text-right"
                      >
                        {block.text}
                      </p>
                    </div>
                  );
                  return (
                    <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      {block.imagePosition === "left" ? (
                        <>
                          {wrapLink(imageEl, block.postLink)}
                          {textEl}
                        </>
                      ) : (
                        <>
                          {textEl}
                          {wrapLink(
                            <div className="relative aspect-square rounded-lg overflow-hidden">
                              <Image
                                src={urlFor(block.image).width(700).quality(80).auto("format").url()}
                                alt={`${project.title}`}
                                fill
                                className="object-cover"
                              />
                            </div>,
                            block.postLink
                          )}
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

}
