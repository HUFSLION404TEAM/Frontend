// src/pages/owner/Write/index.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import BackIconSrc from "../../../assets/Back.svg";
import axiosInstance from "../../common/Auth/axios";

const STATUS_H = 44;
const HEADER_H = 49;
const SIDE_GAP = 16;
const CTA_H = 80;

const BACK_PATH = "/owner/dash";
const DONE_PATH = "/owner/dash";

/* ===== UI 스타일 ===== */
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
const scrollWrapStyle = {
  position: "absolute",
  top: STATUS_H + HEADER_H,
  bottom: CTA_H,
  left: 0,
  right: 0,
  overflowY: "auto",
  padding: "14px 16px 24px 16px",
  boxSizing: "border-box",
  background: "#FFF",
};
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

/* ===== 값 정규화 ===== */
function formatBizNo(raw) {
  const d = String(raw || "").replace(/\D/g, "");
  return d.length === 10 ? `${d.slice(0, 3)}-${d.slice(3, 5)}-${d.slice(5)}` : raw;
}
function normalizePrice(raw) {
  return String(raw || "").replace(/[^\d]/g, "");
}
function normalizePeriod(raw) {
  return String(raw || "").replace(/\s*/g, "").replace(/–|—|-/g, "~");
}

/* ===== 페이지 ===== */
export default function WriteOwner() {
  const navigate = useNavigate();

  // 상태 (images를 명시적으로 빈 배열로 초기화)
  const [businessNumber, setBusinessNumber] = useState("");
  const [title, setTitle] = useState("");
  const [recruitPeriod, setRecruitPeriod] = useState("2024.02.14 ~ 2024.03.20");
  const [runPeriod, setRunPeriod] = useState("2024.03.21 ~ 2024.04.04");
  const [price, setPrice] = useState("");
  const [overview, setOverview] = useState("");
  const [expected, setExpected] = useState("");
  const [details, setDetails] = useState("");
  const [images, setImages] = useState([]); // ✅ 반드시 빈 배열로 초기화

  // ✅ 이미지 선택 함수 (디버깅 포함)
  const onPickImages = () => {
    const el = document.createElement("input");
    el.type = "file";
    el.accept = "image/*";
    el.multiple = true;
    el.onchange = (e) => {
      console.log("=== 파일 선택 이벤트 ===");
      console.log("e.target.files:", e.target.files);
      console.log("파일 개수:", e.target.files?.length || 0);
      
      const files = Array.from(e.target.files || []);
      console.log("Array.from 결과:", files);
      
      files.forEach((file, index) => {
        console.log(`파일 ${index + 1}:`, {
          name: file.name,
          size: file.size,
          type: file.type,
          isFile: file instanceof File
        });
      });
      
      setImages(files); // File[] 배열로 설정
      console.log("setImages 호출 완료");
    };
    el.click();
  };

  // ✅ API 스펙에 맞춘 submitRecruitPosting 함수
  async function submitRecruitPosting() {
    console.log("=== 제출 시작 ===");
    console.log("현재 images 상태:", images);
    
    if (!businessNumber.trim()) {
      alert("사업자번호를 입력해 주세요.");
      return;
    }
    if (!title.trim()) {
      alert("제목을 입력해 주세요.");
      return;
    }
    if (!recruitPeriod.trim() || !runPeriod.trim()) {
      alert("모집기간과 진행기간을 입력해 주세요.");
      return;
    }

    const bn = formatBizNo(businessNumber);
    const rp = normalizePeriod(recruitPeriod);
    const pp = normalizePeriod(runPeriod);
    const pr = normalizePrice(price);

    // ✅ API 스펙에 맞춰 query 파라미터 구성
    const queryParams = new URLSearchParams({
      businessNumber: bn,
      title: title.trim(),
      recruitmentPeriod: rp,
      progressPeriod: pp,
      price: pr,
      projectOutline: (overview || "").trim(),
      expectedResults: (expected || "").trim(),
      detailRequirement: (details || "").trim(),
    });

    // ✅ FormData는 이미지만 포함
    const form = new FormData();
    
    console.log("=== 이미지 처리 ===");
    if (Array.isArray(images) && images.length > 0) {
      console.log(`이미지 있음. 길이: ${images.length}`);
      images.forEach((file, index) => {
        if (file && file instanceof File) {
          form.append("images", file);
          console.log(`✓ 파일 ${index + 1} 추가:`, file.name);
        }
      });
    } else {
      console.log("이미지 없음");
      // 이미지가 없어도 빈 FormData를 전송
    }

    // ✅ API 스펙에 맞춰 전송: query params + FormData body
    const url = `/api/recruit/?${queryParams.toString()}`;
    console.log("요청 URL:", url);
    console.log("FormData 이미지 개수:", Array.from(form.entries()).length);

    return axiosInstance.post(url, form, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  }

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
            onClick={() => BACK_PATH && navigate(BACK_PATH)}
          />
          <div style={headerTitleStyle}>구인 글쓰기</div>
          <button
            type="button"
            style={headerEditStyle}
            onClick={() => {
              /* 필요하면 연결 */
            }}
          >
            수정
          </button>
        </div>

        {/* 폼 */}
        <div style={scrollWrapStyle}>
          <div style={labelStyle}>사업자번호</div>
          <input
            style={inputStyle}
            placeholder="예: 123-45-67890"
            value={businessNumber}
            onChange={(e) => setBusinessNumber(e.target.value)}
          />

          <div style={labelStyle}>글 제목</div>
          <input
            style={inputStyle}
            placeholder="제목을 입력하세요"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <div style={labelStyle}>업로드 할 이미지</div>
          <div style={imgBoxStyle} onClick={onPickImages}>
            {Array.isArray(images) && images.length > 0
              ? `선택된 이미지 ${images.length}개`
              : "이미지 첨부하기"}
          </div>

          <div style={{ ...rowBetweenStyle, marginTop: 12 }}>
            <div style={labelStyle}>모집기간</div>
            <button type="button" style={inlineEditBtn} onClick={() => {}}>
              수정
            </button>
          </div>
          <input
            style={inputStyle}
            value={recruitPeriod}
            onChange={(e) => setRecruitPeriod(e.target.value)}
            placeholder="YYYY.MM.DD ~ YYYY.MM.DD"
          />

          <div style={{ ...rowBetweenStyle, marginTop: 12 }}>
            <div style={labelStyle}>진행기간</div>
            <button type="button" style={inlineEditBtn} onClick={() => {}}>
              수정
            </button>
          </div>
          <input
            style={inputStyle}
            value={runPeriod}
            onChange={(e) => setRunPeriod(e.target.value)}
            placeholder="YYYY.MM.DD ~ YYYY.MM.DD"
          />

          <div style={labelStyle}>가격</div>
          <input
            style={inputStyle}
            placeholder="예: 50,000"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />

          <div style={labelStyle}>프로젝트 개요 및 내용</div>
          <textarea
            style={textareaStyle}
            placeholder="프로젝트의 목적과 개요, 배경 등을 적어주세요."
            value={overview}
            onChange={(e) => setOverview(e.target.value)}
          />

          <div style={labelStyle}>기대 결과물</div>
          <textarea
            style={textareaStyle}
            placeholder="산출물 형태, 성과 지표 등을 적어주세요."
            value={expected}
            onChange={(e) => setExpected(e.target.value)}
          />

          <div style={labelStyle}>세부 업무 및 요구사항</div>
          <textarea
            style={textareaStyle}
            placeholder="업무 범위, 필요 역량/툴, 근무 형태 등을 적어주세요."
            value={details}
            onChange={(e) => setDetails(e.target.value)}
          />

          <div style={{ height: 24 }} />
        </div>

        {/* 하단 완료 버튼 */}
        <div style={ctaWrapStyle}>
          <button
            type="button"
            style={ctaBtnStyle}
            onClick={async () => {
              try {
                console.log("=== 전송 시작 ===");
                const res = await submitRecruitPosting();
                console.log("=== 전송 성공 ===", res);
                
                const data = res?.data;
                if (data?.success === false) {
                  alert(data?.message || "등록에 실패했습니다.");
                  return;
                }
                
                // 성공 시 다음 페이지로 이동
                DONE_PATH &&
                  navigate(DONE_PATH, {
                    state: {
                      businessNumber,
                      title,
                      recruitPeriod,
                      runPeriod,
                      price,
                      overview,
                      expected,
                      details,
                      imagesCount: Array.isArray(images) ? images.length : 0,
                    },
                  });
              } catch (err) {
                console.error("=== 전송 실패 ===");
                console.error("전체 에러 객체:", err);
                console.error("HTTP 상태:", err.response?.status);
                console.error("응답 헤더:", err.response?.headers);
                console.error("응답 데이터:", err.response?.data);
                console.error("에러 메시지:", err.message);
                
                // 더 자세한 에러 정보 표시
                if (err.response?.status === 500) {
                  console.error("500 에러 - 서버 내부 오류");
                  if (err.response?.data) {
                    alert(`서버 에러: ${JSON.stringify(err.response.data)}`);
                  } else {
                    alert("서버 내부 오류가 발생했습니다. 관리자에게 문의해주세요.");
                  }
                } else if (err.response?.status === 413) {
                  alert("파일 크기가 너무 큽니다. 더 작은 파일을 선택해주세요.");
                } else if (err.response?.status === 400) {
                  alert(`입력 데이터 오류: ${err.response?.data?.message || "입력 형식을 확인해주세요."}`);
                } else {
                  alert(err.response?.data?.message || `네트워크 오류 (${err.response?.status || "알 수 없음"})`);
                }
                return;
              }
            }}
          >
            완료
          </button>
        </div>
      </div>
    </div>
  );
}