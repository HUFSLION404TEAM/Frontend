import React from "react";
import styled from "styled-components";

const COLORS = { primary: "#0080FF", line: "#E9E9EB" };

const Wrap = styled.div`
  height: 70px;
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 10px 20px;
  width: calc(100% - 50px);
  justify-self: center;
  flex-shrink: 0;
  border-radius: 0 0 16px 16px;
  background: linear-gradient(180deg, rgba(255,255,255,0.40) 0%, rgba(255,255,255,0.60) 100%);
  box-shadow: 3px 3px 8px 0 rgba(0,0,0,0.08);
  border-bottom: 1px solid ${COLORS.line};

`;

const Block = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  flex: 1 0 0;
`;

const Title = styled.div`
  color: #111;
  font-size: 13px;   
  font-weight: 600;
  line-height: 140%;
  letter-spacing: -0.3px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 12px;
  line-height: 140%;
`;

const Price = styled.span`
  color: #767676;
  font-family: Pretendard;
  font-size: 12px;
  font-style: normal;
  font-weight: 700;
  line-height: 140%;
  letter-spacing: -0.3px;
`;

const Unit = styled.span`
  color: #767676;
  font-family: Pretendard;
  font-size: 8px;
  font-style: normal;
  font-weight: 500;
  line-height: 140%; 
  letter-spacing: -0.2px;
`;

const Status = styled.span`
  color: #767676;
  font-family: Pretendard;
  font-size: 12px;
  font-style: normal;
  font-weight: 500;
  line-height: 140%;
  letter-spacing: -0.3px;
`;

const Dot = styled.span`
  color: #d9d9d9;
  user-select: none;
`;

function formatPrice(price) {
  if (price == null || price === "") return "";
  if (typeof price === "number") return `₩${price.toLocaleString()}`;
  const s = String(price).trim();
  return s.startsWith("₩") ? s : `₩${s}`;
}

export default function InfoBar({
  title = "디저트 메뉴 SNS 홍보 구인",
  price = 3000,         
  unit = "건당",
  status = "모집 중",
}) {
  return (
    <Wrap>
      <Block>
        <Title>{title}</Title>
        <Row>
          <Price>{formatPrice(price)}</Price>
          <Unit>{unit}</Unit>
          <Dot>·</Dot>
          <Status>{status}</Status>
        </Row>
      </Block>
    </Wrap>
  );
}
