import React from "react";
import { H1, Accent, Hint, Label, Input } from "../../../owner/OnBoarding/Components/styles";

export default function StepBizNo({ value, onChange }) {
  return (
    <section>
      <H1>가게의<br/> <Accent>사업자번호</Accent>를 입력해주세요!</H1>
      <Hint>가게 정보 수집을 위해 필요합니다.</Hint>
      <Label>사업자번호</Label>
      <Input placeholder="123-45-67890" value={value} onChange={onChange} inputMode="numeric" autoFocus />
    </section>
  );
}
