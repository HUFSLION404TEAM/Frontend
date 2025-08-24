import React from "react";
import { H1, Accent, Hint, Label, Input } from "../../../owner/OnBoarding/Components/styles";

export default function StepBirth({ value, onChange }) {
  const handle = (e) => {
    let v = e.target.value.replace(/\D/g, "").slice(0, 8);
    if (v.length > 4) v = v.slice(0, 4) + "." + v.slice(4);
    if (v.length > 7) v = v.slice(0, 7) + "." + v.slice(7);
    onChange({ target: { value: v } });
  };

  return (
    <section>
      <H1>기획자님의<br/>  <Accent>생년월일</Accent>을 입력해주세요!</H1>
      <Hint>프로필 생성을 위해 필요합니다.</Hint>
      <Label>생년월일</Label>
      <Input placeholder="예) 2006.08.07" value={value} onChange={handle} autoFocus />
    </section>
  );
}
