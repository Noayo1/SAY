"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import ArrowIcon from "@/components/ArrowIcon";
import { projectHref } from "@/lib/projectUrls";
import "./SpatialProjects.css";

export default function SpatialProjects({ projects }) {
  const [active, setActive] = useState(0);
  const [indexOpen, setIndexOpen] = useState(false);
  const touch = useRef(null);
  const move = (step) => setActive((value) => (value + step + projects.length) % projects.length);
  if (!projects.length) return <div className="spatial-empty">The gallery is loading. Please refresh in a moment.</div>;
  const project = projects[active];
  const count = (value) => String(value).padStart(2, "0");
  const visible = projects.length === 1 ? [0] : projects.length === 2 ? [0, 1] : projects.length < 5 ? [-1, 0, 1] : [-2, -1, 0, 1, 2];
  return (
    <div className="spatial-page">
      <div className="spatial-topline"><span>SAY / A different point of view</span><button onClick={() => setIndexOpen(!indexOpen)} aria-expanded={indexOpen} aria-controls="spatial-index">{indexOpen ? "Close index −" : "Project index +"}</button></div>
      <section className="spatial-experience" aria-label="Selected projects" aria-roledescription="carousel">
        <div className="spatial-info" aria-live="polite" aria-atomic="true">
          <p className="spatial-eyebrow">Selected work / {count(active + 1)}</p>
          <h1>{project.title}</h1>
          <dl><div><dt>Discipline</dt><dd>{(project.categories || []).join(" / ")}</dd></div><div><dt>Studio</dt><dd>SAY Creative</dd></div></dl>
          <Link className="spatial-open" href={projectHref(project.slug)}>Explore project <ArrowIcon /></Link>
        </div>
        <div className="spatial-watermark" aria-hidden="true">SAY.</div>
        <div className="spatial-stage" tabIndex={0} aria-label="Project cards. Use left and right arrow keys or swipe to browse."
          onKeyDown={(event) => { if (event.target !== event.currentTarget) return; if (["ArrowLeft", "ArrowRight"].includes(event.key)) { event.preventDefault(); move(event.key === "ArrowRight" ? 1 : -1); } }}
          onTouchStart={(event) => { touch.current = {x: event.touches[0].clientX, y: event.touches[0].clientY}; }}
          onTouchEnd={(event) => { if (!touch.current) return; const dx = event.changedTouches[0].clientX - touch.current.x; const dy = event.changedTouches[0].clientY - touch.current.y; if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy)) move(dx < 0 ? 1 : -1); touch.current = null; }}>
          {visible.map((offset) => {
            const itemIndex = (active + offset + projects.length) % projects.length;
            const item = projects[itemIndex];
            const body = <><div className="spatial-card-art">{item.thumbnail ? <Image src={item.thumbnail} alt={item.title} fill priority={offset === 0} sizes="(max-width: 700px) 72vw, 40vw" draggable={false} /> : <span>{item.title}</span>}</div><div className="spatial-card-label"><span>SAY — {count(itemIndex + 1)}</span><span>{offset === 0 ? <>View project <ArrowIcon /></> : "Selected work"}</span></div></>;
            return <Link key={item._id || itemIndex} href={projectHref(item.slug)} tabIndex={Math.abs(offset) > 1 ? -1 : 0}
              className={offset === 0 ? "spatial-card spatial-card-active" : "spatial-card"} data-position={offset}
              aria-label={offset === 0 ? `Open ${item.title}` : `Show ${item.title}`}
              onClick={(event) => { if (offset !== 0) {event.preventDefault(); setActive(itemIndex);} }}>{body}</Link>;
          })}
        </div>
        <div className="spatial-bottom"><p>Ideas, made tangible.<br /><span>Branding · Social · Creative production</span></p><div className="spatial-controls"><button aria-label="Previous project" onClick={() => move(-1)}><ArrowIcon direction="up" /></button><span aria-live="polite">{count(active + 1)} <i>/ {count(projects.length)}</i></span><button aria-label="Next project" onClick={() => move(1)}><ArrowIcon direction="down" /></button></div><p className="spatial-hint">Use arrows or swipe<br />to find your next favourite.</p></div>
      </section>
      {indexOpen && <section id="spatial-index" className="spatial-index" aria-label="Project index">{projects.map((item, itemIndex) => <button key={item._id} onClick={() => {setActive(itemIndex); setIndexOpen(false);}}><span>{count(itemIndex + 1)}</span>{item.title}<ArrowIcon /></button>)}</section>}
      <div className="spatial-footer"><span>Independent minds. Distinctive identities.</span><Link href="/">Back to current homepage <ArrowIcon /></Link></div>
    </div>
  );
}
