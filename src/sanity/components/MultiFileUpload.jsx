"use client";
import { useCallback, useState } from "react";
import { useClient } from "sanity";
import { set, unset } from "sanity";

export default function MultiFileUpload(props) {
  const { value = [], onChange, schemaType } = props;
  const client = useClient({ apiVersion: "2025-11-18" });
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState("");

  const uploadFiles = useCallback(
    async (fileList) => {
      const files = Array.from(fileList);
      if (files.length === 0) return;

      setUploading(true);
      const newItems = [...value];

      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        setProgress(`Uploading ${i + 1} of ${files.length}...`);

        try {
          const isImage = file.type.startsWith("image/");
          const asset = await client.assets.upload(
            isImage ? "image" : "file",
            file
          );

          newItems.push({
            _type: "file",
            _key: Math.random().toString(36).slice(2, 10),
            asset: {
              _type: "reference",
              _ref: asset._id,
            },
          });
        } catch (err) {
          console.error(`Failed to upload ${file.name}:`, err);
        }
      }

      onChange(newItems.length > 0 ? set(newItems) : unset());
      setUploading(false);
      setProgress("");
    },
    [value, onChange, client]
  );

  const handleDrop = useCallback(
    (e) => {
      e.preventDefault();
      uploadFiles(e.dataTransfer.files);
    },
    [uploadFiles]
  );

  const handleFileSelect = useCallback(
    (e) => {
      uploadFiles(e.target.files);
    },
    [uploadFiles]
  );

  const removeItem = useCallback(
    (index) => {
      const newItems = value.filter((_, i) => i !== index);
      onChange(newItems.length > 0 ? set(newItems) : unset());
    },
    [value, onChange]
  );

  return (
    <div style={{ fontFamily: "sans-serif" }}>
      {/* Drop zone */}
      <div
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
        style={{
          border: "2px dashed #ccc",
          borderRadius: 8,
          padding: 32,
          textAlign: "center",
          cursor: "pointer",
          background: uploading ? "#f9f9f9" : "#fff",
          marginBottom: 16,
        }}
        onClick={() => document.getElementById("multi-file-input").click()}
      >
        {uploading ? (
          <p style={{ color: "#666", margin: 0 }}>{progress}</p>
        ) : (
          <>
            <p style={{ color: "#333", margin: "0 0 8px", fontWeight: 500 }}>
              Drag & drop images and videos here
            </p>
            <p style={{ color: "#999", margin: 0, fontSize: 14 }}>
              or click to select multiple files
            </p>
          </>
        )}
        <input
          id="multi-file-input"
          type="file"
          multiple
          accept="image/*,video/*"
          onChange={handleFileSelect}
          style={{ display: "none" }}
        />
      </div>

      {/* Uploaded items grid */}
      {value.length > 0 && (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 8,
          }}
        >
          {value.map((item, index) => {
            const ref = item?.asset?._ref || "";
            const isImage = ref.startsWith("image-");

            return (
              <div
                key={item._key || index}
                style={{
                  position: "relative",
                  aspectRatio: "1 / 1",
                  background: "#f0f0f0",
                  borderRadius: 6,
                  overflow: "hidden",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {isImage ? (
                  <span style={{ fontSize: 12, color: "#666" }}>Image</span>
                ) : (
                  <span style={{ fontSize: 12, color: "#666" }}>Video</span>
                )}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    removeItem(index);
                  }}
                  style={{
                    position: "absolute",
                    top: 4,
                    right: 4,
                    background: "rgba(0,0,0,0.6)",
                    color: "#fff",
                    border: "none",
                    borderRadius: "50%",
                    width: 20,
                    height: 20,
                    cursor: "pointer",
                    fontSize: 12,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  x
                </button>
              </div>
            );
          })}
        </div>
      )}

      {value.length > 0 && (
        <p style={{ color: "#999", fontSize: 13, marginTop: 8 }}>
          {value.length} file{value.length !== 1 ? "s" : ""} uploaded
        </p>
      )}
    </div>
  );
}
