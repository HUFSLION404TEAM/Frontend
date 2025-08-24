import React, { useEffect } from "react";
import styled, { keyframes } from "styled-components";
import { useNavigate } from "react-router-dom";
import StartLogo from "../../../images/Start/Startlogo.svg";

const fadeIn = keyframes`
  0%   { opacity: 0; transform: translateY(8px) scale(0.96); }
  100% { opacity: 1; transform: translateY(0)  scale(1); }
`;

const Start = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => navigate("/login"), 2000);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <Container>
      <Logo src={StartLogo} alt="UniBiz Logo" />
    </Container>
  );
};

export default Start;

const Container = styled.div`
  width: 100%;
  max-width: 390px;
  margin: 0 auto;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #0080ff;
  box-sizing: border-box;
  padding: 0 20px;
`;

const Logo = styled.img`
  width: 70%;
  max-width: 300px;
  margin-top: -200px;
  will-change: transform, opacity;
  animation: ${fadeIn} 800ms ease-out forwards;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
    opacity: 1;
    transform: none;
  }
`;
