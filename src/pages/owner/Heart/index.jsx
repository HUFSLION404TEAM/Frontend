import React from "react";
import BackIconSrc from "../../../assets/Back.svg";
import SearchIconSrc from "../../../assets/Search.svg";
import HomeIconSrc from "../../../assets/Home.svg";
import HeartIconSrc from "../../../assets/Heart.svg";
import TemperatureIconSrc from "../../../assets/Temperature.svg";

const STATUS_H = 59;
const HEADER_H = 49;
const HEADER_PAD_L = 20;

// 🔵 소상공인 페이지의 중간 영역 높이(검색 + 토글)
// Figma: padding 10 + (검색바 36) + gap 10 + (토글행 20) + padding 10 ≈ 86
const MID_H = 86;

// ========== 공통 프레임 ==========
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
  zIndex: 1,
};

const topFrameStyle = {
  position: "absolute",
  top: STATUS_H,
  left: 0,
  right: 0,
  height: HEADER_H,
  padding: "0 20px 10px 20px",
  borderBottom: "1px solid #D9D9D9",
  background: "#FFF",
  boxSizing: "border-box",
  zIndex: 2,
  display: "block",
};

// 헤더 내부 고정 요소
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

// ========== (변경) 중간 영역: 검색바 + 토글 ==========
const midAreaStyle = {
  position: "absolute",
  top: STATUS_H + HEADER_H,
  left: 0,
  right: 0,
  height: MID_H,
  padding: 10,
  background: "#FFF",
  boxSizing: "border-box",
  display: "flex",
  flexDirection: "column",
  gap: 10,
};

// 검색바 (가로 전체)
/*const searchBarStyle = {
  width: "100%",
  height: 36,
  borderRadius: 6,
  border: "1px solid #D9D9D9",
  outline: "none",
  padding: "0 12px",
  fontSize: 14,
  boxSizing: "border-box",
}; */

// 토글 행 (오른쪽 정렬)
const toggleRowStyle = {
  display: "flex",
  justifyContent: "flex-end",
  alignItems: "center",
  gap: 5,
  borderBottom: "1px solid #EEE",
  paddingBottom: 10,
};

const toggleStyle = {
  position: "relative",
  width: 44,
  height: 24,
  borderRadius: 12,
  background: "#0080FFCC", // 활성(on) 상태
};

const toggleKnobStyle = {
  position: "absolute",
  top: 2,
  right: 2, // on 상태 → 오른쪽
  width: 20,
  height: 20,
  borderRadius: "50%",
  background: "#FFF",
  boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
};

const toggleLabelStyle = {
  fontSize: 12,
  color: "#000",
};

// ========== (변경) 카드: 아바타 + 텍스트 + 하트 (가로형) ==========
const listContainerStyle = {
  position: "absolute",
  top: STATUS_H + HEADER_H + MID_H - 30,
  bottom: 0,
  left: "50%",
  transform: "translateX(-50%)",
  width: 348,
  display: "flex",
  flexDirection: "column",
  gap: 10,
  overflowY: "auto",
};

const bizCardStyle = {
  position: "relative",
  display: "flex",
  alignItems: "center",
  gap: 20,
  minHeight: 96, // Figma 두 번째 스크린 기준 카드 높이 96
  padding: 12,
  borderRadius: 16,
  background: "#FFF",
  boxShadow: "0 1px 2px rgba(0,0,0,0.06), 0 6px 20px rgba(0,0,0,0.08)",
  boxSizing: "border-box",
};

// 아바타(원형)
const avatarStyle = {
  width: 60,
  height: 60,
  borderRadius: "50%",
  background: "#C9CED6", // 회색 플레이스홀더
  flex: "0 0 60px",
};

// 텍스트 묶음
const bizTextWrap = {
  display: "flex",
  flexDirection: "column",
  gap: 6,
  flex: 1,
  minWidth: 0,
};

const bizTitle = {
  fontSize: 18,
  fontWeight: 700,
  color: "#111",
  letterSpacing: "-0.5px",
};
const bizMeta = { fontSize: 13, color: "#767676" };

const tempRow = {
  display: "flex",
  alignItems: "center",
  gap: 6,
  fontSize: 12,
  color: "#767676",
};

const heartAbs = {
  position: "absolute",
  top: 12,
  right: 12,
  width: 24,
  height: 24,
};

// 카드 컴포넌트
function BizCard({
  title,
  region = "용인시 기흥구",
  posts = "10건",
  status = "구직 중",
  temp = "36.5° C",
}) {
  return (
    <div style={bizCardStyle}>
      <div style={avatarStyle} />
      <div style={bizTextWrap}>
        <div style={bizTitle}>{title}</div>
        <div style={bizMeta}>
          {region} · {posts} · {status}
        </div>
        <div style={tempRow}>
          <img src={TemperatureIconSrc} alt="온도" width={12} height={12} />
          <span>{temp}</span>
        </div>
      </div>
      <img src={HeartIconSrc} alt="찜" style={heartAbs} />
    </div>
  );
}

// ========== 페이지 ==========
export default function BizFavoritesPage() {
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

        {/* (변경) 검색 + 토글 영역 */}
        <div style={midAreaStyle}>
          <div style={toggleRowStyle}>
            <div style={toggleStyle}>
              <div style={toggleKnobStyle} />
            </div>
            <span style={toggleLabelStyle}>구직 중만 보기</span>
          </div>
        </div>

        {/* (변경) 리스트 - 가로형 카드 */}
        <div style={listContainerStyle}>
          <BizCard title="이대학" />
          <BizCard title="서강학" />
          <BizCard title="연세학" />
          <BizCard title="한양학" />
        </div>
      </div>
    </div>
  );
}
