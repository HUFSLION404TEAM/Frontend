// src/api/heart.js
const API_BASE =
  process.env.REACT_APP_API_BASE_URL || "https://unibiz.lion.it.kr";

/**
 * 백 스웨거 기준:
 *  POST /api/favorites/students/{studentId}  학생 찜/취소 토글
 *  POST /api/favorites/stores/{storeId}      가게 찜/취소 토글
 *  GET  /api/favorites/students              내가 찜한 학생 목록
 *  GET  /api/favorites/stores                내가 찜한 가게 목록
 *
 * 프론트의 type 매핑:
 *  - "planner"  => students
 *  - "business" => stores
 */

const BASE = "/api/favorites";

const url = {
  listStores: () => `${API_BASE}${BASE}/stores`,
  listStudents: () => `${API_BASE}${BASE}/students`,
  toggleStore: (storeId) =>
    `${API_BASE}${BASE}/stores/${encodeURIComponent(storeId)}`,
  toggleStudent: (studentId) =>
    `${API_BASE}${BASE}/students/${encodeURIComponent(studentId)}`,
};

async function ensureOk(res) {
  const text = await res.text();
  let body = {};
  try {
    body = text ? JSON.parse(text) : {};
  } catch (_) {
    // JSON 아닐 수도 있음
  }
  if (!res.ok) {
    console.warn("[favorites] HTTP", res.status, {
      url: res.url || "",
      requestId: res.headers?.get?.("X-Request-Id") || "",
      body: text,
    });
    const msg =
      (body && (body.message || body.error || body.errorMessage)) ||
      `HTTP ${res.status}`;
    const err = new Error(msg);
    err.status = res.status;
    throw err;
  }
  // {success,data} 래핑, 배열 직반환 모두 대응
  return body?.data ?? body ?? {};
}

/** 목록 조회: type === 'business' -> 가게 목록, 'planner' -> 학생 목록 */
export async function listHearts(type) {
  const call =
    type === "planner"
      ? fetch(url.listStudents(), { credentials: "include" })
      : fetch(url.listStores(), { credentials: "include" }); // 기본은 stores

  const data = await ensureOk(await call);

  // 화면단에서 공통으로 쓰기 좋게 표준화
  const items = Array.isArray(data?.items)
    ? data.items
    : Array.isArray(data?.content)
    ? data.content
    : Array.isArray(data)
    ? data
    : [];

  return { items };
}

/** 토글: 서버가 한 엔드포인트로 찜/취소 둘 다 처리 */
export async function toggleHeart(type, targetId) {
  const ep =
    type === "planner"
      ? url.toggleStudent(targetId)
      : url.toggleStore(targetId);
  const res = await fetch(ep, {
    method: "POST",
    credentials: "include",
  });
  return ensureOk(res);
}

/** 기존 컨텍스트와의 호환을 위해 add/remove는 토글로 위임 */
export async function addHeart(type, targetId) {
  return toggleHeart(type, targetId);
}
export async function removeHeart(type, targetId) {
  return toggleHeart(type, targetId);
}
