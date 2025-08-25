// pages/owner/Dash/index.jsx
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import HeartIconSrc from "../../../assets/Heart.svg";
import StarIconSrc from "../../../assets/Star.svg";
import AlarmIconSrc from "../../../assets/Alarm.svg";
import TemperatureIconSrc from "../../../assets/Temperature.svg";
import EmptyHeartSrc from "../../../assets/emptyHeart.svg";
import DownBarSrc from "../../../assets/downBar.svg";
import { useHeart } from "../../../contexts/heartcontext";
import axiosInstance from "../../common/Auth/axios";
import LogoutButton from "../../common/components/LogoutButton";

const STATUS_H = 44;
const HEADER_H = 45;
const INFO_H = 120;
const FILTER_H = 44;
const SIDE_GAP = 10;

const FAVORITES_PATH = "/owner/heart";
const NOTIFICATIONS_PATH = "/owner/notice";
const DETAIL_PATH = "/owner/detail";
const WRITE_PATH = "/owner/write";

/* ===== 공통 프레임 ===== */
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

/* ===== 헤더 ===== */
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

/* ===== 로고 밑 텍스트 ===== */
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

/* ===== 필터 바 ===== */
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
const filterRowStyle = { display: "inline-flex", alignItems: "center", gap: 8 };
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

/* ===== 리스트 ===== */
const listTop = STATUS_H + HEADER_H + 10 + INFO_H + FILTER_H;
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

/* ===== 카드 ===== */
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
const nameRow = { display: "flex", alignItems: "baseline", gap: 6 };
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

/* ===== 카드 컴포넌트 ===== */
function CandidateCard({
  id,
  name,
  age,
  field,
  temp,
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
          {age ? <span style={ageStyle}>{age}</span> : null}
        </div>
        <div style={fieldStyle}>{field}</div>
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

/* ===== 서버 → 카드 데이터 매핑 (학생 프로필) ===== */
function mapStudentToCard(s = {}) {
  const id =
    s.studentId ?? s.userId ?? s.id ?? String(Date.now() + Math.random());
  const name = s.name ?? "학생";
  // 한 줄: 학교 · 전공 (region이 있으면 뒤에 붙여도 됨)
  const school = s.school ?? "";
  const major = s.major ?? "";
  const region = s.region ?? "";
  const fieldLine = `${school}${school && major ? " · " : ""}${major}${
    region ? ` · ${region}` : ""
  }`.trim();
  const temp =
    typeof s.temperature === "number" ? `${s.temperature}°C` : "36°C";

  return {
    id,
    name,
    age: "", // 나이 정보 없음 → 공란
    field: fieldLine, // 학교 · 전공 · 지역
    temp,
    raw: s,
  };
}

/* ===== 메인(소상공인 대시보드: 학생 프로필 목록) ===== */
export default function DashOwner() {
  const navigate = useNavigate();

  // 가게/사업자 이름
  const [storeName, setStoreName] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const res = await axiosInstance.get("/api/store/mypage");
        const data = res?.data?.data;
        const nameFromStore = Array.isArray(data?.stores)
          ? (data.stores[0]?.storeName || "").trim()
          : "";
        const nameFromUser = (data?.userInfo?.name || "").trim();
        setStoreName(nameFromStore || nameFromUser || "");
      } catch (e) {
        console.error("업체 마이페이지 조회 실패", e);
        setStoreName("");
      }
    })();
  }, []);

  // ---- 필터 상태(라벨은 기존 UI 유지) ----
  // area → region 파라미터로 매핑
  const [area, setArea] = useState("우만동 외");
  // price 칩은 현재 미사용(온도 필터가 필요하면 여기로 매핑 가능)
  const [price, setPrice] = useState("가격");
  // category → major 파라미터로 매핑
  const [category, setCategory] = useState("카테고리");
  const [sort, setSort] = useState("정확도 순"); // API 미사용(로컬)

  // 검색 키워드(현재 입력 UI 없음)
  const [keyword] = useState("");

  const [sheetOpen, setSheetOpen] = useState(false);
  const [sheetTitle, setSheetTitle] = useState("필터");
  const [openSection, setOpenSection] = useState(null);

  const areaRef = useRef(null);
  const priceRef = useRef(null);
  const categoryRef = useRef(null);
  const sortRef = useRef(null);

  // ✅ 학생 프로필 목록
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // 학생 프로필 불러오기 — GET /api/student/profiles
  const fetchStudentProfiles = async () => {
    setLoading(true);
    setError(null);
    try {
      const regionParam = area === "우만동 외" ? undefined : area;
      const majorParam = category === "카테고리" ? undefined : category;

      const params = {
        region: regionParam,
        major: majorParam,
        keyword: keyword || undefined,
        // 필요 시 school, isEmployment, minTemperature, maxTemperature도 여기서 추가
      };

      const res = await axiosInstance.get("/api/student/profiles", { params });
      const list = Array.isArray(res?.data?.data)
        ? res.data.data
        : Array.isArray(res?.data)
        ? res.data
        : [];
      setItems(list.map(mapStudentToCard));
    } catch (e) {
      console.error("학생 프로필 목록 조회 실패", e);
      setError(e);
      setItems([]);
    } finally {
      setLoading(false);
    }
  };

  // 초기 로드 + region/major 변경 시 재조회
  useEffect(() => {
    fetchStudentProfiles();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [area, category]);

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
              onClick={() => navigate(FAVORITES_PATH)}
            />
            <img
              src={AlarmIconSrc}
              alt="alarm"
              style={bellStyle}
              onClick={() => navigate(NOTIFICATIONS_PATH)}
            />
            <LogoutButton
              style={{ position: "absolute", right: -36, top: 8 }}
            />
          </div>
        </div>

        {/* 로고 밑 텍스트 */}
        <div style={infoBlockStyle}>
          <div style={infoTitleStyle}>
            {(storeName || "우리 가게") + "님을 위한"}
            <br />
            대학생 기획자 프로필
          </div>
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
          {loading && (
            <div style={{ fontSize: 12, color: "#767676" }}>불러오는 중…</div>
          )}
          {error && !loading && (
            <div style={{ fontSize: 12, color: "#D00" }}>
              목록을 불러오지 못했습니다.
            </div>
          )}

          {!loading &&
            !error &&
            items.map((it) => (
              <CandidateCard
                key={it.id}
                id={it.id}
                type="planner"
                name={it.name}
                age={it.age}
                field={it.field}
                temp={it.temp}
                onOpen={() =>
                  navigate(DETAIL_PATH, {
                    state: { ...it.raw, __card: it }, // 원본 + 카드정보 전달
                  })
                }
              />
            ))}
        </div>

        {/* Bottom Sheet (필터) */}
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
            {/* 동네 → region */}
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

            {/* 가격(미사용 자리) */}
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

            {/* 카테고리 → major */}
            <div ref={categoryRef}>
              <div
                style={{ fontSize: 15, fontWeight: 700, margin: "14px 0 10px" }}
              >
                카테고리(전공)
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

            {/* 정렬(로컬) */}
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
        {/* /Bottom Sheet */}
      </div>
    </div>
  );
}
