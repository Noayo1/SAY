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
          { title: "Branding", value: "Branding" },
          { title: "Social Media", value: "Social Media" },
          { title: "AI Production", value: "AI Production" },
        ],
      },
    },
    {
      name: "templateType",
      title: "Template Type",
      type: "string",
      description: "Choose the page layout for this project.",
      options: {
        list: [
          { title: "Branding", value: "branding" },
          { title: "Social Media", value: "social media" },
        ],
        layout: "radio",
      },
      initialValue: "branding",
    },
    {
      name: "thumbnail",
      title: "Thumbnail Image (Project Grid)",
      type: "image",
      description: "This image appears in the projects grid on the homepage. Images only (JPG, PNG, WebP).",
      options: {
        hotspot: true,
        accept: "image/*",
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: "heroMedia",
      title: "Hero Media (Upload image or video)",
      type: "file",
      description: "Upload one image or video. Max ~20MB for videos — if too large, use the URL field below instead.",
      hidden: ({ parent }) => parent?.templateType === "social media",
    },
    {
      name: "heroVideoUrl",
      title: "Hero Video URL (for large videos)",
      type: "url",
      description: "Paste a video link (Cloudinary, Google Drive, etc.). Use this instead of uploading if the file is too large.",
      hidden: ({ parent }) => parent?.templateType === "social media",
    },
    {
      name: "description",
      title: "Project Description",
      type: "text",
      rows: 4,
      description:
        "Short description that appears after the hero image (optional)",
      hidden: ({ parent }) => parent?.templateType === "social media",
    },
    {
      name: "contentBlocks",
      title: "Content Blocks",
      type: "array",
      description: "Add and arrange content blocks to build your project page",
      hidden: ({ parent }) => parent?.templateType === "social media",
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
              options: { accept: "image/*" },
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

        // Block 1b: Full Width Video
        {
          type: "object",
          name: "fullWidthVideo",
          title: "Full Width Video",
          icon: () => "🎬",
          fields: [
            {
              name: "videoUrl",
              title: "Video URL",
              type: "url",
              description: "Paste a video link (Cloudinary, Google Drive, etc.). Recommended for large files.",
            },
            {
              name: "video",
              title: "Or Upload Video (max ~20MB)",
              type: "file",
              options: {
                accept: "video/*",
              },
              description: "Direct upload for small videos. Use the URL field above for larger files.",
            },
            {
              name: "autoplay",
              title: "Autoplay (muted, loops)",
              type: "boolean",
              initialValue: true,
              description: "If enabled, video autoplays muted and loops. If disabled, shows play controls.",
            },
          ],
          preview: {
            prepare() {
              return {
                title: "Full Width Video",
              };
            },
          },
        },

        // Block 2: Two Media Side by Side
        {
          type: "object",
          name: "twoImages",
          title: "Two Media Side by Side",
          icon: () => "🖼️🖼️",
          fields: [
            {
              name: "imageLeft",
              title: "Left Image",
              type: "image",
              options: { hotspot: true, accept: "image/*" },
              description: "Upload an image, or leave empty and use the video field below instead.",
            },
            {
              name: "videoLeftUrl",
              title: "Left Video URL",
              type: "url",
              description: "Paste a video link for the left slot (used if no image is set).",
            },
            {
              name: "imageRight",
              title: "Right Image",
              type: "image",
              options: { hotspot: true, accept: "image/*" },
              description: "Upload an image, or leave empty and use the video field below instead.",
            },
            {
              name: "videoRightUrl",
              title: "Right Video URL",
              type: "url",
              description: "Paste a video link for the right slot (used if no image is set).",
            },
            {
              name: "aspectRatio",
              title: "Aspect Ratio",
              description: "Choose the display shape for both slots.",
              type: "string",
              options: {
                list: [
                  { title: "Square (1:1)", value: "1/1" },
                  { title: "Portrait (3:4)", value: "3/4" },
                  { title: "Portrait (9:16)", value: "9/16" },
                  { title: "Landscape (16:9)", value: "16/9" },
                ],
              },
              initialValue: "1/1",
            },
          ],
          preview: {
            select: {
              media1: "imageLeft",
              aspectRatio: "aspectRatio",
            },
            prepare({ media1, aspectRatio }) {
              return {
                title: `Two Media (${aspectRatio || "1/1"})`,
                media: media1,
              };
            },
          },
        },

        // Block 3: Four Media Grid (2x2)
        {
          type: "object",
          name: "fourImagesGrid",
          title: "Four Media (2x2 Grid)",
          icon: () => "🔲",
          fields: [
            {
              name: "image1",
              title: "Image 1 (Top Left)",
              type: "image",
              options: { hotspot: true, accept: "image/*" },
              description: "Upload an image, or leave empty and use the video field below.",
            },
            { name: "video1Url", title: "Video 1 URL (Top Left)", type: "url", description: "Paste video link. Used if no image is set." },
            {
              name: "image2",
              title: "Image 2 (Top Right)",
              type: "image",
              options: { hotspot: true, accept: "image/*" },
              description: "Upload an image, or leave empty and use the video field below.",
            },
            { name: "video2Url", title: "Video 2 URL (Top Right)", type: "url", description: "Paste video link. Used if no image is set." },
            {
              name: "image3",
              title: "Image 3 (Bottom Left)",
              type: "image",
              options: { hotspot: true, accept: "image/*" },
              description: "Upload an image, or leave empty and use the video field below.",
            },
            { name: "video3Url", title: "Video 3 URL (Bottom Left)", type: "url", description: "Paste video link. Used if no image is set." },
            {
              name: "image4",
              title: "Image 4 (Bottom Right)",
              type: "image",
              options: { hotspot: true, accept: "image/*" },
              description: "Upload an image, or leave empty and use the video field below.",
            },
            { name: "video4Url", title: "Video 4 URL (Bottom Right)", type: "url", description: "Paste video link. Used if no image is set." },
            {
              name: "aspectRatio",
              title: "Aspect Ratio",
              description: "Choose the display shape for all slots.",
              type: "string",
              options: {
                list: [
                  { title: "Square (1:1)", value: "1/1" },
                  { title: "Portrait (3:4)", value: "3/4" },
                  { title: "Portrait (9:16)", value: "9/16" },
                  { title: "Landscape (16:9)", value: "16/9" },
                ],
              },
              initialValue: "1/1",
            },
          ],
          preview: {
            select: {
              media: "image1",
              aspectRatio: "aspectRatio",
            },
            prepare({ media, aspectRatio }) {
              return {
                title: `Four Media Grid (${aspectRatio || "1/1"})`,
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
              options: { accept: "image/*" },
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
    {
      name: "socialMediaItems",
      title: "Social Media Items",
      type: "array",
      description: "Add images and videos for the social media grid. Only used when Template Type is 'Social Media'.",
      hidden: ({ parent }) => parent?.templateType !== "social media",
      of: [
        {
          type: "object",
          name: "socialMediaItem",
          title: "Media Item",
          fields: [
            {
              name: "image",
              title: "Image",
              type: "image",
              options: { accept: "image/*", hotspot: true },
              description: "Upload an image (JPG, PNG, WebP).",
            },
            {
              name: "videoFile",
              title: "Upload Video (max ~20MB)",
              type: "file",
              options: { accept: "video/*" },
              description: "Upload a video from your computer. For larger files, use the URL field below.",
            },
            {
              name: "videoUrl",
              title: "Video URL",
              type: "url",
              description: "Paste a hosted video URL (Cloudinary, Google Drive, etc.). Used if no file is uploaded.",
            },
            {
              name: "postLink",
              title: "Post Link (Instagram, TikTok, etc.)",
              type: "url",
              description: "Optional. Clicking on this item will open this link in a new tab.",
            },
            {
              name: "size",
              title: "Size",
              type: "string",
              options: {
                list: [
                  { title: "Square (1:1)", value: "1/1" },
                  { title: "Portrait (9:16)", value: "9/16" },
                  { title: "Landscape (16:9)", value: "16/9" },
                ],
                layout: "radio",
              },
              initialValue: "1/1",
            },
            {
              name: "column",
              title: "Column",
              type: "string",
              description: "Choose which side of the grid this item appears on.",
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
              size: "size",
              column: "column",
              postLink: "postLink",
            },
            prepare({ media, size, column, postLink }) {
              return {
                title: `${(column || "left").charAt(0).toUpperCase() + (column || "left").slice(1)} — ${size || "1/1"}`,
                subtitle: postLink ? `Links to: ${postLink}` : "No post link",
                media: media,
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
