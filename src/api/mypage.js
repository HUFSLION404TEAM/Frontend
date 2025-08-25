// src/api/mypage.js
import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL || "https://unibiz.lion.it.kr",
  withCredentials: true,
});

function authHeaders() {
  const token =
    localStorage.getItem("accessToken") || localStorage.getItem("token") || "";
  return {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
}

// boolean 문자열/숫자도 안전하게 변환
function toBool(v) {
  if (typeof v === "boolean") return v;
  if (typeof v === "number") return v !== 0;
  if (typeof v === "string")
    return ["true", "1", "on", "yes", "y"].includes(v.toLowerCase());
  return false;
}

// 공통 언랩
function unwrap(resp) {
  const d = resp?.data;
  return d?.data ?? d ?? null;
}

/** 학생 마이페이지: GET /api/student/mypage */
export async function getStudentMypage() {
  const resp = await api.get("/api/student/mypage", { headers: authHeaders() });
  return unwrap(resp);
}

/** 온도 조회 */
export async function getTemperature() {
  const mp = await getStudentMypage();
  return mp?.temperature ?? mp?.temp ?? null;
}

/** 포트폴리오 목록 */
export async function getPortfolios() {
  const mp = await getStudentMypage();
  const list =
    (Array.isArray(mp?.portfolios) && mp.portfolios) ||
    (Array.isArray(mp?.data?.portfolios) && mp.data.portfolios) ||
    [];
  return list;
}

/**
 * 포트폴리오 생성: POST /api/portfolio/
 * - 스웨거 명세: 텍스트/불리언은 (query), 이미지 배열은 multipart/form-data (body)
 * - 이 함수는 FormData/Plain Object 둘 다 허용:
 *    - FormData가 들어오면: 폼값을 query에도 붙여주고(body는 그대로: 이미지/텍스트 포함)
 *    - Object가 들어오면: query는 텍스트/불리언, body는 이미지들만 FormData로 전송
 */
export async function addPortfolio(formOrPayload) {
  const token =
    localStorage.getItem("accessToken") || localStorage.getItem("token") || "";
  const headers = token ? { Authorization: `Bearer ${token}` } : {};
  // Content-Type은 명시하지 않음(브라우저가 boundary 포함해서 설정)

  let data; // multipart body
  let params; // query string

  const buildParams = (src) => ({
    title: src.title ?? src.get?.("title") ?? "",
    progressPeriod:
      src.progressPeriod ??
      src.progress_period ??
      src.get?.("progressPeriod") ??
      "",
    prize: toBool(src.prize ?? src.get?.("prize")),
    workDoneProgress:
      src.workDoneProgress ??
      src.process ??
      src.get?.("workDoneProgress") ??
      "",
    result: src.result ?? src.get?.("result") ?? "",
    felt: src.felt ?? src.growth ?? src.get?.("felt") ?? "",
    isPrivate: toBool(src.isPrivate ?? src.get?.("isPrivate")),
    // 선택 필드(명세에 없으면 무시됨): award
    award: src.award ?? src.get?.("award") ?? "",
  });

  if (typeof FormData !== "undefined" && formOrPayload instanceof FormData) {
    // FormData로 들어온 경우: body는 그대로, query도 붙여서 양쪽 모두 지원
    const fd = formOrPayload;

    // FormData에서 값 읽기 위해 get 메서드를 흉내내는 래퍼
    const src = {
      get: (k) => fd.get(k),
    };
    params = buildParams(src);

    data = fd; // 그대로 전송(이미지 + 텍스트 포함되어 있어도 OK)
  } else {
    // Plain object로 들어온 경우: 이미지는 body(FormData), 텍스트/불리언은 query
    const src = formOrPayload || {};
    params = buildParams(src);

    const files = Array.isArray(src.images) ? src.images : [];
    const fd = new FormData();
    files.forEach((file) => {
      if (file) fd.append("images", file, file.name);
    });
    data = fd;
  }

  const resp = await api.post("/api/portfolio/", data, { headers, params });
  return resp?.data?.data ?? resp?.data ?? null;
}

/* ================== 업체(비즈니스) API: /api/store ================== */

// 목록: GET /api/store
export async function getBusinesses() {
  const resp = await api.get("/api/store", { headers: authHeaders() });
  const d = resp?.data?.data ?? resp?.data ?? null;
  return Array.isArray(d) ? d : d?.items || d?.content || [];
}

// 단건: GET /api/store/{businessNumber}
export async function getBusiness(businessNumber) {
  const resp = await api.get(
    `/api/store/${encodeURIComponent(businessNumber)}`,
    { headers: authHeaders() }
  );
  return resp?.data?.data ?? resp?.data ?? null;
}

// 생성: POST /api/store/create
export async function addBusiness(payload) {
  const resp = await api.post("/api/store/create", payload, {
    headers: authHeaders(),
  });
  return resp?.data?.data ?? resp?.data ?? null;
}

// 수정: PUT /api/store/{businessNumber}
export async function updateBusiness(businessNumber, payload) {
  const resp = await api.put(
    `/api/store/${encodeURIComponent(businessNumber)}`,
    payload,
    { headers: authHeaders() }
  );
  return resp?.data?.data ?? resp?.data ?? null;
}

// 삭제: DELETE /api/store/{businessNumber}
export async function deleteBusiness(businessNumber) {
  await api.delete(`/api/store/${encodeURIComponent(businessNumber)}`, {
    headers: authHeaders(),
  });
  return true;
}

// (옵션) 마이페이지: GET /api/store/mypage
export async function getBusinessMypage() {
  const resp = await api.get("/api/store/mypage", { headers: authHeaders() });
  return resp?.data?.data ?? resp?.data ?? null;
}

// (옵션) 학생용 프로필: GET /api/store/profile/{businessNumber}
export async function getStoreProfile(businessNumber) {
  const resp = await api.get(
    `/api/store/profile/${encodeURIComponent(businessNumber)}`,
    { headers: authHeaders() }
  );
  return resp?.data?.data ?? resp?.data ?? null;
}
