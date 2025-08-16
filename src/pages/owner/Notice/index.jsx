import React, { useState } from 'react';
import styled from 'styled-components';
import ModalOwner from '../../owner/Notice/Components/Modal';
import ProfileModalOwner from '../../owner/Notice/Components/ProfileModal';

const COLORS = { 
  primary: '#0080FF', 
  caption: '#8B8B8B', 
  text: '#000',
  cardShadow: 'rgba(0,0,0,0.25)',
};

const Page = styled.main`
  width: 100%;
  min-height: 100dvh;
  display: flex;
  justify-content: center;
  background: #fff;
`;

const Wrap = styled.div`
  width: 100%;
  max-width: 390px;
  padding: 0 16px 24px;
  box-sizing: border-box;
`;

const Header = styled.header`
  position: sticky;
  top: 0;
  height: 64px;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Title = styled.h1`
  margin: 0;
  font-size: 25px;
  font-weight: 700;
  margin-top: 14px;
  color: ${COLORS.text};
`;

const CloseBtn = styled.button`
  width: 30px;
  height: 30px;
  border: 0;
  background: transparent;
  cursor: pointer;
  display: grid;
  place-items: center;

  svg {
    width: 20px;
    height: 20px;
  }
`;

const List = styled.div`
  display: flex;
  flex-direction: column;
  gap: 18px;
  padding-bottom: 25px;
`;

const Card = styled.div`
  width: 340px;
  min-height: 70px;
  margin: 15px auto -10px;
  padding: 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  background: rgba(255,255,255,0.96);
  border-radius: 8px;
  box-shadow: 0 4px 10px 0 ${COLORS.cardShadow};
`;

const Msg = styled.p`
  margin: 0;
  color: ${COLORS.caption};
  font-size: 14px;
  line-height: 20px;
  flex: 1;
`;

const Btns = styled.div`
  display: inline-flex;
  gap: 8px;
`;

const OutlineBtn = styled.button`
  height: 32px;
  padding: 0 12px;
  border-radius: 8px;
  border: 1px solid ${COLORS.primary};
  background: #fff;
  color: ${COLORS.primary};
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;

  &:active {
    transform: translateY(1px);
  }
`;

export default function NoticeOwner() {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(null);

  const items = [
    { 
      id:1, 
      text:'000님께 요청을 보냈습니다.', 
      actions:['프로필 보기','수락','거절'],
      profile:{ name:'000님', 
      birth:'2004.08.04(22)', 
      school:'한국외국어대학교(재학)', 
      major:'경영학과', 
      temp: '15°C' } 
    },
  ];

  const onAction = (item, action) => {
    if (action === '프로필 보기') { setSelected(item.profile); setOpen(true); return; }
  };

  return (
    <Page>
      <Wrap>
        <Header>
          <Title>알림</Title>
          <CloseBtn onClick={() => window.history.back()}>
            <svg viewBox="0 0 24 24" fill="none" stroke="#9A9AA0" strokeWidth="2" strokeLinecap="round">
              <path d="M6 6L18 18M18 6L6 18" />
            </svg>
          </CloseBtn>
        </Header>

        <List>
          {items.map(item => (
            <Card key={item.id}>
              <Msg>{item.text}</Msg>
              <Btns>
                {item.actions.map(label => (
                  <OutlineBtn key={label} onClick={() => onAction(item, label)}>{label}</OutlineBtn>
                ))}
              </Btns>
            </Card>
          ))}
        </List>

        <ModalOwner open={open} onClose={() => setOpen(false)}>
          <ProfileModalOwner data={selected} />
        </ModalOwner>
      </Wrap>
    </Page>
  );
}
