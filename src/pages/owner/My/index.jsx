import React, { useEffect, useRef, useState } from "react";
import StarIconSrc from "../../../assets/Star.svg";
import BackIconSrc from "../../../assets/Back.svg";
import DownBarSrc from "../../../assets/downBar.svg";

// ✅ API (학생과 같은 파일에서 불러옵니다)
import {
  getBusinesses,
  addBusiness,
  updateBusiness,
  deleteBusiness,
  // updateBusinessVisibility, // 공개여부 엔드포인트는 필요 시 사용
} from "../../../api/mypage";

const STATUS_H = 44;
const HEADER_H = 45;
const SIDE_GAP = 10;

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

/* ===== 타이포 ===== */
const title16 = {
  fontFamily: "Pretendard, system-ui, -apple-system",
  fontSize: 16,
  fontWeight: 700,
  color: "#111",
};
const body12 = {
  fontFamily: "Pretendard, system-ui, -apple-system",
  fontSize: 12,
  color: "#111",
  letterSpacing: "-0.3px",
  lineHeight: "16.8px",
};

/* ===== 메인 컨텐츠 ===== */
const contentWrap = {
  position: "absolute",
  top: STATUS_H + HEADER_H + 16,
  left: "50%",
  transform: "translateX(-50%)",
  width: 320,
  boxSizing: "border-box",
};

/* 공통 카드 */
const card = {
  width: 320,
  background: "#FFF",
  borderRadius: 10,
  border: "1px solid #EEE",
  boxShadow: "0 4px 10px rgba(0,0,0,0.08)",
  backdropFilter: "blur(5px)",
  boxSizing: "border-box",
};

/* 매칭 이력 */
const matchContainer = { ...card, height: 121, padding: 9, overflowY: "auto" };
const matchRow = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "6px 4px",
};
const matchLeft = { display: "flex", alignItems: "center", gap: 10 };
const matchStatus = (active) => ({
  fontSize: 12,
  color: active ? "#0080FF" : "#999",
});

/* 섹션 우측 ‘추가’/작은 버튼 */
const pillBtn = {
  padding: "4px 10px",
  fontSize: 11,
  fontWeight: 600,
  border: "1px solid #E5E5EA",
  borderRadius: 8,
  background: "#FFF",
  boxShadow: "0 3px 7px rgba(0,0,0,0.06)",
  cursor: "pointer",
};
const tinyBtn = {
  padding: "2px 6px",
  fontSize: 11,
  fontWeight: 600,
  border: "0.4px solid #1A96FE",
  borderRadius: 8,
  color: "#1A96FE",
  background: "#FFF",
  boxShadow: "0 4px 7px rgba(0,0,0,0.06)",
  cursor: "pointer",
};

/* 리스트 카드 */
const companyCard = {
  ...card,
  height: 64,
  padding: "10px 12px",
  display: "flex",
  alignItems: "center",
  gap: 10,
};
const badge = {
  padding: "4px 8px",
  borderRadius: 16,
  fontSize: 11,
  fontWeight: 700,
  background: "#EAF3FF",
  color: "#0080FF",
};

/* ===== 편집 화면(프로필) ===== */
const simpleHeaderStyle = {
  position: "absolute",
  top: STATUS_H,
  left: 0,
  right: 0,
  height: 49,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  borderBottom: "1px solid #EEE",
  background: "#FFF",
  zIndex: 3,
};
const backBtnStyle = {
  position: "absolute",
  left: 16,
  top: "50%",
  transform: "translateY(-50%)",
  width: 28,
  height: 28,
  cursor: "pointer",
};
const headerTitleStyle = {
  fontFamily: "Pretendard, system-ui, -apple-system",
  fontSize: 16,
  fontWeight: 700,
  color: "#111",
};
const editWrap = {
  position: "absolute",
  top: STATUS_H + 49,
  left: "50%",
  transform: "translateX(-50%)",
  width: 320,
  bottom: 0,
  overflowY: "auto",
  padding: "16px 0 24px",
  boxSizing: "border-box",
};
const sectionTitle = {
  fontFamily: "Pretendard, system-ui, -apple-system",
  fontSize: 14,
  fontWeight: 700,
  color: "#B0B0B0",
  margin: "8px 0",
};
const infoCard = { ...card, padding: "16px" };
const infoGrid = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  columnGap: 20,
  rowGap: 6,
};
const infoLabel = { ...body12, color: "#777" };
const infoValue = { ...body12, color: "#111", textAlign: "right" };

/* ===== 업체등록 오버레이 ===== */
function CompanyWriteOverlay({ onClose, onDone, initial, onDelete }) {
  const [kind, setKind] = useState("");
  const [phone, setPhone] = useState("");
  const [addr, setAddr] = useState("");
  const [bizno, setBizno] = useState("");
  const [about, setAbout] = useState("");
  const [scope, setScope] = useState("공개 범위 설정");
  const [scopeOpen, setScopeOpen] = useState(false);
  const scopeBtnRef = useRef(null);
  const overlayRef = useRef(null);
  const [panelTop, setPanelTop] = useState(0);

  // 편집일 때 기존값 채우기
  useEffect(() => {
    if (initial) {
      setKind(initial.kind || initial.category || "");
      setPhone(initial.phone || "");
      setAddr(initial.addr || initial.address || "");
      setBizno(initial.bizno || initial.businessNumber || "");
      setAbout(initial.about || initial.description || "");
      setScope(initial.scope || "공개 범위 설정");
    } else {
      setKind("");
      setPhone("");
      setAddr("");
      setBizno("");
      setAbout("");
      setScope("공개 범위 설정");
    }
  }, [initial]);

  const openScope = () => {
    if (scopeBtnRef.current && overlayRef.current) {
      const fr = overlayRef.current.getBoundingClientRect();
      const br = scopeBtnRef.current.getBoundingClientRect();
      setPanelTop(br.bottom - fr.top + 6);
    }
    setScopeOpen((v) => !v);
  };

  const overlay = {
    position: "absolute",
    inset: 0,
    background: "#FFF",
    zIndex: 20,
  };
  const header = {
    position: "absolute",
    top: STATUS_H,
    left: 0,
    right: 0,
    height: 49,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderBottom: "1px solid #EEE",
    background: "#FFF",
    zIndex: 21,
  };
  const back = {
    position: "absolute",
    left: 16,
    top: "50%",
    transform: "translateY(-50%)",
    width: 28,
    height: 28,
    cursor: "pointer",
  };
  const titleH = {
    fontFamily: "Pretendard",
    fontSize: 18,
    fontWeight: 700,
    letterSpacing: "-0.3px",
    color: "#111",
  };
  const scroll = {
    position: "absolute",
    top: STATUS_H + 49,
    bottom: 80,
    left: 0,
    right: 0,
    overflowY: "auto",
    padding: "14px 16px 24px 16px",
    boxSizing: "border-box",
    background: "#FFF",
  };
  const label = {
    fontFamily: "Pretendard",
    fontSize: 13,
    color: "#767676",
    margin: "10px 0 6px",
  };
  const input = {
    width: "100%",
    height: 40,
    borderRadius: 10,
    border: "1px solid #E5E5EA",
    background: "#FFF",
    outline: "none",
    padding: "10px 12px",
    fontSize: 14,
    boxShadow: "0 2px 6px rgba(0,0,0,0.04)",
    boxSizing: "border-box",
  };
  const textarea = {
    width: "100%",
    minHeight: 110,
    borderRadius: 10,
    border: "1px solid #E5E5EA",
    background: "#FFF",
    outline: "none",
    padding: "12px",
    fontSize: 14,
    lineHeight: 1.45,
    boxShadow: "0 2px 6px rgba(0,0,0,0.04)",
    boxSizing: "border-box",
    resize: "vertical",
  };
  const rowBetween = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 12,
  };
  const scopeBtn = {
    width: 120,
    height: 34,
    borderRadius: 8,
    background: "#FFF",
    border: "1px solid #E5E5EA",
    boxShadow: "0 2px 6px rgba(0,0,0,0.04)",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 6,
    padding: "0 10px",
    fontSize: 12,
    cursor: "pointer",
  };
  const caret = {
    width: 0,
    height: 0,
    borderLeft: "5px solid transparent",
    borderRight: "5px solid transparent",
    borderTop: "6px solid #999",
  };
  const panel = {
    position: "absolute",
    zIndex: 25,
    width: 140,
    borderRadius: 8,
    background: "rgba(255,255,255,0.98)",
    boxShadow: "0 6px 16px rgba(0,0,0,0.12)",
    overflow: "hidden",
    right: 38,
    top: panelTop,
  };
  const opt = (active) => ({
    height: 36,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderBottom: "1px solid #EEE",
    fontSize: 13,
    background: active ? "rgba(0,128,255,0.08)" : "#FFF",
    color: active ? "#0080FF" : "#111",
    fontWeight: active ? 700 : 400,
  });
  const ctaWrap = {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 24,
    display: "flex",
    justifyContent: "center",
    zIndex: 22,
  };
  const ctaBtn = {
    width: 330,
    height: 46,
    background: "#0080FF",
    color: "#FFF",
    fontSize: 16,
    fontWeight: 700,
    borderRadius: 8,
    border: "none",
    boxShadow: "0 4px 10px rgba(0, 128, 255, 0.3)",
    cursor: "pointer",
  };

  return (
    <div style={overlay} ref={overlayRef}>
      <div style={header}>
        <img src={BackIconSrc} alt="뒤로가기" style={back} onClick={onClose} />
        <div style={titleH}>업체등록</div>

        {/* 편집 모드일 때만 삭제 버튼 */}
        {initial?.id && (
          <button
            type="button"
            style={{
              position: "absolute",
              right: 86,
              top: "50%",
              transform: "translateY(-50%)",
              padding: "6px 12px",
              fontSize: 12,
              fontWeight: 600,
              border: "1px solid #E5E5EA",
              borderRadius: 8,
              background: "#FFF",
              cursor: "pointer",
            }}
            onClick={onDelete}
          >
            삭제
          </button>
        )}
        {/* (기존) 수정 버튼은 유지 */}
        <button
          type="button"
          style={{
            position: "absolute",
            right: 16,
            top: "50%",
            transform: "translateY(-50%)",
            padding: "6px 12px",
            fontSize: 12,
            fontWeight: 600,
            border: "1px solid #E5E5EA",
            borderRadius: 8,
            background: "#FFF",
            cursor: "pointer",
          }}
          onClick={() => {}}
        >
          수정
        </button>
      </div>

      <div style={scroll}>
        <div style={label}>업종</div>
        <input
          style={input}
          value={kind}
          onChange={(e) => setKind(e.target.value)}
        />

        <div style={label}>연락처</div>
        <input
          style={input}
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />

        <div style={label}>업체 위치</div>
        <input
          style={input}
          value={addr}
          onChange={(e) => setAddr(e.target.value)}
        />

        <div style={label}>사업자번호</div>
        <input
          style={input}
          value={bizno}
          onChange={(e) => setBizno(e.target.value)}
        />

        <div style={label}>간단한 소개</div>
        <textarea
          style={textarea}
          value={about}
          onChange={(e) => setAbout(e.target.value)}
        />

        <div style={rowBetween}>
          <div style={label}>공개여부</div>
          <button
            ref={scopeBtnRef}
            type="button"
            style={scopeBtn}
            onClick={openScope}
          >
            <span
              style={{
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {scope}
            </span>
            <span style={caret} />
          </button>
        </div>
      </div>

      {scopeOpen && (
        <div
          style={{ position: "absolute", inset: 0, zIndex: 24 }}
          onClick={() => setScopeOpen(false)}
        >
          <div style={panel} onClick={(e) => e.stopPropagation()}>
            {["전체 공개", "나만 보기"].map((s, i) => (
              <div
                key={s}
                style={{
                  ...opt(scope === s),
                  borderBottom: i === 1 ? "none" : "1px solid #EEE",
                }}
                onClick={() => {
                  setScope(s);
                  setScopeOpen(false);
                }}
              >
                {s}
              </div>
            ))}
          </div>
        </div>
      )}

      <div style={ctaWrap}>
        <button
          type="button"
          style={ctaBtn}
          onClick={() =>
            onDone?.({
              kind,
              phone,
              addr,
              bizno,
              about,
              scope,
            })
          }
        >
          완료
        </button>
      </div>
    </div>
  );
}

/* ===== 메인 페이지 ===== */
export default function MyOwner() {
  const [view, setView] = useState("main"); // 'main' | 'edit'
  const [regOpen, setRegOpen] = useState(false);

  // 서버 목록
  const [companies, setCompanies] = useState([
    // 초기 더미 (서버 응답 오기 전 화면용)
    { id: "dummy-1", name: "업체A", meta: "경기도 용인시 · 카페" },
    { id: "dummy-2", name: "업체B", meta: "수원시 팔달구 · 분식" },
    { id: "dummy-3", name: "업체C", meta: "영통구 · 디저트" },
  ]);

  // 편집 대상
  const [editing, setEditing] = useState(null);

  // 목록 재조회 (정상 배열일 때만 덮어쓰기)
  const refreshBusinesses = async () => {
    try {
      const res = await getBusinesses();
      const list = res?.data?.data;
      if (Array.isArray(list)) {
        setCompanies(
          list.map((b) => ({
            id:
              b.id ??
              b.businessId ??
              b.business_id ??
              String(b.id ?? Date.now()),
            serverId: b.id ?? b.businessId ?? b.business_id ?? null,
            name: b.name ?? b.storeName ?? b.businessName ?? "업체",
            meta: `${b.address ?? b.addr ?? ""}${
              b.address || b.addr ? " · " : ""
            }${b.category ?? b.kind ?? ""}`,
            kind: b.kind ?? b.category,
            phone: b.phone ?? b.contact,
            addr: b.address ?? b.addr,
            bizno: b.bizno ?? b.businessNumber ?? b.registerNumber,
            about: b.about ?? b.description,
            scope:
              b.scope ??
              (b.visibility === "PRIVATE" ? "나만 보기" : "전체 공개"),
          }))
        );
      }
    } catch (e) {
      console.warn("refreshBusinesses failed", e);
      // 실패 시, 현재 목록 유지
    }
  };

  useEffect(() => {
    refreshBusinesses();
  }, []);

  // 단건 삭제: 낙관적 업데이트 + 안전 재조회
  const handleDeleteOne = async (item) => {
    setCompanies((prev) => prev.filter((c) => c.id !== item.id));
    const targetId = item?.serverId ?? item?.id;
    try {
      if (targetId == null) throw new Error("No business id");
      await deleteBusiness(targetId);
    } catch (e) {
      console.warn("deleteBusiness failed", e);
      // 실패 시에도 앱 크래시 방지
    }
    await refreshBusinesses();
  };

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
        </div>

        {/* ===== 메인 ===== */}
        {view === "main" && (
          <div style={contentWrap}>
            {/* 타이틀 + 프로필 편집 */}
            <div
              style={{
                width: 320,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: 12,
              }}
            >
              <div style={title16}>마이페이지</div>
              <button style={pillBtn} onClick={() => setView("edit")}>
                프로필 편집
              </button>
            </div>

            {/* 프로필 행 (요약) */}
            <div
              style={{
                width: 320,
                display: "grid",
                gridTemplateColumns: "56px 1fr",
                columnGap: 16,
                alignItems: "center",
                marginBottom: 12,
              }}
            >
              <div
                style={{
                  width: 56,
                  height: 56,
                  borderRadius: 10,
                  background: "#E5E7EB",
                }}
              />
              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                <div style={{ fontSize: 16, fontWeight: 700, color: "#111" }}>
                  업체 이름
                </div>
                <div
                  style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}
                >
                  <div style={{ ...body12, color: "#777" }}>업종</div>
                  <div style={{ ...body12, textAlign: "right" }}>
                    일반음식점
                  </div>
                  <div style={{ ...body12, color: "#777" }}>연락처</div>
                  <div style={{ ...body12, textAlign: "right" }}>
                    010-1234-5678
                  </div>
                  <div style={{ ...body12, color: "#777" }}>업체 위치</div>
                  <div style={{ ...body12, textAlign: "right" }}>
                    경기도 용인시
                  </div>
                  <div style={{ ...body12, color: "#777" }}>사업자번호</div>
                  <div style={{ ...body12, textAlign: "right" }}>
                    123-45-5678
                  </div>
                </div>
              </div>
            </div>

            {/* 매칭 이력 (더미 표시) */}
            <div style={{ ...title16, margin: "8px 0 8px" }}>매칭 이력</div>
            <div style={matchContainer}>
              <div style={matchRow}>
                <div style={matchLeft}>
                  <div
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: "50%",
                      background: "#E6E6E6",
                    }}
                  />
                  <div>
                    <div
                      style={{ fontSize: 13, fontWeight: 600, color: "#111" }}
                    >
                      대학생 A
                    </div>
                    <div style={{ ...body12, color: "#777" }}>2025.2.20 ~</div>
                  </div>
                </div>
                <span style={matchStatus(true)}>매칭 중</span>
              </div>
              <div style={{ ...matchRow, marginTop: 6 }}>
                <div style={matchLeft}>
                  <div
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: "50%",
                      background: "#E6E6E6",
                    }}
                  />
                  <div>
                    <div
                      style={{ fontSize: 13, fontWeight: 600, color: "#111" }}
                    >
                      대학생 B
                    </div>
                    <div style={{ ...body12, color: "#777" }}>
                      2025.2.20 ~ 2025.6.30
                    </div>
                  </div>
                </div>
                <span style={matchStatus(false)}>매칭 완료</span>
              </div>
            </div>

            {/* 업체 섹션 */}
            <div
              style={{
                width: 320,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                margin: "18px 0 8px",
              }}
            >
              <div style={title16}>업체</div>
              <button
                style={pillBtn}
                onClick={() => {
                  setEditing(null);
                  setRegOpen(true);
                }}
              >
                추가
              </button>
            </div>

            {/* 업체 리스트 */}
            <div
              style={{
                marginTop: 12,
                display: "flex",
                flexDirection: "column",
                gap: 8,
              }}
            >
              {companies.map((c) => (
                <div key={c.id} style={companyCard}>
                  <div
                    style={{
                      width: 44,
                      height: 44,
                      borderRadius: 8,
                      background: "#EEE",
                    }}
                  />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div
                      style={{ fontSize: 13, fontWeight: 600, color: "#111" }}
                    >
                      {c.name}
                    </div>
                    <div
                      style={{
                        ...body12,
                        color: "#777",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {c.meta}
                    </div>
                  </div>
                  <button
                    style={tinyBtn}
                    onClick={() => {
                      setEditing(c);
                      setRegOpen(true);
                    }}
                  >
                    수정
                  </button>
                </div>
              ))}
            </div>

            <div style={{ height: 24 }} />
          </div>
        )}

        {/* ===== 프로필 편집 ===== */}
        {view === "edit" && (
          <>
            <div style={simpleHeaderStyle}>
              <img
                src={BackIconSrc}
                alt="back"
                style={backBtnStyle}
                onClick={() => setView("main")}
              />
              <div style={headerTitleStyle}>마이페이지</div>
            </div>

            <div style={editWrap}>
              {/* 아바타 + 업체이름 중앙 */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginBottom: 6,
                }}
              >
                <div
                  style={{
                    width: 64,
                    height: 64,
                    borderRadius: 10,
                    background: "#E5E7EB",
                  }}
                />
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginBottom: 8,
                }}
              >
                <div style={{ fontSize: 16, fontWeight: 700, color: "#111" }}>
                  업체이름
                </div>
              </div>

              {/* 기본정보 (더미) */}
              <div style={sectionTitle}>기본정보</div>
              <div style={infoCard}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    marginBottom: 6,
                  }}
                >
                  <button style={tinyBtn}>정보 수정</button>
                </div>
                <div style={infoGrid}>
                  <div style={infoLabel}>업종</div>
                  <div style={infoValue}>일반음식점</div>
                  <div style={infoLabel}>연락처</div>
                  <div style={infoValue}>010-1234-5678</div>
                  <div style={infoLabel}>업체 위치</div>
                  <div style={infoValue}>경기도 용인시</div>
                  <div style={infoLabel}>사업자번호</div>
                  <div style={infoValue}>123-45-5678</div>
                  <div style={infoLabel}>온도</div>
                  <div style={infoValue}>38.5 °C</div>
                </div>
              </div>

              <div style={{ ...sectionTitle, marginTop: 16 }}>
                간단한 가게소개
              </div>
              <div style={{ ...infoCard, padding: "16px" }}>
                <div style={body12}>
                  안녕하세요. 저희 카페는 이런 공간입니다 ~~ 고객과의 소통을
                  중요하게 생각하며 항상 정성을 다하겠습니다.
                </div>
              </div>

              <div style={{ height: 24 }} />
            </div>
          </>
        )}

        {/* 업체등록 오버레이 */}
        {regOpen && (
          <CompanyWriteOverlay
            initial={editing}
            onClose={() => {
              setRegOpen(false);
              setEditing(null);
            }}
            onDone={async (payload) => {
              try {
                if (editing?.id) {
                  const { data: saved } = await updateBusiness(
                    editing.serverId ?? editing.id,
                    payload
                  );
                  const merged = saved || payload;
                  setCompanies((prev) =>
                    prev.map((c) =>
                      c.id === editing.id
                        ? {
                            ...c,
                            ...merged,
                            name: c.name || "업체",
                            meta: `${merged.addr ?? c.addr ?? ""}${
                              merged.addr || c.addr ? " · " : ""
                            }${merged.kind ?? c.kind ?? ""}`,
                          }
                        : c
                    )
                  );
                } else {
                  const { data: created } = await addBusiness(payload);
                  const newItem = created
                    ? {
                        id:
                          created.id ??
                          created.businessId ??
                          String(Date.now()),
                        serverId: created.id ?? created.businessId ?? null,
                        name:
                          created.name ??
                          created.storeName ??
                          created.businessName ??
                          "업체",
                        meta: `${created.address ?? ""}${
                          created.address ? " · " : ""
                        }${created.category ?? created.kind ?? ""}`,
                        kind: created.kind ?? created.category,
                        phone: created.phone ?? created.contact,
                        addr: created.address ?? created.addr,
                        bizno: created.bizno ?? created.businessNumber,
                        about: created.about ?? created.description,
                        scope: created.scope,
                      }
                    : {
                        id: String(Date.now()),
                        serverId: null,
                        name: "업체",
                        meta: `${payload.addr ?? ""}${
                          payload.addr ? " · " : ""
                        }${payload.kind ?? ""}`,
                        ...payload,
                      };
                  setCompanies((prev) => [newItem, ...prev]);
                }
                setRegOpen(false);
                setEditing(null);
              } catch (e) {
                console.error(e);
                alert("저장에 실패했습니다.");
              }
            }}
            onDelete={
              editing?.id
                ? async () => {
                    try {
                      await handleDeleteOne(editing);
                    } finally {
                      setRegOpen(false);
                      setEditing(null);
                    }
                  }
                : undefined
            }
          />
        )}
      </div>
    </div>
  );
}
