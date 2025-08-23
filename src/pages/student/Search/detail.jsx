import React, { useEffect, useMemo, useRef, useState } from "react";
import styled from "styled-components";
import Header from "../../student/Search/Components/header";
import StoreDetailSection from "./Components/store";
import StoreJobsSection from "./Components/job";
import Reviews from "../../student/Search/Components/review";
import ActionBar from "./Components/actionbar";

const C = {
  primary: "#0080FF",
  second: "#1A96FE",
  text: "#111",
  caption: "#6B7280",
  line: "#E5E7EB",
  bg: "#FFFFFF",
  chip: "#F5F7FA",
  heart: "#FF4D6D",
};

const HEADER_H = 56;
const TABS_H = 46;
const STICKY_GAP = HEADER_H + TABS_H;

const Page = styled.main`
  width: 100%;
  min-height: 100dvh;
  background: ${C.bg};
  display: flex;
  justify-content: center;
`;

const Wrap = styled.div`
  width: 100%;
  max-width: 390px;
  min-height: 100dvh;
  display: grid;
  grid-template-rows: auto auto 1fr;
  background: ${C.bg};
`;

/* Tabs */
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

const Tab = styled.button`
  position: relative;
  padding: 0;
  border: 0;
  background: transparent;
  cursor: pointer;

  font-size: 12px;
  font-weight: 600;
  letter-spacing: -0.3px;
  line-height: 2;
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
    width: 60px;
    height: 2px;
    border-radius: 20px;
    background: ${C.primary};
    opacity: ${p => (p.active ? 1 : 0)};
    transition: opacity .15s ease, height .15s ease;
  }
`;

/* Body scroll */
const Body = styled.div`
  overflow-y: auto;
  padding: 12px 12px 96px;
  display: flex;
  flex-direction: column;
  gap: 14px;
`;

/* Sections */
const Anchor = styled.div`
  height: 3px;
  scroll-margin-top: ${STICKY_GAP}px;
`;


export default function SearchStudentDetail() {
  const bodyRef = useRef(null);
  const refDetail = useRef(null);
  const refJobs = useRef(null);
  const refReviews = useRef(null);
  const sections = useMemo(() => [refDetail, refJobs, refReviews], []);

  const [active, setActive] = useState(0);
  const [liked, setLiked] = useState(false);

  const goTo = (idx) => {
      sections[idx]?.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      setActive(idx);
    };
  
    useEffect(() => {
      const root = bodyRef.current;
      if (!root) return;
      const BUFFER = 8;
  
      const pickActive = () => {
        const tops = sections.map((r) => {
        const el = r.current;
        if (!el) return Infinity;
        const elTop = el.getBoundingClientRect().top;
        const rootTop = root.getBoundingClientRect().top;
        return elTop - rootTop - STICKY_GAP;
      });
        let idx = 0;
        for (let i = 0; i < tops.length; i++) {
          if (tops[i] <= BUFFER) idx = i;
        }
        setActive(idx);
      };
  
      pickActive();
      root.addEventListener("scroll", pickActive, { passive: true });
      return () => root.removeEventListener("scroll", pickActive);
    }, [sections, STICKY_GAP]);

  // 더미 데이터 (스크린샷 느낌)
  const store = useMemo(() => ({
    name: "소상공인 상세정보",
    contact: "웹프로자격 인증 업체",
    category: "커피",
    type: "카페",
    address: "경기도 용인시 처인구 모현읍 오산로 32",
    posts: [
      { id: 1, title: "디저트 메뉴 SNS 홍보 구인", price: 3000, unit: "원", status: "NEW", ago: "1 day ago", liked: true },
      { id: 2, title: "여름 신메뉴 SNS 홍보 구인", price: 2000, unit: "원", status: "", ago: "6 months ago", liked: false },
      { id: 3, title: "디저트 신메뉴 SNS 홍보 구인", price: 3000, unit: "원", status: "", ago: "7 months ago", liked: false },
    ],
    score: 37.5,
    quickNotes: [
      { text: "맞춤형 인사이트를 잘줘요.", count: 5 },
      { text: "지적 재산에 체계적으로 접근했어요.", count: 4 },
      { text: "새로운 관점이 쉽게 개선사항을 찾아요.", count: 4 },
      { text: "협업 경험을 사례로 공유해주었어요.", count: 5 },
      { text: "진정성 있는 피드백을 제공해주었어요.", count: 3 },
    ],
    reviews: [
      { id: 1, name: "김대표", date: "7months ago", text: "정성껏 만든 콘텐츠 덕분에 ..." },
      { id: 2, name: "박대표", date: "6months ago", text: "톤앤매너를 정확히 ..." },
    ],
  }), []);

  const scorePct = Math.min(100, Math.max(0, (store.score / 40) * 100));

  const onBack = () => window.history.back();
  const onLikeTop = () => setLiked((v) => !v);
  const onWish = () => alert(liked ? "찜 해제" : "찜 완료");
  const onChat = () => alert("채팅으로 이동");

  return (
    <Page>
      <Wrap>
        {/* Header */}
        <Header title="프로필" onBack={onBack} />
        
        <Tabs>
          {["소상공인 상세정보", "공고", "매칭 후기"].map((t, i) => (
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

        {/* Body */}
        <Body ref={bodyRef}>
          {/* 상세정보 섹션 */}
          <Anchor ref={refDetail} />
          <StoreDetailSection
            store={{
              name: "소상공인 상세정보",
              ownerName: "김커피",
              type: "카페 | 음료점업",
              address: "경기도 용인시 처인구 모현읍 외대로 32",
              imageUrl: "https://.../photo.jpg",
            }}
            liked={liked}
            onToggleLike={() => setLiked(v => !v)}
          />


          {/* 공고 섹션 */}
          <Anchor ref={refJobs} />
          <StoreJobsSection
            posts={store.posts}
            onToggleLike={(post) => {
              post.liked = !post.liked;
            }}
          />

          {/* 매칭 후기 섹션 */}
          <Anchor ref={refReviews} />
          <Reviews
            stickyGap={STICKY_GAP}
            score={store.score}
            notes={store.quickNotes}
            items={store.reviews}
          />
        </Body>

        {/* 액션 바 */}
        <ActionBar
          liked={liked}
          onToggleLike={() => { onWish(); onLikeTop(); }}
          onChat={onChat}
        />
      </Wrap>
    </Page>
  );
}
