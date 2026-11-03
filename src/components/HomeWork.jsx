"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { projectHref } from "@/lib/projectUrls";

const categories = ["All", "Branding", "Social Media", "AI Production", "Posters"];
const normalize = (value) => value.toLowerCase().replace(/[\s-]+/g, " ");

export default function HomeWork({ projects }) {
  const [category, setCategory] = useState("All");
  const filtered = category === "All" ? projects : projects.filter((project) =>
    (project.categories || (project.category ? [project.category] : [])).some((item) => normalize(item) === normalize(category))
  );

  return (
    <section id="selected-work" className="say-work" aria-labelledby="work-heading">
      <div className="say-section-note"><span><i /> A selection of what we do</span><span>Independent creative studio · Ashdod</span></div>
      <div className="say-work-heading">
        <h1 id="work-heading">Selected<br /><span>work.</span><sup>({String(projects.length).padStart(2, "0")})</sup></h1>
        <p>Branding, culture &amp; everything in between.<br />Ideas with a point of view.<br />Made to be seen. Made to be felt.</p>
      </div>
      <div className="say-filters" aria-label="Filter projects">
        {categories.map((item) => (
          <button key={item} type="button" onClick={() => setCategory(item)} aria-pressed={category === item}
            className={category === item ? "is-active" : ""}>
            {item}<span>{String(item === "All" ? projects.length : projects.filter((project) =>
              (project.categories || []).some((value) => normalize(value) === normalize(item))).length).padStart(2, "0")}</span>
          </button>
        ))}
      </div>
      <div className="say-project-grid" aria-live="polite" aria-atomic="false">
        {filtered.map((project, index) => (
          <Link key={project._id || project.id} href={projectHref(project.slug)} className={`say-project say-project-${index % 4}`}>
            <div className="say-project-image">
              {project.thumbnail ? <Image src={project.thumbnail} alt={project.title} fill
                sizes="(max-width: 700px) 100vw, (max-width: 1200px) 60vw, 750px" />
                : <span className="say-image-fallback">{project.title}</span>}
              <span className="say-project-open" aria-hidden="true">↗</span>
            </div>
            <div className="say-project-caption"><div><h2>{project.title}</h2><p>{(project.categories || []).join(" / ")}</p></div><span>{String(index + 1).padStart(2, "0")}</span></div>
          </Link>
        ))}
      </div>
      {!filtered.length && <p className="py-16 text-center">More work coming soon.</p>}
      <div className="say-work-end"><span>Different brands. One curious mind.</span><a href="#top">Back to top ↑</a></div>
    </section>
  );
}
