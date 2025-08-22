// src/pages/student/Heart/index.jsx
import React from "react";
import BackIconSrc from "../../../assets/Back.svg";
import SearchIconSrc from "../../../assets/Search.svg";
import HomeIconSrc from "../../../assets/Home.svg";
import HeartIconSrc from "../../../assets/Heart.svg";
import EmptyHeartSrc from "../../../assets/emptyHeart.svg";
import TemperatureIconSrc from "../../../assets/Temperature.svg";
import { useNavigate } from "react-router-dom";
// [API]
import { listHearts } from "../../../api/heart";
import { useHeart } from "../../../contexts/heartcontext";

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

// 클릭 핸들러를 매개변수로 받는 함수형 상수들
const BackIcon = (onclick) => (
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
    onClick={onclick}
  />
);

// ← 검색 아이콘을 함수형으로 변경 (onClick 받기)
const SearchIcon = (onclick) => (
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
      cursor: "pointer",
    }}
    onClick={onclick}
  />
);

const HomeIcon = (onclick) => (
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
      cursor: "pointer",
    }}
    onClick={onclick}
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
  cursor: "pointer", // ← 카드 전체 클릭 가능
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

// ── 검색 팝업 스타일 ──
const searchPopupStyle = {
  position: "absolute",
  top: STATUS_H + HEADER_H + 6,
  left: "50%",
  transform: "translateX(-50%)",
  width: 348,
  height: FILTER_H,
  background: "#FFF",
  border: "none",
  borderRadius: "10px",
  boxShadow: "0 6px 16px rgba(0,0,0,0.12)",
  display: "flex",
  alignItems: "center",
  padding: "0 12px",
  boxSizing: "border-box",
  zIndex: 4,
  outline: "none",
};

const backdropStyle = {
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  zIndex: 3,
};

const searchInputStyle = {
  flex: 1,
  height: "100%",
  border: "none",
  outline: "none",
  fontSize: 14,
};

// ── 카드 컴포넌트 ──
function FavoriteCard({ title, subtitle, temp, liked, onToggleHeart, onOpen }) {
  return (
    <div style={cardStyle} onClick={onOpen}>
      {/* 하트: 클릭 시 카드로의 이동을 막고 토글만 */}
      <img
        src={liked ? HeartIconSrc : EmptyHeartSrc}
        alt="좋아요"
        style={{ ...heartAbs, cursor: "pointer" }}
        onClick={(e) => {
          e.stopPropagation();
          onToggleHeart();
        }}
      />
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
  const navigate = useNavigate();
  const [searchOpen, setSearchOpen] = React.useState(false);
  const [activeFilter, setActiveFilter] = React.useState("전체");

  // [API] 이 페이지에서 다룰 찜 타입 (학생이 보통 소상공인을 찜한다고 가정)
  const HEART_TYPE = "business";

  // [API] 서버 목록 상태
  const [items, setItems] = React.useState([]); // [{id,title,subtitle,temp}]
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);

  // [API] 전역 하트 훅
  const { toggle } = useHeart();

  // [API] 서버 응답 → 카드용 데이터로 매핑
  function mapHeartToCard(x) {
    const title =
      x?.title || x?.name || x?.storeName || x?.nickname || "제목 없음";
    const subLeft =
      x?.category || x?.type || x?.field || x?.major || "소상공인";
    const subRight = x?.status || "모집 중";
    const subtitle = `${subLeft} · ${subRight}`;
    const temp =
      typeof x?.temperature === "number"
        ? `${x.temperature.toFixed(0)}°C`
        : x?.temp || x?.updatedAt || "36°C";

    return {
      id: x?.id ?? x?.targetId ?? crypto.randomUUID(),
      title,
      subtitle,
      temp,
    };
  }

  // [API] 목록 조회
  async function fetchHearts() {
    try {
      setLoading(true);
      setError(null);
      const res = await listHearts(HEART_TYPE);
      const arr = Array.isArray(res?.items)
        ? res.items
        : Array.isArray(res)
        ? res
        : Array.isArray(res?.content)
        ? res.content
        : [];
      setItems(arr.map(mapHeartToCard));
    } catch (e) {
      console.error(e);
      setError(e.message || "에러");
      setItems([]);
    } finally {
      setLoading(false);
    }
  }

  // [API] 최초 로드
  React.useEffect(() => {
    fetchHearts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // [API] 하트 토글 (이 화면에선 보통 '해제' 동작)
  async function onToggleHeart(id) {
    try {
      await toggle(HEART_TYPE, id);
      // 성공 시 목록에서 제거(낙관적)
      setItems((prev) => prev.filter((it) => it.id !== id));
    } catch (e) {
      // 실패 시 아무것도 안 함 (Provider가 롤백)
    }
  }

  const openDetail = (item) =>
    navigate("/student/Detail", {
      state: { title: item.title, subtitle: item.subtitle, id: item.id },
    });

  return (
    <div style={containerStyle}>
      <div style={frameStyle}>
        {/* StatusBar */}
        <div style={statusBarStyle} />

        {/* Header */}
        <div style={topFrameStyle}>
          {BackIcon(() => {
            if (window.history.length > 1) {
              navigate("/student/dash");
            } else {
              navigate("/common/Start");
            }
          })}
          {Title}
          {SearchIcon(() => setSearchOpen(true))}
          {HomeIcon(() => navigate("/common/start"))}
        </div>

        {/* 검색 팝업 */}
        {searchOpen && (
          <>
            <div style={backdropStyle} onClick={() => setSearchOpen(false)} />
            <div style={searchPopupStyle}>
              <input
                type="text"
                placeholder="검색어를 입력하세요"
                style={searchInputStyle}
                autoFocus
                onKeyDown={(e) => {
                  if (e.key === "Escape") setSearchOpen(false);
                  if (e.key === "Enter") {
                    setSearchOpen(false);
                  }
                }}
              />
              <img
                src={SearchIconSrc}
                alt="검색 실행"
                width={20}
                height={20}
                style={{ marginLeft: 8, cursor: "pointer" }}
                onClick={() => setSearchOpen(false)}
              />
            </div>
          </>
        )}

        {/* Filter */}
        <div style={filterStyle}>
          <div style={filterMainStyle}>
            {["전체", "소상공인", "공고", "모집 중"].map((label) => {
              const isActive = activeFilter === label;
              return (
                <div
                  key={label}
                  onClick={() => setActiveFilter(label)}
                  style={{
                    ...filterFontContainer,
                    ...(isActive
                      ? {
                          background: "#0080FF",
                          boxShadow: "0 4px 7px 0 rgba(0, 128, 255, 0.25)",
                          cursor: "pointer",
                        }
                      : { cursor: "pointer" }),
                  }}
                >
                  <span
                    style={{
                      ...filterFont,
                      ...(isActive ? { color: "#FFF", fontWeight: 600 } : null),
                    }}
                  >
                    {label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* List */}
        <div style={listContainerStyle}>
          {/* 상태 */}
          {loading && (
            <div style={{ fontSize: 12, color: "#767676" }}>불러오는 중…</div>
          )}
          {error && !loading && (
            <div style={{ fontSize: 12, color: "#D00" }}>
              관심목록을 불러오지 못했습니다.
            </div>
          )}

          {items.map((item) => (
            <FavoriteCard
              key={item.id}
              title={item.title}
              subtitle={item.subtitle}
              temp={item.temp}
              liked={true /* 찜 목록 화면이므로 기본 true */}
              onToggleHeart={() => onToggleHeart(item.id)} // [API]
              onOpen={() => openDetail(item)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
