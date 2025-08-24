import React from "react";
import styled from "styled-components";

const C = {
  primary: "#0080FF",
  text: "#111",
  bg: "#FFFFFF",
};

const HeaderWrap = styled.header`
  position: sticky;
  top: 0;
  z-index: 10;
  height: 56px;
  display: grid;
  grid-template-columns: 56px 1fr 56px;
  align-items: center;
  border-bottom: 1.5px solid ${C.primary};
  background: ${C.bg};
`;

const IconBtn = styled.button`
  height: 100%;
  display: grid;
  place-items: center;
  border: 0;
  background: transparent;
  cursor: pointer;
  svg { width: 26px; height: 26px; }
  transition: transform .08s ease-out;
  &:active { transform: scale(0.92); }
`;

const Title = styled.h1`
  margin: 0;
  text-align: center;
  font-family: Pretendard;
  font-size: 20px;
  font-weight: 700;
  color: ${C.text};
  letter-spacing: -0.5px;
  line-height: 140%; 
`;

export default function Header({ title, liked, onBack, onToggleLike }) {
  return (
    <HeaderWrap>
      <IconBtn aria-label="뒤로" onClick={onBack}>
        <svg viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M18 22L10 14L18 6" stroke="#A4A8B0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </IconBtn>

      <Title>{title}</Title>

      <IconBtn
        aria-label={liked ? "찜 해제" : "찜"}
        aria-pressed={liked}
        title={liked ? "찜 해제" : "찜"}
        onClick={onToggleLike}
      >
        {liked ? (
          // 채워진 하트
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
               viewBox="0 0 24 24" fill="none">
            <path
              d="M12 20L4.46368 12.9671C2.51211 11.1449 2.51211 8.18884 4.46368 6.36664C6.41526 4.54445 9.58421 4.54445 11.5358 6.36664L12 6.79903L12.4642 6.36664C14.4158 4.54445 17.5847 4.54445 19.5363 6.36664C21.4879 8.18884 21.4879 11.1449 19.5363 12.9671L12 20Z"
              fill="#E84E4E"
              stroke="#E84E4E"
              strokeWidth="1.5"
              strokeMiterlimit="10"
              strokeLinejoin="round"
            />
          </svg>
        ) : (
          // 빈 하트
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
               viewBox="0 0 24 24" fill="none">
            <path
              d="M12 20L4.46368 12.9671C2.51211 11.1449 2.51211 8.18884 4.46368 6.36664C6.41526 4.54445 9.58421 4.54445 11.5358 6.36664L12 6.79903L12.4642 6.36664C14.4158 4.54445 17.5847 4.54445 19.5363 6.36664C21.4879 8.18884 21.4879 11.1449 19.5363 12.9671L12 20Z"
              fill="white"
              stroke="#E84E4E"
              strokeWidth="1.5"
              strokeMiterlimit="10"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </IconBtn>
    </HeaderWrap>
  );
}
