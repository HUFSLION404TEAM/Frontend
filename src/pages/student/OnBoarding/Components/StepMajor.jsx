import React from "react";
import { H1, Accent, Hint, Label, Input } from "../../../owner/OnBoarding/Components/styles";

export default function StepMajor({ value, onChange }) {
  return (
    <section>
      <H1>기획자님의<br/>  <Accent>전공</Accent>을 입력해주세요!</H1>
      <Hint>프로필 생성을 위해 필요합니다.</Hint>
      <Label>전공</Label>
      <Input placeholder="예) 글로벌커뮤니케이션학부" value={value} onChange={onChange} autoFocus />
    </section>
  );
}
