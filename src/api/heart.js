// src/api/heart.js
const API_BASE =
  process.env.REACT_APP_API_BASE_URL || "https://unibiz.lion.it.kr";

// ⚠️ 임시 경로: 서버에서 확정되면 BASE_PATH만 바꿔 끼우면 됨.
const BASE_PATH = "/heart"; // 예: "/api/heart"

const url = {
  list: (type) => `${API_BASE}${BASE_PATH}?type=${encodeURIComponent(type)}`,
  add: () => `${API_BASE}${BASE_PATH}`,
  remove: (type, id) =>
    `${API_BASE}${BASE_PATH}/${encodeURIComponent(type)}/${encodeURIComponent(
      id
    )}`,
};

export async function listHearts(type) {
  const r = await fetch(url.list(type), { credentials: "include" });
  if (!r.ok) throw new Error(`HTTP ${r.status}`);
  const j = await r.json();
  return j?.data ?? j; // {success, data} 형태도 대비
}

export async function addHeart(type, targetId) {
  const r = await fetch(url.add(), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ type, targetId }),
  });
  if (!r.ok) throw new Error(`HTTP ${r.status}`);
  try {
    return await r.json();
  } catch {
    return {};
  }
}

export async function removeHeart(type, targetId) {
  const r = await fetch(url.remove(type, targetId), {
    method: "DELETE",
    credentials: "include",
  });
  if (!r.ok) throw new Error(`HTTP ${r.status}`);
  try {
    return await r.json();
  } catch {
    return {};
  }
}
