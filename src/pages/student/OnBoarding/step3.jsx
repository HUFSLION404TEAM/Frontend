import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import {ReactComponent as BackIcon} from "../../../assets/Back2.svg";

const containerStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: '100vh',
  backgroundColor: "#f0f0f0",
  fontFamily: "Pretendard, sans-serif",
  overflow: 'auto',
};

const frameStyle = {
  width: 390,
  height: 844,
  backgroundColor: "#FFFFFF",
  position: "relative",
  overflow: "hidden",
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
};


//헤더
const headerStyle = {
  height: 45,
  display: 'flex',
  flexDirection: "row",
  alignItems: 'center',
  justifyContent: 'center',
  position: 'relative',
  marginTop: '44px',
};


const backButtonStyle = {
  position: 'absolute',
  left: '16px',
  border: 'none',
  backgroundColor: 'white',
};

const headerTitleStyle = {
    color: "#111",
    textAlign: "center",
    fontFamily: "Pretendard",
    fontSize: "20px",
    fontStyle: "normal",
    fontWeight: 700,
    lineHeight: "20px",
    letterSpacing: "-0.5px",
};


//메인
const mainContentStyle = {
    display: 'flex',
    width: '390px',
    height: '235px',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '50px',
    marginTop: '42px',
    marginBottom: 0,
};

const questionContainerStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  justifyContent: 'center',
  width: '361px',
  height: '100px',
  gap: '8px',
  marginLeft: '29px',
  marginTop: 0,
  marginBottom: 0,
};

//질문
const mainQuestionStyle = {
  fontFamily: "Pretendard",
  fontSize: "25px",
  fontStyle: "normal",
  fontWeight: 700,
  lineHeight: "36px",
  marginTop: 0,
  marginBottom: 0,
};

const subQuestionStyle = {
  color: "#7A89A5",
  fontFamily: "Pretendard",
  fontSize: "14px",
  fontStyle: "normal",
  fontWeight: 400,
  lineHeight: "20px",
  marginTop: 0,
  marginBottom: 0,
};

//입력
const inputContainerStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column',
  width: '100%',
  gap: '25px',
  marginTop: 0,
  marginBottom: 0,
};

const inputStyle = {
  width: '318px',
  border: 'none',
  borderBottom: '1px solid #0080FF',
  fontSize: '20px',
  color: "#343539",
  fontFamily: "Pretendard",
  fontSize: "20px",
  fontStyle: "normal",
  fontWeight: 400,
  lineHeight: "normal",
};

const disabledInputStyle = {
    ...inputStyle,
    color: '#B0B0B0', // 회색으로 처리하여 비활성화된 느낌을 줌
    borderBottom: '2px solid #F0F0F0',

};


//페이지 구조

export default function OnboardingBirthdatePage() {
  const navigate = useNavigate();
  const location = useLocation();

  const name = location.state?.name || '이름을 입력하세요'; // 이전 페이지에서 이름이 안 넘어왔을 경우 기본값

  const [birthdate, setBirthdate] = useState('');
  const [isFocused, setIsFocused] = useState(false);

return (
    <div style = {containerStyle}>
        <style>
          {`
            .name-input:focus {
              outline: none;
            }
            .birthdate-input:focus {
              outline: none;
              border-bottom-color: #5A87FF; /* 포커스 시 밑줄 색상 변경은 유지 */
            }
          `}
        </style>

        <div style = {frameStyle}>
            <header style = {headerStyle}>
                <button style = {backButtonStyle} onClick={() => navigate(-1)}>
                    <BackIcon/>
                </button>
                <h1 style = {headerTitleStyle}>포트폴리오</h1>
            </header>

            <main style = {mainContentStyle}>
              <div style = {questionContainerStyle}>
                <h2 style = {mainQuestionStyle}>
                  기획자님의<br />
                  <span style = {{color: '#0080FF' }}>생년월일</span>
                  을 입력해주세요!
                </h2>
                <h2 style = {subQuestionStyle}>
                  포트폴리오 생성을 위해 필요합니다.
                </h2>
              </div>

              <div style = {inputContainerStyle}>
                <input
                  type="text"
                  value={name}
                  className = 'name-input'
                  readOnly // 읽기 전용으로 설정
                  style={disabledInputStyle}
                />
                <input
                  id="birthdate-input"
                  type="text"
                  className="birthdate-input"
                  value={birthdate}
                  placeholder="생년월일"
                  onChange={(e) => setBirthdate(e.target.value)}
                  style={inputStyle}
                />
              </div>
            </main>
        </div>
    </div>
);
}
