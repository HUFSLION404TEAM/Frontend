import React, { useMemo } from "react";
import { H1, Accent, Hint, Label } from "../../../owner/OnBoarding/Components/styles";
import { AREAS } from "../../../student/OnBoarding/Components/data";

export default function StepRegion({ province, city, onSelectProvince, onSelectCity }) {
  const cities = useMemo(() => AREAS[province] || [], [province]);

  const base = {
    flex: 1,
    height: 40,
    borderRadius: 8,
    border: "1px solid #E6EAF5",
    padding: "0 10px",
    outline: "none",
    background: "#fff",
  };

  return (
    <section>
      <H1>기획자님의<br/>  <Accent>지역</Accent>을 입력해주세요!</H1>
      <Hint>프로필 생성을 위해 필요합니다.</Hint>

      <Label>지역</Label>
      <div style={{ display: "flex", gap: 10 }}>
        <select value={province} onChange={(e) => onSelectProvince(e.target.value)} style={base}>
          <option value="">광역 선택</option>
          {Object.keys(AREAS).map((p) => <option key={p} value={p}>{p}</option>)}
        </select>

        <select value={city} onChange={(e) => onSelectCity(e.target.value)} style={base}>
          <option value="">시/구 선택</option>
          {cities.map((c) => <option key={c} value={c}>{c}</option>)}
        </select>
      </div>
    </section>
  );
}
