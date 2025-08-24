import React from "react";
import {
  SubTitle, StoreName,
  Card, Row, Key, Val,
} from "../../../owner/OnBoarding/Components/styles";

export default function StepConfirm({ form }) {
  // 상세주소는 제외: province + city만
  const loc = [form.province, form.city].filter(Boolean).join(" ");

  return (
    <section>
      {form.oneLine ? <SubTitle>{form.oneLine}</SubTitle> : null}
      <StoreName>{form.name || "이름"}</StoreName>

      <Card>
        <Row><Key>Birth</Key><Val>{form.birth || "-"}</Val></Row>
        <Row><Key>Education</Key><Val>{form.university || "-"}</Val></Row>
        <Row><Key>Phone</Key><Val>{form.phone || "-"}</Val></Row>
        <Row><Key>E-mail</Key><Val>{form.email || "-"}</Val></Row>
        <Row><Key>Location</Key><Val>{loc || "-"}</Val></Row>
      </Card>
    </section>
  );
}
