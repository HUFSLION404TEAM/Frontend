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
    height: '333px',
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


//다음버튼
const nextButtonStyle = {
  display: "flex",
  width: "220px",
  padding: "12px 0 13px 0",
  justifyContent: "center",
  alignItems: "center",
  border: 'None',
  borderRadius: "8px",
  background: "#1A96FE",
  boxShadow: "10px 10px 30px 0 rgba(0, 0, 0, 0.12)",
  
  color: "#F3F4F6",
  textAlign: "center",
  fontFamily: "Pretendard",
  fontSize: "20px",
  fontStyle: "normal",
  fontWeight: 600,
  lineHeight: "20px", // 100%
  letterSpacing: "-0.5px",

  marginTop: 0,
  marginBottom: 0,
};

//페이지 구조

export default function OnboardingPhonePage() {
  const navigate = useNavigate();
  const location = useLocation();

  const name = location.state?.name || '이름을 입력하세요'; // 이전 페이지에서 이름이 안 넘어왔을 경우 기본값
  const birthdate = location.state?.birthdate || '생일을 입력하세요';

  const [phoneNumber, setPhoneNumber] = useState('');
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
            }
            .phone-input:focus {
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
                  <span style = {{color: '#0080FF' }}>전화번호</span>
                  를 입력해주세요!
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
                  type="text"
                  value={birthdate}
                  className="birthdate-input"
                  readOnly
                  style={disabledInputStyle}
                />
                <input
                  id="phone-input"
                  type="tel" // 전화번호 입력을 위한 타입
                  className="phone-input"
                  value={phoneNumber}
                  placeholder="전화번호"
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  style={inputStyle}
                />
              </div>

              <button 
                  style = {nextButtonStyle}>다음
              </button>
            </main>
        </div>
    </div>
);
}
