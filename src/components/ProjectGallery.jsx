"use client";

import { useId, useRef, useState } from "react";
import Image from "next/image";

const ratios = {
  "16/9": "aspect-video",
  "4/3": "aspect-[4/3]",
  "1/1": "aspect-square",
  "3/4": "aspect-[3/4]",
  "9/16": "aspect-[9/16]",
};

export default function ProjectGallery({ layout, heading, columns, aspectRatio, showCaptions = true, images }) {
  const track = useRef(null);
  const id = useId();
  const [current, setCurrent] = useState(0);
  if (!images.length) return null;
  const carousel = layout === "imageCarousel";
  const masonry = layout === "masonryGallery";
  const aspect = ratios[aspectRatio] || (carousel ? "aspect-video" : "aspect-[3/4]");

  const moveTo = (index) => {
    const element = track.current;
    if (!element) return;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    element.scrollTo({ left: element.clientWidth * index, behavior: reducedMotion ? "instant" : "smooth" });
  };

  const renderImage = (image) => {
    const picture = masonry ? (
      <Image src={image.src} alt={image.alt} width={image.width} height={image.height}
        sizes={columns === 2 ? "(max-width: 640px) 100vw, 50vw" : "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"}
        className="block h-auto w-full rounded-lg" />
    ) : (
      <div className={`relative ${aspect} overflow-hidden rounded-lg bg-neutral-50`}>
        <Image src={image.src} alt={image.alt} fill
          sizes={carousel ? "(max-width: 1280px) 100vw, 1280px" : "(max-width: 640px) 80vw, 40vw"}
          className="object-contain" />
      </div>
    );
    return (
      <figure>
        {image.link ? <a href={image.link} target="_blank" rel="noopener noreferrer" className="block">{picture}</a> : picture}
        {showCaptions && image.caption && <figcaption className="mt-3 text-sm leading-relaxed text-neutral-500" dir="auto">{image.caption}</figcaption>}
      </figure>
    );
  };

  return (
    <section aria-label={heading || (carousel ? "Image carousel" : "Image gallery")}
      aria-roledescription={carousel ? "carousel" : undefined} className="min-w-0">
      {heading && <h2 className="mb-6 text-2xl font-medium tracking-tight" dir="auto">{heading}</h2>}
      {masonry ? (
        <div className={columns === 2 ? "columns-1 sm:columns-2 gap-6" : "columns-1 sm:columns-2 lg:columns-3 gap-6"}>
          {images.map((image) => <div key={image.key} className="mb-6 break-inside-avoid">{renderImage(image)}</div>)}
        </div>
      ) : (
        <>
          {!carousel && <p className="mb-3 text-xs tracking-wide text-neutral-500">Scroll or swipe to explore →</p>}
          <div ref={track} id={id} dir="ltr" tabIndex={0}
            aria-label={carousel ? "Slides — use left and right arrow keys" : "Scrollable images"}
            onKeyDown={(event) => {
              if (!carousel || event.target !== event.currentTarget || !["ArrowLeft", "ArrowRight"].includes(event.key)) return;
              event.preventDefault();
              moveTo(Math.max(0, Math.min(images.length - 1, current + (event.key === "ArrowRight" ? 1 : -1))));
            }}
            onScroll={carousel ? () => {
              const element = track.current;
              if (element?.clientWidth) setCurrent(Math.max(0, Math.min(images.length - 1, Math.round(element.scrollLeft / element.clientWidth))));
            } : undefined}
            className={carousel
              ? "flex snap-x snap-mandatory overflow-x-auto overscroll-x-contain rounded-lg [scrollbar-width:none] [&::-webkit-scrollbar]:hidden focus-visible:outline-2 focus-visible:outline-offset-4"
              : "flex snap-x snap-mandatory gap-6 overflow-x-auto overscroll-x-contain pb-4 focus-visible:outline-2 focus-visible:outline-offset-4"}>
            {images.map((image, index) => (
              <div key={image.key} role={carousel ? "group" : undefined}
                aria-roledescription={carousel ? "slide" : undefined}
                aria-label={carousel ? `${index + 1} of ${images.length}` : undefined}
                className={carousel ? "w-full min-w-0 shrink-0 snap-start" : "w-[80%] sm:w-[45%] lg:w-[36%] min-w-0 shrink-0 snap-start"}>
                {renderImage(image)}
              </div>
            ))}
          </div>
          {carousel && images.length > 1 && (
            <div className="mt-5 flex flex-wrap items-center justify-between gap-4">
              <p className="text-xs tabular-nums text-neutral-500" aria-live="polite" aria-atomic="true">{current + 1} / {images.length}</p>
              <div className="flex max-w-full flex-wrap justify-center gap-2" aria-label="Choose a slide">
                {images.map((image, index) => (
                  <button key={image.key} type="button" onClick={() => moveTo(index)}
                    aria-label={`Go to image ${index + 1}`} aria-current={current === index ? "true" : undefined} aria-controls={id}
                    className="flex h-8 w-8 items-center justify-center rounded-full focus-visible:outline-2">
                    <span className={`block h-1.5 rounded-full transition-all motion-reduce:transition-none ${current === index ? "w-6 bg-black" : "w-1.5 bg-neutral-300"}`} />
                  </button>
                ))}
              </div>
              <div className="flex gap-2">
                <button type="button" aria-label="Previous image" aria-controls={id} disabled={current === 0} onClick={() => moveTo(current - 1)}
                  className="h-11 w-11 rounded-full border border-neutral-300 text-xl transition hover:bg-neutral-100 disabled:opacity-30">←</button>
                <button type="button" aria-label="Next image" aria-controls={id} disabled={current === images.length - 1} onClick={() => moveTo(current + 1)}
                  className="h-11 w-11 rounded-full border border-neutral-300 text-xl transition hover:bg-neutral-100 disabled:opacity-30">→</button>
              </div>
            </div>
          )}
        </>
      )}
    </section>
  );
}
