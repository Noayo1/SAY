// All your projects data
export const projects = [
  // Project 1 - ALMA with Custom Layout
  {
    id: 1,
    slug: "alma",
    title: "ALMA",
    category: "Branding",
    client: "ALMA Client",
    year: "2025",
    thumbnail: "/projects/alma/t.png",
    layout: [
      {
        type: "full-image",
        src: "/projects/alma/img1.png",
      },
      {
        type: "text-image-row",
        text: "״במישור החוף הצפוני של אשדוד, שוכנת העלמא, מסעדה של אוכל ישראלי מקומי״\nשזורה בנוף האשדודי, לרקע האוניות המחכות לעגון בנמל, לקולות המציל שאינן זרות לתושבי עיר חוף כמו אשדוד\nאלגנטית, מארחת, אוהבת.",
        image: "/projects/alma/img2.png",
      },
      {
        type: "two-squares",
        images: ["/projects/alma/img3.png", "/projects/alma/img5.png"],
      },
      {
        type: "full-image",
        src: "/projects/alma/img10.png",
      },
      {
        type: "four-squares",
        images: [
          "/projects/alma/img9.png",
          "/projects/alma/img12.png",
          "/projects/alma/img8.png",
          "/projects/alma/img11.png",
        ],
      },
    ],
  },

  // Project 2 - Rothchild30
  {
    id: 2,
    slug: "rothchild30",
    title: "Rothchild30",
    category: "Brand Identity",
    client: "Rothchild30 Client",
    year: "2025",

    thumbnail: "/projects/rothchild30/thumbnail.png",

    images: [
      "/projects/rothchild30/img1.png",
      "/projects/rothchild30/img2.jpg",
      "/projects/rothchild30/img3.png",
      "/projects/rothchild30/img4.png",
      "/projects/rothchild30/img5.png",
      "/projects/rothchild30/img6.jpg",
    ],
  },

  {
    id: 3,
    slug: "Peled",
    title: "PELED",
    category: "Poster Design",
    client: "Peled",

    year: "2025",
    thumbnail: "/projects/peled/t.png",

    images: [
      "/projects/peled/1.png",
      "/projects/peled/2.png",
      "/projects/peled/3.png",
      "/projects/peled/4.png",
    ],
  },

  {
    id: 4,
    slug: "Duda",
    title: "Duda",
    category: "Poster Design",
    client: "Duda",
    year: "2025",
    thumbnail: "/projects/duda/t.png",

    images: [
      "/projects/duda/1.png",
      "/projects/duda/2.png",
      "/projects/duda/3.png",
    ],
  },

  {
    id: 5,
    slug: "Bragim",
    title: "Bragim",
    category: "Book Design",
    client: "ACC",
    year: "2024",
    thumbnail: "/projects/BookDesign/1.png",
    images: [
      "/projects/BookDesign/2.png",
      "/projects/BookDesign/3.png",
      "/projects/BookDesign/4.png",
      "/projects/BookDesign/5.png",
    ],
  },
];

// Helper functions (don't change these)
export function getProjectBySlug(slug) {
  return projects.find((project) => project.slug === slug);
}

export function getAllProjectSlugs() {
  return projects.map((project) => project.slug);
}
