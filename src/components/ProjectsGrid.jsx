import Image from 'next/image';

export default function ProjectsGrid() {
  // Sample projects - replace with your actual projects
  const projects = [
    {
      id: 1,
      title: "Project One",
      category: "Branding",
      image: "/projects/project-1.jpg" // Add your images to /public/projects/
    },
    {
      id: 2,
      title: "Project Two",
      category: "Web Design",
      image: "/projects/project-2.jpg"
    },
    {
      id: 3,
      title: "Project Three",
      category: "Packaging",
      image: "/projects/project-3.jpg"
    },
    {
      id: 4,
      title: "Project Four",
      category: "Brand Identity",
      image: "/projects/project-4.jpg"
    },
    {
      id: 5,
      title: "Project Five",
      category: "Marketing",
      image: "/projects/project-5.jpg"
    },
    {
      id: 6,
      title: "Project Six",
      category: "Digital",
      image: "/projects/project-6.jpg"
    }
  ];

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      {projects.map((project) => (
        <div key={project.id} className="group cursor-pointer">
          <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden mb-4">
            {/* Placeholder - Replace with actual images */}
            <div className="w-full h-full flex items-center justify-center bg-gray-200 group-hover:bg-gray-300 transition">
              <span className="text-gray-500">
                {project.title}
              </span>
            </div>
            {/* Uncomment when you have images */}
            {/* 
            <Image
              src={project.image}
              alt={project.title}
              width={400}
              height={400}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            */}
          </div>
          <h3 className="text-xl font-semibold mb-1">{project.title}</h3>
          <p className="text-gray-600">{project.category}</p>
        </div>
      ))}
    </div>
  );
}
