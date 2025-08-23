// src/pages/owner/Heart/index.jsx
import React from "react";
import BackIconSrc from "../../../assets/Back.svg";
import SearchIconSrc from "../../../assets/Search.svg";
import HomeIconSrc from "../../../assets/Home.svg";
import HeartIconSrc from "../../../assets/Heart.svg";
import EmptyHeartSrc from "../../../assets/emptyHeart.svg";
import TemperatureIconSrc from "../../../assets/Temperature.svg";
import { useNavigate } from "react-router-dom";

// 🔗 연동 추가
import { listHearts } from "../../../api/heart";
import { useHeart } from "../../../contexts/heartcontext";

const STATUS_H = 59;
const HEADER_H = 49;
const HEADER_PAD_L = 20;

// 🔵 중간 영역(토글만) — 기존 레이아웃 유지
const MID_H = 86;

/* ================= 공통 프레임 ================= */
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
  borderBottom: "1px solid #EEE",
  background: "#FFF",
  boxSizing: "border-box",
  zIndex: 2,
  display: "block",
};

/* ================= 헤더(클릭 핸들러 받는 형태) ================= */
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

/* ================= 중간 영역(토글만) ================= */
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
const toggleRowStyle = {
  display: "flex",
  justifyContent: "flex-end",
  alignItems: "center",
  gap: 5,
  borderBottom: "1px solid #EEE",
  paddingBottom: 10,
};
const toggleStyleBase = {
  position: "relative",
  width: 44,
  height: 24,
  borderRadius: 12,
  cursor: "pointer",
};
const toggleKnobBase = {
  position: "absolute",
  top: 2,
  width: 20,
  height: 20,
  borderRadius: "50%",
  background: "#FFF",
  boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
  transition: "left .18s, right .18s, transform .18s",
};
const toggleLabelStyle = { fontSize: 12, color: "#000" };

/* ================= 리스트 ================= */
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
  minHeight: 96,
  padding: 12,
  borderRadius: 16,
  background: "#FFF",
  boxShadow: "0 1px 2px rgba(0,0,0,0.03), 0 6px 20px rgba(0,0,0,0.04)",
  boxSizing: "border-box",
  cursor: "pointer",
};
const avatarStyle = {
  width: 60,
  height: 60,
  borderRadius: "50%",
  background: "#C9CED6",
  flex: "0 0 60px",
};
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
  cursor: "pointer",
};

/* ================== 검색 팝업 ================== */
const searchPopupStyle = {
  position: "absolute",
  top: STATUS_H + HEADER_H + 6,
  left: "50%",
  transform: "translateX(-50%)",
  width: 348,
  height: 44,
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

/* ================= 카드 컴포넌트 ================= */
function BizCard({
  title,
  region = "용인시 기흥구",
  posts = "0건",
  status = "구직 중",
  temp = "36.5°C",
  liked = false,
  onToggleHeart,
  onOpen,
}) {
  return (
    <div style={bizCardStyle} onClick={onOpen}>
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
      <img
        src={liked ? HeartIconSrc : EmptyHeartSrc}
        alt="찜"
        style={heartAbs}
        onClick={(e) => {
          e.stopPropagation(); // 카드 이동 막고 하트만 토글
          onToggleHeart?.();
        }}
      />
    </div>
  );
}

/* ================= 페이지 ================= */
export default function HeartOwner() {
  const navigate = useNavigate();

  // 🔗 찜 타입: 소상공인이 찜한 대상은 '대학생(기획자)'
  const HEART_TYPE = "planner";

  // 서버 목록/상태
  const [items, setItems] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);
  const { toggle } = useHeart();

  // 구직 중만 보기 토글
  const [onlyActive, setOnlyActive] = React.useState(true);

  // 검색 팝업
  const [searchOpen, setSearchOpen] = React.useState(false);
  const [q, setQ] = React.useState("");

  // 서버 응답 → 카드용 데이터 매핑
  function mapToCard(x) {
    const title = x?.title || x?.name || x?.nickname || "이름";
    const status = x?.status || "구직 중";
    const region = x?.region || x?.location || "지역";
    const posts =
      typeof x?.posts === "number"
        ? `${x.posts}건`
        : typeof x?.openings === "number"
        ? `${x.openings}건`
        : "0건";
    const temp =
      typeof x?.temperature === "number"
        ? `${x.temperature.toFixed(1)}°C`
        : x?.temp || "36.5°C";

    return {
      id: x?.id ?? x?.targetId ?? crypto.randomUUID(),
      title,
      status,
      region,
      posts,
      temp,
    };
  }

  // 찜 목록 조회
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
      setItems(arr.map(mapToCard));
    } catch (e) {
      console.error(e);
      setError(e.message || "에러");
      setItems([]);
    } finally {
      setLoading(false);
    }
  }

  // 최초 로드
  React.useEffect(() => {
    fetchHearts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 하트 토글 → 서버 업데이트 후 화면에서 해당 카드 제거
  async function onToggleHeart(id) {
    try {
      await toggle(HEART_TYPE, id);
      setItems((prev) => prev.filter((it) => it.id !== id));
    } catch (e) {
      // 실패 시 무시(필요시 알림)
    }
  }

  // 필터링(구직 중만 보기 + 검색)
  const filtered = (
    onlyActive ? items.filter((it) => it.status === "구직 중") : items
  ).filter((it) =>
    (it.title || "").toLowerCase().includes(q.trim().toLowerCase())
  );

  return (
    <div style={containerStyle}>
      <div style={frameStyle}>
        {/* StatusBar */}
        <div style={statusBarStyle} />

        {/* Header */}
        <div style={topFrameStyle}>
          {BackIcon(() => {
            navigate("/owner/dash");
          })}
          {Title}
          {SearchIcon(() => setSearchOpen(true))}
          {HomeIcon(() => navigate("/owner/dash"))}
        </div>

        {/* 🔍 검색 팝업 */}
        {searchOpen && (
          <>
            <div style={backdropStyle} onClick={() => setSearchOpen(false)} />
            <div style={searchPopupStyle}>
              <input
                type="text"
                placeholder="이름으로 검색"
                value={q}
                onChange={(e) => setQ(e.target.value)}
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

        {/* 중간 영역: 토글만 유지 */}
        <div style={midAreaStyle}>
          <div style={toggleRowStyle}>
            <div
              style={{
                ...toggleStyleBase,
                background: onlyActive ? "#0080FFCC" : "#DADDE1",
                transition: "background-color .18s",
              }}
              onClick={() => setOnlyActive((v) => !v)}
            >
              <div
                style={{
                  ...toggleKnobBase,
                  right: onlyActive ? 2 : "auto",
                  left: onlyActive ? "auto" : 2,
                }}
              />
            </div>
            <span style={toggleLabelStyle}>구직 중만 보기</span>
          </div>
        </div>

        {/* 리스트 */}
        <div style={listContainerStyle}>
          {/* 상태 메시지 */}
          {loading && (
            <div style={{ fontSize: 12, color: "#767676" }}>불러오는 중…</div>
          )}
          {error && !loading && (
            <div style={{ fontSize: 12, color: "#D00" }}>
              관심목록을 불러오지 못했습니다.
            </div>
          )}

          {filtered.map((it) => (
            <BizCard
              key={it.id}
              title={it.title}
              region={it.region}
              posts={it.posts}
              status={it.status}
              temp={it.temp}
              liked={true} // 찜 목록 화면이므로 기본 true
              onToggleHeart={() => onToggleHeart(it.id)}
              onOpen={() =>
                navigate("/owner/Detail", {
                  state: { name: it.title, status: it.status, id: it.id },
                })
              }
            />
          ))}
        </div>
      </div>
    </div>
  );
}
