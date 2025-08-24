// src/pages/common/Auth/axios.js
import axios from "axios";
import { getCookie, setCookie, removeCookie } from "./cookie";

const API_BASE = (process.env.REACT_APP_API_BASE_URL || "").replace(/\/+$/, "");
const REFRESH_PATH = "/api/auth/refresh";
const REFRESH_URL = API_BASE ? `${API_BASE}${REFRESH_PATH}` : REFRESH_PATH;

// 공용 인스턴스
const axiosInstance = axios.create({
  baseURL: API_BASE || undefined,             // origin 상대 경로도 허용
  headers: { "Content-Type": "application/json" },
  withCredentials: true,                      // 쿠키 인증 대응
});

// 요청 인터셉터: Bearer 토큰 주입
axiosInstance.interceptors.request.use((config) => {
  const token = getCookie("accessToken");
  if (token) {
    // Axios v1은 AxiosHeaders(set 메서드)일 수 있음
    if (config.headers && typeof config.headers.set === "function") {
      config.headers.set("Authorization", `Bearer ${token}`);
    } else {
      config.headers = { ...(config.headers || {}), Authorization: `Bearer ${token}` };
    }
  }
  return config;
});

let refreshing = null; // 진행 중인 refresh Promise (동시요청 큐)

function extractAccessToken(respData) {
  // 응답이 {accessToken} / {access_token} / {data:{accessToken}} 등 다양할 수 있음
  return (
    respData?.accessToken ||
    respData?.access_token ||
    respData?.data?.accessToken ||
    respData?.data?.access_token ||
    null
  );
}
function extractRefreshToken(respData) {
  return (
    respData?.refreshToken ||
    respData?.refresh_token ||
    respData?.data?.refreshToken ||
    respData?.data?.refresh_token ||
    null
  );
}

axiosInstance.interceptors.response.use(
  (res) => res,
  async (err) => {
    const original = err.config || {};
    const status = err.response?.status;

    // refresh 호출 자체는 재귀 방지
    const isRefreshCall =
      !!original.url &&
      (original.url.startsWith(REFRESH_URL) || original.url.includes(REFRESH_PATH));

    // 만료: 일부 백엔드는 401 대신 419/440 등을 쓰기도 함
    const isAuthExpired = [401, 419, 440].includes(status);

    if (isAuthExpired && !original._retry && !isRefreshCall) {
      original._retry = true;

      // 1) 단 한 번만 refresh 수행 (동시 401은 대기)
      if (!refreshing) {
        refreshing = (async () => {
          const rt = getCookie("refreshToken");
          if (!rt) throw new Error("NO_REFRESH_TOKEN");

          // refresh는 기본 axios로(인터셉터 영향 최소화)
          const r = await axios.post(
            REFRESH_URL,
            // 서버마다 키가 다를 수 있어 둘 다 보냄
            { refresh_token: rt, refreshToken: rt },
            {
              headers: { "Content-Type": "application/json" },
              withCredentials: true,
              validateStatus: () => true,
            }
          );

          if (r.status < 200 || r.status >= 300) {
            throw new Error(`REFRESH_HTTP_${r.status}`);
          }

          const newAccess = extractAccessToken(r.data);
          const newRefresh = extractRefreshToken(r.data);

          if (!newAccess) throw new Error("NO_ACCESS_IN_REFRESH");

          // 저장
          setCookie("accessToken", newAccess);
          if (newRefresh) setCookie("refreshToken", newRefresh);

          return newAccess;
        })().finally(() => {
          // 이벤트 루프 한 틱 뒤 해제해 동시대기자들이 모두 재시도하도록
          setTimeout(() => (refreshing = null), 0);
        });
      }

      // 2) 갱신 완료 기다렸다가 원요청 재시도
      try {
        const token = await refreshing;

        if (original.headers && typeof original.headers.set === "function") {
          original.headers.set("Authorization", `Bearer ${token}`);
        } else {
          original.headers = { ...(original.headers || {}), Authorization: `Bearer ${token}` };
        }
        // baseURL을 잃지 않도록 같은 인스턴스로 재요청
        return axiosInstance(original);
      } catch (e) {
        // 리프레시 실패 → 세션 리셋
        removeCookie("accessToken");
        removeCookie("refreshToken");
        try {
          // 원하면 여기서 로그아웃 API 호출도 가능
        } finally {
          window.location.href = "/login";
        }
        return Promise.reject(e);
      }
    }

    // 그 외 에러는 그대로
    return Promise.reject(err);
  }
);

export default axiosInstance;