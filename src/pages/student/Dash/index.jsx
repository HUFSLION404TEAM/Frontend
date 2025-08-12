import React, { useMemo, useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import HeartIconSrc from "../../../assets/Heart.svg";
import StarIconSrc from "../../../assets/Star.svg";
import AlarmIconSrc from "../../../assets/Alarm.svg";
import TemperatureIconSrc from "../../../assets/Temperature.svg";
import EmptyHeartSrc from "../../../assets/emptyHeart.svg";
import DownBarSrc from "../../../assets/downBar.svg";
import CalendarScr from "../../../assets/Calendar.svg";

const FAVORITES_PATH = "/student/heart";
const NOTIFICATIONS_PATH = "/student/notice";
const DETAIL_PATH = "/student/detail";

const STATUS_H = 44;
const HEADER_H = 45;
const INFO_H = 96;
const FILTER_H = 44;
const SIDE_GAP = 10;

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
  top: STATUS_H + HEADER_H + 15,
  left: SIDE_GAP + 17,
  width: 212,
  height: INFO_H,
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  justifyContent: "center",
  gap: 12,
  background: "#FFF",
  zIndex: 2,
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
  top: STATUS_H + HEADER_H + 10 + INFO_H + 12,
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
  width: "auto",
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
  cursor: "pointer",
};

// (폭은 원래 자동폭 유지, 라벨만 말줄임)
const chipLabelStyle = {
  display: "inline-block",
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
  maxWidth: 60, // 아이콘 공간 고려한 텍스트 최대폭
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

const likeBtnStyle = {
  position: "absolute",
  top: 12,
  right: 12,
  width: 24,
  height: 24,
  cursor: "pointer",
};

const statusTextStyle = {
  color: "#0080FF",
  fontSize: 12,
  fontWeight: 600,
};

const periodRowStyle = {
  display: "flex",
  alignItems: "center",
  gap: 4,
  fontSize: 12,
  color: "#767676",
};

// ===== 바텀 시트 =====
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

const sheetTitleStyle = {
  fontSize: 18,
  fontWeight: 700,
};

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

// ===== 카드 =====
function ShopCard({
  title = "디지털 메뉴 SNS 홍보 구인",
  status = "모집중",
  period = "2024.02.14 - 2024.03.20",
  store = "컴포즈커피 용인 외대점",
  category = "카페",
  distance = "n km 떨어짐",
  initialLiked = false,
  onOpen, // ← 카드 클릭 시 이동
}) {
  const [liked, setLiked] = useState(initialLiked);

  return (
    <div
      style={{ ...cardStyle, cursor: "pointer" }}
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
      {/* 썸네일 + 거리 */}
      <div style={thumbStyle}>
        <div style={distancePill}>
          <span>{distance}</span>
        </div>
      </div>

      {/* 텍스트 영역 */}
      <div style={infoCol}>
        <div style={statusTextStyle}>{status}</div>
        <div style={titleText}>{title}</div>
        <div style={periodRowStyle}>
          <img src={CalendarScr} alt="기간" width={12} height={12} />
          <span>{period}</span>
        </div>
        <div style={{ fontSize: 12, color: "#767676" }}>
          {store} | {category}
        </div>
      </div>

      {/* 좋아요(리스트 토글) */}
      <img
        src={liked ? HeartIconSrc : EmptyHeartSrc}
        alt="좋아요"
        style={likeBtnStyle}
        onClick={(e) => {
          e.stopPropagation(); // 카드 이동 방지
          setLiked((v) => !v);
        }}
      />
    </div>
  );
}

// ===== 메인 =====
export default function DashStudent() {
  const navigate = useNavigate();

  // 칩 상태
  const [area, setArea] = useState("우만동 외");
  const [price, setPrice] = useState("가격");
  const [category, setCategory] = useState("카테고리");
  const [sort, setSort] = useState("정확도 순");

  // 바텀시트
  const [sheetOpen, setSheetOpen] = useState(false);
  const [sheetTitle, setSheetTitle] = useState("필터");
  const [openSection, setOpenSection] = useState(null); // "area" | "price" | "category" | "sort"

  // 섹션 refs (해당 섹션으로 스크롤)
  const areaRef = useRef(null);
  const priceRef = useRef(null);
  const categoryRef = useRef(null);
  const sortRef = useRef(null);
  const scrollRef = useRef(null);

  // 칩 클릭 시: 시트 열고 해당 섹션으로 스크롤
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

  // 시트 오픈 후 해당 섹션으로 부드럽게 스크롤
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

    const t = setTimeout(() => {
      target?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 220);
    return () => clearTimeout(t);
  }, [sheetOpen, openSection]);

  // 칩 라벨 포맷
  const areaChip = area;
  const priceChip = price;
  const categoryChip = category;
  const sortChip = sort;

  // ── 리스트용 더미 데이터 (state로 상세에 넘길 값 포함)
  const items = [
    {
      id: 1,
      title: "디지털 메뉴 SNS 홍보 구인",
      status: "모집중",
      period: "2024.02.14 - 2024.03.20",
      store: "컴포즈커피 용인 외대점",
      category: "카페",
      distance: "0.8km",
      liked: true,
    },
    {
      id: 2,
      title: "포스터/간판 디자인 보조",
      status: "모집중",
      period: "2024.03.01 - 2024.03.31",
      store: "삼촌분식 우만점",
      category: "식당",
      distance: "1.2km",
      liked: false,
    },
    {
      id: 3,
      title: "인스타 릴스 촬영/편집",
      status: "모집중",
      period: "2024.02.20 - 2024.03.10",
      store: "빵굽는하루",
      category: "베이커리",
      distance: "2.3km",
      liked: false,
    },
    {
      id: 4,
      title: "매장 사진 촬영(1회)",
      status: "모집중",
      period: "2024.02.18 - 2024.03.05",
      store: "그린티라떼",
      category: "카페",
      distance: "0.5km",
      liked: true,
    },
    {
      id: 5,
      title: "블로그 리뷰 콘텐츠 작성",
      status: "모집중",
      period: "2024.03.05 - 2024.03.25",
      store: "야식천국",
      category: "서비스",
      distance: "3.0km",
      liked: false,
    },
  ];

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
            <img
              src={HeartIconSrc}
              alt="찜 페이지"
              style={heartStyle}
              onClick={() => navigate(FAVORITES_PATH)}
            />
            <img
              src={AlarmIconSrc}
              alt="알림 페이지"
              style={bellStyle}
              onClick={() => navigate(NOTIFICATIONS_PATH)}
            />
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

        {/* 필터 바 */}
        <div style={filterBarStyle}>
          <div style={filterRowStyle}>
            <div style={chipStyle} onClick={() => openSheet("area")}>
              <span style={chipLabelStyle}>{areaChip}</span>
              <img src={DownBarSrc} alt="동네" width={9} height={9} />
            </div>
            <div style={chipStyle} onClick={() => openSheet("price")}>
              <span style={chipLabelStyle}>{priceChip}</span>
              <img src={DownBarSrc} alt="가격" width={9} height={9} />
            </div>
            <div style={chipStyle} onClick={() => openSheet("category")}>
              <span style={chipLabelStyle}>{categoryChip}</span>
              <img src={DownBarSrc} alt="카테고리" width={9} height={9} />
            </div>
            <div style={chipStyle} onClick={() => openSheet("sort")}>
              <span style={chipLabelStyle}>{sortChip}</span>
              <img src={DownBarSrc} alt="정렬" width={9} height={9} />
            </div>
          </div>
        </div>

        {/* 리스트 */}
        <div style={listContainerStyle}>
          {items.map((it) => (
            <ShopCard
              key={it.id}
              title={it.title}
              status={it.status}
              period={it.period}
              store={it.store}
              category={it.category}
              distance={it.distance}
              initialLiked={it.liked}
              onOpen={() =>
                navigate(DETAIL_PATH, {
                  state: {
                    id: it.id,
                    title: it.title,
                    status: it.status,
                    period: it.period,
                    store: it.store,
                    category: it.category,
                    distance: it.distance,
                    liked: it.liked,
                  },
                })
              }
            />
          ))}
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

          <div style={sheetScrollStyle} ref={scrollRef}>
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
                "카페",
                "식당",
                "베이커리",
                "편의점",
                "서비스",
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
