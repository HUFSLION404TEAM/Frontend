import React from 'react';
import { useNavigate } from 'react-router-dom';

import {ReactComponent as BackIcon} from "../../../assets/Back2.svg";
import {ReactComponent as HeaderLogo} from "../../../images/start/Startlogo.svg";
import {ReactComponent as Person} from "../../../assets/StandingPerson.svg";
import {ReactComponent as AI} from "../../../assets/Ai.svg";

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

const headerLogoStyle = {
    width: '167px',
    height: '45px',
    flexShrink: 0,
    backgroundColor: '#0080FF',
};


//메인
const mainContentStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '93px 0 0 0',
    gap: '92px',
};

const QuestionStyle = {
  fontFamily: "Pretendard",
  fontSize: "24px",
  fontStyle: "normal",
  fontWeight: 700,
  lineHeight: "36px",
};

const buttonContainerStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '30px',
  width: '100%',
};

const optionButtonSytle = {
    width: "150px",
    height: "150px",
    flexShrink: 0,
    background: "#0080FF",
    border: "none",
    borderRadius: "15px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: 'column',
    gap: '28px',
}; 

const buttonTextStyle = {
    color: "#F3F4F6",
    textAlign: "center",
    fontFamily: "Pretendard",
    fontSize: "16px",
    fontStyle: "normal",
    fontWeight: 600,
    lineHeight: "20px",
    letterSpacing: "-0.5px",
};

const buttonIconContainerSytle = {
    display: "flex",
    width: "65px",
    height: "35px",
    justifyContent: "center",
    alignItems: "flex-start",
    flexDirection: 'row',
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
export default function OnboardingPortfolioPage() {
  const navigate = useNavigate();

  const handleNext = (choice) => {
    console.log(`${choice} 선택`);
    // 선택에 따른 경로 지정
    if (choice === 'solo') {
      navigate('/create/solo');
    } else if (choice === 'ai') {
      navigate('/create/ai');
    }
  }; 

return (
    <div style = {containerStyle}>
        <div style = {frameStyle}>
            <header style = {headerStyle}>
                <button style = {backButtonStyle} onClick={() => navigate(-1)}>
                    <BackIcon/>
                </button>
                <img
                    src = {HeaderLogo}
                    alt = "헤더로고"
                    style = {headerLogoStyle}
                />
            </header>

            <main style = {mainContentStyle}>
                <p style = {QuestionStyle}>
                    <span style = {{color: '#0080FF' }}>포트폴리오</span>
                    <span style = {{color: '#344053'}}>를 만들어볼까요?</span>
                </p>

                <div style = {buttonContainerStyle}>
                    <button
                        style = {optionButtonSytle}
                        onClick={() => handleNext('solo')}
                        onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                        onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
                    >
                        <span style = {buttonTextStyle}>혼자 만들기</span>
                        <div style = {buttonIconContainerSytle}>
                            <Person/>
                        </div>       
                    </button>

                    <button
                        style = {optionButtonSytle}
                        onClick={() => handleNext('solo')}
                        ononClick={() => handleNext('ai')}
                        onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                        onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
                    >
                        <span style = {buttonTextStyle}>AI와 함께 만들기</span>
                        <div style = {buttonIconContainerSytle}>
                            <Person/>
                            <AI/>
                        </div>       
                    </button>
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
