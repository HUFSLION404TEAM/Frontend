import React from "react";
import BackIconSrc from "../../../assets/Back.svg";
import SearchIconSrc from "../../../assets/Search.svg";
import HomeIconSrc from "../../../assets/Home.svg";
import HeartIconSrc from "../../../assets/Heart.svg";
import EmptyHeartSrc from "../../../assets/emptyHeart.svg";
import TemperatureIconSrc from "../../../assets/Temperature.svg";
import { useNavigate } from "react-router-dom";

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

/* ================== 검색 팝업(학생 페이지와 동일 구조) ================== */
const searchPopupStyle = {
  position: "absolute",
  top: STATUS_H + HEADER_H + 6, // 헤더 바로 아래 살짝 간격
  left: "50%",
  transform: "translateX(-50%)",
  width: 348,
  height: 44, // FILTER_H와 동일
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
  posts = "10건",
  status = "구직 중",
  temp = "36.5° C",
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
          onToggleHeart();
        }}
      />
    </div>
  );
}

/* ================= 페이지 ================= */
export default function HeartOwner() {
  const navigate = useNavigate();

  // 샘플 데이터
  const items = [
    { id: 1, title: "이대학", status: "구직 중" },
    { id: 2, title: "서강학", status: "구직 중" },
    { id: 3, title: "연세학", status: "매칭 중" },
    { id: 4, title: "한양학", status: "구직 중" },
  ];

  // 하트 상태
  const [likes, setLikes] = React.useState(() =>
    Object.fromEntries(items.map((it) => [it.id, false]))
  );
  const toggleLike = (id) => setLikes((prev) => ({ ...prev, [id]: !prev[id] }));

  // 구직 중만 보기 토글
  const [onlyActive, setOnlyActive] = React.useState(true);

  // 검색 팝업 (학생 페이지 방식)
  const [searchOpen, setSearchOpen] = React.useState(false);
  const [q, setQ] = React.useState("");

  // 필터링
  const filtered = (
    onlyActive ? items.filter((it) => it.status === "구직 중") : items
  ).filter((it) => it.title.toLowerCase().includes(q.trim().toLowerCase()));

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
          {SearchIcon(() => setSearchOpen(true))} {/* ← 팝업 열기 */}
          {HomeIcon(() => navigate("/owner/dash"))}
        </div>

        {/* 🔍 검색 팝업 (학생 Heart와 같은 구조) */}
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
                  if (e.key === "Enter") setSearchOpen(false); // 필요시 검색 실행 로직 추가
                }}
              />
              <img
                src={SearchIconSrc}
                alt="검색 실행"
                width={20}
                height={20}
                style={{ marginLeft: 8, cursor: "pointer" }}
                onClick={() => setSearchOpen(false)} // 필요시 검색 실행 로직 추가
              />
            </div>
          </>
        )}

        {/* 중간 영역: 토글만 유지 (기존 레이아웃 최대한 유지) */}
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
          {filtered.map((it) => (
            <BizCard
              key={it.id}
              title={it.title}
              status={it.status}
              liked={!!likes[it.id]}
              onToggleHeart={() => toggleLike(it.id)}
              onOpen={() =>
                navigate("/owner/Detail", {
                  state: { name: it.title, status: it.status },
                })
              }
            />
          ))}
        </div>
      </div>
    </div>
  );
}
