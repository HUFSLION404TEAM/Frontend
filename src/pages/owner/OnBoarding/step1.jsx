import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { OnboardingContext } from './OnboardingContext.jsx';

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
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '42px',
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

//업종선택
const typeGridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)', // 3개의 열을 동일한 너비로
    gap: '12px', // 버튼 사이의 간격
    marginTop: 0,
    marginBottom: '116px',
};

const businessTypes = [
  '제조업', '도매업', '소매업',
  '서비스업', '건설업', 'IT업',
  '금융업', '교육업', '의료업',
];

const typeButtonStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: "100px",
  height: "100px",
  //aspectRatio: "1 / 1",
  backgroundColor: "#FFF",
  border: "1px solid #0080FF",
  borderRadius: '12px',
  dropShadow: "10px 10px 30px rgba(0, 0, 0, 0.08)",

  color: "#111",
  textAlign: "center",
  fontFamily: "Pretendard",
  fontSize: "20px",
  fontStyle: "normal",
  fontWeight: 600,
  lineHeight: "20px", 
  letterSpacing: "-0.5px"
};

const activeTypeButtonStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: "100px",
  height: "100px",
  //aspectRatio: "1 / 1",
  backgroundColor: "#0080FF",
  border: "1px solid #0080FF",
  borderRadius: '12px',
  dropShadow: "10px 10px 30px rgba(0, 0, 0, 0.08)",

  color: 'white',
  textAlign: "center",
  fontFamily: "Pretendard",
  fontSize: "20px",
  fontStyle: "normal",
  fontWeight: 600,
  lineHeight: "20px", 
  letterSpacing: "-0.5px",
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
export default function CategoryStep() {
  const navigate = useNavigate();
  const { onboardingData, setOnboardingData } = useContext(OnboardingContext);
  const [selectedType, setSelectedType] = useState(onboardingData.category || null);

  const handleTypeSelect = (type) => {
    setSelectedType(type);
  };

  // 다음 페이지로 선택된 유형 정보와 함께 이동
  const handleNext = () => {
    if (selectedType) {
        setOnboardingData(prevData => ({ ...prevData, category: selectedType }));
        navigate('./step2');
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
                  <span style = {{color: '#0080FF' }}>유형</span>
                  을 입력해주세요!
                </h2>
                <h2 style = {subQuestionStyle}>
                  가게 정보 수집을을 위해 필요합니다.
                </h2>
              </div>

              <div style={typeGridStyle}>
                {businessTypes.map((type) => (
                  <button
                    key={type}
                    onClick={() => handleTypeSelect(type)}
                    style={selectedType === type ? activeTypeButtonStyle : typeButtonStyle}
                  >
                    {type}
                  </button>
                ))}
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
