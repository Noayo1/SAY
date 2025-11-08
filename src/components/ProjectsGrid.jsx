import Image from "next/image";
import Link from "next/link";
import { projects } from "@/data/projects";

export default function ProjectsGrid() {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      {projects.map((project) => (
        <Link
          key={project.id}
          href={`/projects/${project.slug}`}
          className="group cursor-pointer"
        >
          {/* Project Card */}
          <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden mb-4">
            {project.thumbnail ? (
              <Image
                src={project.thumbnail}
                alt={project.title}
                width={400}
                height={400}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            ) : (
              // Placeholder if no thumbnail
              <div className="w-full h-full flex items-center justify-center bg-gray-200 group-hover:bg-gray-300 transition">
                <div className="text-center p-8">
                  <p className="text-2xl font-bold text-gray-600 mb-2">
                    {project.title}
                  </p>
                  <p className="text-sm text-gray-500">Click to view</p>
                </div>
              </div>
            )}
          </div>

          {/* Project Info */}
          <h3 className="text-xl font-semibold mb-1 group-hover:underline">
            {project.title}
          </h3>
          <p className="text-gray-600">{project.category}</p>
        </Link>
      ))}
    </div>
  );
}
