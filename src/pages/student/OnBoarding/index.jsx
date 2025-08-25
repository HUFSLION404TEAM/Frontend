// src/pages/student/OnBoarding/index.jsx
import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Page,
  TopBar,
  BackBtn,
  TopTitle,
  Body,
  Bottom,
  NextBtn,
  Actions,
  OutlineBtn,
  PrimaryBtn,
} from "../../owner/OnBoarding/Components/styles";

import StepName from "../../student/OnBoarding/Components/StepName";
import StepBirth from "./Components/StepBirth";
import StepPhone from "../../student/OnBoarding/Components/StepPhone";
import StepEmail from "./Components/StepEmail";
import StepRegion from "./Components/StepRegion";
import StepUniversity from "./Components/StepUni";
import StepMajor from "./Components/StepMajor";
import StepIntro from "../../student/OnBoarding/Components/StepIntro";
import StepConfirm from "../../student/OnBoarding/Components/StepConfirm";
import axiosInstance from "../../common/Auth/axios";

/** ===== 유효성 (입력 단계) ===== */
const phoneRegex = /^(0\d{1,2}-?\d{3,4}-?\d{4}|\d{10,11})$/; // 하이픈 유/무 허용
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const birthAnySeparator = /^(\d{4})[./-](\d{2})[./-](\d{2})$/;

/** ===== 포맷 유틸 (전송 시 변환) ===== */
const toDigits = (v = "") => String(v).replace(/\D/g, "");

// 생년월일 -> "YYYY.MM.DD"
const normalizeBirthToDots = (v = "") => {
  const s = String(v).trim();
  // 이미 구분자가 있으면 점(.)으로 치환
  const m1 = s.match(/^(\d{4})[./-](\d{2})[./-](\d{2})$/);
  if (m1) return `${m1[1]}.${m1[2]}.${m1[3]}`;
  // 숫자만 8자리면 점 포맷으로
  const d = toDigits(s);
  if (d.length === 8)
    return `${d.slice(0, 4)}.${d.slice(4, 6)}.${d.slice(6, 8)}`;
  return s; // 방어적 반환 (검증은 별도로 함)
};

// 전화번호 -> 하이픈 포함
const normalizePhoneToDashed = (v = "") => {
  const d = toDigits(v);
  if (d.length === 11) return `${d.slice(0, 3)}-${d.slice(3, 7)}-${d.slice(7)}`; // 010-1234-5678
  if (d.length === 10) return `${d.slice(0, 3)}-${d.slice(3, 6)}-${d.slice(6)}`; // 010-123-4567
  return v; // 길이 애매하면 원본 유지
};

const joinRegion = (province, city) =>
  [province, city].filter(Boolean).join(" ").trim();

// 백엔드가 "major"를 "career"로 받음
const CAREER_FIELD = "career";

export default function OnboardingStudent() {
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    birth: "",
    phone: "",
    email: "",
    province: "",
    city: "",
    university: "",
    major: "",
    oneLine: "",
  });

  const total = 9; // 0~7 입력 + 8 확인

  const isBirthValid = (v) =>
    birthAnySeparator.test(v.trim()) ||
    /^\d{8}$/.test(v.trim().replace(/\D/g, "")); // 8자리 숫자 허용

  const valid = useMemo(() => {
    switch (step) {
      case 0:
        return form.name.trim().length > 1;
      case 1:
        return isBirthValid(form.birth);
      case 2:
        return phoneRegex.test(form.phone.trim());
      case 3:
        return emailRegex.test(form.email.trim());
      case 4:
        return !!form.province && !!form.city;
      case 5:
        return !!form.university;
      case 6:
        return form.major.trim().length > 0;
      case 7:
        return form.oneLine.trim().length > 0; // 스킵 불가
      case 8:
        return true;
      default:
        return true;
    }
  }, [step, form]);

  const onChange = (k) => (e) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));
  const setProvince = (v) => setForm((f) => ({ ...f, province: v, city: "" }));
  const setCity = (v) => setForm((f) => ({ ...f, city: v }));

  const next = () => setStep((s) => Math.min(total - 1, s + 1));
  const back = () => setStep((s) => Math.max(0, s - 1));

  /** ===== payload 빌더 (정해진 포맷으로 변환) ===== */
  const buildPayload = (f) => ({
    name: f.name.trim(),
    birth: normalizeBirthToDots(f.birth), // ✅ "YYYY.MM.DD"
    phone: normalizePhoneToDashed(f.phone), // ✅ 하이픈 포함
    email: f.email.trim(),
    university: f.university.trim(),
    introduction: f.oneLine.trim(),
    [CAREER_FIELD]: f.major.trim(), // major -> career
    isPublic: true,
    isEmployment: true,
    region: joinRegion(f.province, f.city), // "경기도 성남시"
  });

  /** ===== 제출 ===== */
  const submit = async () => {
    try {
      setLoading(true);
      const payload = buildPayload(form);
      const { data } = await axiosInstance.post("/api/student/create", payload);
      if (data?.success) {
        try {
          localStorage.setItem("onboardingName", payload.name);
        } catch {}
        try {
          localStorage.setItem("onboarded", "true");
        } catch {}
        try {
          localStorage.setItem("role", "student");
        } catch {}
        navigate("/student/dash", { replace: true });
      } else {
        console.log("create student (failed):", data);
        alert(data?.message || "저장에 실패했습니다.");
      }
    } catch (err) {
      const server = err?.response?.data;
      console.error("create student error ->", server || err);
      alert(
        `저장 중 오류가 발생했어요.\n${
          server?.message || err?.message || String(err)
        }`
      );
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
        <TopTitle>프로필</TopTitle>
        <div style={{ width: 28 }} />
      </TopBar>

      <Body>
        {step === 0 && (
          <StepName value={form.name} onChange={onChange("name")} />
        )}
        {step === 1 && (
          <StepBirth value={form.birth} onChange={onChange("birth")} />
        )}
        {step === 2 && (
          <StepPhone value={form.phone} onChange={onChange("phone")} />
        )}
        {step === 3 && (
          <StepEmail value={form.email} onChange={onChange("email")} />
        )}
        {step === 4 && (
          <StepRegion
            province={form.province}
            city={form.city}
            onSelectProvince={setProvince}
            onSelectCity={setCity}
          />
        )}
        {step === 5 && (
          <StepUniversity
            value={form.university}
            onChange={onChange("university")}
          />
        )}
        {step === 6 && (
          <StepMajor value={form.major} onChange={onChange("major")} />
        )}
        {step === 7 && (
          <StepIntro value={form.oneLine} onChange={onChange("oneLine")} />
        )}
        {step === 8 && <StepConfirm form={form} />}
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
              {loading ? "저장 중..." : "완료"}
            </PrimaryBtn>
          </Actions>
        )}
      </Bottom>
    </Page>
  );
}
