import React from "react";
import { H1, Accent, Hint, Label, Input } from "../../../owner/OnBoarding/Components/styles";

export default function StepPhone({ value, onChange }) {
  return (
    <section>
      <H1>기획자님의<br/>  <Accent>전화번호</Accent>를 입력해주세요!</H1>
      <Hint>프로필 생성을 위해 필요합니다.</Hint>
      <Label>전화번호</Label>
      <Input placeholder="예) 010-1234-5678" value={value} onChange={onChange} autoFocus />
    </section>
  );
}
