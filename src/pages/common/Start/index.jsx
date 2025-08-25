// src/pages/common/Start/index.jsx
import React, { useEffect } from "react";
import styled, { keyframes } from "styled-components";
import { useNavigate } from "react-router-dom";
import StartLogo from "../../../images/start/Startlogo.svg";
import Startback from "../../../images/start/startvec.svg";

const fadeIn = keyframes`
  0%   { opacity: 0; transform: translateY(8px) scale(0.96); }
  100% { opacity: 1; transform: translateY(0)  scale(1); }
`;

const Start = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const t = setTimeout(() => navigate("/login"), 2000);
    return () => clearTimeout(t);
  }, [navigate]);

  return (
    <Container>
      <Logo src={StartLogo} alt="UniBiz Logo" />
    </Container>
  );
};

export default Start;

const Container = styled.div`
  position: relative;
  width: 100%;
  max-width: 390px;
  height: 100vh;
  margin: 0 auto;

  display: flex;
  justify-content: center;
  align-items: center;

  /* 배경: startvec.svg만 사용 */
  background-image: url(${Startback});
  background-repeat: no-repeat;
  background-position: center center; /* 필요시 center bottom 등으로 조정 */
  background-size: cover; /* 필요시 contain으로 변경 */

  box-sizing: border-box;
  padding: 0 20px;
  overflow: hidden;
`;

const Logo = styled.img`
  width: 70%;
  max-width: 300px;
  will-change: transform, opacity;
  animation: ${fadeIn} 800ms ease-out forwards;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
    opacity: 1;
    transform: none;
  }
`;
