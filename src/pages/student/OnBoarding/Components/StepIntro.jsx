import React from "react";
import { H1, Accent, Hint, Label, Input } from "../../../owner/OnBoarding/Components/styles";

export default function StepIntro({ value, onChange }) {
  return (
    <section>
      <H1>기획자님을<br/> <Accent>표현하는 한문장</Accent>을 입력해주세요!</H1>
      <Hint>프로필 생성을 위해 필요합니다.</Hint>
      <Label>나를 표현하는 한 문장</Label>
      <Input
        placeholder="예) 디테일과 실행력을 겸비한 PM"
        value={value}
        onChange={onChange}
        autoFocus
      />
    </section>
  );
}
