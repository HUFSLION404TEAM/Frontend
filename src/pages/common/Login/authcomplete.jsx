import React, { useEffect } from "react";

const API_BASE =
  process.env.REACT_APP_API_BASE_URL || "https://unibiz.lion.it.kr";

export default function AuthComplete() {
  useEffect(() => {
    // (선택) state 검증
    const url = new URL(window.location.href);
    const returnedState = url.searchParams.get("state");
    const storedState = sessionStorage.getItem("oauth_state");
    if (returnedState && storedState && returnedState !== storedState) {
      alert("로그인 상태 검증에 실패했습니다. 다시 시도해주세요.");
      window.location.replace("/login");
      return;
    }

    // 세션/JWT 쿠키가 발급되었다면 /auth/me가 성공해야 함
    fetch(`${API_BASE}/auth/me`, { credentials: "include" })
      .then((res) => {
        if (!res.ok) throw new Error("unauthorized");
        return res.json();
      })
      .then(() => {
        window.location.replace("/"); // 원하는 경로로 변경 가능
      })
      .catch(() => {
        alert("로그인 처리 중 문제가 발생했습니다.");
        window.location.replace("/login");
      });
  }, []);

  return <div style={{ padding: 24 }}>로그인 처리 중입니다…</div>;
}
