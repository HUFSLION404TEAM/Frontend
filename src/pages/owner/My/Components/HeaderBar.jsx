import React from "react";
import { STATUS_H, SIDE_GAP } from "../../../owner/My/Components/styles";

import StarIconSrc from "../../../../assets/Star.svg";

export default function HeaderBar() {
  return (
    <div style={{ position: "absolute", top: STATUS_H, left: SIDE_GAP, right: SIDE_GAP - 1, height: 55, display: "flex", alignItems: "center", justifyContent: "space-between", background: "#FFF", zIndex: 3 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 6, marginLeft: 16 }}>
        <span style={{ color: "#0080FF", fontFamily: '"Mungyeong Gamhong Apple", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans KR", "Apple SD Gothic Neo", sans-serif', fontSize: 30, fontWeight: 400, lineHeight: "20px" }}>UniBiz</span>
        <img src={StarIconSrc} alt="star" style={{ width: 16, height: 16, transform: "translateY(-6px)" }} />
      </div>
    </div>
  );
}