import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { setCookie } from "../../common/Auth/cookie";

const toParams = (s) =>
  Object.fromEntries(
    new URLSearchParams((s || "").replace(/^([\?|#])/, "")).entries()
  );

export default function AuthComplete() {
  const { search, hash } = useLocation();
  const nav = useNavigate();

  useEffect(() => {
    const q = toParams(search);
    const h = toParams(hash);

    const access = q.access_token || h.access_token || q.token || h.token;
    const refresh =
      q.refresh_token || h.refresh_token || q.refresh || h.refresh;

    const needsTypeSelection =
      q.needsTypeSelection === "true" || h.needsTypeSelection === "true";
    const userId = q.userId || h.userId;

    if (access && refresh) {
      setCookie("accessToken", access);
      setCookie("refreshToken", refresh);

      const isOnboarded = localStorage.getItem("onboarded") === "true";
      const role = localStorage.getItem("role");
      let next;
      if (isOnboarded && role) {
        if (role === "owner") {
          next = "/owner/dash";
        } else if (role === "student") {
          next = "/student/dash";
        } else {
          next = "/select";
        }
      } else {
        next = "/select";
      }

      if (userId) localStorage.setItem("userId", userId);

      nav(next, { replace: true });
    } else {
      console.error("리다이렉트에 토큰이 없습니다.", { q, h });
      nav("/login", { replace: true });
    }
  }, [search, hash, nav]);

  return <div style={{ padding: 24, textAlign: "center" }}>로그인 처리중…</div>;
}
