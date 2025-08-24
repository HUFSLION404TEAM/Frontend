import React from "react";
import { H1, Accent, Hint, Label, Input } from "../../../owner/OnBoarding/Components/styles";

export default function StepLocation({ value, onChange }) {
  return (
    <section>
      <H1>가게의<br/> <Accent>위치</Accent>를 입력해주세요!</H1>
      <Hint>가게 정보 수집을 위해 필요합니다.</Hint>
      <Label>업체 위치</Label>
      <Input placeholder="예) 경기도 용인시 처인구 모현읍 ..." value={value} onChange={onChange} autoFocus />
    </section>
  );
}
