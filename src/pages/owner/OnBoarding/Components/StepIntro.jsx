import React from "react";
import { H1, Accent, Hint, Label, Input } from "../../../owner/OnBoarding/Components/styles";

export default function StepIntro({ value, onChange }) {
  return (
    <section>
      <H1>
        가게의 <br />
        <Accent>한줄소개</Accent>를 입력해주세요!
      </H1>
      <Hint>가게 정보 수집을 위해 필요합니다.</Hint>
      <Label>업체 소개</Label>
      <Input
        type="text"
        placeholder="예) 바삭한 크리스피 치킨 전문점"
        value={value}
        onChange={onChange}
        autoFocus
      />
    </section>
  );
}
