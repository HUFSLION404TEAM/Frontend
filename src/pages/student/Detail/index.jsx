// src/pages/student/Detail/index.jsx
import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import BackIconSrc from "../../../assets/Back.svg";
import HeartIconSrc from "../../../assets/Heart.svg";
import EmptyHeartSrc from "../../../assets/emptyHeart.svg";
import { useHeart } from "../../../contexts/heartcontext"; // [API]

// 공통 프레임 규격 (찜 페이지와 동일)
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

// 헤더
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
      transform: "translate(-50%,-50%)",
      color: "#000",
      fontSize: 20,
      fontWeight: 700,
      lineHeight: "28px",
      letterSpacing: "-0.5px",
      whiteSpace: "nowrap",
    }}
  >
    공고
  </div>
);

// 본문 스크롤 영역
const scrollAreaStyle = {
  position: "absolute",
  top: STATUS_H + HEADER_H,
  bottom: 70, // 하단 버튼 영역 비워두기
  left: "50%",
  transform: "translateX(-50%)",
  width: 348,
  overflowY: "auto",
  padding: "16px 0 20px 0",
  boxSizing: "border-box",
};

// D-Day + 상태 뱃지
const topMetaRow = {
  display: "flex",
  alignItems: "center",
  gap: 8,
  marginBottom: 8,
};
const ddayStyle = {
  color: "#0080FF",
  fontSize: 16,
  fontWeight: 700,
};
const badgeStyle = {
  fontSize: 11,
  fontWeight: 600,
  color: "#0080FF",
  border: "1px solid #E4F1FF",
  background: "#F4F9FF",
  borderRadius: 999,
  padding: "2px 8px",
};

// 카드
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
const heartTopBtn = {
  width: 24,
  height: 24,
  cursor: "pointer",
};
const infoGrid = {
  display: "grid",
  gridTemplateColumns: "88px 1fr",
  rowGap: 8,
  columnGap: 12,
  alignItems: "start",
};
const label = {
  color: "#6B6B6B",
  fontSize: 12,
  lineHeight: "18px",
  whiteSpace: "nowrap",
};
const value = {
  color: "#111",
  fontSize: 13,
  lineHeight: "18px",
};

// 섹션 타이틀
const sectionTitle = {
  marginTop: 16,
  marginBottom: 6,
  color: "#6B6B6B",
  fontSize: 12,
  fontWeight: 600,
};

// 하단 고정 액션 바
const bottomBar = {
  position: "absolute",
  left: "50%",
  transform: "translateX(-50%)",
  bottom: 12,
  width: 366, // 피그마 366x50 기준
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

export default function DetailStudent() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [liked, setLiked] = React.useState(false); // ← 기존 로컬 상태 유지(삭제 안 함)

  // [API] 전역 하트 훅 + 타입/식별자
  const { isHeart, toggle } = useHeart(); // [API]
  const HEART_TYPE = "business"; // [API] 학생이 보는 상세 → 가게/공고라 가정
  const targetId = state?.id ?? state?.postId ?? state?.businessId; // [API]

  // 전달된 제목/설명 (없으면 기본값)
  const jobTitle = state?.title ?? "디저트 메뉴 SNS 홍보 구인";
  const jobSubtitle = state?.subtitle ?? "카페 | 음료점업 · 모집 중";

  // [API] 전역 상태와 로컬 liked 동기화(삭제 없이 유지)
  React.useEffect(() => {
    if (targetId) setLiked(isHeart(HEART_TYPE, targetId));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [targetId, HEART_TYPE, isHeart]);

  // [API] 하트 토글 핸들러 (기존 setLiked 사용 유지)
  const handleToggle = async () => {
    if (!targetId) return; // id 없으면 그냥 무시
    setLiked((v) => !v); // 낙관적 UI
    try {
      await toggle(HEART_TYPE, targetId);
    } catch {
      setLiked((v) => !v); // 실패 시 롤백
    }
  };

  return (
    <div style={containerStyle}>
      <div style={frameStyle}>
        {/* StatusBar */}
        <div style={statusBarStyle} />

        {/* Header */}
        <div style={topFrameStyle}>
          {BackIcon(() => navigate("/student/heart"))}
          {Title}
        </div>

        {/* Scrollable Content */}
        <div style={scrollAreaStyle}>
          {/* 상단 메타 */}
          <div style={topMetaRow}>
            <span style={ddayStyle}>D-4</span>
            <span style={badgeStyle}>모집 중</span>
          </div>

          {/* 카드 */}
          <div style={cardStyle}>
            <div style={cardHeaderRow}>
              <div style={titleStyle}>{jobTitle}</div>
              <img
                src={liked ? HeartIconSrc : EmptyHeartSrc}
                alt="좋아요"
                style={heartTopBtn}
                onClick={handleToggle} // [API] ← setLiked 직접 호출 대신
              />
            </div>

            {/* 썸네일 + 정보 그리드 */}
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
                  background: "#FFEFD5",
                  overflow: "hidden",
                }}
              />
              <div style={infoGrid}>
                <div style={label}>모집기간</div>
                <div style={value}>2024.02.14 ~ 2024.03.20</div>

                <div style={label}>가격</div>
                <div style={value}>₩3,000</div>
              </div>
            </div>

            {/* 구분선 */}
            <div
              style={{ height: 1, background: "#EEE", margin: "6px 0 10px 0" }}
            />

            {/* 상세 텍스트 섹션들 */}
            <div style={sectionTitle}>진행기간</div>
            <div style={value}>2024.03.21 ~ 2024.04.04</div>

            <div style={sectionTitle}>프로젝트 개요 및 내용</div>
            <div style={value}>이번에 새로 신메뉴가 나왔는데 ~</div>

            <div style={sectionTitle}>기대 결과물</div>
            <div style={value}>인스타 이벤트 기획</div>

            <div style={sectionTitle}>세부 업무 및 요구사항</div>
            <div style={value}>
              MZ들이 좋아하는 컨셉! 기간 준수 부탁드립니다!
            </div>
          </div>
        </div>

        {/* Bottom Actions */}
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
              // TODO: 채팅 페이지 경로로 교체
              // navigate("/student/chat?thread=...");
              alert("채팅 기능은 추후 연결합니다.");
            }}
          >
            채팅
          </button>
        </div>
      </div>
    </div>
  );
}
