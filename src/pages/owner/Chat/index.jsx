import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const COLORS = {
  primary: '#0080FF',
  text: '#000000',
  caption: '#767676',
  line: '#D9D9D9',          
  badgeText: '#FFFFFF',
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
  box-sizing: border-box;
`;

const Header = styled.header`
  position: sticky;
  top: 0;
  z-index: 10;
  height: 64px;
  background: #fff;
  display: grid;
  grid-template-columns: 64px 1fr 64px;
  align-items: center;
  border-bottom: 1.5px solid ${COLORS.primary};
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
  font-weight: 800;
  color: ${COLORS.text};
`;

const List = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0 0 16px;
`;

const Row = styled.li`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 20px;
  border-bottom: 1px solid ${COLORS.line};
  cursor: pointer;

  &:active { transform: translateY(1px); }
`;

const Avatar = styled.div`
  flex: 0 0 auto;
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background: #b9bbc1;
`;

const Body = styled.div`
  flex: 1 1 auto;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const Name = styled.div`
  font-size: 18px;
  font-weight: 700;
  color: ${COLORS.text};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Preview = styled.div`
  font-size: 14px;
  color: ${COLORS.caption};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Meta = styled.div`
  flex: 0 0 auto;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: center;
  gap: 8px;
  padding-left: 8px;
`;

const Time = styled.span`
  font-size: 12px;
  color: ${COLORS.caption};
`;

const Badge = styled.span`
  width: 23px;                
  height: 23px;
  border-radius: 50%;
  background: ${COLORS.primary};
  color: ${COLORS.badgeText};
  font-size: 11px;
  font-weight: 700;
  display: inline-flex;        
  align-items: center;
  justify-content: center;
  line-height: 1;            
`;

function ChatRow({ item, onClick }) {
  const handleActivate = () => onClick?.(item);
  const handleKey = (e) => {
    if (e.key === 'Enter' || e.key === ' ') handleActivate();
  };

  const unreadText = item.unread > 9 ? '9+' : String(item.unread);

  return (
    <Row role="button" tabIndex={0} onClick={handleActivate} onKeyDown={handleKey}>
      <Avatar />
      <Body>
        <Name>{item.name}</Name>
        <Preview>{item.preview}</Preview>
      </Body>
      <Meta>
        <Time>{item.timeLabel}</Time>
        {item.unread > 0 && <Badge aria-label={`안읽은 메시지 ${unreadText}개`}>{unreadText}</Badge>}
      </Meta>
    </Row>
  );
}

const SAMPLE = [
  { id: 1, name: '대학생 A', preview: '감사합니다!', timeLabel: '오전 11:09', unread: 1 },
  { id: 2, name: '대학생 B', preview: '최종본 전달 드립니다!', timeLabel: '오전 10:07', unread: 1 },
  { id: 3, name: '대학생 C', preview: '감사합니다!', timeLabel: 'Yesterday', unread: 1 },
  { id: 4, name: '대학생 D', preview: '감사합니다!', timeLabel: '오전 11:09', unread: 12 },
  { id: 5, name: '대학생 E', preview: '감사합니다!', timeLabel: '오전 11:09', unread: 0 },
  { id: 6, name: '대학생 F', preview: '감사합니다!', timeLabel: '오전 11:09', unread: 7 },
];

export default function ChatStudent() {
  const navigate = useNavigate();
  const onBack = () => window.history.back();
  const onOpenRoom = (item) =>
    navigate(`/owner/chat/${item.id}`, { state: { peerName: item.name } });

  return (
    <Page>
      <Wrap>
        <Header>
          <BackBtn aria-label="뒤로" onClick={onBack}>
            <svg viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M18.3239 5.00858C18.5427 5.22736 18.6655 5.52405 18.6655 5.83341C18.6655 6.14277 18.5427 6.43946 18.3239 6.65824L10.9821 14.0001L18.3239 21.3419C18.5365 21.5619 18.654 21.8566 18.6514 22.1625C18.6487 22.4684 18.526 22.7611 18.3097 22.9774C18.0934 23.1937 17.8008 23.3164 17.4949 23.319C17.189 23.3217 16.8943 23.2041 16.6743 22.9916L8.5076 14.8249C8.28888 14.6061 8.16602 14.3094 8.16602 14.0001C8.16602 13.6907 8.28888 13.394 8.5076 13.1752L16.6743 5.00858C16.893 4.78986 17.1897 4.66699 17.4991 4.66699C17.8085 4.66699 18.1052 4.78986 18.3239 5.00858Z"
                fill="#A4A8B0"
              />
            </svg>
          </BackBtn>
          <Title>채팅</Title>
          <div />
        </Header>

        <List>
          {SAMPLE.map((item) => (
            <ChatRow key={item.id} item={item} onClick={onOpenRoom} />
          ))}
        </List>
      </Wrap>
    </Page>
  );
}
