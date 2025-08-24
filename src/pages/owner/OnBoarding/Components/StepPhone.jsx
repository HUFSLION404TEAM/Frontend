import React from "react";
import { H1, Accent, Hint, Label, Input } from "../../../owner/OnBoarding/Components/styles";

export default function StepPhone({ value, onChange }) {
  return (
    <section>
      <H1>가게의<br/> <Accent>연락처</Accent>를 입력해주세요!</H1>
      <Hint>가게 정보 수집을 위해 필요합니다.</Hint>
      <Label>연락처</Label>
      <Input placeholder="010-1234-5678" value={value} onChange={onChange} inputMode="tel" autoFocus />
    </section>
  );
}
