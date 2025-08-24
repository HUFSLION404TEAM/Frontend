import React from "react";
import { ReactComponent as Loginlogo } from "../../../images/login/Loginlogo.svg";
import GoogleIconScr from "../../../assets/Google.svg";
import KakaoIconScr from "../../../assets/kakao.svg";
import NaverIconScr from "../../../assets/naver.svg";

const GAP = 15;
const LOGO_COLOR = "#0080FF";

const API_BASE = process.env.REACT_APP_API_BASE_URL;
const OAUTH_PATH_TEMPLATE =
  process.env.REACT_APP_OAUTH_PATH_TEMPLATE || "/oauth2/authorization/{provider}";

function fillTemplate(tpl, kv) {
  return tpl.replace(/\{(\w+)\}/g, (_, k) => encodeURIComponent(kv[k] ?? ""));
}

function startOAuth(provider) {
  const state = Array.from(crypto.getRandomValues(new Uint32Array(4))).join("-");
  sessionStorage.setItem("oauth_state", state);
  sessionStorage.setItem("post_login_redirect", "/select");

  const returnTo = `${window.location.origin}/auth/complete`;
  const url =
    API_BASE +
    fillTemplate(OAUTH_PATH_TEMPLATE, {
      provider,
      state,
      returnTo,
    });

  window.location.href = url;
}

function SocialButton({ icon, label, bg = "#FFF", color = "#000", border = "1px solid #EDE5E5", onClick }) {
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
        color: color,
        border: border,
        padding: "15px 73px",
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

export default function Login() {
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
          maxWidth: 390,
          padding: "48px 24px 32px",
          boxSizing: "border-box",
          margin: "0 auto",
        }}
      >
        <div
          style={{
            display: "grid",
            placeItems: "center",
          }}
        >
          <Loginlogo
            style={{
              color: LOGO_COLOR,
              width: 259,
              height: 126,
              marginTop: 90,
            }}
          />
        </div>

        <p
          style={{
            marginTop: 20,
            marginBottom: 90,
            textAlign: "center",
            fontSize: 15,
            fontWeight: 600,
            color: "#5C5C5C;",
          }}
        >
          유니비즈와 함께 시작해보세요!
        </p>

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
            onClick={() => startOAuth("google")}
          />

          <SocialButton
            icon={KakaoIconScr}
            label="카카오톡 계정으로 로그인"
            bg="#FEE500"
            color="#000000"
            border="1px solid #EDE5E5"
            onClick={() => startOAuth("kakao")}
          />

          <SocialButton
            icon={NaverIconScr}
            label="네이버 계정으로 로그인"
            bg="#03C75A"
            color="#FFFFFF"
            border="none"
            onClick={() => startOAuth("naver")}
          />
        </div>
      </div>
    </div>
  );
}