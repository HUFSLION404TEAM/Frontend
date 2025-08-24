// Components/action-bar.jsx
import React from "react";
import styled from "styled-components";

const C = {
  primary: "#0080FF",
  heart: "#E84E4E",
};

const Wrap = styled.div`
  position: sticky;
  bottom: 0;
  z-index: 10;
  padding: 12px;
  background: linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,.05) 100%);
  /* iOS 하단 홈바 여백 대응 */
  padding-bottom: calc(12px + env(safe-area-inset-bottom, 0px));
`;

const Actions = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
`;

const GhostBtn = styled.button`
  min-height: 56px;            /* 아이콘 여백 감안해 살짝 키움 */
  border-radius: 12px;
  background: #fff;
  color: ${C.primary};
  border: 1px solid ${C.primary};
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;

  /* 아이콘 중앙정렬 */
  display: flex;
  align-items: center;
  justify-content: center;
  line-height: 0;              /* 버튼 내 여분라인 제거 */
  padding: 0;
`;

const SolidBtn = styled(GhostBtn)`
  background: ${C.primary};
  color: #fff;
  border-color: ${C.primary};
  font-weight: 600;
  font-size: 16px;
`;

/* 하트 아이콘: 채워진/외곽선 두 가지 상태 */
function HeartFilled({ size = 25 }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size - 1} viewBox="0 0 25 24" fill="none" aria-hidden>
      <path
        d="M12.5 20L4.96368 12.9671C3.01211 11.1449 3.01211 8.18884 4.96368 6.36664C6.91526 4.54445 10.0842 4.54445 12.0358 6.36664L12.5 6.79903L12.9642 6.36664C14.9158 4.54445 18.0847 4.54445 20.0363 6.36664C21.9879 8.18884 21.9879 11.1449 20.0363 12.9671L12.5 20Z"
        fill={C.heart}
        stroke={C.heart}
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function HeartOutline({ size = 25 }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size - 1}
      viewBox="0 0 25 24"
      fill="none"
      aria-hidden
    >
      <path
        d="M12.5 20L4.96368 12.9671C3.01211 11.1449 3.01211 8.18884 4.96368 6.36664C6.91526 4.54445 10.0842 4.54445 12.0358 6.36664L12.5 6.79903L12.9642 6.36664C14.9158 4.54445 18.0847 4.54445 20.0363 6.36664C21.9879 8.18884 21.9879 11.1449 20.0363 12.9671L12.5 20Z"
        stroke="#E84E4E"     
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinejoin="round"
      />
    </svg>
  );
}


export default function ActionBar({ liked, onToggleLike, onChat }) {
  return (
    <Wrap>
      <Actions>
        {/* 왼쪽: 하트 아이콘만 표시 */}
        <GhostBtn type="button" onClick={onToggleLike} aria-label={liked ? "찜 해제" : "찜"}>
          {liked ? <HeartFilled /> : <HeartOutline />}
        </GhostBtn>

        {/* 오른쪽: 채팅 텍스트 버튼 */}
        <SolidBtn type="button" onClick={onChat}>채팅</SolidBtn>
      </Actions>
    </Wrap>
  );
}
