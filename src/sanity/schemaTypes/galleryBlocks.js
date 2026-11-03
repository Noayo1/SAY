const imageFields = {
  name: "images",
  title: "Images — upload and drag to reorder",
  type: "array",
  of: [{
    type: "image",
    options: { accept: "image/*" },
    validation: (Rule) => Rule.required().assetRequired(),
    fields: [
      { name: "alt", title: "Image description (accessibility)", type: "string" },
      { name: "caption", title: "Caption (optional)", type: "string" },
      { name: "link", title: "Link (optional)", type: "url" },
    ],
  }],
  validation: (Rule) => Rule.required().min(1).max(40),
};

const layouts = [
  { name: "imageCarousel", title: "Image Carousel", description: "One image at a time, with arrows, dots and swipe navigation." },
  { name: "masonryGallery", title: "Masonry Gallery", description: "An editorial gallery with natural image heights and no cropping." },
  { name: "imageStrip", title: "Horizontal Image Strip", description: "A horizontal gallery visitors can scroll or swipe through." },
];

export const galleryBlocks = layouts.map(({name, title, description}) => ({
  name, title, type: "object", description,
  fields: [
    { name: "heading", title: "Gallery heading (optional)", type: "string" },
    imageFields,
    { name: "showCaptions", title: "Show image captions", type: "boolean", initialValue: true },
    ...(name === "masonryGallery" ? [{
      name: "columns", title: "Columns on desktop", type: "number",
      options: { list: [{title: "Two columns", value: 2}, {title: "Three columns", value: 3}] },
      initialValue: 3,
    }] : [{
      name: "aspectRatio", title: "Display shape (images remain fully visible)", type: "string",
      options: { list: [
        {title: "Landscape (16:9)", value: "16/9"},
        {title: "Landscape (4:3)", value: "4/3"},
        {title: "Square (1:1)", value: "1/1"},
        {title: "Portrait (3:4)", value: "3/4"},
        {title: "Portrait (9:16)", value: "9/16"},
      ] },
      initialValue: name === "imageCarousel" ? "16/9" : "3/4",
    }]),
  ],
  preview: {
    select: { heading: "heading", media: "images.0", images: "images" },
    prepare({heading, media, images}) {
      return {title: heading || title, subtitle: title + " · " + (images?.length || 0) + " images", media};
    },
  },
}));
