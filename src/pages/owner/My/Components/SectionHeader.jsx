import React from "react";
import { T, Btn } from "./styles";

export default function SectionHeader({ title, actionLabel, onAction }) {
  return (
    <div style={{ width: 320, display: "flex", alignItems: "center", justifyContent: "space-between", margin: "18px 0 8px" }}>
      <div style={T.title16}>{title}</div>
      {actionLabel && (
        <button style={Btn.pill} onClick={onAction}>{actionLabel}</button>
      )}
    </div>
  );
}