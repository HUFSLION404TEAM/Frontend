import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import StudentIcon from '../../../images/Select/student.svg';
import OwnerIcon from '../../../images/Select/owner.svg';

const COLORS = {
  primary: '#0080FF',
  second: '#1A96FE',
  text: '#000',
  cardShadow: 'rgba(0,0,0,0.08)',
};

const HEADER_HEIGHT = 64; // 헤더 높이

const Page = styled.main`
  width: 100%;
  min-height: 100dvh;
  background: #fff;
  display: flex;
  justify-content: center;
`;

const Wrap = styled.div`
  width: 100%;
  max-width: 390px;
  padding: 0 20px 40px;
  box-sizing: border-box;
`;

const HeaderSpacer = styled.div`
  height: ${HEADER_HEIGHT}px;
`;

const TitleWrap = styled.div`
  margin-top: 8px;
  margin-bottom: 18px;
  line-height: 30px;
  letter-spacing: -0.2px;
  font-family: Pretendard, sans-serif;

  .line1 {
    white-space: nowrap;
    font-weight: 700;
    font-size: 22px;
    color: ${COLORS.text};
    .brand {
      font-family: "Mungyeong Gamhong Apple";
      font-weight: 400;
      color: ${COLORS.second};
      margin-right: 6px;
    }
  }
  .line2 {
    display: block;
    font-weight: 700;
    font-size: 20px;
    color: ${COLORS.text};
  }
`;

const Card = styled.button`
  width: 100%;
  display: inline-flex;
  align-items: flex-end;
  gap: 49px;
  padding: 12px 36px 33px 28px;
  margin-top: 18px;
  background: linear-gradient(180deg, #FFFFFF 40%, #FFFFFF 60%);
  border-radius: 16px;
  border: 0;
  box-shadow: 3px 3px 8px 0 ${COLORS.cardShadow};
  cursor: pointer;
  text-align: left;
  transition: transform .08s ease, box-shadow .12s ease;
  &:active { transform: translateY(1px); }
  &:focus-visible {
    outline: 2px solid ${COLORS.primary};
    outline-offset: 2px;
  }
`;

const IconBox = styled.div`
  width: 62px;
  height: 75px;
  aspect-ratio: 62/73;
  border-radius: 12px;
  display: grid;
  place-items: center;
  margin-top: 5px;
  img {
    width: 62px;
    height: 73px;
    object-fit: contain;
  }
`;


const Copy = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const CardTitle = styled.div`
  color: #111;
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: 140%; 
  letter-spacing: -0.4px;
`;

const CardDesc = styled.p`
  margin: 0;
  color: #767676;
  font-family: Pretendard;
  font-size: 12px;
  font-style: normal;
  font-weight: 500;
  line-height: 140%; 
  letter-spacing: -0.3px;
`;

const Select = () => {
  const navigate = useNavigate();

  return (
    <Page>
      <Wrap>
        <HeaderSpacer />

        <TitleWrap>
          <span className="line1">
            <span className="brand">UniBiz</span>
            에서 어떻게 서비스를
          </span>
          <span className="line2">이용하고 싶으신가요?</span>
        </TitleWrap>

        <Card onClick={() => navigate('/onboarding/student')} aria-label="기획자로 활동 선택">
          <IconBox><img src={StudentIcon} alt="기획자 아이콘" /></IconBox>
          <Copy>
            <CardTitle>기획자로 활동</CardTitle>
            <CardDesc>
              내가 제안하는 기획과 포트폴리오로<br/> 좋은 결과물을 만들어보고 싶어요.
            </CardDesc>
          </Copy>
        </Card>

        <Card onClick={() => navigate('/onboarding/owner')} aria-label="소상공인으로 이용 선택">
          <IconBox><img src={OwnerIcon} alt="소상공인 아이콘" /></IconBox>
          <Copy>
            <CardTitle>소상공인으로 이용</CardTitle>
            <CardDesc>
              대학생 기획자를 통해 우리 가게의<br/> 새로운 홍보기회를 얻고 싶어요.
            </CardDesc>
          </Copy>
        </Card>
      </Wrap>
    </Page>
  );
};

export default Select;
