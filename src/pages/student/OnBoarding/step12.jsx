import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import {ReactComponent as BackIcon} from "../../../assets/Back2.svg";

//공통
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

const mainContentStyle = {
    display: 'flex',
    width: '390px',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 0,
    marginBottom: 0,
};

//메인
const profileContainerStyle = {
  width: '330px',
  display: 'flex',
  flexShrink: 0,
  alignItems: 'flex-start',
  flexDirection: 'column',
  gap: '23px',
  marginTop: '65px',
  marginBottom: '46px'
};

const userTitleStyle = {
  color: "#000",
  textAlign: "center",
  fontFamily: "Pretendard",
  fontSize: "20px",
  fontStyle: "normal",
  fontWeight: 600,
  lineHeight: "20px", // 100%
  letterSpacing: "-0.5px",
};

const userNameStyle = {
  color: "#000",
  textAlign: "center",
  fontFamily: "Pretendard",
  fontSize: "32px",
  fontStyle: "normal",
  fontWeight: 700,
  lineHeight: "30px",
  letterSpacing: "-0.5px",
};

const infoTableStyle = {
  display: 'flex',
  width: "324px",
  height: "313px",
  flexShrink: 0,
  borderRadius: "16px",
  border: "1px solid #E3E3E3",
  background: "linear-gradient(180deg, rgba(255, 255, 255, 0.50) 0%, rgba(255, 255, 255, 0.60) 100%)",
  boxShadow: "3px 3px 8px 0 rgba(0, 0, 0, 0.08)",
  justifyContent: 'center',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '6px 3px',
  marginTop: 0,
  marginBottom: 0,
};

const infoRowStyle = {
  display: 'flex',
  alignItems: 'center',
  width: '278px',
  height: '60px',
  marginTop: 0,
  marginBottom: 0,
  alignItems: 'center',
  justifyContent: 'space-between',
  flexDirection: 'row',
};

const infoLabelStyle = {
  color: "#000",
  textAlign: "center",
  fontFamily: "Pretendard",
  fontSize: "20px",
  fontStyle: "normal",
  fontWeight: 500,
  lineHeight: "20px", // 100%
  letterSpacing: "-0.5px",
}

const infoValueStyle = {
  color: "#343539",
  fontFamily: "Pretendard",
  fontSize: "16px",
  fontStyle: "normal",
  fontWeight: 400,
  lineHeight: "normal",
};

//하단버튼
const buttonAreaStyle = {
  position: 'absolute',
  bottom: '46px',
  left: '50%',          // 왼쪽에서 50% 지점으로 이동
  transform: 'translateX(-50%)', // 자체 너비의 50%만큼 왼쪽으로 이동하여 중앙 정렬
  display: "flex",
  width: "390px",
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
  gap: "7px",
  marginTop:0,
};

const editButtonStyle = {
  display: "flex",
  width: "172px",
  padding: "13px 20px",
  justifyContent: "center",
  alignItems: "center",
  gap: "10px",
  flexShrink: 0,
  borderRadius: "8px",
  border: "1px solid #0080FF",
  backgroundColor: 'white',
  
  color: "#0080FF",
  textAlign: "center",
  fontFamily: "Pretendard",
  fontSize: "20px",
  fontStyle: "normal",
  fontWeight: 600,
  lineHeight: "20px",
  letterSpacing: "-0.5px",

  marginTop: 0,
  marginBottom: 0,
};

const nextButtonStyle = {
  display: "flex",
  width: "172px",
  height: "46px",
  padding: "13px 20px",
  justifyContent: "center",
  alignItems: "center",
  gap: "10px",
  flexShrink: 0,
  borderRadius: "8px",
  background: "#0080FF",
  border: 'none',

  color: "#FFF",
  textAlign: "center",
  fontFamily: "Pretendard",
  fontSize: "20px",
  fontStyle: "normal",
  fontWeight: 600,
  lineHeight: "140%", // 28px
  letterSpacing: "-0.5px",
};


//페이지 구조
export default function PortfolioSummaryPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const passedData = location.state || {};

    const finalUserData = {
      title: '유행을 선도하는 기획자',
      name: passedData.name || '심재서',
      birth: passedData.birthdate || '2006.08.07',
      education: passedData.university || '한국외국어대학교 글로벌',
      phone: passedData.phoneNumber || '010-1234-5678',
      email: passedData.uniEmail || 'jaeseo0944@hufs.ac.kr',
      career: '2 years',
    };
    
    setUserData(finalUserData);

  }, [location.state]);

  if (!userData) {
    return null;
  }


return (
    <div style = {containerStyle}>
        <div style = {frameStyle}>
            <header style = {headerStyle}>
                <button style = {backButtonStyle} onClick={() => navigate(-1)}>
                    <BackIcon/>
                </button>
                <h1 style = {headerTitleStyle}>포트폴리오</h1>
            </header>

            <main style={mainContentStyle}>
              <div style={profileContainerStyle}>
                <span style={userTitleStyle}>{userData.title}</span>
                <span style={userNameStyle}>{userData.name}</span>
              </div>

              <section style={infoTableStyle}>
                <div style={infoRowStyle}><span style={infoLabelStyle}>Birth</span><span style={infoValueStyle}>{userData.birth}</span></div>
                <div style={infoRowStyle}><span style={infoLabelStyle}>Education</span><span style={infoValueStyle}>{userData.education}</span></div>
                <div style={infoRowStyle}><span style={infoLabelStyle}>Phone</span><span style={infoValueStyle}>{userData.phone}</span></div>
                <div style={infoRowStyle}><span style={infoLabelStyle}>E-mail</span><span style={infoValueStyle}>{userData.email}</span></div>
                <div style={infoRowStyle}><span style={infoLabelStyle}>Career</span><span style={infoValueStyle}>{userData.career}</span></div>
              </section>

              <section style = {buttonAreaStyle}>
                <button style = {editButtonStyle}>수정</button>
                <button style = {nextButtonStyle}>다음</button>
              </section>
            </main>
        </div>
    </div>
);
}
