import { orderableDocumentListDeskItem } from "@sanity/orderable-document-list";

function ProjectPreview(props) {
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

export const defaultDocumentNode = (S, { schemaType }) => {
  if (schemaType === "project") {
    return S.document().views([
      S.view.form(),
      S.view.component(ProjectPreview).title("Preview"),
    ]);
  }
  return S.document();
};

export const structure = (S, context) =>
  S.list()
    .title("Content")
    .items([
      orderableDocumentListDeskItem({
        type: "project",
        title: "Projects",
        S,
        context,
        createIntent: true,
      }),
      S.divider(),
      ...S.documentTypeListItems().filter(
        (listItem) => !["project"].includes(listItem.getId())
      ),
    ]);
