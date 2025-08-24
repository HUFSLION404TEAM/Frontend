import React, { useMemo, useState } from "react";
import { UNIS } from "../../../student/OnBoarding/Components/data";

export default function University({ open, onClose, onPick }) {
  const [q, setQ] = useState("");
  const filtered = useMemo(
    () => UNIS.filter((u) => u.toLowerCase().includes(q.trim().toLowerCase())),
    [q]
  );
  if (!open) return null;

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed", inset: 0, background: "rgba(0,0,0,.2)",
        backdropFilter: "blur(3px)", display: "flex",
        alignItems: "center", justifyContent: "center", zIndex: 30,
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: 280, borderRadius: 16, background: "#fff",
          boxShadow: "0 10px 30px rgba(0,0,0,.12)", padding: 12,
        }}
      >
        <div style={{ display: "flex", gap: 8, marginBottom: 10 }}>
          <input
            placeholder="검색"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            style={{
              flex: 1, height: 36, borderRadius: 18, border: "1px solid #E6EAF5",
              padding: "0 14px", outline: "none",
            }}
          />
          <div style={{
            width: 36, height: 36, borderRadius: 18, border: "1px solid #E6EAF5",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>🔍</div>
        </div>

        <div style={{ maxHeight: 220, overflow: "auto" }}>
          {filtered.map((u) => (
            <div
              key={u}
              onClick={() => { onPick(u); onClose(); }}
              style={{ padding: "10px 12px", borderRadius: 10, cursor: "pointer" }}
            >
              {u}
            </div>
          ))}
          {filtered.length === 0 && (
            <div style={{ padding: 12, color: "#94A3B8" }}>검색 결과가 없습니다.</div>
          )}
        </div>
      </div>
    </div>
  );
}
