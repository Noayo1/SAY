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
      name: "categories",
      title: "Categories",
      type: "array",
      of: [{ type: "string" }],
      options: {
        list: [
          { title: "Branding", value: "Branding" },
          { title: "Social Media", value: "Social Media" },
          { title: "AI Production", value: "AI Production" },
        ],
      },
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
    },
    {
      name: "heroVideoUrl",
      title: "Hero Video URL (for large videos)",
      type: "url",
      description: "Paste a video link (Cloudinary, Google Drive, etc.). Use this instead of uploading if the file is too large.",
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
              options: { accept: "image/*" },
              validation: (Rule) => Rule.required(),
            },
            {
              name: "hasLink",
              title: "Add link to Instagram",
              type: "boolean",
              initialValue: false,
            },
            {
              name: "postLink",
              title: "Instagram URL",
              type: "url",
              hidden: ({ parent }) => !parent?.hasLink,
            },
          ],
          preview: {
            select: {
              media: "image",
              postLink: "postLink",
            },
            prepare({ media, postLink }) {
              return {
                title: "Full Width Image",
                subtitle: postLink ? `Links to: ${postLink}` : "",
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
            {
              name: "hasLink",
              title: "Add link to Instagram",
              type: "boolean",
              initialValue: false,
            },
            {
              name: "postLink",
              title: "Instagram URL",
              type: "url",
              hidden: ({ parent }) => !parent?.hasLink,
            },
          ],
          preview: {
            select: { postLink: "postLink" },
            prepare({ postLink }) {
              return {
                title: "Full Width Video",
                subtitle: postLink ? `Links to: ${postLink}` : "",
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
              name: "leftMediaType",
              title: "Left Slot — Media Type",
              type: "string",
              options: {
                list: [
                  { title: "Image", value: "image" },
                  { title: "Video", value: "video" },
                ],
                layout: "radio",
              },
              initialValue: "image",
            },
            {
              name: "imageLeft",
              title: "Left Image",
              type: "image",
              options: { hotspot: true, accept: "image/*" },
              hidden: ({ parent }) => parent?.leftMediaType === "video",
            },
            {
              name: "videoLeftFile",
              title: "Left Video — Upload File",
              type: "file",
              options: { accept: "video/*" },
              description: "Upload a video file (MP4, MOV, etc.)",
              hidden: ({ parent }) => parent?.leftMediaType !== "video",
            },
            {
              name: "videoLeftUrl",
              title: "Left Video — Or Paste URL",
              type: "url",
              description: "Paste a video link instead (Cloudinary, YouTube, Vimeo, etc.)",
              hidden: ({ parent }) => parent?.leftMediaType !== "video",
            },
            {
              name: "hasLinkLeft",
              title: "Left Slot — Add link to Instagram",
              type: "boolean",
              initialValue: false,
            },
            {
              name: "postLinkLeft",
              title: "Left Slot — Instagram URL",
              type: "url",
              hidden: ({ parent }) => !parent?.hasLinkLeft,
            },
            {
              name: "rightMediaType",
              title: "Right Slot — Media Type",
              type: "string",
              options: {
                list: [
                  { title: "Image", value: "image" },
                  { title: "Video", value: "video" },
                ],
                layout: "radio",
              },
              initialValue: "image",
            },
            {
              name: "imageRight",
              title: "Right Image",
              type: "image",
              options: { hotspot: true, accept: "image/*" },
              hidden: ({ parent }) => parent?.rightMediaType === "video",
            },
            {
              name: "videoRightFile",
              title: "Right Video — Upload File",
              type: "file",
              options: { accept: "video/*" },
              description: "Upload a video file (MP4, MOV, etc.)",
              hidden: ({ parent }) => parent?.rightMediaType !== "video",
            },
            {
              name: "videoRightUrl",
              title: "Right Video — Or Paste URL",
              type: "url",
              description: "Paste a video link instead (Cloudinary, YouTube, Vimeo, etc.)",
              hidden: ({ parent }) => parent?.rightMediaType !== "video",
            },
            {
              name: "hasLinkRight",
              title: "Right Slot — Add link to Instagram",
              type: "boolean",
              initialValue: false,
            },
            {
              name: "postLinkRight",
              title: "Right Slot — Instagram URL",
              type: "url",
              hidden: ({ parent }) => !parent?.hasLinkRight,
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
              name: "media1Type",
              title: "Slot 1 (Top Left) — Media Type",
              type: "string",
              options: { list: [{ title: "Image", value: "image" }, { title: "Video", value: "video" }], layout: "radio" },
              initialValue: "image",
            },
            {
              name: "image1",
              title: "Image 1 (Top Left)",
              type: "image",
              options: { hotspot: true, accept: "image/*" },
              hidden: ({ parent }) => parent?.media1Type === "video",
            },
            { name: "video1File", title: "Video 1 — Upload File (Top Left)", type: "file", options: { accept: "video/*" }, description: "Upload a video file (MP4, MOV, etc.)", hidden: ({ parent }) => parent?.media1Type !== "video" },
            { name: "video1Url", title: "Video 1 — Or Paste URL (Top Left)", type: "url", hidden: ({ parent }) => parent?.media1Type !== "video" },
            { name: "hasLink1", title: "Slot 1 — Add link to Instagram", type: "boolean", initialValue: false },
            { name: "postLink1", title: "Slot 1 — Instagram URL", type: "url", hidden: ({ parent }) => !parent?.hasLink1 },
            {
              name: "media2Type",
              title: "Slot 2 (Top Right) — Media Type",
              type: "string",
              options: { list: [{ title: "Image", value: "image" }, { title: "Video", value: "video" }], layout: "radio" },
              initialValue: "image",
            },
            {
              name: "image2",
              title: "Image 2 (Top Right)",
              type: "image",
              options: { hotspot: true, accept: "image/*" },
              hidden: ({ parent }) => parent?.media2Type === "video",
            },
            { name: "video2File", title: "Video 2 — Upload File (Top Right)", type: "file", options: { accept: "video/*" }, description: "Upload a video file (MP4, MOV, etc.)", hidden: ({ parent }) => parent?.media2Type !== "video" },
            { name: "video2Url", title: "Video 2 — Or Paste URL (Top Right)", type: "url", hidden: ({ parent }) => parent?.media2Type !== "video" },
            { name: "hasLink2", title: "Slot 2 — Add link to Instagram", type: "boolean", initialValue: false },
            { name: "postLink2", title: "Slot 2 — Instagram URL", type: "url", hidden: ({ parent }) => !parent?.hasLink2 },
            {
              name: "media3Type",
              title: "Slot 3 (Bottom Left) — Media Type",
              type: "string",
              options: { list: [{ title: "Image", value: "image" }, { title: "Video", value: "video" }], layout: "radio" },
              initialValue: "image",
            },
            {
              name: "image3",
              title: "Image 3 (Bottom Left)",
              type: "image",
              options: { hotspot: true, accept: "image/*" },
              hidden: ({ parent }) => parent?.media3Type === "video",
            },
            { name: "video3File", title: "Video 3 — Upload File (Bottom Left)", type: "file", options: { accept: "video/*" }, description: "Upload a video file (MP4, MOV, etc.)", hidden: ({ parent }) => parent?.media3Type !== "video" },
            { name: "video3Url", title: "Video 3 — Or Paste URL (Bottom Left)", type: "url", hidden: ({ parent }) => parent?.media3Type !== "video" },
            { name: "hasLink3", title: "Slot 3 — Add link to Instagram", type: "boolean", initialValue: false },
            { name: "postLink3", title: "Slot 3 — Instagram URL", type: "url", hidden: ({ parent }) => !parent?.hasLink3 },
            {
              name: "media4Type",
              title: "Slot 4 (Bottom Right) — Media Type",
              type: "string",
              options: { list: [{ title: "Image", value: "image" }, { title: "Video", value: "video" }], layout: "radio" },
              initialValue: "image",
            },
            {
              name: "image4",
              title: "Image 4 (Bottom Right)",
              type: "image",
              options: { hotspot: true, accept: "image/*" },
              hidden: ({ parent }) => parent?.media4Type === "video",
            },
            { name: "video4File", title: "Video 4 — Upload File (Bottom Right)", type: "file", options: { accept: "video/*" }, description: "Upload a video file (MP4, MOV, etc.)", hidden: ({ parent }) => parent?.media4Type !== "video" },
            { name: "video4Url", title: "Video 4 — Or Paste URL (Bottom Right)", type: "url", hidden: ({ parent }) => parent?.media4Type !== "video" },
            { name: "hasLink4", title: "Slot 4 — Add link to Instagram", type: "boolean", initialValue: false },
            { name: "postLink4", title: "Slot 4 — Instagram URL", type: "url", hidden: ({ parent }) => !parent?.hasLink4 },
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
              name: "hasLink",
              title: "Add link to Instagram",
              type: "boolean",
              initialValue: false,
            },
            {
              name: "postLink",
              title: "Instagram URL",
              type: "url",
              hidden: ({ parent }) => !parent?.hasLink,
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
