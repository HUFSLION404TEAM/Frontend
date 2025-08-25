import React from "react";
import { STATUS_H, T, Card, Btn } from "../../../owner/My/Components/styles";
import BackIconSrc from "../../../../assets/Back.svg";

export default function EditProfilePanel({ onBack }) {
  return (
    <>
      <div style={{ position: "absolute", top: STATUS_H, left: 0, right: 0, height: 49, display: "flex", alignItems: "center", justifyContent: "center", borderBottom: "1px solid #EEE", background: "#FFF", zIndex: 3 }}>
        <img src={BackIconSrc} alt="back" style={{ position: "absolute", left: 16, top: "50%", transform: "translateY(-50%)", width: 28, height: 28, cursor: "pointer" }} onClick={onBack} />
        <div style={{ ...T.title16 }}>마이페이지</div>
      </div>

      <div style={{ position: "absolute", top: STATUS_H + 49, left: "50%", transform: "translateX(-50%)", width: 320, bottom: 0, overflowY: "auto", padding: "16px 0 24px" }}>
        <div style={{ display: "flex", justifyContent: "center", marginBottom: 6 }}>
          <div style={{ width: 64, height: 64, borderRadius: 10, background: "#E5E7EB" }} />
        </div>
        <div style={{ display: "flex", justifyContent: "center", marginBottom: 8 }}>
          <div style={{ fontSize: 16, fontWeight: 700, color: "#111" }}>업체이름</div>
        </div>

        <div style={{ fontFamily: T.title16.fontFamily, fontSize: 14, fontWeight: 700, color: "#B0B0B0", margin: "8px 0" }}>기본정보</div>
        <div style={{ ...Card.base, padding: 16 }}>
          <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 6 }}>
            <button style={Btn.tiny}>정보 수정</button>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", columnGap: 20, rowGap: 6 }}>
            <div style={{ ...T.body12, color: "#777" }}>업종</div>
            <div style={{ ...T.body12, color: "#111", textAlign: "right" }}>일반음식점</div>
            <div style={{ ...T.body12, color: "#777" }}>연락처</div>
            <div style={{ ...T.body12, color: "#111", textAlign: "right" }}>010-1234-5678</div>
            <div style={{ ...T.body12, color: "#777" }}>업체 위치</div>
            <div style={{ ...T.body12, color: "#111", textAlign: "right" }}>경기도 용인시</div>
            <div style={{ ...T.body12, color: "#777" }}>사업자번호</div>
            <div style={{ ...T.body12, color: "#111", textAlign: "right" }}>123-45-5678</div>
            <div style={{ ...T.body12, color: "#777" }}>온도</div>
            <div style={{ ...T.body12, color: "#111", textAlign: "right" }}>38.5 °C</div>
          </div>
        </div>

        <div style={{ fontFamily: T.title16.fontFamily, fontSize: 14, fontWeight: 700, color: "#B0B0B0", margin: "16px 0 8px" }}>간단한 가게소개</div>
        <div style={{ ...Card.base, padding: 16 }}>
          <div style={T.body12}>안녕하세요. 저희 카페는 이런 공간입니다 ~~ 고객과의 소통을 중요하게 생각하며 항상 정성을 다하겠습니다.</div>
        </div>

        <div style={{ height: 24 }} />
      </div>
    </>
  );
}