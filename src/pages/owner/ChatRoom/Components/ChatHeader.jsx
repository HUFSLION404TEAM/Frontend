import React from "react";
import styled from "styled-components";

const Wrap = styled.header`
  height: 64px;
  display: grid;
  grid-template-columns: 64px 1fr 64px;
  align-items: center;
  border-bottom: 1.5px solid ${({ borderColor }) => borderColor || "#0080FF"};
  background: #fff;
  position: sticky;
  top: 0;
  z-index: 10;
`;

const IconBtn = styled.button`
  height: 100%;
  display: grid;
  place-items: center;
  border: 0;
  background: transparent;
  cursor: pointer;
  svg { width: 28px; height: 28px; }
`;

const Title = styled.h1`
  margin: 0;
  text-align: center;
  font-size: 20px;
  font-weight: 700;
  color: #111111;
`;

const RightSlot = styled.div`
  display: grid;
  place-items: center;
`;

export default function ChatHeader({ title, onBack, right, borderColor }) {
  return (
    <Wrap borderColor={borderColor}>
      <IconBtn aria-label="뒤로" onClick={onBack}>
        <svg viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M18 22L10 14L18 6" stroke="#A4A8B0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </IconBtn>
      <Title>{title}</Title>
      <RightSlot>{right ?? null}</RightSlot>
    </Wrap>
  );
}
