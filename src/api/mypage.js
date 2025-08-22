import axios from "axios";
// src/api/mypage.js

const api = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL || "https://unibiz.lion.it.kr",
  withCredentials: true, // 쿠키/세션 쓰는 경우 유지
});
const BASE =
  process.env.REACT_APP_API_BASE_URL ||
  (typeof import.meta !== "undefined"
    ? import.meta.env?.VITE_API_BASE_URL
    : "") ||
  "";

function authHeaders() {
  const token =
    localStorage.getItem("accessToken") || localStorage.getItem("token") || "";
  return {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
}

function unwrap(json) {
  // 서버가 {success, data} 래핑을 쓰는 경우/안 쓰는 경우 모두 처리
  return json?.data ?? json;
}

/** 온도 조회: GET /mypage/temperature */
export async function getTemperature() {
  const res = await fetch(`${BASE}/mypage/temperature`, {
    method: "GET",
    headers: authHeaders(),
    credentials: "include",
  });
  const data = unwrap(await res.json());
  return data?.temperature ?? data?.temp ?? null;
}

/** (선택) 포트폴리오 목록: GET /mypage/portfolios
 *  명세에 없을 수 있어서 실패해도 조용히 무시하도록 처리
 */
export async function getPortfolios() {
  try {
    const res = await fetch(`${BASE}/mypage/portfolios`, {
      method: "GET",
      headers: authHeaders(),
      credentials: "include",
    });
    if (!res.ok) throw new Error("no list endpoint");
    const data = unwrap(await res.json());
    const arr = Array.isArray(data) ? data : data?.items ?? [];
    return arr;
  } catch {
    return null; // 엔드포인트 없으면 초기 더미 유지
  }
}

/** 포트폴리오 추가: POST /mypage/portfolios */
export async function addPortfolio(payload) {
  const res = await fetch(`${BASE}/mypage/portfolios`, {
    method: "POST",
    headers: authHeaders(),
    credentials: "include",
    body: JSON.stringify(payload),
  });
  const data = unwrap(await res.json());
  return data; // 서버가 새 id를 주면 여기서 반환됨
}

/** 포트폴리오 수정: PUT /mypage/portfolios/{id} */
export async function updatePortfolio(id, payload) {
  const res = await fetch(`${BASE}/mypage/portfolios/${id}`, {
    method: "PUT",
    headers: authHeaders(),
    credentials: "include",
    body: JSON.stringify(payload),
  });
  const data = unwrap(await res.json());
  return data;
}

/** 포트폴리오 삭제: DELETE /mypage/portfolios/{id} */
export async function deletePortfolio(id) {
  const res = await fetch(`${BASE}/mypage/portfolios/${id}`, {
    method: "DELETE",
    headers: authHeaders(),
    credentials: "include",
  });
  if (!res.ok) throw new Error("delete failed");
}

/** 포트폴리오 공개여부 변경: PUT /mypage/portfolios/{id}/visibility */
export async function updatePortfolioVisibility(id, visibility) {
  const res = await fetch(`${BASE}/mypage/portfolios/${id}/visibility`, {
    method: "PUT",
    headers: authHeaders(),
    credentials: "include",
    body: JSON.stringify({ visibility }), // "PUBLIC" | "PRIVATE"
  });
  const data = unwrap(await res.json());
  return data;
}

export async function getPortfolio(id) {
  try {
    const res = await fetch(`${BASE}/mypage/portfolios/${id}`, {
      method: "GET",
      headers: authHeaders(),
      credentials: "include",
    });
    if (!res.ok) throw new Error("no detail");
    const data = unwrap(await res.json());
    return data;
  } catch {
    return null;
  }
}
// === 소상공인 (마이페이지 - 가게) ===
// GET /mypage/business (목록이 없다면 백엔드에서 제공되는 조회 엔드포인트로 바꿔주세요)
export const getBusinesses = () => api.get("/mypage/business");

// POST /mypage/business
export const addBusiness = (payload) => api.post("/mypage/business", payload);

// PUT /mypage/business/{businessId}
export const updateBusiness = (businessId, payload) =>
  api.put(`/mypage/business/${businessId}`, payload);

// DELETE /mypage/business/{businessId}
export const deleteBusiness = (businessId) =>
  api.delete(`/mypage/business/${businessId}`);

// PUT /mypage/business/{businessId}/visibility
export const updateBusinessVisibility = (businessId, payload) =>
  api.put(`/mypage/business/${businessId}/visibility`, payload);
