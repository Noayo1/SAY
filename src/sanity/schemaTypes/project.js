export default {
  name: "project",
  title: "Projects",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Project Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "slug",
      title: "Slug (URL)",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
      description: 'Click "Generate" button after writing the title',
      validation: (Rule) => Rule.required(),
    },
    {
      name: "client",
      title: "Client Name",
      type: "string",
    },
    {
      name: "year",
      title: "Year",
      type: "string",
    },
    {
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          { title: "Branding", value: "branding" },
          { title: "Web Design", value: "web-design" },
          { title: "Print", value: "print" },
          { title: "Social Media", value: "social-media" },
        ],
      },
    },
    {
      name: "thumbnail",
      title: "Thumbnail Image (Project Grid)",
      type: "image",
      description: "This image appears in the projects grid on the homepage",
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: "mainImage",
      title: "Hero Image (Project Page)",
      type: "image",
      description:
        "Main hero image shown at the top of the individual project page",
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: "description",
      title: "Project Description",
      type: "text",
      rows: 4,
      description:
        "Short description that appears after the hero image (optional)",
    },
    {
      name: "contentBlocks",
      title: "Content Blocks",
      type: "array",
      description: "Add and arrange content blocks to build your project page",
      of: [
        // Block 1: Single Full Width Image
        {
          type: "object",
          name: "fullWidthImage",
          title: "Full Width Image",
          icon: () => "🖼️",
          fields: [
            {
              name: "image",
              title: "Image",
              type: "image",
              validation: (Rule) => Rule.required(),
            },
          ],
          preview: {
            select: {
              media: "image",
            },
            prepare({ media }) {
              return {
                title: "Full Width Image",
                media: media,
              };
            },
          },
        },

        // Block 2: Two Images Side by Side
        {
          type: "object",
          name: "twoImages",
          title: "Two Images Side by Side",
          icon: () => "🖼️🖼️",
          fields: [
            {
              name: "imageLeft",
              title: "Left Image",
              type: "image",
              validation: (Rule) => Rule.required(),
            },
            {
              name: "imageRight",
              title: "Right Image",
              type: "image",
              validation: (Rule) => Rule.required(),
            },
          ],
          preview: {
            select: {
              media1: "imageLeft",
              media2: "imageRight",
            },
            prepare({ media1, media2 }) {
              return {
                title: "Two Images Side by Side",
                media: media1,
              };
            },
          },
        },

        // Block 3: Four Images Grid (2x2)
        {
          type: "object",
          name: "fourImagesGrid",
          title: "Four Images (2x2 Grid)",
          icon: () => "🔲",
          fields: [
            {
              name: "image1",
              title: "Image 1 (Top Left)",
              type: "image",
              validation: (Rule) => Rule.required(),
            },
            {
              name: "image2",
              title: "Image 2 (Top Right)",
              type: "image",
              validation: (Rule) => Rule.required(),
            },
            {
              name: "image3",
              title: "Image 3 (Bottom Left)",
              type: "image",
              validation: (Rule) => Rule.required(),
            },
            {
              name: "image4",
              title: "Image 4 (Bottom Right)",
              type: "image",
              validation: (Rule) => Rule.required(),
            },
          ],
          preview: {
            select: {
              media: "image1",
            },
            prepare({ media }) {
              return {
                title: "Four Images Grid (2x2)",
                media: media,
              };
            },
          },
        },

        // Block 4: Image + Text Side by Side
        {
          type: "object",
          name: "imageText",
          title: "Image + Text Side by Side",
          icon: () => "🖼️📝",
          fields: [
            {
              name: "image",
              title: "Image",
              type: "image",
              validation: (Rule) => Rule.required(),
            },
            {
              name: "text",
              title: "Text",
              type: "text",
              rows: 5,
              validation: (Rule) => Rule.required(),
            },
            {
              name: "imagePosition",
              title: "Image Position",
              type: "string",
              options: {
                list: [
                  { title: "Left", value: "left" },
                  { title: "Right", value: "right" },
                ],
                layout: "radio",
              },
              initialValue: "left",
            },
          ],
          preview: {
            select: {
              media: "image",
              text: "text",
              position: "imagePosition",
            },
            prepare({ media, text, position }) {
              return {
                title: `Image + Text (Image on ${position})`,
                subtitle: text?.substring(0, 60) + "...",
                media: media,
              };
            },
          },
        },

        // Block 5: Text Only
        {
          type: "object",
          name: "textBlock",
          title: "Text Block",
          icon: () => "📝",
          fields: [
            {
              name: "text",
              title: "Text Content",
              type: "text",
              rows: 5,
              validation: (Rule) => Rule.required(),
            },
            {
              name: "alignment",
              title: "Text Alignment",
              type: "string",
              options: {
                list: [
                  { title: "Left", value: "left" },
                  { title: "Center", value: "center" },
                  { title: "Right", value: "right" },
                ],
                layout: "radio",
              },
              initialValue: "right",
            },
          ],
          preview: {
            select: {
              text: "text",
              alignment: "alignment",
            },
            prepare({ text, alignment }) {
              return {
                title: `Text Block (${alignment})`,
                subtitle: text?.substring(0, 60) + "...",
              };
            },
          },
        },
      ],
    },
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "client",
      media: "thumbnail",
    },
  },
};
