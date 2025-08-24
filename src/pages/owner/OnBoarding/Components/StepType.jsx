import React from "react";
import { H1, Accent, Hint, Grid, TypeBtn } from "../../../owner/OnBoarding/Components/styles";

export default function StepType({ value, options, onSelect }) {
  return (
    <section>
      <H1>가게의  <br/><Accent>유형</Accent>을 입력해주세요!</H1>
      <Hint>가게 정보 수집을 위해 필요합니다.</Hint>
      <Grid>
        {options.map((t) => (
          <TypeBtn key={t} $active={value === t} onClick={() => onSelect(t)}>
            {t}
          </TypeBtn>
        ))}
      </Grid>
    </section>
  );
}
