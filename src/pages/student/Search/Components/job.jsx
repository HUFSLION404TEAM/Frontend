// components/store/StoreJobsSection.jsx
import React from "react";
import styled from "styled-components";

const C = {
  primary: "#0080FF",
  line: "#E5E7EB",
  text: "#111111",
  meta: "#767676",
  heart: "#E84E4E",
};

const SectionTitle = styled.h2`
  margin: 0 0 8px 10px;
  color: #000;
  font-family: Pretendard, system-ui, -apple-system, "Segoe UI", Roboto, Arial, sans-serif;
  font-size: 20px;
  font-weight: 600;
  line-height: 140%;
  letter-spacing: -0.5px;
`;

const JobItem = styled.section`
  position: relative;
  margin-top: -10px;
  display: flex;
  align-items: center;     /* 세로 가운데 */
  justify-content: flex-start;  /* 왼쪽 정렬 */
  padding: 20px 16px;
  padding-right: 56px;     /* 하트 공간 */
  border-radius: 16px;
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 0.4) 0%,
    rgba(255, 255, 255, 0.6) 100%
  );
  box-shadow: 3px 3px 8px 0 rgba(0, 0, 0, 0.08);
`;

const JobText = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center; /* 텍스트 묶음도 세로 중앙 */
  align-items: flex-start; /* 왼쪽 정렬 */
  text-align: left;
`;



const JobTitle = styled.div`
  color: ${C.text};
  font-size: 12px;
  font-weight: 600;
  line-height: 140%;
  letter-spacing: -0.3px;
`;

const MetaRow = styled.div`
  margin-top: 4px;
  display: flex;
  align-items: center;
  gap: 6px;
  flex-wrap: wrap;
`;

const Price = styled.span`
  color: ${C.meta};
  font-size: 12px;
  font-weight: 700;
  line-height: 140%;
  letter-spacing: -0.3px;
`;

const Unit = styled.span`
  color: ${C.meta};
  font-size: 12px;      /* 가격과 같은 크기/기준선 → 한 줄 정렬 */
  font-weight: 500;
  line-height: 140%;
  letter-spacing: -0.3px;
`;

const Status = styled.span`
  color: ${C.meta};
  font-size: 12px;
  font-weight: 500;
  line-height: 140%;
  letter-spacing: -0.3px;
`;

const Time = styled.span`
  color: ${C.meta};
  font-size: 12px;
  font-weight: 400;
  line-height: 140%;
  letter-spacing: -0.3px;
`;

const Dot = styled.span`
  color: ${C.meta};
  font-size: 12px;
  line-height: 140%;
`;

const IconBtn = styled.button`
  position: absolute;   /* 오른쪽 위 고정 */
  top: 12px;
  right: 12px;
  width: 28px;
  height: 28px;
  display: grid;
  place-items: center;
  border: 0;
  background: transparent;
  cursor: pointer;
`;

const HeartIcon = ({ filled }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="17" viewBox="0 0 20 17" fill="none" aria-hidden>
    <path
      d="M10 16L2.46368 8.96713C0.512105 7.14494 0.512105 4.18884 2.46368 2.36664C4.41526 0.544452 7.58421 0.544452 9.53579 2.36664L10 2.79903L10.4642 2.36664C12.4158 0.544452 15.5847 0.544452 17.5363 2.36664C19.4879 4.18884 19.4879 7.14494 17.5363 8.96713L10 16Z"
      fill={filled ? C.heart : "#FFFFFF"}
      stroke={C.heart}
      strokeWidth="1.5"
      strokeMiterlimit="10"
      strokeLinejoin="round"
    />
  </svg>
);

export default function StoreJobsSection({
  title = "공고",
  posts = [],
  onToggleLike,
}) {
  return (
    <>
      <SectionTitle>{title}</SectionTitle>
      {posts.map((p) => {
        const price = (p.price ?? 0).toLocaleString();
        const statusText = p.closed ? "모집 마감" : "모집 중";
        return (
          <JobItem key={p.id}>
            <JobText>
              <JobTitle>{p.title}</JobTitle>
              <MetaRow>
                <Price>₩{price}</Price>
                <Unit>건당</Unit>
                <Dot>·</Dot>
                <Status>{statusText}</Status>
                <Dot>·</Dot>
                <Time>{p.ago}</Time>
              </MetaRow>
            </JobText>

            <IconBtn
              aria-label="공고 찜"
              onClick={() => (onToggleLike ? onToggleLike(p) : alert("공고 찜 토글"))}
            >
              <HeartIcon filled={!!p.liked} />
            </IconBtn>
          </JobItem>
        );
      })}
    </>
  );
}
