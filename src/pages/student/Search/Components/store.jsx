// components/store/StoreDetailSection.jsx
import React from "react";
import styled from "styled-components";

const C = {
  primary: "#0080FF",
  line: "#E5E7EB",
  text: "#111",
  labelBlue: "#2563EB",
  heart: "#E84E4E",
};

/* 카드 전체 */
const Card = styled.section`
  border-radius: 14px;
  overflow: hidden;
  box-shadow: 3px 3px 8px rgba(0,0,0,.08);
  border: 1px solid ${C.line};
  background: #fff;
`;

/* 카드 밖 헤더: 제목 + 하트 */
const HeaderRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
  padding: 4px 2px;
`;

const StoreName = styled.h2`
  margin: 0 0 -5px 10px;
  font-size: 20px;
  font-weight: 600;
  line-height: 140%;
  letter-spacing: -0.5px;
  color: #000;
  font-family: Pretendard, system-ui, -apple-system, "Segoe UI", Roboto, Arial, sans-serif;
`;

const HeartBtn = styled.button`
  width: 36px;
  height: 36px;
  border: 0;
  background: transparent;
  display: grid;
  place-items: center;
  border-radius: 999px;
  cursor: pointer;
  &:active { transform: translateY(1px); }
  svg { width: 22px; height: 22px; }
`;

/* 대표 이미지 */
const Cover = styled.div`
  width: 100%;
  aspect-ratio: 16/10;
  background: #ddd
    url("https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=1200&auto=format&fit=crop")
    center/cover no-repeat;
`;

/* 상세 정보 (Figma 값 적용) */
const InfoBox = styled.div`
  padding: 12px 20px 16px;
  display: grid;
  gap: 8px;
`;

const KV = styled.div`
  display: grid;
  grid-template-columns: 88px 1fr;
  column-gap: 10px;
  align-items: center;
`;

const Label = styled.span`
  color: #0080FF;
  font-family: Pretendard, sans-serif;
  font-size: 12px;
  font-weight: 400;
  line-height: 140%;
  letter-spacing: -0.3px;
`;

const Value = styled.span`
  color: #000;
  font-family: Pretendard, sans-serif;
  font-size: 12px;
  font-weight: 400;
  line-height: 140%;
  letter-spacing: -0.3px;
`;

const HeartIcon = ({ filled }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="17" viewBox="0 0 20 17" fill="none" aria-hidden>
    <path
      d="M10 16L2.46368 8.96713C0.512105 7.14494 0.512105 4.18884 2.46368 2.36664C4.41526 0.544452 7.58421 0.544452 9.53579 2.36664L10 2.79903L10.4642 2.36664C12.4158 0.544452 15.5847 0.544452 17.5363 2.36664C19.4879 4.18884 19.4879 7.14494 17.5363 8.96713L10 16Z"
      fill={filled ? "#E84E4E" : "#FFFFFF"}
      stroke="#E84E4E"
      strokeWidth="1.5"
      strokeMiterlimit="10"
      strokeLinejoin="round"
    />
  </svg>
);

export default function StoreDetailSection({ store, liked, onToggleLike }) {
  const bizName =
    store?.name ?? store?.storeName ?? store?.bizName ?? "소상공인 상세정보";
  const ownerName =
    store?.ownerName ?? store?.ceo ?? store?.representative ?? "";
  const industry =
    store?.type ?? store?.industry ?? store?.category ?? "";
  const address =
    store?.address ?? store?.bizAddress ?? "";
  const imageUrl =
    store?.imageUrl ?? store?.coverUrl ?? store?.thumbnailUrl ?? "";

  return (
    <div>
      {/* 카드 위: 제목 + 하트 */}
      <HeaderRow>
        <StoreName>{bizName}</StoreName>
        <HeartBtn onClick={onToggleLike} aria-label="찜">
          <HeartIcon filled={liked} />
        </HeartBtn>
      </HeaderRow>

      {/* 카드 본문 */}
      <Card>
        <Cover style={imageUrl ? { backgroundImage: `url("${imageUrl}")` } : undefined} />
        <InfoBox>
          <KV><Label>업체명</Label><Value>{bizName}</Value></KV>
          <KV><Label>대표자명</Label><Value>{ownerName || "—"}</Value></KV>
          <KV><Label>업종</Label><Value>{industry || "—"}</Value></KV>
          <KV><Label>업체주소</Label><Value>{address || "—"}</Value></KV>
        </InfoBox>
      </Card>
    </div>
  );
}
