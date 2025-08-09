import React from "react";
import BackIconSrc from "../../../assets/Back.svg";
import SearchIconSrc from "../../../assets/Search.svg";
import HomeIconSrc from "../../../assets/Home.svg";
import HeartIconSrc from "../../../assets/Heart.svg";
import TemperatureIconSrc from "../../../assets/Temperature.svg";

const STATUS_H = 59; // StatusBar 높이
const HEADER_H = 49; // Header 높이
const HEADER_PAD_L = 20; // 헤더 padding-left
const FILTER_H = 44; // 필터 줄 높이

// ── 기본 레이아웃 ──
const containerStyle = {
  overflow: "auto",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  minHeight: "100vh",
  backgroundColor: "#f0f0f0",
};
const frameStyle = {
  width: 390,
  height: 844,
  backgroundColor: "#FFFFFF",
  border: "1px solid #000000",
  boxSizing: "border-box",
  position: "relative",
  overflow: "hidden",
};
const statusBarStyle = {
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  height: STATUS_H,
  backgroundColor: "#FFDDE4",
  boxSizing: "border-box",
  zIndex: 1,
};

// ── 헤더 ──
const topFrameStyle = {
  position: "absolute",
  top: STATUS_H,
  left: 0,
  right: 0,
  height: HEADER_H,
  padding: "0 20px 10px 20px",
  borderBottom: "1px solid #EEE",
  background: "#FFF",
  boxSizing: "border-box",
  zIndex: 2,
  display: "block",
};
const BackIcon = (
  <img
    src={BackIconSrc}
    alt="뒤로가기"
    width={28}
    height={28}
    style={{
      position: "absolute",
      top: "50%",
      left: HEADER_PAD_L,
      transform: "translateY(-50%)",
    }}
  />
);
const SearchIcon = (
  <img
    src={SearchIconSrc}
    alt="검색"
    width={24}
    height={24}
    style={{
      position: "absolute",
      top: "50%",
      left: 317,
      transform: "translateY(-50%)",
    }}
  />
);
const HomeIcon = (
  <img
    src={HomeIconSrc}
    alt="홈"
    width={24}
    height={24}
    style={{
      position: "absolute",
      top: "50%",
      left: 346,
      transform: "translateY(-50%)",
    }}
  />
);
const Title = (
  <div
    style={{
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      color: "#000",
      fontSize: 20,
      fontWeight: 700,
      lineHeight: "28px",
      letterSpacing: "-0.5px",
      whiteSpace: "nowrap",
    }}
  >
    관심목록
  </div>
);

// ── 필터 ──
const filterStyle = {
  position: "absolute",
  top: STATUS_H + HEADER_H,
  left: 0,
  right: 0,
  height: FILTER_H,
  padding: "10px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: "15px",
  background: "#FFF",
  boxSizing: "border-box",
  borderBottom: "1px solid #EEE",
};
const filterMainStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: "20px",
};
const filterFontContainer = {
  display: "flex",
  padding: "6px 10px",
  alignItems: "center",
  gap: "10px",
  borderRadius: "10px",
  border: "1px solid #0080FF",
  boxShadow: "0 4px 7px 0 rgba(0, 0, 0, 0.1)",
  backdropFilter: "blur(7.5px)",
  background: "#FFF",
};
const filterFont = {
  color: "#000",
  textAlign: "center",
  fontFamily: "Pretendard",
  fontSize: "10px",
  fontWeight: 500,
};

// ── 리스트 컨테이너 ──
const listContainerStyle = {
  position: "absolute",
  top: STATUS_H + HEADER_H + FILTER_H + 10,
  bottom: 0,
  left: "50%",
  transform: "translateX(-50%)",
  width: 348,
  display: "flex",
  flexDirection: "column",
  gap: "20px",
  overflowY: "auto",
};

// ── 카드 스타일 ──
const cardStyle = {
  position: "relative",
  display: "flex",
  flexDirection: "column",
  gap: "7px",
  height: 120,
  padding: "12px",
  borderRadius: "16px",
  background:
    "linear-gradient(180deg, rgba(255,255,255,0.40) 0%, rgba(255,255,255,0.60) 100%)",
  boxShadow: "3px 3px 8px 0 rgba(0, 0, 0, 0.08)",
  boxSizing: "border-box",
};
const cardTitle = {
  color: "#111",
  fontFamily: "Pretendard",
  fontSize: "18px",
  fontWeight: 700,
  letterSpacing: "-0.5px",
};
const cardSub = {
  color: "#111",
  fontFamily: "Pretendard",
  fontSize: "13px",
  fontWeight: 500,
  lineHeight: "18px",
};
const tempRow = {
  display: "flex",
  alignItems: "center",
  gap: 6,
  color: "#767676",
  fontSize: 12,
  marginTop: 2,
};
const heartAbs = {
  position: "absolute",
  top: 12,
  right: 12,
  width: 24,
  height: 24,
};

// ── 카드 컴포넌트 ──
function FavoriteCard({ title, subtitle, temp }) {
  return (
    <div style={cardStyle}>
      <img src={HeartIconSrc} alt="좋아요" style={heartAbs} />
      <div style={cardTitle}>{title}</div>
      <div style={cardSub}>{subtitle}</div>
      <div style={tempRow}>
        <img src={TemperatureIconSrc} alt="온도" width={12} height={12} />
        <span>{temp}</span>
      </div>
    </div>
  );
}

// ── 메인 컴포넌트 ──
export default function HeartStudent() {
  return (
    <div style={containerStyle}>
      <div style={frameStyle}>
        {/* StatusBar */}
        <div style={statusBarStyle} />

        {/* Header */}
        <div style={topFrameStyle}>
          {BackIcon}
          {Title}
          {SearchIcon}
          {HomeIcon}
        </div>

        {/* Filter */}
        <div style={filterStyle}>
          <div style={filterMainStyle}>
            <div style={filterFontContainer}>
              <span style={filterFont}>전체</span>
            </div>
            <div style={filterFontContainer}>
              <span style={filterFont}>소상공인</span>
            </div>
            <div style={filterFontContainer}>
              <span style={filterFont}>공고</span>
            </div>
            <div style={filterFontContainer}>
              <span style={filterFont}>모집 중</span>
            </div>
          </div>
        </div>

        {/* List */}
        <div style={listContainerStyle}>
          <FavoriteCard
            title="컴포즈커피 용인 외대점"
            subtitle="카페 | 음료점업 · 모집 중"
            temp="36°C"
          />
          <FavoriteCard
            title="메가커피 서울 신림점"
            subtitle="카페 | 음료점업 · 모집 중"
            temp="29°C"
          />
          <FavoriteCard
            title="스타벅스 강남역점"
            subtitle="카페 | 음료점업 · 모집 중"
            temp="31°C"
          />{" "}
          <FavoriteCard
            title="스타벅스 강남역점"
            subtitle="카페 | 음료점업 · 모집 중"
            temp="31°C"
          />
          <FavoriteCard
            title="스타벅스 강남역점"
            subtitle="카페 | 음료점업 · 모집 중"
            temp="31°C"
          />
          <FavoriteCard
            title="스타벅스 강남역점"
            subtitle="카페 | 음료점업 · 모집 중"
            temp="31°C"
          />{" "}
          <FavoriteCard
            title="스타벅스 강남역점"
            subtitle="카페 | 음료점업 · 모집 중"
            temp="31°C"
          />
        </div>
      </div>
    </div>
  );
}
