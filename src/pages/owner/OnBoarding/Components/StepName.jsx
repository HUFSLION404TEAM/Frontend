import React from "react";
import { H1, Accent, Hint, Label, Input } from "../../../owner/OnBoarding/Components/styles";

export default function StepName({ value, onChange }) {
  return (
    <section>
      <H1>가게의 <br/> <Accent>이름</Accent>을 입력해주세요!</H1>
      <Hint>가게 정보 수집을 위해 필요합니다.</Hint>
      <Label>업체명</Label>
      <Input placeholder="예) BHC 용인외대점" value={value} onChange={onChange} autoFocus />
    </section>
  );
}
