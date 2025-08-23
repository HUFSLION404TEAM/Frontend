import React, { useMemo, useRef, useState, useEffect } from "react";
import styled from "styled-components";
import Portfolio from "./Components/portfolio";
import Profile from "./Components/profile";
import Reviews from "./Components/review";
import Header from "./Components/header";
import ActionBar from "./Components/actionbar";


const C = {
  primary: "#0080FF",
  text: "#111",
  caption: "#505050",
  line: "#E9E9EB",
  bg: "#FFFFFF",
  chip: "#F5F7FA",
};

const HEADER_H = 56;
const TABS_H = 46;
const STICKY_GAP = HEADER_H + TABS_H;


const Page = styled.main`
  width: 100%;
  min-height: 100dvh;
  display: flex;
  justify-content: center;
  background: ${C.bg};
`;

const Wrap = styled.div`
  width: 100%;
  max-width: 390px;
  min-height: 100dvh;
  display: grid;
  grid-template-rows: auto auto 1fr;
  background: ${C.bg};
`;

// 탭 컨테이너: 중앙 정렬, 얇은 보더
const Tabs = styled.nav`
  position: sticky;
  top: ${HEADER_H}px;
  z-index: 9;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 67px;                 
  padding: 5px 10px;         
  background: ${C.bg};
  border-bottom: 1px solid #D9D9D9;
`;

// 탭 버튼: 텍스트만 보이고, active일 때만 언더라인
const Tab = styled.button`
  position: relative;
  padding: 0;
  border: 0;
  background: transparent;
  cursor: pointer;

  font-size: 12px;
  font-weight: 600;
  letter-spacing: -0.3px;
  line-height: 1.4;
  color: #000;                

  &:focus-visible::after {
    opacity: 1;
    height: 3px;
  }

  &::after {
    content: "";
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    bottom: -6px;             
    width: 54px;
    height: 2px;
    border-radius: 20px;
    background: ${C.primary};
    opacity: ${p => (p.active ? 1 : 0)};
    transition: opacity .15s ease, height .15s ease;
  }
`;

const Anchor = styled.div`
  height: 0;
  scroll-margin-top: ${STICKY_GAP}px;
`;


const Body = styled.div`
  position: relative;      
  overflow-y: auto;
  padding: 12px 12px 100px;
  display: flex;
  flex-direction: column;
  gap: 14px;
`;

export default function SearchOwnerDetail() {
  const [active, setActive] = useState(0);
  const [liked, setLiked] = useState(false);

  const bodyRef = useRef(null);
  const refProfile = useRef(null);
  const refPortfolio = useRef(null);
  const refReviews = useRef(null);
  const sections = useMemo(() => [refProfile, refPortfolio, refReviews], []);

  const goTo = (idx) => {
    setActive(idx);
    // 짧은 지연 후 스크롤하여 탭 상태가 먼저 업데이트되도록 함
    setTimeout(() => {
      sections[idx]?.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 10);
  };

  useEffect(() => {
    const root = bodyRef.current;
    if (!root) return;
    const BUFFER = 8;

    const pickActive = () => {
      const rootTop = root.getBoundingClientRect().top;
      const tops = sections.map((r) =>
        (r.current?.getBoundingClientRect().top ?? 0) - rootTop - STICKY_GAP
      );
      let idx = 0;
      for (let i = 0; i < tops.length; i++) {
        if (tops[i] <= BUFFER) idx = i;
      }
      setActive(idx);
    };

    pickActive();
    root.addEventListener("scroll", pickActive, { passive: true });
    return () => root.removeEventListener("scroll", pickActive);
  }, [sections]);

  // 더미 데이터
  const profile = useMemo(() => ({
    name: "김대학",
    temp: 36.5,
    univ: "한국외국어대학교 글로벌캠퍼스",
    major: "디지털 콘텐츠 학부",
    interest: "SNS 운영 · 제작",
    exp: "매칭 7회 · 경력 1년",
    intro: [
      "고객과의 소통을 중시하며, 메시지를 브랜드에 맞춰 정제합니다.",
      "포스터/배너/카드뉴스 등 다양한 지면 제작 경험.",
      "SNS 콘텐츠 운영 경험(Instagram, TikTok 중심).",
      "프로젝트 피드백 반영 속도 빠름.",
    ],
    skills: [
      "SNS 콘텐츠 제작(카드뉴스, 릴스)",
      "포토샵, 일러스트, 캔바 사용",
      "기획 문서 작성 및 간단한 촬영·편집",
      "인터뷰 요약/정리, 대화형 글쓰기",
    ],
  }), []);

  const portfolio = [
    { id: 1, brand: "컴포즈커피 용인 외대점", title: "디저트 메뉴 SNS 홍보", temp: 36.5 },
    { id: 2, brand: "컴포즈커피 용인 외대점", title: "여름 신메뉴 SNS 홍보 구인", temp: 37.5 },
  ];

  const score = 37.5;
  const quickNotes = [
  { text: "콘텐츠가 실제 가게 홍보에 도움이 되었어요.", count: 5 },
  { text: "소통과 응답 속도가 빨랐어요.", count: 4 },
  { text: "전문성과 창의성이 높은 콘텐츠를 제작해주었어요.", count: 4 },
  { text: "소상공인의 입장을 잘 이해하고 존중해주었어요.", count: 5 }, 
  { text: "피드백을 잘 수용하고, 반영해주었어요.", count: 3 },
];

  
  const reviews = [
    { id: 1, name: "정사장", date: "7months ago", text: "직접적인 소통을 통해 우리 브랜드 톤과 맞출 수 있어, 계절성 콘텐츠를 정확하게 제안해준 점이 특히 좋았습니다!" },
    { id: 2, name: "박대표", date: "6months ago", text: "가게 알아봐 주는 시선이 좋았고 의사소통 또한 원활. 제작물도 마감 내 잘 들어와 다음 캠페인도 함께 할 수 있겠단 확신이 들었습니다." },
    { id: 3, name: "박사장", date: "5months ago", text: "고객 입장에서 바라본 의견 덕분에 인사이트를 많이 얻음. 정리문장도 깔끔해서 추후 리뉴얼 때 아이디어로 바로 쓸 수 있었습니다!" },
  ];

  const onBack = () => window.history.back();
  const onLike = () => setLiked(v => !v);
  const onChat = () => alert("채팅으로 이동");
  const onLikeTop = () => setLiked((v) => !v);
  const onWish = () => alert(liked ? "찜 해제" : "찜 완료");

  return (
    <Page>
      <Wrap>

        <Header
          title="학생 포트폴리오 조회"
          liked={liked}
          onBack={onBack}
          onToggleLike={onLike}
        />

        <Tabs>
          {["학생 프로필", "포트폴리오", "매칭 후기"].map((t, i) => (
            <Tab
              key={t}
              active={active === i}
              onClick={() => goTo(i)}
              aria-selected={active === i}
              role="tab"
            >
              {t}
            </Tab>
          ))}
        </Tabs>



        <Body ref={bodyRef}>

          <Profile
            ref={refProfile} 
            stickyGap={STICKY_GAP} 
            profile={profile} 
          />

          <Portfolio
            anchorRef={refPortfolio}
            stickyGap={STICKY_GAP}
            items={portfolio}
          />

          <Reviews
            ref={refReviews}
            stickyGap={STICKY_GAP}
            score={score}
            notes={quickNotes}
            items={reviews}
          />

        </Body>

        <ActionBar
          liked={liked}
          onToggleLike={() => { onWish(); onLikeTop(); }}
          onChat={onChat}
        />

      </Wrap>
    </Page>
  );
}
