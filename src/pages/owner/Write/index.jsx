import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import BackIconSrc from "../../../assets/Back.svg";

const STATUS_H = 44;
const HEADER_H = 49;
const SIDE_GAP = 16;
const CTA_H = 80; // 하단 완료 영역 여유

const BACK_PATH = "/owner/dash";
const DONE_PATH = "/owner/dash";

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
  left: 0,
  right: 0,
  height: HEADER_H,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  borderBottom: "1px solid #EEE",
  background: "#FFF",
  zIndex: 3,
};
const backBtnStyle = {
  position: "absolute",
  left: SIDE_GAP,
  top: "50%",
  transform: "translateY(-50%)",
  width: 28,
  height: 28,
  cursor: "pointer",
};
const headerTitleStyle = {
  fontFamily: "Pretendard, system-ui, -apple-system",
  fontSize: 18,
  fontWeight: 700,
  letterSpacing: "-0.3px",
  color: "#111",
};
const headerEditStyle = {
  position: "absolute",
  right: SIDE_GAP,
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

/* ===== 스크롤 컨텐츠 영역 ===== */
const scrollWrapStyle = {
  position: "absolute",
  top: STATUS_H + HEADER_H,
  bottom: CTA_H, // 하단 버튼 공간 확보
  left: 0,
  right: 0,
  overflowY: "auto",
  padding: "14px 16px 24px 16px",
  boxSizing: "border-box",
  background: "#FFF",
};

/* ===== 필드 공통 ===== */
const labelStyle = {
  fontFamily: "Pretendard, system-ui, -apple-system",
  fontSize: 13,
  color: "#767676",
  margin: "10px 0 6px",
};

const inputStyle = {
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

const textareaStyle = {
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

/* 이미지 업로드 박스 */
const imgBoxStyle = {
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

/* 라벨 + 수정 버튼 행 */
const rowBetweenStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
};
const inlineEditBtn = {
  fontSize: 12,
  fontWeight: 600,
  color: "#111",
  padding: "6px 10px",
  border: "1px solid #E5E5EA",
  borderRadius: 8,
  background: "#FFF",
  cursor: "pointer",
};

/* ===== 하단 완료 버튼 ===== */
const ctaWrapStyle = {
  position: "absolute",
  left: 0,
  right: 0,
  bottom: 24,
  display: "flex",
  justifyContent: "center",
};
const ctaBtnStyle = {
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

// [API] 학생 대시보드에 뜨는 '소상공인 구인 글' 등록용
const API_BASE =
  process.env.REACT_APP_API_BASE_URL || "https://unibiz.lion.it.kr";
const BUSINESS_CREATE_PATH = "/dashboard/business";

// 현재 작성 폼 값으로 POST (학생 대시보드가 읽는 구조에 맞춰 필드 매핑)
async function submitOwnerPosting({
  title,
  storeName,
  category,
  from,
  to,
  status,
}) {
  const body = {
    title: title?.trim?.() || "",
    school: (storeName || "").trim(), // 학생 대시보드 store 라인 표시에 사용됨
    category: category || "기타",
    availableFrom: from || null, // YYYY-MM-DD
    availableTo: to || null, // YYYY-MM-DD
    status: status || "모집중",
  };

  const res = await fetch(`${API_BASE}${BUSINESS_CREATE_PATH}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error(`등록 실패 (HTTP ${res.status})`);
  return res.json().catch(() => ({}));
}

// 문자열 "YYYY.MM.DD ~ YYYY.MM.DD" → { from: "YYYY-MM-DD", to: "YYYY-MM-DD" }
function extractDatesFromPeriod(periodStr) {
  if (!periodStr) return { from: null, to: null };
  // 양쪽 공백 제거 및 구분자 통일
  const cleaned = String(periodStr).replace(/\s+/g, " ").trim();
  // 첫 번째 날짜 ~ 두 번째 날짜 패턴 추출
  const m = cleaned.match(
    /(\d{4}[.\-\/]\d{2}[.\-\/]\d{2})\s*[~\-–]\s*(\d{4}[.\-\/]\d{2}[.\-\/]\d{2})/
  );
  if (!m) return { from: null, to: null };
  const toISO = (s) => s.replace(/[.\/]/g, "-");
  return { from: toISO(m[1]), to: toISO(m[2]) };
}

/* ===== 페이지 ===== */
export default function WriteOwner() {
  const navigate = useNavigate();

  // (선택) 간단한 상태 — 입력 가능하도록만
  const [title, setTitle] = useState("");
  const [recruitPeriod, setRecruitPeriod] = useState("2024.02.14 ~ 2024.03.20");
  const [runPeriod, setRunPeriod] = useState("2024.03.21 ~ 2024.04.04");
  const [price, setPrice] = useState("");

  const [overview, setOverview] = useState("");
  const [expected, setExpected] = useState("");
  const [details, setDetails] = useState("");

  return (
    <div style={containerStyle}>
      <div style={frameStyle}>
        <div style={statusBarStyle} />

        {/* 헤더 */}
        <div style={headerStyle}>
          <img
            src={BackIconSrc}
            alt="뒤로가기"
            style={backBtnStyle}
            onClick={() => {
              if (BACK_PATH) navigate(BACK_PATH);
            }}
          />
          <div style={headerTitleStyle}>구인 글쓰기</div>
          <button
            type="button"
            style={headerEditStyle}
            onClick={() => {
              /* 클릭만 가능 */
            }}
          >
            수정
          </button>
        </div>

        {/* 스크롤 가능 폼 영역 */}
        <div style={scrollWrapStyle}>
          {/* 글 제목 */}
          <div style={labelStyle}>글 제목</div>
          <input
            style={inputStyle}
            placeholder="제목을 입력하세요"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          {/* 업로드 할 이미지 */}
          <div style={labelStyle}>업로드 할 이미지</div>
          <div
            style={imgBoxStyle}
            onClick={() => {
              /* 업로드 동작은 추후 연동 */
            }}
          >
            이미지 첨부하기
          </div>

          {/* 모집기간 */}
          <div style={{ ...rowBetweenStyle, marginTop: 12 }}>
            <div style={labelStyle}>모집기간</div>
            <button
              type="button"
              style={inlineEditBtn}
              onClick={() => {
                /* 클릭만 가능 */
              }}
            >
              수정
            </button>
          </div>
          <input
            style={inputStyle}
            value={recruitPeriod}
            onChange={(e) => setRecruitPeriod(e.target.value)}
          />

          {/* 진행기간 */}
          <div style={{ ...rowBetweenStyle, marginTop: 12 }}>
            <div style={labelStyle}>진행기간</div>
            <button
              type="button"
              style={inlineEditBtn}
              onClick={() => {
                /* 클릭만 가능 */
              }}
            >
              수정
            </button>
          </div>
          <input
            style={inputStyle}
            value={runPeriod}
            onChange={(e) => setRunPeriod(e.target.value)}
          />

          {/* 가격 */}
          <div style={labelStyle}>가격</div>
          <input
            style={inputStyle}
            placeholder="예: 50,000"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />

          {/* 프로젝트 개요 및 내용 */}
          <div style={labelStyle}>프로젝트 개요 및 내용</div>
          <textarea
            style={textareaStyle}
            placeholder="프로젝트의 목적과 개요, 배경 등을 적어주세요."
            value={overview}
            onChange={(e) => setOverview(e.target.value)}
          />

          {/* 기대 결과물 */}
          <div style={labelStyle}>기대 결과물</div>
          <textarea
            style={textareaStyle}
            placeholder="산출물 형태, 성과 지표 등을 적어주세요."
            value={expected}
            onChange={(e) => setExpected(e.target.value)}
          />

          {/* 세부 업무 및 요구사항 */}
          <div style={labelStyle}>세부 업무 및 요구사항</div>
          <textarea
            style={textareaStyle}
            placeholder="업무 범위, 필요 역량/툴, 근무 형태 등을 적어주세요."
            value={details}
            onChange={(e) => setDetails(e.target.value)}
          />

          {/* 폼 하단 여유 (스크롤 마지막에서도 버튼 가리지 않게) */}
          <div style={{ height: 24 }} />
        </div>

        {/* 하단 완료 버튼 */}
        <div style={ctaWrapStyle}>
          <button
            type="button"
            style={ctaBtnStyle}
            onClick={async () => {
              // === [API] 연동: 진행기간(runPeriod)을 기간으로 사용 ===
              const { from, to } = extractDatesFromPeriod(runPeriod);

              try {
                await submitOwnerPosting({
                  title,
                  storeName: "", // UI에 별도 입력 없음 → 공란 전송(학생쪽은 기본 라벨로 표시)
                  category: "기타", // UI에 카테고리 입력 없음 → 기본값
                  from, // YYYY-MM-DD or null
                  to, // YYYY-MM-DD or null
                  status: "모집중",
                });
              } catch (e) {
                // 실패해도 기존 이동 로직은 유지하고 싶다면 주석 처리 제거 가능
                console.error(e);
                alert("등록 중 오류가 발생했습니다.");
                return;
              }

              if (DONE_PATH)
                navigate(DONE_PATH, {
                  state: {
                    title,
                    recruitPeriod,
                    runPeriod,
                    price,
                    overview,
                    expected,
                    details,
                  },
                });
            }}
          >
            완료
          </button>
        </div>
      </div>
    </div>
  );
}
