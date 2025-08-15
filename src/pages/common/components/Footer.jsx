// src/pages/common/components/Footer.jsx
import React from "react";
import { NavLink, useLocation } from "react-router-dom";

import MatchIconSrc from "../../../assets/match.svg";
import SearchFIconSrc from "../../../assets/searchF.svg";
import HomeFIconSrc from "../../../assets/homeF.svg";
import ChatIconSrc from "../../../assets/chat.svg";
import MyIconSrc from "../../../assets/my.svg";

// === 디자인 토큰 ===
export const FOOTER_H = 57; // Figma: 390 x 57
const TOKENS = {
  height: FOOTER_H,
  gap: 6,
  labelSize: 11,
  barBg: "#FFFFFF",
  border: "#EDEDED",
  inactive: "#9AA0A6",
  active: "#0D99FF",
  fabSize: 56, // 중앙 원형 버튼 지름
  fabIcon: 24, // 아이콘 크기
  shadow: "0 -4px 16px rgba(0,0,0,.06)",
};

// 학생/소상공인 베이스 경로 자동 판별(필요시 role prop으로 강제 가능)
function useBase(role) {
  const { pathname } = useLocation();
  if (role) return role === "student" ? "/student" : "/owner";
  return pathname.startsWith("/student") ? "/student" : "/owner";
}

export default function Footer({ role, badges = {} }) {
  const base = useBase(role);

  // 좌측 2개 + 우측 2개, 가운데는 비워서 FAB 공간 확보
  const tabs = [
    { key: "match", label: "MATCH", to: `${base}/match`, icon: MatchIconSrc },
    {
      key: "search",
      label: "SEARCH",
      to: `${base}/search`,
      icon: SearchFIconSrc,
    },
    { key: "spacer", spacer: true },
    { key: "chat", label: "CHAT", to: `${base}/chat`, icon: ChatIconSrc },
    { key: "my", label: "MY", to: `${base}/my`, icon: MyIconSrc },
  ];

  return (
    <nav aria-label="하단 내비게이션" style={wrapStyle}>
      {/* 직사각형 바 배경 (레이어 1) */}
      <div style={barBgStyle} />

      {/* 탭 아이템 (레이어 2) */}
      <div style={gridStyle}>
        {tabs.map((t) =>
          t.spacer ? (
            <div key="spacer" />
          ) : (
            <NavLink
              key={t.key}
              to={t.to}
              style={({ isActive }) => ({
                ...itemStyle,
                color: isActive ? TOKENS.active : TOKENS.inactive,
              })}
            >
              {({ isActive }) => (
                <>
                  <span style={{ position: "relative" }}>
                    <img
                      src={t.icon}
                      alt=""
                      aria-hidden="true"
                      style={{
                        width: 24,
                        height: 24,
                        display: "block",
                        opacity: isActive ? 1 : 0.6,
                        transition: "opacity 120ms ease",
                      }}
                    />
                    {badges[t.key] > 0 && (
                      <span style={badgeStyle}>
                        {badges[t.key] > 99 ? "99+" : badges[t.key]}
                      </span>
                    )}
                  </span>
                  <span
                    style={{
                      fontSize: TOKENS.labelSize,
                      lineHeight: 1,
                      letterSpacing: "-0.2px",
                      fontWeight: 600,
                    }}
                  >
                    {t.label}
                  </span>
                </>
              )}
            </NavLink>
          )
        )}
      </div>

      {/* 중앙 플로팅 홈 버튼 (레이어 3) */}
      <NavLink
        to={base}
        end
        aria-label="홈"
        style={({ isActive }) => ({
          ...fabStyle,
          outline: isActive ? `2px solid ${TOKENS.active}` : "none",
        })}
      >
        <div style={fabInnerStyle}>
          <img
            src={HomeFIconSrc}
            alt=""
            aria-hidden="true"
            style={{
              width: TOKENS.fabIcon,
              height: TOKENS.fabIcon,
              display: "block",
            }}
          />
        </div>
      </NavLink>
    </nav>
  );
}

/* ===== Styles ===== */
const wrapStyle = {
  position: "absolute",
  left: 0,
  right: 0,
  bottom: 0,
  height: TOKENS.height,
  paddingBottom: "env(safe-area-inset-bottom)",
  zIndex: 1,
};

// 바 배경 (직사각형)
const barBgStyle = {
  position: "absolute",
  left: 0,
  right: 0,
  bottom: 0,
  height: TOKENS.height,
  background: TOKENS.barBg,
  borderTop: `1px solid ${TOKENS.border}`,
  boxShadow: TOKENS.shadow,
  zIndex: 1,
};

// 탭 그리드
const gridStyle = {
  position: "absolute",
  inset: 0,
  display: "grid",
  gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr", // 가운데 1칸 spacer
  alignItems: "center",
  justifyItems: "center",
  zIndex: 2,
};

const itemStyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  gap: TOKENS.gap,
  textDecoration: "none",
  WebkitTapHighlightColor: "transparent",
  userSelect: "none",
};

const badgeStyle = {
  position: "absolute",
  top: -6,
  right: -8,
  minWidth: 16,
  height: 16,
  padding: "0 4px",
  borderRadius: 8,
  background: "#FF3B30",
  color: "#FFF",
  fontSize: 10,
  lineHeight: "16px",
  textAlign: "center",
  boxShadow: "0 1px 2px rgba(0,0,0,0.15)",
};

// 중앙 플로팅 홈 버튼(FAB)
const fabStyle = {
  position: "absolute",
  left: "50%",
  transform: "translateX(-50%)",
  bottom: TOKENS.height - TOKENS.fabSize / 2, // 바 위로 반쯤 떠오르게
  width: TOKENS.fabSize,
  height: TOKENS.fabSize,
  borderRadius: "50%",
  textDecoration: "none",
  zIndex: 3,
};

const fabInnerStyle = {
  width: "100%",
  height: "100%",
  borderRadius: "50%",
  background: TOKENS.active,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  boxShadow: "0 8px 16px rgba(13,153,255,0.35)",
};
