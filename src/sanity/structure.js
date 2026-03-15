import { projectId, dataset } from "./env";

function getAssetUrl(ref) {
  if (!ref) return null;
  const parts = ref.split("-");
  if (parts[0] === "image") {
    return `https://cdn.sanity.io/images/${projectId}/${dataset}/${parts.slice(1).join("-").replace(/-([a-z]+)$/, ".$1")}`;
  }
  if (parts[0] === "file") {
    return `https://cdn.sanity.io/files/${projectId}/${dataset}/${parts[1]}.${parts[2]}`;
  }
  return null;
}

function SocialMediaPreview(props) {
  const doc = props.document?.displayed;
  const title = doc?.title || "Untitled";
  const files = doc?.socialMediaFiles || [];

  if (files.length === 0) {
    return (
      <div style={{ padding: 40, color: "#999", textAlign: "center", fontFamily: "sans-serif" }}>
        Upload images and videos to see the preview.
      </div>
    );
  }

  const items = files
    .map((item) => {
      const ref = item?.asset?._ref;
      return { url: getAssetUrl(ref), isVideo: ref && ref.startsWith("file-") };
    })
    .filter((item) => item.url);

  const leftItems = items.filter((_, i) => i % 2 === 0);
  const rightItems = items.filter((_, i) => i % 2 === 1);

  const renderItem = (item, index) => (
    <div key={index} style={{ borderRadius: 8, marginBottom: 8, overflow: "hidden" }}>
      {item.isVideo ? (
        <video src={item.url} muted autoPlay loop playsInline style={{ width: "100%", height: "auto" }} />
      ) : (
        <img src={item.url} alt="" style={{ width: "100%", height: "auto" }} />
      )}
    </div>
  );

  return (
    <div style={{ padding: 24, fontFamily: "sans-serif", maxWidth: 800, margin: "0 auto" }}>
      <h2 style={{ fontSize: 24, fontWeight: "bold", marginBottom: 16 }}>{title}</h2>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, alignItems: "start" }}>
        <div>{leftItems.map(renderItem)}</div>
        <div>{rightItems.map(renderItem)}</div>
      </div>
    </div>
  );
}

function BrandingPreview(props) {
  const slug = props.document?.displayed?.slug?.current;
  if (!slug) {
    return (
      <div style={{ padding: 20, color: "#999", textAlign: "center" }}>
        Save the project with a slug to see the preview.
      </div>
    );
  }
  return (
    <iframe
      src={`/projects/${slug}`}
      style={{ width: "100%", height: "100%", border: "none" }}
      title="Project Preview"
    />
  );
}

function ProjectPreview(props) {
  const templateType = props.document?.displayed?.templateType;
  if (templateType === "social media") {
    return <SocialMediaPreview {...props} />;
  }
  return <BrandingPreview {...props} />;
}

export const structure = (S) =>
  S.list()
    .title("Content")
    .items([
      S.listItem()
        .title("Projects")
        .schemaType("project")
        .child(
          S.documentTypeList("project")
            .title("Projects")
            .child((documentId) =>
              S.document()
                .documentId(documentId)
                .schemaType("project")
                .views([
                  S.view.form(),
                  S.view
                    .component(ProjectPreview)
                    .title("Preview"),
                ])
            )
        ),
      ...S.documentTypeListItems().filter(
        (listItem) => !["project"].includes(listItem.getId())
      ),
    ]);
