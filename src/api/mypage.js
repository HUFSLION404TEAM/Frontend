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

// 공통 언랩
function unwrap(resp) {
  // axios 응답: { data: ... } -> 서버가 {data: ...} 래핑하면 한 번 더 벗김
  const d = resp?.data;
  return d?.data ?? d ?? null;
}

/** 학생 마이페이지: GET /api/student/mypage
 *  (여기서 portfolios/temperature 등 포함될 수 있음)
 */
export async function getStudentMypage() {
  const resp = await api.get("/api/student/mypage", { headers: authHeaders() });
  return unwrap(resp);
}

/** 온도 조회: /api/student/mypage 에서 추출 */
export async function getTemperature() {
  const mp = await getStudentMypage();
  return mp?.temperature ?? mp?.temp ?? null;
}

/** 포트폴리오 목록: /api/student/mypage.portfolios에서 추출 */
export async function getPortfolios() {
  const mp = await getStudentMypage();
  const list =
    (Array.isArray(mp?.portfolios) && mp.portfolios) ||
    (Array.isArray(mp?.data?.portfolios) && mp.data.portfolios) ||
    [];
  return list;
}

/** 포트폴리오 생성: POST /api/portfolio/ */
export async function addPortfolio(payload) {
  const resp = await api.post("/api/portfolio/", payload, {
    headers: authHeaders(),
  });
  return unwrap(resp); // 생성된 포트폴리오 객체(또는 새 id)
}

/** 포트폴리오 상세: GET /api/portfolio/{id} */
export async function getPortfolio(id) {
  const resp = await api.get(`/api/portfolio/${encodeURIComponent(id)}`, {
    headers: authHeaders(),
  });
  return unwrap(resp);
}

/** 포트폴리오 수정: PUT /api/portfolio/{id} */
export async function updatePortfolio(id, payload) {
  const resp = await api.put(
    `/api/portfolio/${encodeURIComponent(id)}`,
    payload,
    {
      headers: authHeaders(),
    }
  );
  return unwrap(resp);
}

/** 포트폴리오 삭제: DELETE /api/portfolio/{id} */
export async function deletePortfolio(id) {
  await api.delete(`/api/portfolio/${encodeURIComponent(id)}`, {
    headers: authHeaders(),
  });
  return true;
}

/** (스웨거에 없음) 공개여부 변경 API는 제거/주석 처리 */
// export async function updatePortfolioVisibility(id, visibility) { ... }

/** (스웨거에 없음) 소상공인 마이페이지 API는 제거/주석 처리 */
// export const getBusinesses = () => api.get("/mypage/business");
// === 업체(비즈니스) API: /api/store ===
// 공통: axios 인스턴스(api), authHeaders(), unwrap()는 파일 상단에 이미 존재한다고 가정

// 목록: GET /api/store
export async function getBusinesses() {
  const resp = await api.get("/api/store", { headers: authHeaders() });
  const d = resp?.data?.data ?? resp?.data ?? null;
  // 배열/페이지 대응
  return Array.isArray(d) ? d : d?.items || d?.content || [];
}

// 단건: GET /api/store/{businessNumber}
export async function getBusiness(businessNumber) {
  const resp = await api.get(
    `/api/store/${encodeURIComponent(businessNumber)}`,
    {
      headers: authHeaders(),
    }
  );
  return resp?.data?.data ?? resp?.data ?? null;
}

// 생성: POST /api/store/create
export async function addBusiness(payload) {
  const resp = await api.post("/api/store/create", payload, {
    headers: authHeaders(),
  });
  return resp?.data?.data ?? resp?.data ?? null; // 생성된 객체(또는 id)
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
