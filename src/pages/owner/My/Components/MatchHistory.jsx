import React from "react";
import { Card, T } from "../../../owner/My/Components/styles";

export default function MatchHistory() {
  const container = { ...Card.base, height: 121, padding: 9, overflowY: "auto" };
  const row = { display: "flex", alignItems: "center", justifyContent: "space-between", padding: "6px 4px" };
  const left = { display: "flex", alignItems: "center", gap: 10 };
  const status = (active) => ({ fontSize: 12, color: active ? "#0080FF" : "#999" });

  return (
    <>
      <div style={{ ...T.title16, margin: "8px 0 8px" }}>매칭 이력</div>
      <div style={container}>
        <div style={row}>
          <div style={left}>
            <div style={{ width: 36, height: 36, borderRadius: "50%", background: "#E6E6E6" }} />
            <div>
              <div style={{ fontSize: 13, fontWeight: 600, color: "#111" }}>대학생 A</div>
              <div style={{ ...T.body12, color: "#777" }}>2025.2.20 ~</div>
            </div>
          </div>
          <span style={status(true)}>매칭 중</span>
        </div>
        <div style={{ ...row, marginTop: 6 }}>
          <div style={left}>
            <div style={{ width: 36, height: 36, borderRadius: "50%", background: "#E6E6E6" }} />
            <div>
              <div style={{ fontSize: 13, fontWeight: 600, color: "#111" }}>대학생 B</div>
              <div style={{ ...T.body12, color: "#777" }}>2025.2.20 ~ 2025.6.30</div>
            </div>
          </div>
          <span style={status(false)}>매칭 완료</span>
        </div>
      </div>
    </>
  );
}
