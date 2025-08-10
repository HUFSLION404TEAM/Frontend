import React from "react";
import HeartIconSrc from "../../../assets/Heart.svg";
import StarIconSrc from "../../../assets/Star.svg";
import AlarmIconSrc from "../../../assets/Alarm.svg";
import TemperatureIconSrc from "../../../assets/Temperature.svg";
import EmptyHeartSrc from "../../../assets/emptyHeart.svg";
import DownBarSrc from "../../../assets/downBar.svg";

const STATUS_H = 44; // 상태바
const HEADER_H = 45; // 헤더
const INFO_H = 120; // 로고 아래 텍스트 블록: 겹침 방지 여유
const FILTER_H = 44; // 필터 바
const SIDE_GAP = 10; // 좌우 여백

// ===== 공통 프레임 =====
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
  zIndex: 2,
};

// ===== 헤더 =====
const headerStyle = {
  position: "absolute",
  top: STATUS_H,
  left: SIDE_GAP,
  right: SIDE_GAP - 1,
  height: HEADER_H + 10,
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  background: "#FFF",
  boxSizing: "border-box",
  zIndex: 3,
};
const logoWrapStyle = {
  display: "flex",
  alignItems: "center",
  gap: 6,
  marginLeft: 16,
};
const logoTextStyle = {
  color: "#0080FF",
  fontFamily:
    '"Mungyeong Gamhong Apple", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans KR", "Apple SD Gothic Neo", sans-serif',
  fontSize: 30,
  fontWeight: 400,
  lineHeight: "20px",
};
const starIconStyle = { width: 16, height: 16, transform: "translateY(-6px)" };
const rightIconsWrap = { position: "relative", width: 64, height: HEADER_H };
const bellStyle = {
  position: "absolute",
  width: 24,
  height: 24,
  right: 0,
  top: 10.5,
};
const heartStyle = {
  position: "absolute",
  width: 24,
  height: 24,
  right: 32,
  top: 10.5,
};

// ===== 로고 밑 텍스트 =====
const infoBlockStyle = {
  position: "absolute",
  top: STATUS_H + HEADER_H + 10,
  left: SIDE_GAP + 12,
  width: 230,
  height: INFO_H,
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  justifyContent: "center",
  gap: 12,
  zIndex: 2, // 필터보다 위
};
const infoTitleStyle = {
  color: "#111",
  fontFamily: "Pretendard, system-ui, -apple-system",
  fontSize: 22,
  fontWeight: 700,
  lineHeight: "140%",
  letterSpacing: "-0.3px",
};
const infoSubStyle = {
  color: "#4C4C4C",
  fontFamily: "Pretendard, system-ui, -apple-system",
  fontSize: 12,
  fontWeight: 500,
  lineHeight: "150%",
};

// ===== 필터 바(작은 칩 + 글쓰기 버튼) =====
const filterBarStyle = {
  position: "absolute",
  top: STATUS_H + HEADER_H + 10 + INFO_H + 12, // 텍스트 블록 아래로 충분히 내림
  left: 10,
  right: 0,
  height: FILTER_H - 40,
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "0 10px",
  background: "#FFF",
  boxSizing: "border-box",
  zIndex: 1, // infoBlock보다 아래
};
const filterRowStyle = { display: "inline-flex", alignItems: "center", gap: 6 };
const chipStyle = {
  display: "flex",
  alignItems: "center",
  gap: 6,
  padding: "5px 9px",
  borderRadius: 10,
  border: "1px solid #0080FF",
  background: "#FFF",
  boxShadow: "0 4px 7px rgba(0,0,0,0.10)",
  fontFamily: "Pretendard, system-ui, -apple-system",
  fontSize: 11,
  color: "#111",
};
const writeBtnStyle = {
  height: 24,
  padding: "0 12px",
  borderRadius: 8,
  background: "#0080FF",
  color: "#FFF",
  fontFamily: "Pretendard, system-ui, -apple-system",
  fontSize: 12,
  fontWeight: 600,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  border: "none",
  outline: "none",
  appearance: "none",
  WebkitAppearance: "none",
  MozAppearance: "none",
  boxShadow: "none",
};

// ===== 리스트(2열 그리드) =====
const listTop = STATUS_H + HEADER_H + 10 + INFO_H + 12 + FILTER_H;
const listWrapStyle = {
  position: "absolute",
  top: listTop,
  bottom: 24,
  left: "50%",
  transform: "translateX(-50%)",
  width: 348, // 167 + 167 + 14 = 348
  overflowY: "auto",
  display: "grid",
  gridTemplateColumns: "167px 167px",
  columnGap: 14,
  rowGap: 10, // ← 요구사항: 리스트와 리스트 사이 15
  alignContent: "start",
};
const miniCardStyle = {
  position: "relative",
  width: 167,
  height: 67,
  borderRadius: 16,
  background:
    "linear-gradient(180deg, rgba(255,255,255,0.40) 0%, rgba(255,255,255,0.60) 100%)",
  boxShadow: "0 2px 6px rgba(0,0,0,0.08)",
  display: "flex",
  alignItems: "center",
  padding: 10,
  boxSizing: "border-box",
};
const miniThumb = {
  width: 44,
  height: 44,
  borderRadius: 12,
  background: "#A6A6A6",
  flexShrink: 0,
};
const miniInfoCol = {
  marginLeft: 10,
  display: "flex",
  flexDirection: "column",
  gap: 2,
  overflow: "hidden",
};
const nameRow = {
  display: "flex",
  alignItems: "baseline",
  gap: 4,
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
};
const nameStyle = {
  color: "#111",
  fontFamily: "Pretendard",
  fontSize: 14,
  fontWeight: 700,
};
const ageStyle = {
  color: "#111",
  fontFamily: "Pretendard",
  fontSize: 11,
  fontWeight: 500,
};
const fieldStyle = {
  color: "#111",
  fontFamily: "Pretendard",
  fontSize: 11,
  fontWeight: 500,
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
};
const tempRowMini = {
  display: "flex",
  alignItems: "center",
  gap: 4,
  color: "#767676",
  fontSize: 11,
  marginTop: 0,
};
const likeMini = {
  position: "absolute",
  top: 5,
  right: 10,
  width: 20,
  height: 20,
};

// ===== 카드 컴포넌트 =====
function CandidateCard({
  name = "이름",
  age = "나이",
  field = "전공, 자신 있는 분야",
  temp = "36.5°C",
  liked = false,
}) {
  return (
    <div style={miniCardStyle}>
      <div style={miniThumb} />
      <div style={miniInfoCol}>
        <div style={nameRow}>
          <span style={nameStyle}>{name}</span>
          <span style={ageStyle}>{age}</span>
        </div>
        <div style={fieldStyle}>{field}</div>
        <div style={tempRowMini}>
          <img src={TemperatureIconSrc} alt="온도" width={9} height={9} />
          <span>{temp}</span>
        </div>
      </div>
      <img
        src={liked ? HeartIconSrc : EmptyHeartSrc}
        alt="like"
        style={likeMini}
      />
    </div>
  );
}

// ===== 메인(소상공인 대시보드) =====
export default function DashOwner() {
  return (
    <div style={containerStyle}>
      <div style={frameStyle}>
        <div style={statusBarStyle} />
        <div style={headerStyle}>
          <div style={logoWrapStyle}>
            <span style={logoTextStyle}>UniBiz</span>
            <img src={StarIconSrc} alt="star" style={starIconStyle} />
          </div>
          <div style={rightIconsWrap}>
            <img src={HeartIconSrc} alt="heart" style={heartStyle} />
            <img src={AlarmIconSrc} alt="alarm" style={bellStyle} />
          </div>
        </div>

        <div style={infoBlockStyle}>
          <div style={infoTitleStyle}>
            BHC 용인외대점을 위한
            <br />
            대학생 기획자 프로필
          </div>
          <div style={infoSubStyle}>
            함께 우리 가게를 알릴 기획자분들을 찾아보세요!
          </div>
        </div>

        <div style={filterBarStyle}>
          <div style={filterRowStyle}>
            <div style={chipStyle}>
              <span>우만동 외</span>
              <img src={DownBarSrc} alt="옵션" width={6} height={9} />
            </div>
            <div style={chipStyle}>
              <span>가격</span>
              <img src={DownBarSrc} alt="옵션" width={6} height={9} />
            </div>
            <div style={chipStyle}>
              <span>카테고리</span>
              <img src={DownBarSrc} alt="옵션" width={6} height={9} />
            </div>
            <div style={chipStyle}>
              <span>정확도 순</span>
              <img src={DownBarSrc} alt="옵션" width={6} height={9} />
            </div>
          </div>
          <button type="button" style={writeBtnStyle}>
            글쓰기
          </button>
        </div>

        <div style={listWrapStyle}>
          <CandidateCard liked />
          <CandidateCard />
          <CandidateCard />
          <CandidateCard liked />
          <CandidateCard />
          <CandidateCard />
          <CandidateCard liked />
          <CandidateCard />
        </div>
      </div>
    </div>
  );
}
