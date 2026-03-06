function ProjectPreview(props) {
  const slug = props.document?.displayed?.slug?.current;
  if (!slug) {
    return (
      <div style={{ padding: 20, color: "#999", textAlign: "center" }}>
        Save the project with a slug to see the preview.
      </div>
    );
  }
  const url = `/projects/${slug}`;
  return (
    <iframe
      src={url}
      style={{ width: "100%", height: "100%", border: "none" }}
      title="Project Preview"
    />
  );
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
