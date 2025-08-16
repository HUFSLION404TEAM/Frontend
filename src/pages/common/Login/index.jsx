import React from "react";
import { ReactComponent as Loginlogo } from "../../../images/login/Loginlogo.svg";
import GoogleIconScr from "../../../assets/Google.svg";
import KakaoIconScr from "../../../assets/kakao.svg";
import NaverIconScr from "../../../assets/naver.svg";

const GAP = 15; // 버튼 간 간격(px)
const LOGO_COLOR = "#0080FF";

function SocialButton({
  icon,
  label,
  bg = "#FFF",
  color = "#000",
  border = "1px solid #EDE5E5",
  onClick,
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: 50,
        width: "100%",
        borderRadius: 15,
        background: bg,
        color,
        border,
        // 텍스트 정중앙 유지 + 아이콘은 absolute로 왼쪽 배치
        padding: "15px 73px", // Figma 참고값
        boxSizing: "border-box",
        cursor: "pointer",
      }}
    >
      <img
        src={icon}
        alt=""
        aria-hidden="true"
        style={{
          position: "absolute",
          left: 20,
          width: 18,
          height: 18,
          objectFit: "contain",
        }}
      />
      <span
        style={{
          fontSize: 14,
          fontWeight: 600,
          letterSpacing: -0.2,
        }}
      >
        {label}
      </span>
    </button>
  );
}

const Login = () => {
  const handleLogin = (provider) => {
    // TODO: 나중에 실제 OAuth 연동
    // 예: navigate(`/auth/${provider}`) 또는 openPopup(...)
    console.log(`clicked: ${provider}`);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        background: "#FFF",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 390, // iPhone 13 기준 프레임 폭
          padding: "48px 24px 32px",
          boxSizing: "border-box",
          margin: "0 auto",
        }}
      >
        {/* 로고 */}
        <div style={{ display: "grid", placeItems: "center" }}>
          {/* case 1) SVG가 currentColor를 쓰는 경우: color만 주면 됨 */}
          <Loginlogo style={{ color: LOGO_COLOR, width: 259, height: 126 }} />

          {/* case 2) 만약 SVG 내부에 fill이 박혀 있어 색이 안 바뀐다면
              아래 주석을 해제해서 강제로 컬러 지정 가능
          <style>{`
            .loginLogo path[fill]:not([fill="none"]) { fill: ${LOGO_COLOR} !important; }
          `}</style>
          <Loginlogo className="loginLogo" style={{ width: 259, height: 126 }} />
          */}
        </div>

        {/* 서브 카피 */}
        <p
          style={{
            marginTop: 12,
            textAlign: "center",
            fontSize: 13,
            color: "#6B7280",
          }}
        >
          유니비즈와 함께 시작해보세요!
        </p>

        {/* 소셜 버튼들 */}
        <div
          style={{
            marginTop: 28,
            display: "flex",
            flexDirection: "column",
            gap: GAP,
          }}
        >
          <SocialButton
            icon={GoogleIconScr}
            label="Google 계정으로 로그인"
            bg="#FFFFFF"
            color="#000000"
            border="1px solid #EDE5E5"
            onClick={() => handleLogin("google")}
          />

          <SocialButton
            icon={KakaoIconScr}
            label="카카오톡 계정으로 로그인"
            bg="#FEE500"
            color="#000000"
            border="1px solid #EDE5E5"
            onClick={() => handleLogin("kakao")}
          />

          <SocialButton
            icon={NaverIconScr}
            label="네이버 계정으로 로그인"
            bg="#03C75A"
            color="#FFFFFF"
            border="none"
            onClick={() => handleLogin("naver")}
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
