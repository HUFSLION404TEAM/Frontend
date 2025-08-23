import styled from "styled-components";
import React, { useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const C = {
  primary: "#0080FF",
  text: "#000",
  caption: "#505050",
  line: "#E9E9EB",
  fieldLine: "#0080FF",
  bg: "#fff",
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
  grid-template-rows: auto 1fr auto;
`;

const Header = styled.header`
  position: sticky;
  top: 0;
  z-index: 10;
  height: 64px;
  display: grid;
  grid-template-columns: 64px 1fr 64px;
  align-items: center;
  border-bottom: 1.5px solid ${C.primary};
  background: ${C.bg};
`;

const IconBtn = styled.button`
  height: 100%;
  display: grid;
  place-items: center;
  background: transparent;
  border: 0;
  cursor: pointer;
  svg { width: 28px; height: 28px; }
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
  padding: 20px 12px 28px;
  display: flex;
  flex-direction: column;
  gap: 28px;
`;

const Section = styled.section`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const SectionTitle = styled.h2`
  margin: 0;
  color: ${C.primary};
  font-size: 17px;
  font-weight: 700;
`;

const Field = styled.label`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Label = styled.span`
  color: ${C.caption};
  font-size: 10px;
  font-weight: 400;
  letter-spacing: -0.2px;
`;

const Input = styled.input`
  width: 336px;
  height: 20px;
  align-self: stretch;
  padding: 12px 14px;
  border: 1px solid ${C.fieldLine};
  outline: none;
  font-size: 16px;
  border-radius: 3px;
  background: #FFF;
`;

const Textarea = styled.textarea`
  width: 336px;
  min-height: ${p => p.rows ? `${p.rows * 24}px` : "120px"};
  padding: 12px 14px;
  border-radius: 8px;
  border: 1px solid ${C.fieldLine};
  outline: none;
  font-family: Pretendard;
  font-size: 10px;
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

const SelectWrap = styled.div`
  position: relative;
`;

const SelectBtn = styled.button`
  width: 100%;
  height: 48px;
  padding: 0 14px;
  border-radius: 8px;
  border: 1px solid ${C.fieldLine};
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 15px;
  cursor: pointer;
`;

const Menu = styled.div`
  position: absolute;
  left: 0; right: 0; top: calc(100% + 6px);
  background: #fff;
  border: 1px solid ${C.line};
  border-radius: 10px;
  box-shadow: 0 8px 24px rgba(0,0,0,.08);
  overflow: hidden;
  z-index: 20;
`;

const Item = styled.button`
  width: 100%;
  padding: 12px 14px;
  text-align: left;
  background: #fff;
  border: 0;
  cursor: pointer;
  font-size: 15px;
  &:hover { background: #F7F8FA; }
`;

const SubmitBar = styled.div`
  padding: 20px 12px 28px;
  background: linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,.04) 100%);
`;

const SubmitBtn = styled.button`
  width: 220px;
  padding: 12px 0 13px 0;
  justify-content: center;
  align-items: center;
  display: block;            
  margin: 20px auto 32px;    

  border: 0;
  border-radius: 8px;
  background: #1A96FE;                
  box-shadow: 10px 10px 30px 0 rgba(0,0,0,0.12);
  color: #F3F4F6;

  cursor: pointer;
  text-align: center;
  font-family: Pretendard, system-ui, -apple-system, sans-serif;
  font-size: 16px;
  font-weight: 600;
  line-height: 20px;
  letter-spacing: -0.5px;

  &:active {
    transform: translateY(1px);
    box-shadow: 6px 6px 18px rgba(0,0,0,0.12);
  }
  &:disabled {
    opacity: .5;
    cursor: default;
    box-shadow: none;
  }
`;


const formatPhone = (raw) => {
  const s = String(raw).replace(/[^\d]/g, "").slice(0, 11);
  if (s.length < 4) return s;
  if (s.length < 8) return `${s.slice(0,3)}-${s.slice(3)}`;
  return `${s.slice(0,3)}-${s.slice(3,7)}-${s.slice(7)}`;
};

export default function Apply() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "김대학",
    univ: "한국외국어대학교 (글로벌)",
    major: "컴퓨터공학부",
    phone: "010-1234-5678",
    email: "hufsstudent@gmail.com",
    area: "",
    expSubject: "",
    certs: "",
    awards: "",
    languages: "",
    related: "",
    motive: "",
    understanding: "",
    growth: "",
    hopePeriod: "",
    hopeDaily: "",
    hopePay: "",
    workType: "", 
    etcMemo: "",
  });

  const [files, setFiles] = useState([]);
  const fileInputRef = useRef(null);

  const [workOpen, setWorkOpen] = useState(false);
  const workLabel = useMemo(
    () => form.workType || "선택하기",
    [form.workType]
  );

  const set = (k) => (e) =>
    setForm((prev) => ({ ...prev, [k]: e.target.value }));

  const onPhone = (e) =>
    setForm((prev) => ({ ...prev, phone: formatPhone(e.target.value) }));

  const onPickFile = () => fileInputRef.current?.click();
  const onFiles = (e) => {
    const list = Array.from(e.target.files || []);
    if (!list.length) return;
    setFiles((prev) => [...prev, ...list.map((f) => ({ name: f.name, size: f.size }))]);
    e.target.value = ""; 
  };

  const submit = (e) => {
    e.preventDefault();
    console.log("신청서 제출:", { ...form, files });
    alert("제출 완료! (콘솔을 확인하세요)");
  };

  return (
    <Page>
      <Wrap as="form" onSubmit={submit}>
        <Header>
          <IconBtn aria-label="뒤로" onClick={() => navigate(-1)}>
            <svg viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M18 22L10 14L18 6" stroke="#A4A8B0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </IconBtn>
          <Title>기본 정보 작성</Title>
          <div />
        </Header>

        <Body>
          <Section>
            <SectionTitle>개인 기본 정보</SectionTitle>

            <Field>
              <Label>이름</Label>
              <Input value={form.name} onChange={set("name")} placeholder="이름을 입력하세요" />
            </Field>

            <Field>
              <Label>대학교</Label>
              <Input value={form.univ} onChange={set("univ")} placeholder="예: 한국외국어대학교" />
            </Field>

            <Field>
              <Label>학과 / 학부</Label>
              <Input value={form.major} onChange={set("major")} placeholder="예: 컴퓨터공학부" />
            </Field>

            <Field>
              <Label>전화번호</Label>
              <Input value={form.phone} onChange={onPhone} inputMode="numeric" placeholder="010-0000-0000" />
            </Field>

            <Field>
              <Label>이메일</Label>
              <Input value={form.email} onChange={set("email")} type="email" placeholder="example@email.com" />
            </Field>

            <Field>
              <Label>거주 지역 / 활동 가능 지역</Label>
              <Input value={form.area} onChange={set("area")} placeholder="예: 용인, 수원, 성남" />
            </Field>
          </Section>

          {/* 학업 및 전문성 */}
          <Section>
            <SectionTitle>학업 및 전문성</SectionTitle>

            <Field>
              <Label>전공 분야 및 관련 수강 과목 경험</Label>
              <Textarea rows={5} value={form.expSubject} onChange={set("expSubject")} placeholder="관련 과목, 프로젝트, 포트폴리오 등" />
            </Field>

            <Field>
              <Label>보유 자격증</Label>
              <Textarea rows={4} value={form.certs} onChange={set("certs")} placeholder="예: GTQ 1급, 컴활 1급 ..." />
            </Field>

            <Field>
              <Label>수상 경력</Label>
              <Textarea rows={4} value={form.awards} onChange={set("awards")} placeholder="교내/외 공모전 수상 등" />
            </Field>

            <Field>
              <Label>어학 능력</Label>
              <Textarea rows={3} value={form.languages} onChange={set("languages")} placeholder="예: TOEIC 900, OPIC IH ..." />
            </Field>

            <Field>
              <Label>관련 경험</Label>
              <Textarea rows={5} value={form.related} onChange={set("related")} placeholder="알바/인턴/동아리/대외활동 등" />
            </Field>
          </Section>

          {/* 프로젝트 지원서 */}
          <Section>
            <SectionTitle>프로젝트 지원서</SectionTitle>

            <Field>
              <Label>지원 동기 및 관심사</Label>
              <Textarea rows={6} value={form.motive} onChange={set("motive")} />
            </Field>

            <Field>
              <Label>업종 또는 프로젝트에 대한 이해도</Label>
              <Textarea rows={5} value={form.understanding} onChange={set("understanding")} />
            </Field>

            <Field>
              <Label>프로젝트를 통해 성장하고 싶은 것</Label>
              <Textarea rows={5} value={form.growth} onChange={set("growth")} />
            </Field>

            <Field>
              <Label>참고자료</Label>
              <FileRow>
                <FileBtn type="button" onClick={onPickFile}>파일 첨부하기</FileBtn>
                <input ref={fileInputRef} type="file" multiple hidden onChange={onFiles} />
                {files.map((f, i) => (
                  <FileChip key={`${f.name}-${i}`}>{f.name}</FileChip>
                ))}
              </FileRow>
            </Field>
          </Section>

          {/* 활동 조건 */}
          <Section>
            <SectionTitle>활동 조건</SectionTitle>

            <Field>
              <Label>희망 프로젝트 참여 기간</Label>
              <Input value={form.hopePeriod} onChange={set("hopePeriod")} placeholder="예: 7/1~7/10, 주 3회 등" />
            </Field>

            <Field>
              <Label>희망 일일 업무 시간</Label>
              <Input value={form.hopeDaily} onChange={set("hopeDaily")} placeholder="예: 3~4시간" />
            </Field>

            <Field>
              <Label>희망 보상 수준</Label>
              <Input value={form.hopePay} onChange={set("hopePay")} placeholder="예: 10,000원/시간" />
            </Field>

            <Field>
              <Label>희망 근무 방식</Label>
              <SelectWrap>
                <SelectBtn type="button" onClick={() => setWorkOpen((v) => !v)}>
                  <span>{workLabel}</span>
                  <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
                    <path d="M5 8l5 5 5-5" stroke="#777" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </SelectBtn>
                {workOpen && (
                  <Menu>
                    {["대면", "비대면", "혼합"].map((opt) => (
                      <Item key={opt} type="button" onClick={() => { setForm((p)=>({ ...p, workType: opt })); setWorkOpen(false); }}>
                        {opt}
                      </Item>
                    ))}
                  </Menu>
                )}
              </SelectWrap>
            </Field>
          </Section>

          {/* 기타사항 */}
          <Section>
            <SectionTitle>기타사항</SectionTitle>

            <Field>
              <Label>참고자료</Label>
              <FileRow>
                <FileBtn type="button" onClick={onPickFile}>파일 첨부하기</FileBtn>
              </FileRow>
            </Field>

            <Field>
              <Label>참고자료 메모</Label>
              <Textarea rows={4} value={form.etcMemo} onChange={set("etcMemo")} placeholder="추가로 공유할 내용이 있다면 적어주세요" />
            </Field>
          </Section>
        </Body>

        {/* Submit */}
        <SubmitBar>
          <SubmitBtn type="submit">신청하기</SubmitBtn>
        </SubmitBar>
      </Wrap>
    </Page>
  );
}
