"use client";
import { useState, useEffect, useCallback } from "react";
import { useClient } from "sanity";

export default function PublishAllTool() {
  const client = useClient({ apiVersion: "2025-11-18" });
  const [drafts, setDrafts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [publishing, setPublishing] = useState(false);
  const [status, setStatus] = useState("");

  const fetchDrafts = useCallback(async () => {
    setLoading(true);
    try {
      const results = await client.fetch(
        `*[_id in path "drafts.**"] { _id, _type, title }`,
        {},
        { perspective: "raw" }
      );
      setDrafts(results);
    } catch (err) {
      console.error("Failed to fetch drafts:", err);
    }
    setLoading(false);
  }, [client]);

  useEffect(() => {
    fetchDrafts();
  }, [fetchDrafts]);

  const publishAll = async () => {
    if (drafts.length === 0) return;
    setPublishing(true);
    setStatus(`Publishing 0 of ${drafts.length}...`);

    let published = 0;
    for (const draft of drafts) {
      const publishedId = draft._id.replace("drafts.", "");
      try {
        const doc = await client.fetch(`*[_id == $id][0]`, { id: draft._id }, { perspective: "raw" });
        const { _id, ...fields } = doc;
        await client.createOrReplace({ ...fields, _id: publishedId });
        await client.delete(draft._id);
        published++;
        setStatus(`Publishing ${published} of ${drafts.length}...`);
      } catch (err) {
        console.error(`Failed to publish ${draft._id}:`, err);
      }
    }

    setStatus(`Done! Published ${published} document${published !== 1 ? "s" : ""}.`);
    setPublishing(false);
    fetchDrafts();
  };

  return (
    <div style={{ padding: 32, fontFamily: "sans-serif", maxWidth: 600 }}>
      <h2 style={{ fontSize: 24, fontWeight: "bold", marginBottom: 8 }}>
        Publish All Drafts
      </h2>
      <p style={{ color: "#666", marginBottom: 24, fontSize: 14 }}>
        Publish all unpublished changes at once.
      </p>

      {loading ? (
        <p style={{ color: "#999" }}>Loading drafts...</p>
      ) : drafts.length === 0 ? (
        <p style={{ color: "#999" }}>No unpublished drafts found.</p>
      ) : (
        <>
          <ul style={{ listStyle: "none", padding: 0, marginBottom: 24 }}>
            {drafts.map((draft) => (
              <li
                key={draft._id}
                style={{
                  padding: "10px 12px",
                  borderBottom: "1px solid #eee",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <span style={{ fontWeight: 500 }}>
                  {draft.title || draft._id.replace("drafts.", "")}
                </span>
                <span
                  style={{
                    fontSize: 12,
                    color: "#999",
                    background: "#f5f5f5",
                    padding: "2px 8px",
                    borderRadius: 4,
                  }}
                >
                  {draft._type}
                </span>
              </li>
            ))}
          </ul>

          <button
            onClick={publishAll}
            disabled={publishing}
            style={{
              background: publishing ? "#999" : "#000",
              color: "#fff",
              border: "none",
              padding: "12px 24px",
              borderRadius: 6,
              fontSize: 14,
              fontWeight: 500,
              cursor: publishing ? "default" : "pointer",
            }}
          >
            {publishing
              ? "Publishing..."
              : `Publish All (${drafts.length} draft${drafts.length !== 1 ? "s" : ""})`}
          </button>
        </>
      )}

      {status && (
        <p style={{ marginTop: 16, color: publishing ? "#666" : "#16a34a", fontWeight: 500 }}>
          {status}
        </p>
      )}

      {!loading && (
        <button
          onClick={fetchDrafts}
          disabled={publishing}
          style={{
            marginTop: 12,
            background: "none",
            border: "1px solid #ddd",
            padding: "8px 16px",
            borderRadius: 6,
            fontSize: 13,
            cursor: "pointer",
            color: "#666",
          }}
        >
          Refresh
        </button>
      )}
    </div>
  );
}
