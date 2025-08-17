import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

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
    height: '681px',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: 0,
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
  marginTop: '42px',
  marginBottom: '37px',
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
  width: '100%',
  marginTop: 0,
  marginBottom: '463px',
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
export default function OnboardingNamePage() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [selectedType, setSelectedType] = useState(null);

  const handleTypeSelect = (type) => {
    setSelectedType(type);
  };

  const handleNext = () => {
    if (selectedType) {
        console.log('선택된 가게 유형:', selectedType);
        // 다음 페이지로 선택된 유형 정보와 함께 이동
        navigate('/register/next-step', { state: { storeType: selectedType } });
    }
  };

return (
    <div style = {containerStyle}>
        <style>
          {`
            .name-input:focus {
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
                <h1 style = {headerTitleStyle}>가게 정보 입력</h1>
            </header>

            <main style = {mainContentStyle}>
              <div style = {questionContainerStyle}>
                <h2 style = {mainQuestionStyle}>
                  가게의<br />
                  <span style = {{color: '#0080FF' }}>업체명</span>
                  을 입력해주세요!
                </h2>
                <h2 style = {subQuestionStyle}>
                  가게 정보 수집을 위해 필요합니다.
                </h2>
              </div>

              <div style = {inputContainerStyle}>
                <input
                  id="name-input"
                  type="text"
                  className = 'name-input'
                  value={name}
                  placeholder = '업체명'
                  onChange={(e) => setName(e.target.value)}
                  style={inputStyle}
                />
              </div>

              <button 
                  style = {nextButtonStyle}
                  onClick={handleNext}>다음
              </button>
            </main>
        </div>
    </div>
);
}
