import React, { useState } from "react";
import { H1, Accent, Hint, Label } from "../../../owner/OnBoarding/Components/styles";
import UniversityModal from "../../../student/OnBoarding/Components/University";

export default function StepUniversity({ value, onChange }) {
  const [open, setOpen] = useState(false);

  return (
    <section>
      <H1>기획자님의<br/> <Accent>재학 중인 대학교</Accent>를 입력해주세요!</H1>
      <Hint>프로필 생성을 위해 필요합니다.</Hint>

      <Label>대학교</Label>
      <button
        type="button"
        onClick={() => setOpen(true)}
        style={{
          width: "100%",
          height: 40,
          borderRadius: 8,
          border: "1px solid #E6EAF5",
          background: "#fff",
          textAlign: "left",
          padding: "0 10px",
        }}
      >
        {value || "대학 선택"}
      </button>

      <UniversityModal
        open={open}
        onClose={() => setOpen(false)}
        onPick={(u) => onChange({ target: { value: u } })}
      />
    </section>
  );
}
