import React from "react";
import styled from "styled-components";

const C = {
  primary: "#0080FF",
  text: "#111111",
  caption: "#767676",
  line: "#E9E9EB",
  bubbleMe: "#0080FF",
  bubbleYou: "#F1F1F3",
};

const Scroll = styled.div`
  overflow-y: auto;
  padding: 12px 12px 8px;
  display: flex;
  flex-direction: column;
  gap: 14px;
`;

const MsgRow = styled.div`
  display: flex;
  gap: 8px;
  align-items: flex-end;
  justify-content: ${p => (p.me ? "flex-end" : "flex-start")};
`;

const Avatar = styled.div`
  width: 35px;
  height: 35px;
  border-radius: 50%;
  background: #d9d9d9;
  flex: 0 0 auto;
  display: ${p => (p.hidden ? "none" : "block")};
`;

const Stack = styled.div`
  display: flex;
  flex-direction: column;
  align-items: ${p => (p.me ? "flex-end" : "flex-start")};
  gap: 5px;
`;

const Bubble = styled.div`
  max-width: 288px;
  padding: 10px 12px;
  border-radius: 10px;
  font-weight: 400;
  font-size: 12px;
  line-height: 1.4;
  color: ${p => (p.me ? "#fff" : "#000")};
  background: ${p => (p.me ? C.bubbleMe : C.bubbleYou)};
  text-align: left;
  white-space: pre-wrap;
  word-break: break-word;
`;

const OutlineBtn = styled.button`
  padding: 5px 10px;
  border: 1px solid ${C.primary};
  background: #fff;
  color: ${C.text};
  font-size: 12px;
  gap: 10px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const Time = styled.span`
  font-size: 10px;
  color: ${C.caption};
  margin: 0 4px;
`;

export default function Messages({
  messages,
  scrollRef,
  applicationLabel = "의뢰서 확인",
  onClickApplication,
}) {
  return (
    <Scroll ref={scrollRef}>
      {messages.map(m => (
        <MsgRow key={m.id} me={m.me}>
          <Avatar hidden={m.me} />
          <Stack me={m.me}>
            {!m.me && m.text === applicationLabel ? (
              <OutlineBtn onClick={onClickApplication}>
                {applicationLabel}
              </OutlineBtn>
            ) : (
              <Bubble me={m.me}>{m.text}</Bubble>
            )}
            {m.time && <Time>{m.time}</Time>}
          </Stack>
        </MsgRow>
      ))}
    </Scroll>
  );
}
