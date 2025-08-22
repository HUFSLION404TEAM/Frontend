// src/pages/student/My/index.jsx
import React, { useEffect, useRef, useState } from "react";
import StarIconSrc from "../../../assets/Star.svg";
import BackIconSrc from "../../../assets/Back.svg";
import DownBarSrc from "../../../assets/downBar.svg";
import DoneIconScr from "../../../assets/Done.svg";
import { useNavigate } from "react-router-dom";

// ✅ [연동] 마이페이지 API
import {
  getPortfolios,
  addPortfolio,
  updatePortfolio,
  deletePortfolio,
  getTemperature, // 필요시 사용 (현재 화면 표시는 더미)
} from "../../../api/mypage";

const STATUS_H = 44; // 상태바
const HEADER_H = 45; // 헤더
const SIDE_GAP = 10; // 좌우 여백

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

/* ===== 메인 헤더(로고) ===== */
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

/* ===== 메인 컨텐츠 래퍼 (320 고정) ===== */
const contentWrap = {
  position: "absolute",
  top: STATUS_H + HEADER_H + 10 + 24,
  left: "50%",
  transform: "translateX(-50%)",
  width: 320,
  boxSizing: "border-box",
};

/* ===== 작은 버튼 ===== */
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
const tinyEditBtn = {
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

/* ===== 카드 공통 ===== */
const card = {
  width: 320,
  background: "#FFF",
  borderRadius: 10,
  border: "1px solid #EEE",
  boxShadow: "0 4px 10px rgba(0,0,0,0.08)",
  backdropFilter: "blur(5px)",
  boxSizing: "border-box",
};

/* ===== 매칭 이력 ===== */
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

/* ===== 포트폴리오 드롭다운(트리거) ===== */
const dropdownTrigger = {
  width: 320,
  height: 30,
  borderRadius: 10,
  background: "#1A96FE",
  color: "#FFF",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  gap: 8,
  fontFamily: "Pretendard, system-ui, -apple-system",
  fontWeight: 600,
  fontSize: 12,
  letterSpacing: "-0.3px",
  boxShadow: "0 4px 10px rgba(0,0,0,0.08)",
  border: "none",
  outline: "none",
  appearance: "none",
  WebkitAppearance: "none",
  MozAppearance: "none",
};
const floatOverlay = {
  position: "absolute",
  inset: 0,
  zIndex: 10,
  background: "transparent",
};
const dropdownPanelFloat = {
  position: "absolute",
  zIndex: 11,
  width: 320,
  height: 108,
  borderRadius: "0 0 10px 10px",
  background: "rgba(243,244,246,0.6)",
  boxShadow: "0 4px 10px rgba(0,0,0,0.08)",
  backdropFilter: "blur(1px)",
  overflow: "hidden",
  display: "flex",
  flexDirection: "column",
};
const dropdownOption = {
  height: 36,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  background: "rgba(243,244,246,0.6)",
  borderBottom: "1px solid #EAEAEA",
  fontFamily: "Pretendard, system-ui, -apple-system",
  fontSize: 12,
  color: "#111",
  letterSpacing: "-0.3px",
  backdropFilter: "blur(1px)",
};
const dropdownOptionActive = { background: "rgba(26,150,254,0.15)" };

/* ===== 포트폴리오 리스트 ===== */
const pfListWrap = {
  maxHeight: 330,
  overflowY: "auto",
  marginTop: 12,
  paddingRight: 2,
};

/* ===== 편집 헤더 ===== */
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

/* ===== 편집 화면 ===== */
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
const infoCard = {
  width: 320,
  borderRadius: 10,
  background: "#FFF",
  border: "1px solid #EEE",
  boxShadow: "0 4px 10px rgba(0,0,0,0.06)",
  backdropFilter: "blur(5px)",
  padding: "20px 11px 21px 23px",
  boxSizing: "border-box",
};
const infoGrid = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  columnGap: 20,
  rowGap: 6,
};
const infoLabel = { ...body12, color: "#111" };
const infoValue = { ...body12, color: "#111", textAlign: "right" };

/* ===== 이름 + 인증 뱃지 ===== */
const nameRow = {
  width: 320,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: 8,
  marginBottom: 8,
  position: "relative",
};
const verifyChip = (on) => ({
  display: "inline-flex",
  alignItems: "center",
  gap: 4,
  padding: "2px 8px",
  fontSize: 11,
  borderRadius: 999,
  border: on ? "1px solid #CDE3FF" : "1px solid #E5E5EA",
  background: on ? "#F1F7FF" : "#FFF",
  color: on ? "#1A96FE" : "#777",
});

/* ===== 공개 범위 버튼/패널 ===== */
const scopeBtn = {
  width: 80,
  height: 30,
  borderRadius: 5,
  background: "rgba(255,255,255,0.9)",
  border: "1px solid #E5E5EA",
  boxShadow: "0 4px 10px rgba(0,0,0,0.08)",
  backdropFilter: "blur(1.5px)",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: 6,
  padding: "0 8px",
  fontSize: 12,
  cursor: "pointer",
};
const scopeLabelEllipsis = {
  maxWidth: 48,
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
};
const scopePanel = {
  position: "absolute",
  zIndex: 20,
  width: 140,
  borderRadius: 5,
  background: "rgba(255,255,255,0.9)",
  boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
  backdropFilter: "blur(1.5px)",
  overflow: "hidden",
};
const scopeOpt = (active) => ({
  height: 34,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  borderBottom: "1px solid #EEE",
  fontSize: 12,
  color: active ? "#0080FF" : "#111",
  background: active ? "rgba(26,150,254,0.12)" : "#FFF",
  fontWeight: active ? 700 : 400,
});

/* ===== 인증 버튼 ===== */
const verifyBtn = {
  width: 68,
  height: 42,
  borderRadius: 5,
  background: "#1A96FE",
  color: "#FFF",
  border: "none",
  boxShadow: "0 4px 10px rgba(26,150,254,0.3)",
  fontSize: 12,
  fontWeight: 700,
  cursor: "pointer",
};

/* ===== 모달 ===== */
const modalOverlay = {
  position: "absolute",
  inset: 0,
  background: "rgba(0,0,0,0.07)",
  backdropFilter: "blur(5px)",
  zIndex: 30,
};
const modalBox = {
  position: "absolute",
  left: "50%",
  top: "45%",
  transform: "translate(-50%, -50%)",
  width: 280,
  borderRadius: 12,
  background: "#FFF",
  boxShadow: "0 10px 24px rgba(0,0,0,0.15)",
  padding: "18px 16px 14px",
  textAlign: "center",
  zIndex: 31,
};

const MyStudent = () => {
  /* ===== 공통 상태 ===== */
  const [view, setView] = useState("main"); // 'main' | 'edit' | 'pfWrite'
  const navigate = useNavigate();

  /* ===== 드롭다운 ===== */
  const [ddOpen, setDdOpen] = useState(false);
  const [selected, setSelected] = useState("포트폴리오 A");
  const frameRef = useRef(null);
  const triggerRef = useRef(null);
  const [ddPos, setDdPos] = useState({ top: 0, left: 0 });
  const placeDropdown = () => {
    if (!frameRef.current || !triggerRef.current) return;
    const fr = frameRef.current.getBoundingClientRect();
    const tr = triggerRef.current.getBoundingClientRect();
    setDdPos({ left: tr.left - fr.left, top: tr.bottom - fr.top + 8 });
  };
  useEffect(() => {
    if (ddOpen) {
      placeDropdown();
      window.addEventListener("resize", placeDropdown);
      window.addEventListener("scroll", placeDropdown, true);
      return () => {
        window.removeEventListener("resize", placeDropdown);
        window.removeEventListener("scroll", placeDropdown, true);
      };
    }
  }, [ddOpen]);

  /* ===== 포트폴리오 목록 ===== */
  const [projects, setProjects] = useState([
    { id: 1, title: "프로젝트A", period: "2025.08.01 - 2025.08.07" },
    { id: 2, title: "프로젝트B", period: "2025.08.01 - 2025.08.07" },
    { id: 3, title: "프로젝트C", period: "2025.08.01 - 2025.08.07" },
  ]);

  // 현재 편집 대상 (없으면 추가 모드)
  const [editing, setEditing] = useState(null);

  // 서버 목록 새로고침 (응답이 "정상 배열"일 때만 덮어쓰기)
  const refreshPortfolios = async () => {
    try {
      const res = await getPortfolios();
      const list = res?.data?.data;
      if (Array.isArray(list)) {
        setProjects(
          list.map((p) => ({
            id:
              p.id ??
              p.portfolioId ??
              p.portfolio_id ??
              String(p.id ?? p.portfolioId ?? Date.now()),
            serverId: p.id ?? p.portfolioId ?? p.portfolio_id ?? null, // ← API용 id
            title: p.title ?? "제목 없음",
            period:
              p.startDate && p.endDate
                ? `${p.startDate} - ${p.endDate}`
                : p.period ?? "기간 미정",
            award: p.award,
            process: p.process,
            output: p.output,
            growth: p.growth,
            scope: p.scope,
          }))
        );
      } // 배열이 아니면(에러/미연동) 현재 목록 유지
    } catch (e) {
      console.warn("refreshPortfolios failed", e);
      // 실패해도 현재 목록 유지
    }
  };

  useEffect(() => {
    refreshPortfolios();
    // getTemperature() 등은 필요해지면 여기에
  }, []);

  // ✅ 단건 삭제 (낙관적 업데이트 + 안전 재조회)
  const handleDeleteOne = async (item) => {
    // 화면에서 먼저 제거 (낙관적)
    setProjects((prev) => prev.filter((p) => p.id !== item.id));

    const targetId = item?.serverId ?? item?.id;
    try {
      if (targetId == null) throw new Error("No portfolio id");
      await deletePortfolio(targetId);
    } catch (e) {
      console.warn("deletePortfolio failed", e);
      // 실패 시: 사용자 경험상 롤백까진 하지 않고 토스트/알럿만 고려 가능
      // alert("삭제에 실패했습니다. 새로고침 후 다시 시도해주세요.");
    }

    // 서버 재조회 (정상 배열일 때만 목록 갱신 → 빈/에러면 현재 화면 유지)
    await refreshPortfolios();
  };

  /* ===== 편집: 공개 범위/인증 ===== */
  const [scope, setScope] = useState("전체 공개");
  const [scopeOpen, setScopeOpen] = useState(false);
  const scopeBtnRef = useRef(null);
  const [scopePos, setScopePos] = useState({ top: 0 });

  const [verified, setVerified] = useState(false);
  const [verifyModal, setVerifyModal] = useState(false);

  // === 이름 중앙 정렬 + 배지 위치 계산 ===
  const nameRef = useRef(null);
  const [nameW, setNameW] = useState(0);
  useEffect(() => {
    const measure = () => setNameW(nameRef.current?.offsetWidth || 0);
    measure();
    if (document.fonts?.ready) document.fonts.ready.then(measure);
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  return (
    <div style={containerStyle}>
      <div style={frameStyle} ref={frameRef}>
        <div style={statusBarStyle} />

        {/* 🔽 포트폴리오 작성/수정 오버레이 */}
        {view === "pfWrite" && (
          <PortfolioWriteOverlay
            initial={editing}
            onClose={() => {
              setView("main");
              setEditing(null);
            }}
            onDone={async (payload) => {
              try {
                if (editing?.id) {
                  // 수정
                  const { data: saved } = await updatePortfolio(
                    editing.serverId ?? editing.id,
                    payload
                  );
                  const merged = saved || payload;
                  setProjects((prev) =>
                    prev.map((p) =>
                      p.id === editing.id ? { ...p, ...merged } : p
                    )
                  );
                } else {
                  // 추가
                  const { data: created } = await addPortfolio(payload);
                  const newItem = created
                    ? {
                        id:
                          created.id ??
                          created.portfolioId ??
                          String(Date.now()),
                        serverId: created.id ?? created.portfolioId ?? null,
                        title: created.title,
                        period:
                          created.startDate && created.endDate
                            ? `${created.startDate} - ${created.endDate}`
                            : created.period ?? payload.period,
                        award: created.award,
                        process: created.process,
                        output: created.output,
                        growth: created.growth,
                        scope: created.scope,
                      }
                    : {
                        id: String(Date.now()),
                        serverId: null,
                        ...payload,
                      };
                  setProjects((prev) => [newItem, ...prev]);
                }
                setView("main");
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
                      setView("main");
                      setEditing(null);
                    }
                  }
                : undefined
            }
          />
        )}

        {/* 헤더: 메인에서만 로고 헤더, 편집에서는 심플 헤더 */}
        {view === "main" && (
          <div style={headerStyle}>
            <div style={logoWrapStyle}>
              <span style={logoTextStyle}>UniBiz</span>
              <img src={StarIconSrc} alt="star" style={starIconStyle} />
            </div>
          </div>
        )}
        {view === "edit" && (
          <div style={simpleHeaderStyle}>
            <img
              src={BackIconSrc}
              alt="back"
              style={backBtnStyle}
              onClick={() => setView("main")}
            />
            <div style={headerTitleStyle}>마이페이지</div>
          </div>
        )}

        {/* ===================== 메인 화면 ===================== */}
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

            {/* 프로필 행 */}
            <div
              style={{
                width: 320,
                display: "grid",
                gridTemplateColumns: "56px 1fr 110px",
                columnGap: 20,
                alignItems: "center",
                marginBottom: 16,
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
                  이름
                </div>
              </div>
              <div style={{ ...body12 }}>
                <div>생년월일(나이)</div>
                <div>학력(재학/휴학/졸업)</div>
                <div>전공</div>
                <div>온도</div>
              </div>
            </div>

            {/* 매칭 이력 */}
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
                      업체 A
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
                      업체 B
                    </div>
                    <div style={{ ...body12, color: "#777" }}>
                      2025.2.20 ~ 2025.6.30
                    </div>
                  </div>
                </div>
                <span style={matchStatus(false)}>매칭 완료</span>
              </div>
            </div>

            {/* 포트폴리오 + 추가 */}
            <div
              style={{
                width: 320,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                margin: "18px 0 8px",
              }}
            >
              <div style={title16}>포트폴리오</div>
              <button
                style={pillBtn}
                onClick={() => {
                  setEditing(null); // 추가 모드
                  setView("pfWrite");
                }}
              >
                추가
              </button>
            </div>

            {/* 드롭다운 트리거 */}
            <button
              ref={triggerRef}
              type="button"
              style={dropdownTrigger}
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => setDdOpen((v) => !v)}
            >
              <img
                src={DownBarSrc}
                alt="down"
                style={{
                  width: 10,
                  height: 10,
                  filter: "brightness(0) invert(1)",
                }}
              />
              포트폴리오 선택하기
            </button>

            {/* 리스트 */}
            <div style={pfListWrap}>
              {projects.map((p, idx) => (
                <div
                  key={p.id}
                  style={{
                    ...card,
                    height: 60,
                    padding: "8px 12px",
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    marginTop: idx === 0 ? 12 : 10,
                  }}
                >
                  <div
                    style={{
                      width: 44,
                      height: 44,
                      borderRadius: 8,
                      background: "#EEE",
                    }}
                  />
                  <div style={{ flex: 1 }}>
                    <div
                      style={{ fontSize: 13, fontWeight: 600, color: "#111" }}
                    >
                      {p.title}
                    </div>
                    <div style={{ ...body12, color: "#777" }}>
                      {p.period || "-"}
                    </div>
                  </div>
                  <button
                    style={tinyEditBtn}
                    onClick={() => {
                      setEditing(p);
                      setView("pfWrite");
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

        {/* 포트폴리오 드롭다운(플로팅) */}
        {view === "main" && ddOpen && (
          <>
            <div
              style={floatOverlay}
              onClick={() => setDdOpen(false)}
              aria-hidden="true"
            />
            <div
              style={{
                ...dropdownPanelFloat,
                top: ddPos.top,
                left: "50%",
                transform: "translateX(-50%)",
              }}
            >
              {["포트폴리오 A", "포트폴리오 B", "포트폴리오 C"].map(
                (opt, i, arr) => {
                  const active = selected === opt;
                  return (
                    <div
                      key={opt}
                      style={{
                        ...dropdownOption,
                        ...(active ? dropdownOptionActive : null),
                        borderBottom:
                          i === arr.length - 1
                            ? "none"
                            : dropdownOption.borderBottom,
                      }}
                      onClick={() => {
                        setSelected(opt);
                        setDdOpen(false);
                        navigate("/student/detail", {
                          state: { portfolio: opt },
                        });
                      }}
                    >
                      {opt}
                    </div>
                  );
                }
              )}
            </div>
          </>
        )}

        {/* ===================== 편집 화면 ===================== */}
        {view === "edit" && (
          <>
            <div style={editWrap}>
              {/* 아바타 */}
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

              {/* 이름 중앙 + 배지 오른쪽 */}
              <div style={nameRow}>
                <div
                  ref={nameRef}
                  style={{ fontSize: 16, fontWeight: 700, color: "#111" }}
                >
                  이름
                </div>
                <span
                  style={{
                    ...verifyChip(verified),
                    position: "absolute",
                    top: "50%",
                    transform: "translateY(-50%)",
                    left: "57%",
                    whiteSpace: "nowrap",
                  }}
                >
                  {verified ? (
                    <>
                      <img
                        src={DoneIconScr}
                        alt="done"
                        style={{ width: 14, height: 14 }}
                      />
                      학교인증완료
                    </>
                  ) : (
                    "학교인증 전"
                  )}
                </span>
              </div>

              {/* 공개 범위 버튼 (오른쪽 정렬) */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  marginBottom: 10,
                }}
              >
                <button
                  ref={scopeBtnRef}
                  type="button"
                  style={scopeBtn}
                  onClick={() => {
                    if (scopeBtnRef.current && frameRef.current) {
                      const fr = frameRef.current.getBoundingClientRect();
                      const br = scopeBtnRef.current.getBoundingClientRect();
                      setScopePos({ top: br.bottom - fr.top + 6 });
                    }
                    setScopeOpen((v) => !v);
                  }}
                >
                  <span style={scopeLabelEllipsis}>{scope}</span>
                  <img
                    src={DownBarSrc}
                    alt="down"
                    style={{
                      width: 10,
                      height: 10,
                      transform: scopeOpen ? "rotate(180deg)" : "none",
                    }}
                  />
                </button>
              </div>

              {/* 기본정보 (현재는 더미) */}
              <div style={sectionTitle}>기본정보</div>
              <div style={infoCard}>
                <div style={infoGrid}>
                  <div style={infoLabel}>생년월일(나이)</div>
                  <div style={infoValue}>2003.02.14</div>
                  <div style={infoLabel}>전화번호</div>
                  <div style={infoValue}>010-1234-5678</div>
                  <div style={infoLabel}>이메일</div>
                  <div style={infoValue}>1234@hufs.ac.kr</div>
                  <div style={infoLabel}>지역</div>
                  <div style={infoValue}>경기도 용인시</div>
                  <div style={infoLabel}>학력(재학/휴학/졸업)</div>
                  <div style={infoValue}>재학</div>
                  <div style={infoLabel}>학교</div>
                  <div style={infoValue}>한국외국어대학교</div>
                  <div style={infoLabel}>전공</div>
                  <div style={infoValue}>경영학</div>
                  <div style={infoLabel}>경력</div>
                  <div style={infoValue}>2년</div>
                  <div style={infoLabel}>온도</div>
                  <div style={infoValue}>38.5</div>
                </div>
              </div>

              {/* 간단한 자기소개 */}
              <div style={{ ...sectionTitle, marginTop: 16 }}>
                간단한 자기소개
              </div>
              <div style={{ ...infoCard, padding: "16px" }}>
                <div style={body12}>
                  안녕하세요. 저는 경영학을 전공하고 있는 이름입니다. 창의적이고
                  열정적인 자세로 일하며 커뮤니케이션에 자신이 있습니다.
                </div>
              </div>

              {/* 학교인증 */}
              <div style={{ ...sectionTitle, marginTop: 16 }}>학교인증</div>
              <div style={{ ...infoCard, padding: "16px" }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: 10,
                  }}
                >
                  <div style={body12}>학교 이메일</div>
                  <div style={body12}>1234567@hufs.ac.kr</div>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <div style={body12}>인증코드</div>
                  <button
                    style={verifyBtn}
                    onClick={() => setVerifyModal(true)}
                  >
                    인증
                  </button>
                </div>
              </div>

              <div style={{ height: 24 }} />
            </div>

            {/* 공개 범위 플로팅 패널 */}
            {scopeOpen && (
              <div
                style={{ position: "absolute", inset: 0, zIndex: 19 }}
                onClick={() => setScopeOpen(false)}
              >
                <div
                  style={{
                    ...scopePanel,
                    top: scopePos.top,
                    right: 38,
                    left: "auto",
                    transform: "none",
                  }}
                  onClick={(e) => e.stopPropagation()}
                >
                  {["전체 공개", "나만 보기"].map((opt, i) => (
                    <div
                      key={opt}
                      style={{
                        ...scopeOpt(scope === opt),
                        borderBottom: i === 1 ? "none" : "1px solid #EEE",
                      }}
                      onClick={() => {
                        setScope(opt);
                        setScopeOpen(false);
                      }}
                    >
                      {opt}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 인증 완료 모달 */}
            {verifyModal && (
              <>
                <div
                  style={modalOverlay}
                  onClick={() => setVerifyModal(false)}
                />
                <div style={modalBox}>
                  <img
                    src={DoneIconScr}
                    alt="done"
                    style={{ width: 36, height: 36, marginBottom: 10 }}
                  />
                  <div
                    style={{ fontSize: 16, fontWeight: 700, marginBottom: 10 }}
                  >
                    인증이 완료되었습니다!
                  </div>
                  <button
                    style={{
                      width: 160,
                      height: 42,
                      borderRadius: 8,
                      background: "#1A96FE",
                      color: "#FFF",
                      fontWeight: 700,
                      border: "none",
                      boxShadow: "0 4px 10px rgba(0,128,255,0.25)",
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      setVerifyModal(false);
                      setVerified(true);
                    }}
                  >
                    확인
                  </button>
                </div>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};

// ===== 포트폴리오 작성/수정 오버레이 =====
function PortfolioWriteOverlay({ onClose, onDone, initial, onDelete }) {
  const [title, setTitle] = useState("");
  const [period, setPeriod] = useState("2024.02.14 ~ 2024.03.20");
  const [award, setAward] = useState("");
  const [process, setProcess] = useState("");
  const [output, setOutput] = useState("");
  const [growth, setGrowth] = useState("");

  // 공개여부 드롭다운
  const [scope, setScope] = useState("전체 공개");
  const [scopeOpen, setScopeOpen] = useState(false);
  const scopeBtnRef = useRef(null);
  const overlayRef = useRef(null);
  const [panelTop, setPanelTop] = useState(0);

  useEffect(() => {
    if (initial) {
      setTitle(initial.title || "");
      setPeriod(initial.period || "");
      setAward(initial.award || "");
      setProcess(initial.process || "");
      setOutput(initial.output || "");
      setGrowth(initial.growth || "");
      setScope(initial.scope || "전체 공개");
    } else {
      setTitle("");
      setPeriod("2024.02.14 ~ 2024.03.20");
      setAward("");
      setProcess("");
      setOutput("");
      setGrowth("");
      setScope("전체 공개");
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

  // ====== 이 컴포넌트 전용 스타일 ======
  const overlay = {
    position: "absolute",
    inset: 0,
    background: "#FFF",
    zIndex: 20,
  };
  const header = {
    position: "absolute",
    top: 44,
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
    fontFamily: "Pretendard, system-ui, -apple-system",
    fontSize: 18,
    fontWeight: 700,
    letterSpacing: "-0.3px",
    color: "#111",
  };
  const editBtn = {
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
  };
  const deleteBtn = { ...editBtn, right: 86 };
  const scroll = {
    position: "absolute",
    top: 44 + 49,
    bottom: 80,
    left: 0,
    right: 0,
    overflowY: "auto",
    padding: "14px 16px 24px 16px",
    boxSizing: "border-box",
    background: "#FFF",
  };
  const label = {
    fontFamily: "Pretendard, system-ui, -apple-system",
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
  };
  const inlineEdit = {
    fontSize: 12,
    fontWeight: 600,
    color: "#111",
    padding: "6px 10px",
    border: "1px solid #E5E5EA",
    borderRadius: 8,
    background: "#FFF",
    cursor: "pointer",
  };
  const imgBox = {
    width: "100%",
    height: 120,
    borderRadius: 12,
    border: "1px solid #E5E5EA",
    background: "#FFF",
    boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#0080FF",
    fontSize: 13,
    cursor: "pointer",
  };
  const scopeRow = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 12,
  };
  const scopeBtnLocal = {
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
      {/* 헤더 */}
      <div style={header}>
        <img src={BackIconSrc} alt="뒤로가기" style={back} onClick={onClose} />
        <div style={titleH}>포트폴리오</div>

        {/* 편집일 때만 삭제 버튼 노출 */}
        {initial?.id && (
          <button type="button" style={deleteBtn} onClick={onDelete}>
            삭제
          </button>
        )}
        {/* (기존) 수정 버튼은 그대로 유지 */}
        <button type="button" style={editBtn} onClick={() => {}}>
          수정
        </button>
      </div>

      {/* 폼 스크롤 영역 */}
      <div style={scroll}>
        <div style={label}>포트폴리오 제목</div>
        <input
          style={input}
          placeholder="제목을 입력하세요"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <div style={label}>포트폴리오 이미지</div>
        <div style={imgBox} onClick={() => {}}>
          이미지 첨부하기
        </div>

        <div style={{ ...rowBetween, marginTop: 12 }}>
          <div style={label}>진행기간</div>
          <button type="button" style={inlineEdit} onClick={() => {}}>
            수정
          </button>
        </div>
        <input
          style={input}
          value={period}
          onChange={(e) => setPeriod(e.target.value)}
        />

        <div style={label}>수상여부</div>
        <input
          style={input}
          placeholder="예: 교내 대회 장려상"
          value={award}
          onChange={(e) => setAward(e.target.value)}
        />

        <div style={label}>진행한 일과 진행과정</div>
        <textarea
          style={textarea}
          placeholder="어떤 역할을 맡았고, 어떻게 진행했는지 적어주세요."
          value={process}
          onChange={(e) => setProcess(e.target.value)}
        />

        <div style={label}>결과물</div>
        <input
          style={input}
          placeholder="예: 인스타 릴스 10편, 랜딩페이지, 보고서 등"
          value={output}
          onChange={(e) => setOutput(e.target.value)}
        />

        <div style={label}>성장한 점 또는 느낀점</div>
        <textarea
          style={textarea}
          placeholder="프로젝트를 통해 배운 점/느낀 점을 적어주세요."
          value={growth}
          onChange={(e) => setGrowth(e.target.value)}
        />

        {/* 공개여부 */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginTop: 12,
          }}
        >
          <div style={label}>공개여부</div>
          <button
            ref={scopeBtnRef}
            type="button"
            style={scopeBtnLocal}
            onClick={openScope}
          >
            <span
              style={{
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              공개 범위 설정
            </span>
            <span style={caret} />
          </button>
        </div>

        <div style={{ height: 24 }} />
      </div>

      {/* 공개여부 패널 */}
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

      {/* 하단 CTA */}
      <div style={ctaWrap}>
        <button
          type="button"
          style={ctaBtn}
          onClick={() =>
            onDone?.({
              title,
              period,
              award,
              process,
              output,
              growth,
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

export default MyStudent;
