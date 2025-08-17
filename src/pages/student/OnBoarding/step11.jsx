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
  minHeight: '1400px',
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
  marginBottom: 0,
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
    padding: '34px 30px 121px 30px',
    marginTop: 0,
    marginBottom: 0,
};

//형식
const formStyle = {
  width: '329px',
  height: "51px",
  alignSelf: "stretch",
  };

const inputGroupStyle = {
  display : 'flex',
  width: '329px',
  flexDirection: 'column',
  gap: '12px',
  marginTop: 0,
  marginBottom: 0,
}

const labelStyle = {
  color: "#000",
  fontFamily: "Pretendard",
  fontSize: "16px",
  fontStyle: "normal",
  fontWeight: 500,
  lineHeight: "20px",
  letterSpacing: "-0.5px",
  marginTop: '21px',
  marginBottom: 0,
};

const inputTextStyle = {
  alignSelf: "stretch",
  borderRadius: "8px",
  border: "0.5px solid #1A96FE",
  padding: '12px',
  fontSize: '12px',
  fontFamily: "Pretendard",
  //resize: 'vertical', // 세로 크기만 조절 가능
  outline: 'none',
  transition: 'border-color 0.2s',
};


//다음버튼
const buttonAreaStyle = {
  position: 'absolute',
  bottom: '42px',
  left: '50%',          // 왼쪽에서 50% 지점으로 이동
  transform: 'translateX(-50%)', // 자체 너비의 50%만큼 왼쪽으로 이동하여 중앙 정렬
  display: "flex",
  width: "220px",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  gap: "8px",
};

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

const nextSubButtonStyle = {
  display: "flex",
  width: "220px",
  height: "20px",
  justifyContent: "center",
  alignItems: "center",
  border: 'None',
  backgroundColor: "transparent",

  color: "#343529",
  textAlign: "center",
  fontFamily: "Pretendard",
  fontSize: "12px",
  fontStyle: "normal",
  fontWeight: 600,
  lineHeight: "20px", // 166.667%
  letterSpacing: "-0.5px"
};


const formFields = [
  { id: 'projectIntro', label: '1. 프로젝트 소개', width: '329px', height: '51px' },
  { id: 'projectSummary', label: '2. 프로젝트 개요', width: '329px', height: '51px' },
  { id: 'tasksDone', label: '3. 진행한 일', width: '329px', height: '51px' },
  { id: 'process', label: '4. 과정', width: '329px', height: '51px' },
  { id: 'results', label: '5. 결과물', width: '329px', height: '51px' },
  { id: 'growthPoints', label: '6. 성장한 점', width: '329px', height: '51px' },
  { id: 'mySkills', label: '7. 나의 역량', width: '329px', height: '51px' },
  { id: 'awards', label: '수상경력', width: '329px', height: '145px' },
];


//페이지 구조
export default function CreatePortfolioDetailsPage() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    projectIntro: '',
    projectSummary: '',
    tasksDone: '',
    process: '',
    results: '',
    growthPoints: '',
    mySkills: '',
    awards: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleNext = () => {
      console.log('입력된 포트폴리오 데이터:', formData);
      navigate('../src/pages/student/OnBoarding/step11.jsx'); 
    }

return (
    <div style = {containerStyle}>
        <style>
          {`
            .portfolio-textarea:focus {
            border-color: #5A87FF;
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

            <main style={mainContentStyle}>
              <div style={formStyle}>
                {/* formFields 배열을 순회하며 입력 필드를 동적으로 생성 */}
                {formFields.map(field => (
                <div key={field.id} style={inputGroupStyle}>
                  <label htmlFor={field.id} style={labelStyle}>{field.label}</label>
                  <textarea
                    id={field.id}
                    name={field.id}
                    className="portfolio-textarea"
                    value={formData[field.id]}
                    onChange={handleChange}
                    style={{...inputTextStyle, height: field.height}}
                  />
                </div>
                ))}
              </div>
              <section style = {buttonAreaStyle}>
                <button style = {nextButtonStyle}>다음</button>
                <button style = {nextSubButtonStyle}>다음에 입력하기</button>
              </section>
            </main>
        </div>
    </div>
);
}
