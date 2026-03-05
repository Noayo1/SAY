"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const categories = [
  "All",
  "Branding",
  "Social",
  "AI Production",
];

export default function ProjectsPageClient({ projects, noPadTop = false }) {
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered =
    activeCategory === "All"
      ? projects
      : projects.filter(
          (p) =>
            p.category &&
            p.category.toLowerCase().replace(/[\s-]+/g, " ") ===
              activeCategory.toLowerCase().replace(/[\s-]+/g, " ")
        );

  return (
    <div className={`${noPadTop ? "pt-12" : "pt-28"} pb-20`}>
      <div className="flex">
        {/* Sidebar */}
        <nav className="hidden lg:block w-56 shrink-0 pl-40 pt-2 mr-10 sticky top-20 self-start">
          <ul className="space-y-3">
            {categories.map((cat) => (
              <li key={cat}>
                <button
                  onClick={() => setActiveCategory(cat)}
                  className={`text-sm whitespace-nowrap transition ${
                    activeCategory === cat
                      ? "text-black underline underline-offset-4"
                      : "text-neutral-400 hover:text-black"
                  }`}
                >
                  {cat}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* Mobile filter */}
        <div className="lg:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-40 bg-white/90 backdrop-blur-sm border border-neutral-200 rounded-full px-4 py-2 flex gap-3 shadow-lg">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`text-xs whitespace-nowrap transition ${
                activeCategory === cat
                  ? "text-black font-medium"
                  : "text-neutral-400"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="flex-1 px-4 sm:px-8 lg:pl-12 lg:pr-40">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-8">
            {filtered.map((project) => (
              <Link
                key={project.source === "sanity" ? project._id : project.id}
                href={`/projects/${project.slug}`}
                className="group"
              >
                <div className="aspect-square sm:aspect-[3/4] bg-neutral-100 overflow-hidden relative">
                  {project.thumbnail ? (
                    <Image
                      src={project.thumbnail}
                      alt={project.title}
                      width={400}
                      height={400}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-neutral-100 group-hover:bg-neutral-200 transition">
                      <p className="text-lg font-medium text-neutral-500">
                        {project.title}
                      </p>
                    </div>
                  )}
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center px-4">
                    <h3 className="text-white text-sm sm:text-base font-medium tracking-widest uppercase text-center">
                      {project.title}
                    </h3>
                    {project.category && (
                      <p className="text-white/70 text-xs sm:text-sm italic mt-2 text-center">
                        {project.category}
                      </p>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {filtered.length === 0 && (
            <p className="text-neutral-400 text-center py-20">
              No projects in this category yet.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
