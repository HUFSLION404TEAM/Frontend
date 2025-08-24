import React from "react";
import { H1, Accent, Hint, Label, Input } from "../../../owner/OnBoarding/Components/styles";

export default function StepEmail({ value, onChange }) {
  return (
    <section>
      <H1>기획자님의<br/>  <Accent>이메일</Accent>을 입력해주세요!</H1>
      <Hint>프로필 생성을 위해 필요합니다.</Hint>
      <Label>이메일</Label>
      <Input placeholder="예) user@example.com" value={value} onChange={onChange} autoFocus />
    </section>
  );
}
