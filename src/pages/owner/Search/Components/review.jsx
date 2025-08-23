import React, { forwardRef } from "react";
import styled from "styled-components";

const C = {
  primary: "#0080FF",
  text: "#111",
  caption: "#505050",
  line: "#E9E9EB",
};

const SectionTitle = styled.h2`
  margin: 0 0 8px 10px;
  color: #000;
  font-size: 20px;
  font-weight: 600;
  line-height: 140%;
  letter-spacing: -0.5px;
`;

const ScoreWrap = styled.section`
  padding: 0 10px 8px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: -10px;
`;

const Divider = styled.hr`
  border: 0;
  height: 1px;
  background: #D9D9D9;
  margin: 1px 0;
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const ScoreRow = styled(Row)`
  justify-content: flex-end;
  height: 29px;
  color: ${C.primary};
  font-size: 32px;
  font-weight: 600;
  line-height: 140%;
  letter-spacing: -0.8px;
`;

const Bar = styled.div`
  height: 8px;
  border-radius: 999px;
  background: #e9e9eb;
  overflow: hidden;
`;

const Fill = styled.div`
  height: 100%;
  width: ${p => p.v}%;
  background: linear-gradient(90deg, #5AB2FF, #1A96FE);
`;

const StartWrap = styled.div`
  display: grid;
  place-items: center;
  gap: 4px;
  margin-top: 4px;
`;

const StartText = styled.div`
  color: #A69F9F;
  font-size: 8px;
  font-weight: 400;
  line-height: 140%;
  letter-spacing: -0.2px;
`;

const NoteRow = styled.div`
  display: flex;
  height: 23px;
  padding: 6px 10px;
  justify-content: space-between;
  align-items: center;
  border-radius: 8px;
  border: 1px solid ${C.primary};
  background: #fff;
`;

const Right = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 6px;
`;

const Count = styled.span`
  color: #767676;
  font-size: 12px;
  font-weight: 600;
  line-height: 140%;
  letter-spacing: -0.3px;
`;

const ReviewItem = styled.div`
  display: flex;
  padding: 12px 10px;
  flex-direction: column;
  gap: 8px;
  border-bottom: 1px solid ${C.line};
  margin-top: -15px;
`;

const ReviewHead = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const RName = styled.span`
  font-size: 12px;
  font-weight: 700;
  color: ${C.text};
`;

const RDate = styled.span`
  color: #767676;
  font-size: 8px;
  font-weight: 400;
  line-height: 140%;
  letter-spacing: -0.2px;
`;

const RText = styled.p`
  margin: 0;
  font-size: 12px;
  color: #000;
  line-height: 1.45;
`;

const StartTriangle = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="10" height="8" viewBox="0 0 10 8" fill="none" aria-hidden>
    <path d="M5 0L9.33013 7.5H0.669873L5 0Z" fill="#D9D9D9"/>
  </svg>
);

const PersonIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="17" height="18" viewBox="0 0 17 18" fill="none" aria-hidden>
    <ellipse cx="8.5" cy="5.4585" rx="2.125" ry="2.125" fill="#969EA7" stroke="#969EA7" strokeWidth="1.5"/>
    <path d="M2.834 13.25c0-1.565 1.268-2.833 2.833-2.833h5.667c1.565 0 2.833 1.268 2.833 2.833 0 .782-.634 1.417-1.417 1.417H4.251c-.782 0-1.417-.635-1.417-1.417Z" fill="#969EA7" stroke="#969EA7" strokeWidth="1.5" strokeLinejoin="round"/>
  </svg>
);

const Reviews = forwardRef(function Reviews(
  { stickyGap = 76, score = 0, notes = [], items = [] },
  ref
) {
  const pct = Math.min(100, Math.max(0, (score / 40) * 100));

  return (
    <>
      <div ref={ref} style={{ height: 1, scrollMarginTop: stickyGap }} />

      <SectionTitle>매칭후기</SectionTitle>

      {/* 온도 영역 */}
      <ScoreWrap>
        <ScoreRow>{score.toFixed(1)}°C</ScoreRow>
        <Bar><Fill v={pct} /></Bar>
        <StartWrap>
          <StartTriangle />
          <StartText>시작 온도 36.5°C</StartText>
        </StartWrap>
      </ScoreWrap>

      <Divider />

      {/* 빠른평 리스트 */}
      <div style={{ display: "grid", gap: 12 }}>
        {notes.map((n, i) => {
          const text = typeof n === "string" ? n : n.text;
          const count = typeof n === "object" ? n.count : undefined;
          return (
            <NoteRow key={i}>
              <span style={{ color: "#000", fontSize: 12, letterSpacing: "-0.3px" }}>{text}</span>
              {typeof count === "number" && (
                <Right>
                  <PersonIcon />
                  <Count>{count}</Count>
                </Right>
              )}
            </NoteRow>
          );
        })}
      </div>

      <Divider />

      {/* 상세 후기 더보기 */}
      {items.length > 0 && (
        <div style={{
          color: "#A69F9F",
          fontSize: 12,
          fontWeight: 400,
          lineHeight: "140%",
          letterSpacing: "-0.3px",
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          gap: 6,
          padding: "8px 4px 6px",
          marginTop: "-12px",
        }}>
          상세 후기 더보기
          <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 17 17" fill="none" aria-hidden>
            <path d="M6 13L11 8L6 3" stroke="#A69F9F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      )}

      {/* 후기 리스트 */}
      {items.map(r => (
        <ReviewItem key={r.id}>
          <ReviewHead>
            <RName>{r.name}</RName>
            {r.date && <RDate>{r.date}</RDate>}
          </ReviewHead>
          <RText>{r.text}</RText>
        </ReviewItem>
      ))}
    </>
  );
});

export default Reviews;
