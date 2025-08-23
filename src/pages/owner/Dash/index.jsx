// pages/owner/Dash/index.jsx
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import HeartIconSrc from "../../../assets/Heart.svg";
import StarIconSrc from "../../../assets/Star.svg";
import AlarmIconSrc from "../../../assets/Alarm.svg";
import TemperatureIconSrc from "../../../assets/Temperature.svg";
import EmptyHeartSrc from "../../../assets/emptyHeart.svg";
import DownBarSrc from "../../../assets/downBar.svg";
import CalendarScr from "../../../assets/Calendar.svg"; // ✅ 캘린더 아이콘 사용
import { useHeart } from "../../../contexts/heartcontext";

const STATUS_H = 44; // 상태바
const HEADER_H = 45; // 헤더
const INFO_H = 120; // 로고 아래 텍스트 블록
const FILTER_H = 44; // 필터 바
const SIDE_GAP = 10; // 좌우 여백

const FAVORITES_PATH = "/owner/heart";
const NOTIFICATIONS_PATH = "/owner/notice";
const DETAIL_PATH = "/owner/detail";
const WRITE_PATH = "/owner/write";

// [API] =========================
const API_BASE =
  process.env.REACT_APP_API_BASE_URL || "https://unibiz.lion.it.kr"; // [API]
const PLANNERS_LIST_PATH = "/dashboard/planners"; // 기획자(대학생) 전체 조회 [API]
// 필요 시 소상공인 목록이면 "/dashboard/business" 로만 바꾸면 됨. [API]
// =================================

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
  cursor: "pointer",
};
const heartStyle = {
  position: "absolute",
  width: 24,
  height: 24,
  right: 32,
  top: 10.5,
  cursor: "pointer",
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
  zIndex: 2,
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

// ===== 필터 바 (기존 소상공인 스타일 유지) =====
const filterBarStyle = {
  position: "absolute",
  top: STATUS_H + HEADER_H + 10 + INFO_H + 12,
  left: 10,
  right: 0,
  height: FILTER_H - 40,
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "0 10px",
  background: "#FFF",
  boxSizing: "border-box",
  zIndex: 1,
};
const filterRowStyle = {
  display: "inline-flex",
  alignItems: "center",
  gap: 8,
};
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
  cursor: "pointer",
};
const chipLabelStyle = {
  display: "inline-block",
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
  maxWidth: 35,
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
};

// ===== 리스트(학생 스타일로 변경: 세로 1열 카드) =====
const listTop = STATUS_H + HEADER_H + 10 + INFO_H + FILTER_H;
const listContainerStyle = {
  position: "absolute",
  top: listTop,
  bottom: 24,
  left: "50%",
  transform: "translateX(-50%)",
  width: 348, // 학생 페이지와 동일 폭
  overflowY: "auto",
  display: "flex",
  flexDirection: "column",
  gap: 20,
};

// 카드 스타일 (학생 ShopCard 스타일 차용)
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
  flexShrink: 0,
};
const infoCol = {
  display: "flex",
  flexDirection: "column",
  gap: 6,
  width: 190,
  alignItems: "flex-start",
};
const nameRow = {
  display: "flex",
  alignItems: "baseline",
  gap: 6,
};
const nameStyle = {
  color: "#111",
  fontFamily: "Pretendard",
  fontSize: 16,
  fontWeight: 700,
  lineHeight: "140%",
  letterSpacing: "-0.4px",
};
const ageStyle = {
  color: "#111",
  fontFamily: "Pretendard",
  fontSize: 12,
  fontWeight: 500,
};
const fieldStyle = {
  color: "#111",
  fontFamily: "Pretendard",
  fontSize: 12,
  fontWeight: 500,
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
  maxWidth: 190,
};
const periodRowStyle = {
  display: "flex",
  alignItems: "center",
  gap: 4,
  fontSize: 12,
  color: "#767676",
};
const tempRowStyle = {
  display: "flex",
  alignItems: "center",
  gap: 4,
  color: "#767676",
  fontSize: 12,
};
const likeBtnStyle = {
  position: "absolute",
  top: 12,
  right: 12,
  width: 24,
  height: 24,
  cursor: "pointer",
};
// ===== 온보딩에서 가게명 로드 =====
function getOnboardingStoreName() {
  try {
    const byKey = (k) => (localStorage.getItem(k) || "").trim();
    const prof = JSON.parse(localStorage.getItem("onboardingProfile") || "{}");
    const name =
      byKey("storeName") || // 가장 흔한 키
      byKey("businessName") ||
      byKey("ownerStoreName") ||
      byKey("onboardingStoreName") ||
      (prof.storeName || prof.shopName || prof.businessName || "").trim();

    if (name) return name;

    // 쿠키 fallback: storeName=... 으로 저장된 경우
    const cookie = document.cookie
      .split("; ")
      .find((v) => v.startsWith("storeName="))
      ?.split("=")[1];
    if (cookie) return decodeURIComponent(cookie);
  } catch {}
  return "";
}

// ===== 카드 컴포넌트 =====
function CandidateCard({
  id,
  name,
  age,
  field,
  temp,
  period = "협의 가능",
  onOpen,
  type = "planner",
}) {
  const { isHeart, toggle } = useHeart();
  const isLiked = isHeart(type, id);
  const navigate = useNavigate();
  return (
    <div
      style={cardStyle}
      onClick={onOpen}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onOpen?.();
        }
      }}
    >
      <div style={thumbStyle} />
      <div style={infoCol}>
        <div style={nameRow}>
          <span style={nameStyle}>{name}</span>
          <span style={ageStyle}>{age}</span>
        </div>
        <div style={fieldStyle}>{field}</div>
        <div style={periodRowStyle}>
          <img src={CalendarScr} alt="기간" width={12} height={12} />
          <span>{period}</span>
        </div>
        <div style={tempRowStyle}>
          <img src={TemperatureIconSrc} alt="온도" width={12} height={12} />
          <span>{temp}</span>
        </div>
      </div>

      <img
        src={isLiked ? HeartIconSrc : EmptyHeartSrc}
        alt={isLiked ? "찜 해제" : "찜하기"}
        style={likeBtnStyle}
        onClick={async (e) => {
          e.stopPropagation();
          const willAdd = !isLiked;
          try {
            await toggle(type, id);
            if (willAdd) navigate(FAVORITES_PATH);
          } catch {}
        }}
      />
    </div>
  );
}

// ===== 메인(소상공인 대시보드) =====
export default function DashOwner() {
  const navigate = useNavigate();
  const [storeName, setStoreName] = useState("");
  useEffect(() => {
    setStoreName(getOnboardingStoreName());
  }, []);

  // ---- 필터 상태 ----
  const [area, setArea] = useState("우만동 외");
  const [price, setPrice] = useState("가격");
  const [category, setCategory] = useState("카테고리");
  const [sort, setSort] = useState("정확도 순");

  const [sheetOpen, setSheetOpen] = useState(false);
  const [sheetTitle, setSheetTitle] = useState("필터");
  const [openSection, setOpenSection] = useState(null);

  const areaRef = useRef(null);
  const priceRef = useRef(null);
  const categoryRef = useRef(null);
  const sortRef = useRef(null);

  // [API] 목록 상태
  const [items, setItems] = useState([]); // [API]
  const [loading, setLoading] = useState(false); // [API]
  const [error, setError] = useState(null); // [API]

  const openSheet = (section) => {
    setOpenSection(section);
    const titleMap = {
      area: "동네",
      price: "가격",
      category: "카테고리",
      sort: "정렬",
    };
    setSheetTitle(titleMap[section] || "필터");
    setSheetOpen(true);
  };

  useEffect(() => {
    if (!sheetOpen || !openSection) return;
    const target =
      openSection === "area"
        ? areaRef.current
        : openSection === "price"
        ? priceRef.current
        : openSection === "category"
        ? categoryRef.current
        : sortRef.current;

    const t = setTimeout(
      () => target?.scrollIntoView({ behavior: "smooth", block: "start" }),
      220
    );
    return () => clearTimeout(t);
  }, [sheetOpen, openSection]);

  // [API] (필요시) 쿼리 매핑 — 서버가 아직 filter 엔드포인트 없으면 무시됨
  function buildFilterQuery() {
    // [API]
    const params = new URLSearchParams();
    if (area && area !== "우만동 외" && area !== "수원 전체")
      params.set("region", area);
    const priceMap = {
      "₩0~₩10,000": "0-10000",
      "₩10,000~₩30,000": "10000-30000",
      "₩30,000~₩50,000": "30000-50000",
      "₩50,000+": "50000-",
    };
    if (priceMap[price]) params.set("priceRange", priceMap[price]);
    if (category && category !== "카테고리") params.set("category", category);
    const sortMap = {
      "정확도 순": "relevance",
      "최신 순": "latest",
      "낮은 가격 순": "priceAsc",
      "높은 가격 순": "priceDesc",
    };
    if (sortMap[sort]) params.set("sort", sortMap[sort]);
    const qs = params.toString();
    return qs ? `?${qs}` : "";
  }

  // [API] 서버 응답 → 카드 데이터로 매핑
  function mapPlannerToCandidate(p) {
    // [API]
    const period =
      formatPeriod(p?.availableFrom, p?.availableTo) ||
      p?.period ||
      "협의 가능";
    const skills = Array.isArray(p?.skills)
      ? p.skills.join(", ")
      : p?.skill || p?.major || "전공/분야";
    return {
      id: p?.id ?? p?.plannerId ?? p?.userId ?? crypto.randomUUID(),
      name: p?.name ?? p?.nickname ?? "이름",
      age: String(p?.age ?? "").trim() || "나이",
      field: skills,
      temp:
        typeof p?.temperature === "number"
          ? `${p.temperature.toFixed(1)}°C`
          : "36.5°C",
      liked: false,
      period,
    };
  }

  function formatPeriod(from, to) {
    // [API]
    if (!from && !to) return "";
    const f = from ? String(from).slice(0, 10) : "";
    const t = to ? String(to).slice(0, 10) : "";
    return f && t ? `${f} ~ ${t}` : f || t;
  }

  // [API] 목록 호출
  async function fetchPlanners() {
    // [API]
    try {
      setLoading(true);
      setError(null);

      const qs = buildFilterQuery();
      const res = await fetch(`${API_BASE}${PLANNERS_LIST_PATH}${qs}`, {
        credentials: "include",
      });

      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const json = await res.json();
      const payload = json?.data ?? json; // {success,message,data} 래핑 대비
      const list = Array.isArray(payload?.content)
        ? payload.content
        : Array.isArray(payload)
        ? payload
        : Array.isArray(payload?.list)
        ? payload.list
        : [];

      setItems(list.map(mapPlannerToCandidate));
    } catch (e) {
      console.error(e);
      setError(e.message || "에러");
      setItems([]);
    } finally {
      setLoading(false);
    }
  }

  // [API] 최초 로드 + 필터 변경 시 재요청
  useEffect(() => {
    // [API]
    fetchPlanners();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [area, price, category, sort]);

  return (
    <div style={containerStyle}>
      <div style={frameStyle}>
        <div style={statusBarStyle} />

        {/* 헤더 */}
        <div style={headerStyle}>
          <div style={logoWrapStyle}>
            <span style={logoTextStyle}>UniBiz</span>
            <img src={StarIconSrc} alt="star" style={starIconStyle} />
          </div>
          <div style={rightIconsWrap}>
            <img
              src={HeartIconSrc}
              alt="heart"
              style={heartStyle}
              onClick={() => {
                if (FAVORITES_PATH) navigate(FAVORITES_PATH);
              }}
            />
            <img
              src={AlarmIconSrc}
              alt="alarm"
              style={bellStyle}
              onClick={() => {
                if (NOTIFICATIONS_PATH) navigate(NOTIFICATIONS_PATH);
              }}
            />
          </div>
        </div>

        {/* 로고 밑 텍스트 */}
        <div style={infoBlockStyle}>
          <div style={infoTitleStyle}>
            {(storeName || "BHC 용인외대점") + "을 위한"}
            <br />
            대학생 기획자 프로필
          </div>{" "}
          <div style={infoSubStyle}>
            함께 우리 가게를 알릴 기획자분들을 찾아보세요!
          </div>
        </div>

        {/* 필터 바 */}
        <div style={filterBarStyle}>
          <div style={filterRowStyle}>
            <div style={chipStyle} onClick={() => openSheet("area")}>
              <span style={chipLabelStyle}>{area}</span>
              <img src={DownBarSrc} alt="옵션" width={6} height={9} />
            </div>
            <div style={chipStyle} onClick={() => openSheet("price")}>
              <span style={chipLabelStyle}>{price}</span>
              <img src={DownBarSrc} alt="옵션" width={6} height={9} />
            </div>
            <div style={chipStyle} onClick={() => openSheet("category")}>
              <span style={chipLabelStyle}>{category}</span>
              <img src={DownBarSrc} alt="옵션" width={6} height={9} />
            </div>
            <div style={chipStyle} onClick={() => openSheet("sort")}>
              <span style={chipLabelStyle}>{sort}</span>
              <img src={DownBarSrc} alt="옵션" width={6} height={9} />
            </div>
          </div>
          <button
            type="button"
            style={writeBtnStyle}
            onClick={() =>
              navigate(
                WRITE_PATH.startsWith("/") ? WRITE_PATH : `/${WRITE_PATH}`
              )
            }
          >
            글쓰기
          </button>
        </div>

        {/* 리스트 */}
        <div style={listContainerStyle}>
          {/* [API] 상태 표시 (UI 변경 없이 텍스트만) */}
          {loading && (
            <div style={{ fontSize: 12, color: "#767676" }}>불러오는 중…</div>
          )}
          {error && !loading && (
            <div style={{ fontSize: 12, color: "#D00" }}>
              목록을 불러오지 못했습니다.
            </div>
          )}

          {items.map((it) => (
            <CandidateCard
              key={it.id}
              id={it.id}
              type="planner"
              name={it.name}
              age={it.age}
              field={it.field}
              temp={it.temp}
              liked={it.liked}
              period={it.period}
              onOpen={() => {
                if (DETAIL_PATH)
                  navigate(DETAIL_PATH, {
                    state: {
                      name: it.name,
                      age: it.age,
                      field: it.field,
                      temp: it.temp,
                      liked: it.liked,
                      period: it.period,
                      id: it.id,
                    },
                  });
              }}
            />
          ))}
        </div>

        {/* ===== Bottom Sheet (필터) ===== */}
        {sheetOpen && (
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "rgba(0,0,0,0.35)",
              zIndex: 5,
            }}
            onClick={() => setSheetOpen(false)}
            aria-hidden
          />
        )}
        <div
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            bottom: 0,
            height: 520,
            background: "#FFF",
            borderTopLeftRadius: 18,
            borderTopRightRadius: 18,
            boxShadow: "0 -8px 20px rgba(0,0,0,0.15)",
            zIndex: 6,
            transform: `translateY(${sheetOpen ? 0 : 560}px)`,
            transition: "transform 200ms ease",
            display: "flex",
            flexDirection: "column",
          }}
          aria-hidden={!sheetOpen}
        >
          <div
            style={{
              alignSelf: "center",
              width: 40,
              height: 4,
              borderRadius: 2,
              background: "#D9D9D9",
              marginTop: 8,
            }}
          />
          <div
            style={{
              padding: "14px 16px 8px 16px",
              borderBottom: "1px solid #EEE",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div style={{ fontSize: 18, fontWeight: 700 }}>{sheetTitle}</div>
            <div
              style={{
                fontSize: 14,
                fontWeight: 600,
                color: "#0080FF",
                cursor: "pointer",
              }}
              onClick={() => setSheetOpen(false)}
            >
              완료
            </div>
          </div>

          <div
            style={{
              flex: 1,
              overflowY: "auto",
              padding: "8px 16px 24px 16px",
            }}
          >
            {/* 동네 */}
            <div ref={areaRef}>
              <div
                style={{ fontSize: 15, fontWeight: 700, margin: "14px 0 10px" }}
              >
                동네
              </div>
              {["우만동 외", "인계동", "영통구", "장안구", "수원 전체"].map(
                (label) => {
                  const active = area === label;
                  return (
                    <div
                      key={label}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        padding: "12px 6px",
                        fontSize: 15,
                        borderBottom:
                          "1px solid " + (active ? "#EAF3FF" : "#F3F3F3"),
                        cursor: "pointer",
                        color: active ? "#111" : "#222",
                        background: active
                          ? "rgba(0,128,255,0.06)"
                          : "transparent",
                        borderRadius: 8,
                      }}
                      onClick={() => {
                        setArea(label);
                        setSheetTitle("동네");
                      }}
                    >
                      <span>{label}</span>
                      <div
                        style={{
                          width: 16,
                          height: 16,
                          borderRadius: 8,
                          border: `2px solid ${active ? "#0080FF" : "#D0D0D0"}`,
                          background: active ? "#0080FF" : "transparent",
                        }}
                      />
                    </div>
                  );
                }
              )}
            </div>

            {/* 가격 */}
            <div ref={priceRef}>
              <div
                style={{ fontSize: 15, fontWeight: 700, margin: "14px 0 10px" }}
              >
                가격
              </div>
              {[
                "가격",
                "₩0~₩10,000",
                "₩10,000~₩30,000",
                "₩30,000~₩50,000",
                "₩50,000+",
              ].map((label) => {
                const active = price === label;
                return (
                  <div
                    key={label}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      padding: "12px 6px",
                      fontSize: 15,
                      borderBottom:
                        "1px solid " + (active ? "#EAF3FF" : "#F3F3F3"),
                      cursor: "pointer",
                      color: active ? "#111" : "#222",
                      background: active
                        ? "rgba(0,128,255,0.06)"
                        : "transparent",
                      borderRadius: 8,
                    }}
                    onClick={() => {
                      setPrice(label);
                      setSheetTitle("가격");
                    }}
                  >
                    <span>{label}</span>
                    <div
                      style={{
                        width: 16,
                        height: 16,
                        borderRadius: 8,
                        border: `2px solid ${active ? "#0080FF" : "#D0D0D0"}`,
                        background: active ? "#0080FF" : "transparent",
                      }}
                    />
                  </div>
                );
              })}
            </div>

            {/* 카테고리(업종) */}
            <div ref={categoryRef}>
              <div
                style={{ fontSize: 15, fontWeight: 700, margin: "14px 0 10px" }}
              >
                카테고리(업종)
              </div>
              {[
                "카테고리",
                "기획/마케팅",
                "디자인",
                "촬영/편집",
                "서빙/매장",
                "기타",
              ].map((label) => {
                const active = category === label;
                return (
                  <div
                    key={label}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      padding: "12px 6px",
                      fontSize: 15,
                      borderBottom:
                        "1px solid " + (active ? "#EAF3FF" : "#F3F3F3"),
                      cursor: "pointer",
                      color: active ? "#111" : "#222",
                      background: active
                        ? "rgba(0,128,255,0.06)"
                        : "transparent",
                      borderRadius: 8,
                    }}
                    onClick={() => {
                      setCategory(label);
                      setSheetTitle("카테고리");
                    }}
                  >
                    <span>{label}</span>
                    <div
                      style={{
                        width: 16,
                        height: 16,
                        borderRadius: 8,
                        border: `2px solid ${active ? "#0080FF" : "#D0D0D0"}`,
                        background: active ? "#0080FF" : "transparent",
                      }}
                    />
                  </div>
                );
              })}
            </div>

            {/* 정렬 */}
            <div ref={sortRef}>
              <div
                style={{ fontSize: 15, fontWeight: 700, margin: "14px 0 10px" }}
              >
                정렬
              </div>
              {["정확도 순", "최신 순", "낮은 가격 순", "높은 가격 순"].map(
                (label) => {
                  const active = sort === label;
                  return (
                    <div
                      key={label}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        padding: "12px 6px",
                        fontSize: 15,
                        borderBottom:
                          "1px solid " + (active ? "#EAF3FF" : "#F3F3F3"),
                        cursor: "pointer",
                        color: active ? "#111" : "#222",
                        background: active
                          ? "rgba(0,128,255,0.06)"
                          : "transparent",
                        borderRadius: 8,
                      }}
                      onClick={() => {
                        setSort(label);
                        setSheetTitle("정렬");
                      }}
                    >
                      <span>{label}</span>
                      <div
                        style={{
                          width: 16,
                          height: 16,
                          borderRadius: 8,
                          border: `2px solid ${active ? "#0080FF" : "#D0D0D0"}`,
                          background: active ? "#0080FF" : "transparent",
                        }}
                      />
                    </div>
                  );
                }
              )}
            </div>
          </div>
        </div>
        {/* ===== /Bottom Sheet ===== */}
      </div>
    </div>
  );
}
