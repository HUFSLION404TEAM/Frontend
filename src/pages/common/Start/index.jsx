import React from "react";
import styled from "styled-components";
import StartLogo from "../../../images/start/Startlogo.svg";

const Start = () => {
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
`;
