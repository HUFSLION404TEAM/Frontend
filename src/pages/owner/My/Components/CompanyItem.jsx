import React from "react";
import { Card, T, Btn } from "../../../owner/My/Components/styles";

export default function CompanyItem({ company, onEdit }) {
  return (
    <div style={{ ...Card.base, height: 64, padding: "10px 12px", display: "flex", alignItems: "center", gap: 10 }}>
      <div style={{ width: 44, height: 44, borderRadius: 8, background: "#EEE" }} />
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 13, fontWeight: 600, color: "#111" }}>{company.name}</div>
        <div style={{ ...T.body12, color: "#777", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{company.meta}</div>
      </div>
      <button style={Btn.tiny} onClick={() => onEdit(company)}>수정</button>
    </div>
  );
}