import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
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

const FAVORITES_PATH = "/owner/heart";
const NOTIFICATIONS_PATH = "/owner/notice";
const DETAIL_PATH = "/owner/detail";
const WRITE_PATH = "/owner/write";

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
  cursor: "pointer",
};
// 말줄임(폭은 기존 자동폭 유지)
const chipLabelStyle = {
  display: "inline-block",
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
  maxWidth: 30,
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
  rowGap: 10, // 기존 값 유지
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
  cursor: "pointer",
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

// ===== 바텀 시트(번개장터 스타일) =====
const sheetOverlayStyle = {
  position: "absolute",
  inset: 0,
  background: "rgba(0,0,0,0.35)",
  zIndex: 5,
};
const sheetWrapStyle = (open) => ({
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
  transform: `translateY(${open ? 0 : 560}px)`,
  transition: "transform 200ms ease",
  display: "flex",
  flexDirection: "column",
});
const sheetHeaderStyle = {
  padding: "14px 16px 8px 16px",
  borderBottom: "1px solid #EEE",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
};
const sheetTitleStyle = { fontSize: 18, fontWeight: 700 };
const sheetDoneBtn = {
  fontSize: 14,
  fontWeight: 600,
  color: "#0080FF",
  cursor: "pointer",
};
const grabberStyle = {
  alignSelf: "center",
  width: 40,
  height: 4,
  borderRadius: 2,
  background: "#D9D9D9",
  marginTop: 8,
};
const sheetScrollStyle = {
  flex: 1,
  overflowY: "auto",
  padding: "8px 16px 24px 16px",
};
const sectionTitleStyle = {
  fontSize: 15,
  fontWeight: 700,
  margin: "14px 0 10px",
};
const optionRowStyle = (active) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "12px 6px",
  fontSize: 15,
  borderBottom: "1px solid " + (active ? "#EAF3FF" : "#F3F3F3"),
  cursor: "pointer",
  color: active ? "#111" : "#222",
  background: active ? "rgba(0,128,255,0.06)" : "transparent",
  borderRadius: 8,
});
const checkIcon = (active) => ({
  width: 16,
  height: 16,
  borderRadius: 8,
  border: `2px solid ${active ? "#0080FF" : "#D0D0D0"}`,
  background: active ? "#0080FF" : "transparent",
});

// ===== 카드 컴포넌트 =====
function CandidateCard({
  name = "이름",
  age = "나이",
  field = "전공, 자신 있는 분야",
  temp = "36.5°C",
  liked = false, // ← 초기 찜 상태로만 사용(프롭)
  onOpen, // ← 카드 클릭 시 이동은 그대로
}) {
  // 🔹 내부 토글 상태 (초기값은 props.liked)
  const [isLiked, setIsLiked] = React.useState(liked);

  return (
    <div
      style={miniCardStyle}
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

      {/* 🔹 하트 토글: 클릭 시 카드 이동 막고 토글 */}
      <img
        src={isLiked ? HeartIconSrc : EmptyHeartSrc}
        alt={isLiked ? "찜 해제" : "찜하기"}
        style={{ ...likeMini, cursor: "pointer" }}
        onClick={(e) => {
          e.stopPropagation(); // 카드 onClick 막기
          setIsLiked((v) => !v); // 토글
        }}
        onKeyDown={(e) => {
          // 접근성(선택): 하트에 포커스가 있을 때 Space/Enter로 토글
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            e.stopPropagation();
            setIsLiked((v) => !v);
          }
        }}
        tabIndex={0}
        role="button"
        aria-pressed={isLiked}
      />
    </div>
  );
}

// ===== 메인(소상공인 대시보드) =====
export default function DashOwner() {
  const navigate = useNavigate();

  // ---- 필터 상태 (칩 라벨 유지 + 시트 공유) ----
  const [area, setArea] = useState("우만동 외");
  const [price, setPrice] = useState("가격");
  const [category, setCategory] = useState("카테고리");
  const [sort, setSort] = useState("정확도 순");

  const [sheetOpen, setSheetOpen] = useState(false);
  const [sheetTitle, setSheetTitle] = useState("필터");
  const [openSection, setOpenSection] = useState(null); // "area" | "price" | "category" | "sort"

  const areaRef = useRef(null);
  const priceRef = useRef(null);
  const categoryRef = useRef(null);
  const sortRef = useRef(null);

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

        {/* 필터 바 (칩 폭/위치 그대로, 말줄임만 적용) */}
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

        {/* 리스트(2열) - 현재는 예시 데이터 없이 기본 카드 사용 */}
        <div style={listWrapStyle}>
          <CandidateCard
            liked
            onOpen={() => {
              if (DETAIL_PATH)
                navigate(DETAIL_PATH, {
                  state: {
                    name: "이름",
                    age: "나이",
                    field: "전공, 자신 있는 분야",
                    temp: "36.5°C",
                    liked: true,
                  },
                });
            }}
          />
          <CandidateCard
            onOpen={() => {
              if (DETAIL_PATH)
                navigate(DETAIL_PATH, {
                  state: {
                    name: "이름",
                    age: "나이",
                    field: "전공, 자신 있는 분야",
                    temp: "36.5°C",
                    liked: false,
                  },
                });
            }}
          />
          <CandidateCard
            onOpen={() => {
              if (DETAIL_PATH)
                navigate(DETAIL_PATH, {
                  state: {
                    name: "이름",
                    age: "나이",
                    field: "전공, 자신 있는 분야",
                    temp: "36.5°C",
                    liked: false,
                  },
                });
            }}
          />
          <CandidateCard
            liked
            onOpen={() => {
              if (DETAIL_PATH)
                navigate(DETAIL_PATH, {
                  state: {
                    name: "이름",
                    age: "나이",
                    field: "전공, 자신 있는 분야",
                    temp: "36.5°C",
                    liked: true,
                  },
                });
            }}
          />
          <CandidateCard
            onOpen={() => {
              if (DETAIL_PATH)
                navigate(DETAIL_PATH, {
                  state: {
                    name: "이름",
                    age: "나이",
                    field: "전공, 자신 있는 분야",
                    temp: "36.5°C",
                    liked: false,
                  },
                });
            }}
          />
          <CandidateCard
            onOpen={() => {
              if (DETAIL_PATH)
                navigate(DETAIL_PATH, {
                  state: {
                    name: "이름",
                    age: "나이",
                    field: "전공, 자신 있는 분야",
                    temp: "36.5°C",
                    liked: false,
                  },
                });
            }}
          />
          <CandidateCard
            liked
            onOpen={() => {
              if (DETAIL_PATH)
                navigate(DETAIL_PATH, {
                  state: {
                    name: "이름",
                    age: "나이",
                    field: "전공, 자신 있는 분야",
                    temp: "36.5°C",
                    liked: true,
                  },
                });
            }}
          />
          <CandidateCard
            onOpen={() => {
              if (DETAIL_PATH)
                navigate(DETAIL_PATH, {
                  state: {
                    name: "이름",
                    age: "나이",
                    field: "전공, 자신 있는 분야",
                    temp: "36.5°C",
                    liked: false,
                  },
                });
            }}
          />
        </div>

        {/* ===== Bottom Sheet (필터) ===== */}
        {sheetOpen && (
          <div
            style={sheetOverlayStyle}
            onClick={() => setSheetOpen(false)}
            aria-hidden
          />
        )}
        <div style={sheetWrapStyle(sheetOpen)} aria-hidden={!sheetOpen}>
          <div style={grabberStyle} />
          <div style={sheetHeaderStyle}>
            <div style={sheetTitleStyle}>{sheetTitle}</div>
            <div style={sheetDoneBtn} onClick={() => setSheetOpen(false)}>
              완료
            </div>
          </div>

          <div style={sheetScrollStyle}>
            {/* 동네 */}
            <div ref={areaRef}>
              <div style={sectionTitleStyle}>동네</div>
              {["우만동 외", "인계동", "영통구", "장안구", "수원 전체"].map(
                (label) => {
                  const active = area === label;
                  return (
                    <div
                      key={label}
                      style={optionRowStyle(active)}
                      onClick={() => {
                        setArea(label);
                        setSheetTitle("동네");
                      }}
                    >
                      <span>{label}</span>
                      <div style={checkIcon(active)} />
                    </div>
                  );
                }
              )}
            </div>

            {/* 가격 */}
            <div ref={priceRef}>
              <div style={sectionTitleStyle}>가격</div>
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
                    style={optionRowStyle(active)}
                    onClick={() => {
                      setPrice(label);
                      setSheetTitle("가격");
                    }}
                  >
                    <span>{label}</span>
                    <div style={checkIcon(active)} />
                  </div>
                );
              })}
            </div>

            {/* 카테고리(업종) */}
            <div ref={categoryRef}>
              <div style={sectionTitleStyle}>카테고리(업종)</div>
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
                    style={optionRowStyle(active)}
                    onClick={() => {
                      setCategory(label);
                      setSheetTitle("카테고리");
                    }}
                  >
                    <span>{label}</span>
                    <div style={checkIcon(active)} />
                  </div>
                );
              })}
            </div>

            {/* 정렬 */}
            <div ref={sortRef}>
              <div style={sectionTitleStyle}>정렬</div>
              {["정확도 순", "최신 순", "낮은 가격 순", "높은 가격 순"].map(
                (label) => {
                  const active = sort === label;
                  return (
                    <div
                      key={label}
                      style={optionRowStyle(active)}
                      onClick={() => {
                        setSort(label);
                        setSheetTitle("정렬");
                      }}
                    >
                      <span>{label}</span>
                      <div style={checkIcon(active)} />
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
