// src/layouts/Layout.jsx
import React from "react";
import { Outlet } from "react-router-dom";
// src/layouts/Layout.jsx
import Footer, { FOOTER_H } from "../pages/common/components/Footer.jsx";

const frame = {
  position: "relative",
  width: 390,
  height: 844,
  margin: "0 auto",
  background: "#FFF",
  border: "1px solid #000",
  overflow: "hidden",
};
const content = {
  position: "absolute",
  inset: 0,
  paddingBottom: `calc(${FOOTER_H}px + env(safe-area-inset-bottom))`,
  overflow: "auto",
  boxSizing: "border-box",
};

export default function Layout({ role }) {
  return (
    <div style={frame}>
      <div style={content}>
        <Outlet />
      </div>
      <Footer role={role} />
    </div>
  );
}
