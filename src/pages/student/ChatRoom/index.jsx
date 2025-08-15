// src/pages/student/ChatRoom/index.jsx
import React, { useRef, useEffect, useState, useMemo } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import ChatHeader from "../../student/ChatRoom/Components/ChatHeader";
import InfoBar from "../../student/ChatRoom/Components/InfoBar";
import Messages from "../../student/ChatRoom/Components/Messages";
import InputBar from "../../student/ChatRoom/Components/InputBar";
import ActionSheet from "../../student/ChatRoom/Components/ActionSheet";

const C = {
  primary: "#0080FF",
  text: "#111111",
  caption: "#767676",
  line: "#E9E9EB",
  bubbleMe: "#0080FF",
  bubbleYou: "#F1F1F3",
  sheetBg: "#FFFFFF",
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
  display: grid;
  grid-template-rows: auto auto 1fr auto;
  min-height: 100dvh;
  position: relative;
  overflow: hidden;
`;

/* ===== 더미데이터 ===== */
const SAMPLE = [
  { id: 1, me: true,  text: "안녕하세요, 반갑습니다!\n구인 공고 보고 연락드렸습니다.지원 가능할까요?", time: "오전 09:00" },
  { id: 2, me: false, text: "안녕하세요, 반갑습니다!\n살펴보고 연락 드리겠습니다!", time: "오전 09:05" },
  { id: 3, me: false, text: "컴포즈커피 용인외대점 님이 매칭을 신청했습니다.", time: "오전 10:00" },
  { id: 4, me: false, text: "의뢰서 확인", time: "" },
  { id: 5, me: true,  text: "기획 전 특별히 요구하시는 사안 있으시면 말씀해주세요!", time: "오전 10:10" },
];

export default function ChatRoomStudent() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { roomId } = useParams();

  const [messages, setMessages] = useState(SAMPLE);
  const [text, setText] = useState("");
  const [sheetOpen, setSheetOpen] = useState(false);

  const peerName = useMemo(
    () => state?.peerName || `소상공인 #${roomId}`,
    [state, roomId]
  );

  // 새 InfoBar용 공고 정보 (state.job 있으면 사용)
  const job = useMemo(
    () =>
      state?.job ?? {
        title: "디저트 메뉴 SNS 홍보 구인",
        price: 3000,
        unit: "건당",
        status: "모집 중",
      },
    [state]
  );

  const scroller = useRef(null);

  useEffect(() => { setSheetOpen(false); }, []);
  useEffect(() => {
    scroller.current?.scrollTo({
      top: scroller.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, sheetOpen]);

  const send = () => {
    const t = text.trim();
    if (!t) return;
    setMessages(prev => [
      ...prev,
      { id: Date.now(), me: true, text: t, time: "지금" },
    ]);
    setText("");
  };

  const handleAction = (key) => {
    setSheetOpen(false);
    alert(key);
  };

  return (
    <Page>
      <Wrap>
        <ChatHeader
          title={peerName}
          borderColor={C.primary}
          onBack={() => navigate(-1)}
        />

        {/* 새 props 형태에 맞춰 전달 */}
        <InfoBar
          title={job.title}
          price={job.price}
          unit={job.unit}
          status={job.status}
        />

        <Messages
          messages={messages}
          scrollRef={scroller}
          applicationLabel="의뢰서 확인"
          onClickApplication={() => alert("의뢰서 상세로 이동")}
        />

        <InputBar
          value={text}
          onChange={(e) => setText(e.target.value)}
          onFocus={() => setSheetOpen(false)}
          onPlusClick={() => setSheetOpen(v => !v)}
          onSend={send}
        />

        <ActionSheet
          open={sheetOpen}
          onClose={() => setSheetOpen(false)}
          onAction={handleAction}
        />
      </Wrap>
    </Page>
  );
}
