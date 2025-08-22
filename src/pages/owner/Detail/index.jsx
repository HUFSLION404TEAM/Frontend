// src/pages/owner/Detail/index.jsx
import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import BackIconSrc from "../../../assets/Back.svg";
import HeartIconSrc from "../../../assets/Heart.svg";
import EmptyHeartSrc from "../../../assets/emptyHeart.svg";
import { useHeart } from "../../../contexts/heartcontext"; // [API] 추가

// ── 공통 프레임 (학생 페이지와 동일) ──
const STATUS_H = 59;
const HEADER_H = 49;
const HEADER_PAD_L = 20;

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
};
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
    포트폴리오
  </div>
);
const BackIcon = (onClick) => (
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
      cursor: "pointer",
    }}
    onClick={onClick}
  />
);

// ── 본문 영역 ──
const scrollAreaStyle = {
  position: "absolute",
  top: STATUS_H + HEADER_H,
  bottom: 70, // 하단 버튼 영역
  left: "50%",
  transform: "translateX(-50%)",
  width: 348,
  overflowY: "auto",
  padding: "16px 0 20px 0",
  boxSizing: "border-box",
};

// 상단 프로필 카드 (원형 아바타 + 메타)
const profileCard = {
  borderRadius: 16,
  background:
    "linear-gradient(180deg, rgba(255,255,255,0.40) 0%, rgba(255,255,255,0.60) 100%)",
  boxShadow: "3px 3px 8px rgba(0,0,0,0.08)",
  padding: 16,
  display: "flex",
  gap: 12,
  alignItems: "center",
  marginBottom: 12,
};
const avatar = {
  width: 56,
  height: 56,
  borderRadius: "50%",
  background: "#EEE",
  flex: "0 0 auto",
};
const profileTexts = { flex: 1, minWidth: 0 };
const nameRow = { display: "flex", alignItems: "center", gap: 8 };
const nameStyle = { fontSize: 16, fontWeight: 700, color: "#111" };
const tempBadge = {
  padding: "2px 8px",
  borderRadius: 999,
  border: "1px solid #E4F1FF",
  background: "#F4F9FF",
  color: "#0080FF",
  fontSize: 11,
  fontWeight: 600,
};
const metaStyle = { fontSize: 12, color: "#6B6B6B", lineHeight: "18px" };

// 프로젝트 카드
const cardStyle = {
  position: "relative",
  borderRadius: 16,
  background:
    "linear-gradient(180deg, rgba(255,255,255,0.40) 0%, rgba(255,255,255,0.60) 100%)",
  boxShadow: "3px 3px 8px rgba(0,0,0,0.08)",
  padding: 16,
  boxSizing: "border-box",
};
const cardHeaderRow = {
  display: "flex",
  alignItems: "flex-start",
  justifyContent: "space-between",
  marginBottom: 12,
};
const titleStyle = {
  fontSize: 18,
  fontWeight: 700,
  letterSpacing: "-0.3px",
  color: "#111",
};
const heartTopBtn = { width: 24, height: 24, cursor: "pointer" };

const infoGrid = {
  display: "grid",
  gridTemplateColumns: "88px 1fr",
  rowGap: 8,
  columnGap: 12,
  alignItems: "start",
  marginBottom: 8,
};
const label = {
  color: "#6B6B6B",
  fontSize: 12,
  lineHeight: "18px",
  whiteSpace: "nowrap",
};
const value = { color: "#111", fontSize: 13, lineHeight: "18px" };

const sectionTitle = {
  marginTop: 12,
  marginBottom: 6,
  color: "#6B6B6B",
  fontSize: 12,
  fontWeight: 600,
};

// 하단 버튼 바
const bottomBar = {
  position: "absolute",
  left: "50%",
  transform: "translateX(-50%)",
  bottom: 12,
  width: 366,
  display: "flex",
  gap: 7,
  alignItems: "stretch",
  justifyContent: "center",
};
const btnOutline = {
  flex: 1,
  height: 50,
  borderRadius: 12,
  border: "1px solid #E4E4E4",
  background: "#FFF",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: 8,
  fontSize: 14,
  cursor: "pointer",
  boxShadow: "0 1px 2px rgba(0,0,0,0.03)",
};
const btnPrimary = {
  flex: 1,
  height: 50,
  borderRadius: 12,
  border: "none",
  background: "#0080FF",
  color: "#FFF",
  fontWeight: 600,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
  boxShadow: "0 4px 12px rgba(0,128,255,0.25)",
};

export default function DetailOwner() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [liked, setLiked] = React.useState(false);

  // [API] 전역 하트 훅 + 타입/식별자
  const { isHeart, toggle } = useHeart();
  const HEART_TYPE = "planner"; // 오너가 찜하는 대상: 기획자(학생)
  const targetId =
    state?.id ?? state?.plannerId ?? state?.studentId ?? state?.userId;

  // 전달받은 값이 있으면 사용 (없으면 피그마 샘플)
  const studentName = state?.name ?? "김대학";
  const temperature = state?.temp ?? "36.5°C";
  const uni = state?.uni ?? "한국인재대학교 글로벌캠퍼스";
  const major = state?.major ?? "디자인 학부, 학부";
  const interest = state?.interest ?? "디지털 콘텐츠 제작";
  const recent = state?.recent ?? "최근 기록 3일";
  const projectTitle = state?.title ?? "디저트 메뉴 SNS 홍보";

  // [API] 전역 상태 ↔ 로컬 liked 동기화
  React.useEffect(() => {
    if (targetId) setLiked(isHeart(HEART_TYPE, targetId));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [targetId, HEART_TYPE, isHeart]);

  // [API] 토글(낙관적 업데이트 + 롤백)
  const handleToggle = async () => {
    if (!targetId) return;
    setLiked((v) => !v);
    try {
      await toggle(HEART_TYPE, targetId);
    } catch {
      setLiked((v) => !v);
    }
  };

  return (
    <div style={containerStyle}>
      <div style={frameStyle}>
        {/* StatusBar */}
        <div style={statusBarStyle} />

        {/* Header */}
        <div style={topFrameStyle}>
          {BackIcon(() => navigate("/owner/heart"))}
          {Title}
        </div>

        {/* Content */}
        <div style={scrollAreaStyle}>
          {/* 프로필 카드 */}
          <div style={profileCard}>
            <div style={avatar} />
            <div style={profileTexts}>
              <div style={nameRow}>
                <div style={nameStyle}>{studentName}</div>
                <span style={tempBadge}>{temperature}</span>
              </div>
              <div style={metaStyle}>
                {uni}
                <br />
                {major}
                <br />
                {interest}
                <br />
                {recent}
              </div>
            </div>
          </div>

          {/* 프로젝트 카드 */}
          <div style={cardStyle}>
            <div style={cardHeaderRow}>
              <div style={titleStyle}>{projectTitle}</div>
              <img
                src={liked ? HeartIconSrc : EmptyHeartSrc}
                alt="좋아요"
                style={heartTopBtn}
                onClick={handleToggle}
              />
            </div>

            {/* 썸네일 + 진행기간 */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "72px 1fr",
                gap: 12,
                marginBottom: 12,
              }}
            >
              <div
                style={{
                  width: 72,
                  height: 72,
                  borderRadius: 12,
                  background: "#111",
                  overflow: "hidden",
                }}
              />
              <div style={infoGrid}>
                <div style={label}>진행기간</div>
                <div style={value}>2024.02.14 ~ 2024.03.20</div>
              </div>
            </div>

            <div
              style={{ height: 1, background: "#EEE", margin: "6px 0 10px" }}
            />

            {/* 섹션들 */}
            <div style={sectionTitle}>프로젝트 개요 및 내용</div>
            <div style={value}>이 프로젝트는 새로운 디저트가 나와서 ~</div>

            <div style={sectionTitle}>진행한 일과 진행과정</div>
            <div style={value}>이 프로젝트에서 저는 ~</div>

            <div style={sectionTitle}>성장한 점 또는 느낀점</div>
            <div style={value}>이 프로젝트를 통해 ~</div>

            <div style={sectionTitle}>수상여부</div>
            <div style={value}>경기도 창업대회 우수상</div>
          </div>
        </div>

        {/* 하단 버튼 */}
        <div style={bottomBar}>
          <button type="button" style={btnOutline} onClick={handleToggle}>
            <img
              src={liked ? HeartIconSrc : EmptyHeartSrc}
              alt="하트"
              width={20}
              height={20}
            />
          </button>

          <button
            type="button"
            style={btnPrimary}
            onClick={() => {
              // TODO: 채팅 경로 연결
              // navigate("/owner/chat?thread=...");
              alert("채팅 기능은 추후 연결됩니다.");
            }}
          >
            채팅
          </button>
        </div>
      </div>
    </div>
  );
}
