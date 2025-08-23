import axios from "axios";
import { getCookie, setCookie, removeCookie } from "./cookie";

const API_BASE = process.env.REACT_APP_API_BASE_URL;
const REFRESH_URL = `${API_BASE}/api/auth/refresh`;

const instance = axios.create({
  baseURL: API_BASE,
  headers: { "Content-Type": "application/json" },
});

instance.interceptors.request.use((config) => {
  const token = getCookie("accessToken");
  if (token) {
    if (config.headers && typeof config.headers.set === "function") {
      config.headers.set("Authorization", `Bearer ${token}`);
    } else {
      config.headers = { ...(config.headers || {}), Authorization: `Bearer ${token}` };
    }
  }
  return config;
});

let refreshing = null;

instance.interceptors.response.use(
  (res) => res,
  async (err) => {
    const original = err.config || {};
    const status = err.response?.status;
    const isRefreshCall = !!original.url && (original.url.startsWith(REFRESH_URL) || original.url.includes("/api/auth/refresh"));

    if (status === 401 && !original._retry && !isRefreshCall) {
      original._retry = true;

      if (!refreshing) {
        refreshing = (async () => {
          const rt = getCookie("refreshToken");
          if (!rt) throw new Error("NO_REFRESH_TOKEN");
          const r = await axios.post(REFRESH_URL, { refresh_token: rt, refreshToken: rt });
          const newAccess = r.data?.accessToken || r.data?.access_token;
          if (!newAccess) throw new Error("NO_ACCESS_IN_REFRESH");
          setCookie("accessToken", newAccess);
          return newAccess;
        })().finally(() => setTimeout(() => (refreshing = null), 0));
      }

      try {
        const token = await refreshing;
        if (original.headers && typeof original.headers.set === "function") {
          original.headers.set("Authorization", `Bearer ${token}`);
        } else {
          original.headers = { ...(original.headers || {}), Authorization: `Bearer ${token}` };
        }
        return instance(original);
      } catch (e) {
        removeCookie("accessToken");
        removeCookie("refreshToken");
        window.location.href = "/login";
        return Promise.reject(e);
      }
    }
    return Promise.reject(err);
  }
);

export default instance;
