import React from "react";

// 쿠키 삭제
function deleteCookie(name) {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=${window.location.hostname};`;
}

export default function LogoutButton({
  className,
  style,
  children = "로그아웃",
}) {
  const handleLogout = () => {
    deleteCookie("accessToken");
    deleteCookie("refreshToken");

    // onboarded, role만 유지
    const keepKeys = ["onboarded", "role"];
    const keep = {};
    keepKeys.forEach((k) => {
      if (localStorage.getItem(k)) keep[k] = localStorage.getItem(k);
    });
    localStorage.clear();
    Object.entries(keep).forEach(([k, v]) => localStorage.setItem(k, v));

    window.location.href = "/login";
  };

  return (
    <button
      type="button"
      className={className}
      onClick={handleLogout}
      title="로그아웃"
      style={{
        backgroundColor: "#1A96FE",
        color: "#FFF",
        border: "none",
        borderRadius: 8,
        padding: "8px 8px",
        fontWeight: 700,
        fontSize: 12,
        lineHeight: "20px",
        boxShadow: "0 4px 10px rgba(26,150,254,0.30)",
        cursor: "pointer",
        marginTop: 30,
        marginRight: 35,
        ...style,
      }}
    >
      {children}
    </button>
  );
}
