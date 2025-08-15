import React from "react";
import styled from "styled-components";
import { SummaryIcon, ResultIcon, InfoIcon, StarIcon, BulbIcon } from "../../student/Feedback/Components/FeedbackIcons";

const COLOR = {
  primary: "#0080FF",
  title:   "#363636",
  key:     "#505050",
  val:     "#737373",
  line:    "#E9E9EB",
  bg:      "#FFFFFF",
};

const DUMMY = {
  match: {
    partner: "6펜스커피",
    request: "포스터 요청",
    period: { start: "7/1", end: "7/10" },
  },
  results: {
    submitted: "2/2",
    onTime: true,
    satisfaction: "높음!",
  },
  analysis: ["전반적으로 만족스러운 결과이며 수정 피드백 반영 속도가 빨랐습니다."],
  pros: ["요구사항 빠른 반영", "브랜드 톤&매너 유지", "마감 준수"],
  cons: ["초안 오탈자 1건", "포스터 색 대비가 다소 약함"],
  suggestions: ["초안 단계 체크리스트 도입", "컬러 대비(AA) 사전 점검"],
};

const Page = styled.main`
  width: 100%;
  min-height: 100dvh;
  display: flex;
  justify-content: center;
  background: ${COLOR.bg};
`;

const Wrap = styled.div`
  width: 100%;
  max-width: 390px;
  box-sizing: border-box;
  display: grid;
  grid-template-rows: auto 1fr;
  min-height: 100dvh;
`;

const Header = styled.header`
  height: 64px;
  background: ${COLOR.bg};
  display: grid;
  grid-template-columns: 64px 1fr 64px;
  align-items: center;
  border-bottom: 1.5px solid ${COLOR.primary};
  position: sticky;
  top: 0;
  z-index: 10;
`;

const BackBtn = styled.button`
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
  color: ${COLOR.title};
`;

const Body = styled.div`
  overflow-y: auto;
  padding: 16px 12px 24px;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const SectionTitle = styled.h2`
  margin: 0 0 8px;
  padding: 0 8px;
  font-size: 15px;
  font-weight: 600;
  color: ${COLOR.title};
  display: inline-flex;
  align-items: center;
  gap: 8px;
  margin-top: 12px;
`;

const Card = styled.div`
  border-radius: 16px;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.40) 0%, rgba(255, 255, 255, 0.60) 100%);
  box-shadow: 3px 3px 8px 0 rgba(0, 0, 0, 0.08);
  padding: 16px;
  color: ${COLOR.key};
  margin-top: -12px;
`;

const KV = styled.p`
  margin: 0 0 8px;
  font-size: 15px;
  line-height: 22px;
  font-weight: 500;
  display: grid;
  grid-template-columns: auto 1fr;  
  column-gap: 6px;
  &:last-child { margin-bottom: 0; }
`;

const K = styled.span`
  color: ${COLOR.key};
  white-space: nowrap;             
`;

const V = styled.span`
  color: ${COLOR.val};
  min-width: 0;
  overflow-wrap: anywhere;          
  word-break: break-word;
`;

const Quote = styled.p`
  margin: 0;
  font-size: 15px;
  line-height: 25px;
  font-weight: 500;
  color: ${COLOR.key};
`;

export default function FeedbackStudent() {
  const onBack = () => window.history.back();

  const { match, results, analysis, pros, cons, suggestions } = DUMMY;

  return (
    <Page>
      <Wrap>
        <Header>
          <BackBtn aria-label="뒤로" onClick={onBack}>
            <svg viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                fillRule="evenodd" clipRule="evenodd"
                d="M18.3239 5.00858C18.5427 5.22736 18.6655 5.52405 18.6655 5.83341C18.6655 6.14277 18.5427 6.43946 18.3239 6.65824L10.9821 14.0001L18.3239 21.3419C18.5365 21.5619 18.654 21.8566 18.6514 22.1625C18.6487 22.4684 18.526 22.7611 18.3097 22.9774C18.0934 23.1937 17.8008 23.3164 17.4949 23.319C17.189 23.3217 16.8943 23.2041 16.6743 22.9916L8.5076 14.8249C8.28888 14.6061 8.16602 14.3094 8.16602 14.0001C8.16602 13.6907 8.28888 13.394 8.5076 13.1752L16.6743 5.00858C16.893 4.78986 17.1897 4.66699 17.4991 4.66699C17.8085 4.66699 18.1052 4.78986 18.3239 5.00858Z"
                fill="#A4A8B0"
              />
            </svg>
          </BackBtn>
          <Title>AI 피드백</Title>
          <div />
        </Header>

        <Body>
          {/* 매칭 요약 */}
          <SectionTitle>
            <SummaryIcon color={COLOR.primary} size={18} />
            매칭 요약
          </SectionTitle>
          <Card>
            <KV><K>상대 :</K><V>{match.partner}</V></KV>
            <KV><K>요청 사항 :</K><V>{match.request}</V></KV>
            <KV><K>기간 :</K><V>{match.period.start} ~ {match.period.end}</V></KV>
          </Card>

          {/* 성과 */}
          <SectionTitle>
            <ResultIcon color={COLOR.primary} size={18} />
            성과
          </SectionTitle>
          <Card>
            <KV><K>제출 :</K><V>기간 안 {results.submitted} 완료</V></KV>
            <KV><K>만족도 :</K><V>{results.satisfaction}</V></KV>
          </Card>

          {/* AI 분석 요약 */}
          <SectionTitle>
            <InfoIcon color={COLOR.primary} size={18} />
            AI 분석 요약
          </SectionTitle>
          <Card>
            <Quote>“{analysis}”</Quote>
          </Card>

          {/* 잘한 점 / 아쉬운 점 */}
          <SectionTitle>
            <StarIcon color={COLOR.primary} size={18} />
            잘한 점 / 아쉬운 점
          </SectionTitle>
          <Card>
            <KV><K>잘한 점 : </K><V>{pros.join(" · ")}</V></KV>
            <KV><K>아쉬운 점 :</K><V>{cons.join(" · ")}</V></KV>
          </Card>

          {/* 추천 사항 */}
          <SectionTitle>
            <BulbIcon color={COLOR.primary} size={18} />
            추천 사항
          </SectionTitle>
          <Card>
            <Quote>“{suggestions.join(" / ")}”</Quote>
          </Card>
        </Body>
      </Wrap>
    </Page>
  );
}
