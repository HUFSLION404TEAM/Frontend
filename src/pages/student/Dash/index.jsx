import React from "react";
import HeartIconSrc from "../../../assets/Heart.svg";
import StarIconSrc from "../../../assets/Star.svg";
import AlarmIconSrc from "../../../assets/Alarm.svg";
import TemperatureIconSrc from "../../../assets/Temperature.svg";
import EmptyHeartSrc from "../../../assets/emptyHeart.svg";
import DownBarSrc from "../../../assets/downBar.svg";

const STATUS_H = 44; // 상태바
const HEADER_H = 45; // 헤더
const INFO_H = 96; // 로고 아래 텍스트 블록 높이(겹침 방지로 여유)
const FILTER_H = 44; // 필터 바
const SIDE_GAP = 10; // 좌우 여백

// ===== 기본 레이아웃 =====
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
  zIndex: 3,
};

const logoWrapStyle = {
  display: "flex",
  alignItems: "center",
  gap: 6,
  marginLeft: 16, // 로고 오른쪽으로 살짝
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
  top: STATUS_H + HEADER_H + 15,
  left: SIDE_GAP + 12,
  width: 212,
  height: INFO_H,
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  justifyContent: "center",
  gap: 12,
  background: "#FFF",
  zIndex: 2, // 필터보다 위/아래가 아니라, 겹치지 않게 높이로 해결
};

const infoTitleStyle = {
  color: "#000",
  fontFamily: "Pretendard, system-ui, -apple-system",
  fontSize: 22,
  fontWeight: 700,
  lineHeight: "150%",
  letterSpacing: "-0.3px",
};

const infoSubStyle = {
  color: "#4C4C4C",
  fontFamily: "Pretendard, system-ui, -apple-system",
  fontSize: 12,
  fontWeight: 500,
  lineHeight: "150%",
  letterSpacing: "-0.2px",
};

// ===== 필터 바 =====
const filterBarStyle = {
  position: "absolute",
  top: STATUS_H + HEADER_H + 10 + INFO_H + 12, // ⬅︎ 텍스트 블록보다 확실히 아래로
  left: 0,
  right: 0,
  height: FILTER_H,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  background: "#FFF",
  borderBottom: "1px solid #EEE",
  padding: "0 10px",
  boxSizing: "border-box",
  zIndex: 2,
};

const filterRowStyle = {
  display: "inline-flex",
  alignItems: "center",
  gap: 6,
  width: "auto", // 피그마 대략
};

const chipStyle = {
  display: "flex",
  alignItems: "center",
  gap: 9,
  padding: "6px 10px",
  borderRadius: 10,
  border: "1px solid #0080FF",
  background: "#FFF",
  boxShadow: "0 4px 7px rgba(0,0,0,0.10)",
  backdropFilter: "blur(7.5px)",
  fontFamily: "Pretendard, system-ui, -apple-system",
  fontSize: 12,
  color: "#111",
};

// ===== 리스트 & 카드 =====
const listTop = STATUS_H + HEADER_H + 10 + INFO_H + 12 + FILTER_H + 12;

const listContainerStyle = {
  position: "absolute",
  top: listTop,
  bottom: 24,
  left: "50%",
  transform: "translateX(-50%)",
  width: 348,
  overflowY: "auto",
  display: "flex",
  flexDirection: "column",
  gap: 20,
};

const cardStyle = {
  position: "relative",
  display: "flex",
  alignItems: "center",
  gap: 20,
  height: 112,
  padding: 12,
  borderRadius: 16,
  background:
    "linear-gradient(180deg, rgba(255,255,255,0.40) 0%, rgba(255,255,255,0.60) 100%)",
  boxShadow: "3px 3px 8px rgba(0, 0, 0, 0.08)",
  boxSizing: "border-box",
};

const thumbStyle = {
  width: 88,
  height: 88,
  borderRadius: 12,
  background: "#A6A6A6",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  position: "relative",
  flexShrink: 0,
};

const distancePill = {
  position: "absolute",
  left: 6,
  bottom: 6,
  borderRadius: 8,
  padding: "5px 10px",
  background: "rgba(0,0,0,0.60)",
  backdropFilter: "blur(3px)",
  color: "#FFF",
  fontSize: 10,
  display: "flex",
  alignItems: "center",
  gap: 6,
};

const infoCol = {
  display: "flex",
  flexDirection: "column",
  gap: 7,
  width: 190,
  alignItems: "flex-start",
};

const titleText = {
  color: "#111",
  fontFamily: "Pretendard",
  fontSize: 16,
  fontWeight: 600,
  lineHeight: "140%",
  letterSpacing: "-0.4px",
};
const subText = {
  color: "#111",
  fontFamily: "Pretendard",
  fontSize: 14,
  fontWeight: 600,
  lineHeight: "140%",
  letterSpacing: "-0.35px",
};

const tempRow = {
  display: "flex",
  alignItems: "center",
  gap: 6,
  color: "#767676",
  fontSize: 12,
};

const likeBtnStyle = {
  position: "absolute",
  top: 12,
  right: 12,
  width: 24,
  height: 24,
};

// ===== 카드 컴포넌트 =====
function ShopCard({
  title = "가게명",
  category = "업종",
  distance = "n km 떨어짐",
  temp = "36.5°C",
  liked = false,
}) {
  return (
    <div style={cardStyle}>
      <div style={thumbStyle}>
        <div style={distancePill}>
          <span>{distance}</span>
        </div>
      </div>

      <div style={infoCol}>
        <div style={titleText}>{title}</div>
        <div style={subText}>{category}</div>
        <div style={tempRow}>
          <img src={TemperatureIconSrc} alt="온도" width={12} height={12} />
          <span>{temp}</span>
        </div>
      </div>

      <img
        src={liked ? HeartIconSrc : EmptyHeartSrc}
        alt="좋아요"
        style={likeBtnStyle}
      />
    </div>
  );
}

// ===== 메인 =====
export default function DashStudent() {
  return (
    <div style={containerStyle}>
      <div style={frameStyle}>
        {/* 상태바 */}
        <div style={statusBarStyle} />

        {/* 헤더 */}
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

        {/* 로고 밑 텍스트 */}
        <div style={infoBlockStyle}>
          <div style={infoTitleStyle}>
            재서님을 위한
            <br />
            소상공인 가게 프로필
          </div>
          <div style={infoSubStyle}>
            능력을 함께 펼칠 소상공인분들을 찾아보세요!
          </div>
        </div>

        {/* 필터 바 (DownBar 아이콘을 마지막 칩 내부에 포함) */}
        <div style={filterBarStyle}>
          <div style={filterRowStyle}>
            <div style={chipStyle}>
              <span>우만동 외</span>
              <img src={DownBarSrc} alt="정렬 옵션" width={9} height={9} />
            </div>
            <div style={chipStyle}>
              <span>가격</span>
              <img src={DownBarSrc} alt="정렬 옵션" width={9} height={9} />
            </div>
            <div style={chipStyle}>
              <span>카테고리</span>
              <img src={DownBarSrc} alt="정렬 옵션" width={9} height={9} />
            </div>
            <div style={chipStyle}>
              <span>정확도 순</span>
              <img src={DownBarSrc} alt="정렬 옵션" width={9} height={9} />
            </div>
          </div>
        </div>

        {/* 리스트 */}
        <div style={listContainerStyle}>
          <ShopCard liked />
          <ShopCard />
          <ShopCard />
          <ShopCard />
          <ShopCard liked />
        </div>
      </div>
    </div>
  );
}
