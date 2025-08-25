// src/pages/owner/OnBoarding/index.jsx
import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../common/Auth/axios";

import {
  C,
  Page,
  TopBar,
  BackBtn,
  Title,
  ProgressWrap,
  Progress,
  Body,
  Bottom,
  NextBtn,
  Actions,
  OutlineBtn,
  PrimaryBtn,
  TopTitle,
} from "../../owner/OnBoarding/Components/styles";

import StepType from "./Components/StepType";
import StepName from "./Components/StepName";
import StepLocation from "./Components/StepLocation";
import StepPhone from "./Components/StepPhone";
import StepBizNo from "./Components/StepBizNo";
import StepIntro from "./Components/StepIntro";
import StepConfirm from "./Components/StepConfirm";

/* ===== 포맷 유틸 (하이픈 포함으로 보냄) ===== */
const toDigits = (v = "") => String(v).replace(/\D/g, "");

// 010-1234-5678 / 02-123-4567 등 지역번호 케이스는 단순화해서 10~11자리만 커버
const formatPhoneWithHyphen = (v = "") => {
  const d = toDigits(v);
  if (d.length === 10) return `${d.slice(0, 3)}-${d.slice(3, 6)}-${d.slice(6)}`; // 010-123-4567
  if (d.length === 11) return `${d.slice(0, 3)}-${d.slice(3, 7)}-${d.slice(7)}`; // 010-1234-5678
  return v; // 길이 애매하면 원본 유지
};

// 123-45-67890
const formatBizNoWithHyphen = (v = "") => {
  const d = toDigits(v);
  if (d.length === 10) return `${d.slice(0, 3)}-${d.slice(3, 5)}-${d.slice(5)}`;
  return v;
};

const TYPES = [
  "제조업",
  "도매업",
  "소매업",
  "서비스업",
  "건설업",
  "IT업",
  "금융업",
  "교육업",
  "의료업",
];

export default function OnboardingOwner() {
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    type: "",
    name: "",
    location: "",
    phone: "",
    bizNo: "",
    intro: "",
  });

  const total = 7; // 0~5 입력 + 6 요약
  const progress = useMemo(
    () => Math.round(((step + 1) / total) * 100),
    [step]
  );

  const phoneRegex = /^0\d{1,2}-?\d{3,4}-?\d{4}$/;
  const bizRegex = /^\d{3}-?\d{2}-?\d{5}$/;

  const valid = useMemo(() => {
    switch (step) {
      case 0:
        return !!form.type;
      case 1:
        return form.name.trim().length > 1;
      case 2:
        return form.location.trim().length > 3;
      case 3:
        return phoneRegex.test(form.phone.trim());
      case 4:
        return bizRegex.test(form.bizNo.trim());
      case 5:
        return form.intro.trim().length > 5;
      case 6:
        return true;
      default:
        return false;
    }
  }, [step, form]);

  const onChange = (k) => (e) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));
  const next = () => setStep((s) => Math.min(total - 1, s + 1));
  const back = () => setStep((s) => Math.max(0, s - 1));

  // 서버 전송용 페이로드 (하이픈 포함 포맷으로 강제)
  const toPayload = (f) => ({
    name: f.name.trim(),
    type: f.type.trim(),
    address: f.location.trim(),
    phone: formatPhoneWithHyphen(f.phone), // ✅ 하이픈 포함
    businessNumber: formatBizNoWithHyphen(f.bizNo), // ✅ 하이픈 포함
    introduction: f.intro.trim(),
  });

  const submit = async () => {
    try {
      setLoading(true);
      const payload = toPayload(form);
      // 전송 직전 확인용 로그
      // console.log("[store/create] payload =>", payload);

      const { data } = await axiosInstance.post("/api/store/create", payload);
      if (data?.success) {
        alert("업체 정보가 등록되었습니다!");
        try {
          localStorage.setItem("onboarded", "true");
        } catch {}
        try {
          localStorage.setItem("role", "owner");
        } catch {}
        navigate("/owner/dash", { replace: true });
      } else {
        console.log("store/create failed:", data);
        alert(data?.message || "등록에 실패했습니다.");
      }
    } catch (err) {
      const server = err?.response?.data;
      console.error("store/create error:", server || err);
      alert(`저장 실패: ${server?.message || err.message || String(err)}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Page>
      <TopBar>
        <BackBtn onClick={back} disabled={step === 0}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="28"
            height="28"
            viewBox="0 0 28 28"
            fill="none"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M18.3239 5.00858C18.5427 5.22736 18.6655 5.52405 18.6655 5.83341C18.6655 6.14277 18.5427 6.43946 18.3239 6.65824L10.9821 14.0001L18.3239 21.3419C18.5365 21.5619 18.654 21.8566 18.6514 22.1625C18.6487 22.4684 18.526 22.7611 18.3097 22.9774C18.0934 23.1937 17.8008 23.3164 17.4949 23.319C17.189 23.3217 16.8943 23.2041 16.6743 22.9916L8.5076 14.8249C8.28888 14.6061 8.16602 14.3094 8.16602 14.0001C8.16602 13.6907 8.28888 13.394 8.5076 13.1752L16.6743 5.00858C16.893 4.78986 17.1897 4.66699 17.4991 4.66699C17.8085 4.66699 18.1052 4.78986 18.3239 5.00858Z"
              fill="#1A96FE"
            />
          </svg>
        </BackBtn>

        <TopTitle>가게 정보 입력</TopTitle>
        <div style={{ width: 28 }} />
      </TopBar>

      {/* Progress가 필요하면 풀기
      <ProgressWrap><Progress style={{ width: `${progress}%` }} /></ProgressWrap>
      */}

      <Body>
        {step === 0 && (
          <StepType
            value={form.type}
            options={TYPES}
            onSelect={(v) => setForm((f) => ({ ...f, type: v }))}
          />
        )}

        {step === 1 && (
          <StepName value={form.name} onChange={onChange("name")} />
        )}

        {step === 2 && (
          <StepLocation value={form.location} onChange={onChange("location")} />
        )}

        {step === 3 && (
          <StepPhone value={form.phone} onChange={onChange("phone")} />
        )}

        {step === 4 && (
          <StepBizNo value={form.bizNo} onChange={onChange("bizNo")} />
        )}

        {step === 5 && (
          <StepIntro value={form.intro} onChange={onChange("intro")} />
        )}

        {step === 6 && <StepConfirm form={form} />}
      </Body>

      <Bottom>
        {step < total - 1 ? (
          <NextBtn disabled={!valid || loading} onClick={next}>
            {loading ? "잠시만요..." : "다음"}
          </NextBtn>
        ) : (
          <Actions>
            <OutlineBtn disabled={loading} onClick={() => setStep(0)}>
              수정
            </OutlineBtn>
            <PrimaryBtn disabled={loading} onClick={submit}>
              {loading ? "저장 중..." : "확인"}
            </PrimaryBtn>
          </Actions>
        )}
      </Bottom>
    </Page>
  );
}
