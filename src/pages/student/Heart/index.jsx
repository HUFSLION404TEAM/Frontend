// src/pages/student/Heart/index.jsx
import React from "react";
import BackIconSrc from "../../../assets/Back.svg";
import SearchIconSrc from "../../../assets/Search.svg";
import HomeIconSrc from "../../../assets/Home.svg";
import HeartIconSrc from "../../../assets/Heart.svg";
import EmptyHeartSrc from "../../../assets/emptyHeart.svg";
import TemperatureIconSrc from "../../../assets/Temperature.svg";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../common/Auth/axios"; // ✅ axios 인스턴스
import { useHeart } from "../../../contexts/heartcontext";

const STATUS_H = 59;
const HEADER_H = 49;
const HEADER_PAD_L = 20;
const FILTER_H = 44;

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
  boxShadow: "0 4px 7px 0 rgba(0,0,0,0.1)",
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
  cursor: "pointer",
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
const metaRow = {
  color: "#767676",
  fontSize: 12,
  display: "flex",
  gap: 8,
  alignItems: "center",
};
const dot = <span style={{ opacity: 0.6 }}>·</span>;
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

// ── 검색 팝업 ──
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

/* ========= 카드 ========= */
function FavoriteCard({
  title,
  description,
  priceText,
  statusText,
  timeText,
  temp,
  liked,
  onToggleHeart,
  onOpen,
}) {
  return (
    <div style={cardStyle} onClick={onOpen}>
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
      {description ? <div style={cardSub}>{description}</div> : null}
      <div style={metaRow}>
        {priceText ? <span>{priceText}</span> : null}
        {priceText ? dot : null}
        {statusText ? <span>{statusText}</span> : null}
        {(priceText || statusText) && timeText ? dot : null}
        {timeText ? <span>{timeText}</span> : null}
      </div>
      <div style={tempRow}>
        <img src={TemperatureIconSrc} alt="온도" width={12} height={12} />
        <span>{temp}</span>
      </div>
    </div>
  );
}

/* ========= 도우미 ========= */
function formatWon(n) {
  const num = Number(n);
  if (!Number.isFinite(num)) return "";
  return "₩" + num.toLocaleString();
}
function formatRelative(iso) {
  const t = new Date(iso).getTime();
  if (Number.isNaN(t)) return "";
  const s = Math.floor((Date.now() - t) / 1000);
  const d = Math.floor(s / 86400);
  if (d > 0) return `${d} days ago`;
  const h = Math.floor(s / 3600);
  if (h > 0) return `${h} hours ago`;
  const m = Math.floor(s / 60);
  if (m > 0) return `${m} minutes ago`;
  return "just now";
}

/* ========= 메인 ========= */
export default function HeartStudent() {
  const navigate = useNavigate();
  const [searchOpen, setSearchOpen] = React.useState(false);
  const [activeFilter, setActiveFilter] = React.useState("전체");

  // ✅ 이 페이지는 "구인글" 즐겨찾기
  const HEART_TYPE = "recruiting";
  const { toggle } = useHeart();

  // 서버 상태
  const [items, setItems] = React.useState([]); // 매핑된 카드 배열
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);

  // 서버 응답 → 카드 매핑
  function mapFavoriteRecruitToCard(row = {}) {
    const rec = row.recruitingInfo || {};
    const id = rec.id ?? row.favoriteId ?? String(Date.now() + Math.random());
    const title = rec.title || "구인 공고";
    const description = rec.projectOverview || ""; // 두 번째 줄
    const priceText = Number.isFinite(rec.price)
      ? `${formatWon(rec.price)} 건당`
      : "";
    const statusText = rec.isRecruiting ? "모집 중" : "모집 마감";
    const timeText = rec.createdAt ? formatRelative(rec.createdAt) : "";
    const temp =
      typeof row?.studentUserInfo?.temperature === "number"
        ? `${row.studentUserInfo.temperature.toFixed(1)}° C`
        : "36° C";
    return {
      id,
      title,
      description,
      priceText,
      statusText,
      timeText,
      temp,
      isRecruiting: !!rec.isRecruiting,
      raw: row,
    };
  }

  // 목록 조회: GET /api/favorites/recruitings
  async function fetchFavorites() {
    try {
      setLoading(true);
      setError(null);
      const res = await axiosInstance.get("/api/favorites/recruitings");
      const list = Array.isArray(res?.data?.data) ? res.data.data : [];
      setItems(list.map(mapFavoriteRecruitToCard));
    } catch (e) {
      console.error("찜한 구인글 목록 조회 실패", e);
      setError(e);
      setItems([]);
    } finally {
      setLoading(false);
    }
  }

  // 최초 로드
  React.useEffect(() => {
    fetchFavorites();
  }, []);

  // 하트 토글(보통 해제): 성공 시 목록에서 제거
  async function onToggleHeart(id) {
    try {
      await toggle(HEART_TYPE, id);
      setItems((prev) => prev.filter((it) => it.id !== id));
    } catch {
      // 실패 시 Provider에서 알아서 롤백한다면 아무 것도 안 함
    }
  }

  const openDetail = (item) =>
    navigate("/student/detail", { state: { ...item.raw, __card: item } });

  // 필터 적용 (디자인 유지용 — 실제 API 필터 없음)
  const filteredItems =
    activeFilter === "모집 중" ? items.filter((it) => it.isRecruiting) : items;

  return (
    <div style={containerStyle}>
      <div style={frameStyle}>
        {/* StatusBar */}
        <div style={statusBarStyle} />

        {/* Header */}
        <div style={topFrameStyle}>
          {BackIcon(() => {
            if (window.history.length > 1) navigate("/student/dash");
            else navigate("/common/Start");
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
                  if (e.key === "Enter") setSearchOpen(false);
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
          {loading && (
            <div style={{ fontSize: 12, color: "#767676" }}>불러오는 중…</div>
          )}
          {error && !loading && (
            <div style={{ fontSize: 12, color: "#D00" }}>
              관심목록을 불러오지 못했습니다.
            </div>
          )}
          {!loading &&
            !error &&
            filteredItems.map((item) => (
              <FavoriteCard
                key={item.id}
                title={item.title}
                description={item.description}
                priceText={item.priceText}
                statusText={item.statusText}
                timeText={item.timeText}
                temp={item.temp}
                liked={true}
                onToggleHeart={() => onToggleHeart(item.id)}
                onOpen={() => openDetail(item)}
              />
            ))}
          {!loading && !error && filteredItems.length === 0 && (
            <div style={{ fontSize: 12, color: "#767676" }}>
              찜한 구인글이 없습니다.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
