import styled from "styled-components";
import React, { useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const C = {
  primary: "#0080FF",
  text: "#000000",
  caption: "#505050",
  fieldLine: "#0080FF",
  line: "#E9E9EB",
  bg: "#FFFFFF",
};

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
  grid-template-rows: auto 1fr;
`;

const Header = styled.header`
  position: sticky;
  top: 0;
  z-index: 10;
  height: 64px;
  display: grid;
  grid-template-columns: 64px 1fr 64px;
  align-items: center;
  background: ${C.bg};
  border-bottom: 1.5px solid ${C.primary};
`;

const IconBtn = styled.button`
  height: 100%;
  display: grid;
  place-items: center;
  border: 0;
  background: transparent;
  cursor: pointer;
  svg { width: 26px; height: 26px; }
`;

const Title = styled.h1`
  margin: 0;
  text-align: center;
  font-size: 20px;
  font-weight: 800;
  color: ${C.text};
`;

const Body = styled.div`
  overflow-y: auto;
  padding: 18px 12px 28px;
  display: flex;
  flex-direction: column;
  gap: 26px;
`;

const Section = styled.section`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const SectionTitle = styled.h2`
  margin: 0;
  color: ${C.primary};
  font-size: 12px;
  font-weight: 700;
`;

const Field = styled.label`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Label = styled.span`
  color: ${C.caption};
  font-size: 8px;
  font-weight: 600;
  letter-spacing: -0.3px;
`;

const Input = styled.input`
  width: 336px;
  height: 30px;                 
  padding: 6px 10px;
  border-radius: 3px;
  border: 1px solid ${C.fieldLine};
  outline: none;
  font-size: 15px;
  background: #FFF;
`;

const Textarea = styled.textarea`
  width: 336px;
  height: ${(p) => p.h ? `${p.h}px` : "120px"}; 
  padding: 10px 12px;
  border-radius: 3px;
  border: 1px solid ${C.fieldLine};
  outline: none;
  font-size: 15px;
  line-height: 1.45;
  resize: vertical;
`;

const FileRow = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
`;

const FileBtn = styled.button`
  height: 32px;
  padding: 5px 13px;
  border: 0;
  border-radius: 14px;
  background: ${C.primary};
  color: #fff;
  font-size: 10px;
  font-weight: 400;
  cursor: pointer;
  letter-spacing: -0.2px;
`;

const FileChip = styled.span`
  padding: 6px 10px;
  border: 1px solid ${C.line};
  border-radius: 999px;
  font-size: 12px;
  background: #fff;
  color: ${C.caption};
`;

/* ===== Select (보상 방식) ===== */
const SelectWrap = styled.div`
  position: relative;
`;
const SelectBtn = styled.button`
  width: 160px;
  height: 42px;
  padding: 0 14px;
  border-radius: 8px;
  border: 0;
  background: ${C.primary};
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
`;

const ActionBar = styled.div`
  padding: 20px 12px 40px;   
`;

const Actions = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 7px;
`;

const BtnBase = styled.button`
  flex: 1 0 0;
  min-height: 48px;
  text-align: center;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  letter-spacing: -0.4px;
  cursor: pointer;
`;

const GhostBtn = styled(BtnBase)`
  background: #fff;
  color: ${C.primary};
  border: 1px solid ${C.primary};
`;

const SolidBtn = styled(BtnBase)`
  background: ${C.primary};
  color: #fff;
  border: 1px solid ${C.primary};
  box-shadow: 10px 10px 30px rgba(0,0,0,.12);
`;



export default function Request() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "머로 하지~",
    overview: "",
    problem: "",
    background: "",
    taskDetail: "",
    expected: "",
    scope: "",
    expected2: "",
    scope2: "",
  });


  const [filesTop, setFilesTop] = useState([]);
  const [filesBottom, setFilesBottom] = useState([]);
  const fileInputTop = useRef(null);
  const fileInputBottom = useRef(null);

  const onPickTop = () => fileInputTop.current?.click();
  const onPickBottom = () => fileInputBottom.current?.click();
  const onFiles = (setter) => (e) => {
    const list = Array.from(e.target.files || []);
    if (!list.length) return;
    setter((prev) => [...prev, ...list.map(f => ({ name: f.name, size: f.size }))]);
    e.target.value = "";
  };


  const setVal = (k) => (e) => setForm((p) => ({ ...p, [k]: e.target.value }));

  const onAccept = () => alert("매칭 수락 (동작 연결 예정)");
  const onReject = () => alert("매칭 거절 (동작 연결 예정)");

  return (
    <Page>
      <Wrap>

        <Header>
          <IconBtn aria-label="뒤로" onClick={() => navigate(-1)}>
            <svg viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M18 22L10 14L18 6" stroke="#A4A8B0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </IconBtn>
          <Title>의뢰서</Title>
        </Header>

        <Body>
          <Section>
            <SectionTitle>프로젝트 기본 정보</SectionTitle>

            <Field>
              <Label>프로젝트 제목</Label>
              <Input value={form.title} onChange={setVal("title")} placeholder="제목을 입력하세요" />
            </Field>

            <Field>
              <Label>프로젝트 개요</Label>
              <Textarea h={70} value={form.overview} onChange={setVal("overview")} />
            </Field>

            <Field>
              <Label>해결하고 싶은 문제 및 목표</Label>
              <Textarea h={70} value={form.problem} onChange={setVal("problem")} />
            </Field>

            <Field>
              <Label>프로젝트 배경 및 필요성</Label>
              <Textarea h={70} value={form.background} onChange={setVal("background")} />
            </Field>
          </Section>

          {/* 세부 기획 내용 */}
          <Section>
            <SectionTitle>세부 기획 내용</SectionTitle>

            <Field>
              <Label>구체적인 업무 내용</Label>
              <Textarea h={70} value={form.taskDetail} onChange={setVal("taskDetail")} />
            </Field>

            <Field>
              <Label>기대 결과물</Label>
              <Textarea h={70} value={form.expected} onChange={setVal("expected")} />
            </Field>

            <Field>
              <Label>세부 업무 범위 및 요구사항</Label>
              <Textarea h={70} value={form.scope} onChange={setVal("scope")} />
            </Field>

            <Field>
              <Label>참고자료</Label>
              <FileRow>
                <FileBtn type="button" onClick={onPickTop}>파일 첨부하기</FileBtn>
                <input ref={fileInputTop} type="file" multiple hidden onChange={onFiles(setFilesTop)} />
                {filesTop.map((f, i) => (
                  <FileChip key={`${f.name}-${i}`}>{f.name}</FileChip>
                ))}
              </FileRow>
            </Field>
          </Section>

          {/* 프로젝트 조건 */}
          <Section>
            <SectionTitle>프로젝트 조건</SectionTitle>

            <Field>
              <Label>기대 결과물</Label>
              <Textarea h={160} value={form.expected2} onChange={setVal("expected2")} />
            </Field>

            <Field>
              <Label>세부 업무 범위 및 요구사항</Label>
              <Textarea h={160} value={form.scope2} onChange={setVal("scope2")} />
            </Field>
          </Section>
        </Body>

        <ActionBar>
          <Actions>
            <GhostBtn type="button" onClick={onAccept}>매칭 수락</GhostBtn>
            <SolidBtn type="button" onClick={onReject}>매칭 거절</SolidBtn>
          </Actions>
        </ActionBar>
      </Wrap>
    </Page>
  );
}
