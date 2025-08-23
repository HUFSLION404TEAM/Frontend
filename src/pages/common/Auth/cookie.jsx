import { Cookies } from "react-cookie";

const cookies = new Cookies();
const DEFAULT_OPTS = { path: "/", sameSite: "Lax" }; 

export const ACCESS_KEY = "accessToken";
export const REFRESH_KEY = "refreshToken";

export const setCookie = (name, value, opts = {}) =>
  cookies.set(name, value, { ...DEFAULT_OPTS, ...opts });

export const getCookie = (name) => cookies.get(name);

export const removeCookie = (name, opts = {}) =>
  cookies.remove(name, { ...DEFAULT_OPTS, ...opts });
