import React from "react";
import { T } from "../../../owner/My/Components/styles";

export default function ProfileSummary() {
  return (
    <div style={{ width: 320, display: "grid", gridTemplateColumns: "56px 1fr", columnGap: 16, alignItems: "center", marginBottom: 12 }}>
      <div style={{ width: 56, height: 56, borderRadius: 10, background: "#E5E7EB" }} />
      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        <div style={{ fontSize: 16, fontWeight: 700, color: "#111" }}>업체 이름</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>
          <div style={{ ...T.body12, color: "#777" }}>업종</div>
          <div style={{ ...T.body12, textAlign: "right" }}>일반음식점</div>
          <div style={{ ...T.body12, color: "#777" }}>연락처</div>
          <div style={{ ...T.body12, textAlign: "right" }}>010-1234-5678</div>
          <div style={{ ...T.body12, color: "#777" }}>업체 위치</div>
          <div style={{ ...T.body12, textAlign: "right" }}>경기도 용인시</div>
          <div style={{ ...T.body12, color: "#777" }}>사업자번호</div>
          <div style={{ ...T.body12, textAlign: "right" }}>123-45-5678</div>
        </div>
      </div>
    </div>
  );
}