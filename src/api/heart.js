// src/api/heart.js
const API_BASE =
  process.env.REACT_APP_API_BASE_URL || "https://unibiz.lion.it.kr";

// 서버 스펙 확정 경로
// (문서가 GET/POST/DELETE/PUT 모두 동일한 베이스에 매핑되어 있는 형태)
const BASE_PATH = "/api/heart";

// 필요 시 대문자로 보낼 때 사용 (현재는 그대로 사용)
const normalizeType = (t) =>
  ({ planner: "PLANNER", business: "BUSINESS", post: "POST" }[t] || t);
// const normalizeType = (t) => t;

const url = {
  list: (type) => `${API_BASE}${BASE_PATH}?type=${encodeURIComponent(type)}`,
  add: () => `${API_BASE}${BASE_PATH}`,
  remove: () => `${API_BASE}${BASE_PATH}`,
  // update: () => `${API_BASE}${BASE_PATH}`, // 필요하면 사용 (PUT)
};

export async function listHearts(type) {
  const r = await fetch(url.list(normalizeType(type)), {
    credentials: "include",
  });
  if (!r.ok) throw new Error(`HTTP ${r.status}`);
  const j = await r.json().catch(() => ({}));
  return j?.data ?? j;
}

export async function addHeart(type, targetId) {
  const r = await fetch(url.add(), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ type: normalizeType(type), targetId }),
  });
  if (!r.ok) throw new Error(`HTTP ${r.status}`);
  return r.json().catch(() => ({}));
}

export async function removeHeart(type, targetId) {
  // 서버가 같은 경로에서 DELETE + JSON Body를 받는 스타일
  const r = await fetch(url.remove(), {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ type: normalizeType(type), targetId }),
  });
  if (!r.ok) throw new Error(`HTTP ${r.status}`);
  return r.json().catch(() => ({}));
}

// 필요 시 수정(PUT)도 제공
export async function updateHeart(type, targetId, payload = {}) {
  const r = await fetch(url.update(), {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ type: normalizeType(type), targetId, ...payload }),
  });
  if (!r.ok) throw new Error(`HTTP ${r.status}`);
  return r.json().catch(() => ({}));
}
