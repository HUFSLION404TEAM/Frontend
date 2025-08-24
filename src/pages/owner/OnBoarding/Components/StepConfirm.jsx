// src/pages/owner/OnBoarding/steps/StepConfirm.jsx
import React from "react";
import {
  SubTitle, StoreName,
  Card, Row, Key, Val,
} from "../../../owner/OnBoarding/Components/styles";

export default function StepConfirm({ form }) {
  return (
    <section>
      {/* 한줄소개(소제목) + 업체명(큰 제목) */}
      {form.intro ? <SubTitle>{form.intro}</SubTitle> : null}
      <StoreName>{form.name || "업체명"}</StoreName>

      <Card>
        <Row><Key>업종</Key><Val>{form.type || "-"}</Val></Row>
        <Row><Key>사업자 번호</Key><Val>{form.bizNo || "-"}</Val></Row>
        <Row>
          <Key>Location</Key>
          <Val>{(form.location || "-").replaceAll("\\n", "\n")}</Val>
        </Row>
        <Row><Key>Phone</Key><Val>{form.phone || "-"}</Val></Row>
      </Card>
    </section>
  );
}
