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
  gap: '8px',
  marginLeft: '29px',
  marginTop: '42px',
  marginBottom: '50px',
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
  gap: '25px',
  width: '100%',
  height: '85px',
  marginBottom: '401px',
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
    color: '#B0B0B0',
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
export default function OnboardingNamePage() {
  const navigate = useNavigate();
  const location = useLocation();
  
  const [selectedType, setSelectedType] = useState(null);

  const name = location.state?.name || '업체명을 입력하세요';

  const [address, setAddress] = useState('');
  const [isFocused, setIsFocused] = useState(false);

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
            }
            .address-input:focus {
              outline: none;
              border-bottom-color: #5A87FF;
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
                  <span style = {{color: '#0080FF' }}>주소</span>
                  를 입력해주세요!
                </h2>
                <h2 style = {subQuestionStyle}>
                  가게 정보 수집을 위해 필요합니다.
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
                  id="address-input"
                  type="text"
                  className="address-input"
                  value={address}
                  placeholder="업체 주소"
                  onChange={(e) => setAddress(e.target.value)}
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
