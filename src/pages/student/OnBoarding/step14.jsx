import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import {ReactComponent as BackIcon} from "../../../assets/Back2.svg";
import {ReactComponent as Dot} from "../../../assets/OnboardDot.svg";
import {ReactComponent as Stick} from "../../../assets/OnboardStick.svg";

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

//프로필
const profileContainerStyle = {
  width: '330px',
  display: 'flex',
  flexShrink: 0,
  alignItems: 'flex-start',
  flexDirection: 'column',
  gap: '23px',
  marginTop: '65px',
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

//수상정보
const detailSectionStyle = {
  width: 324,
  heigth: 426,
  display: 'flex',
  flexDirection: 'column',
  alighItems: 'flex-start',
  marginTop: 0,
  marginBottom: 0,
};

const detailTitleStyle = {
  color: "#000",
  fontFamily: "Pretendard",
  fontSize: "32px",
  fontStyle: "normal",
  fontWeight: 700,
  lineHeight: "140%",
  letterSpacing: "-0.8px",
  marginTop: '40px',
  marginBottom: '10px',
};

const detailListContainerStyle = {
  display: 'flex',
  width: "324px",
  height: "371px",
  flexShrink: 0,
  borderRadius: "16px",
  border: "1px solid #E3E3E3",
  background: "linear-gradient(180deg, rgba(255, 255, 255, 0.50) 0%, rgba(255, 255, 255, 0.60) 100%)",
  boxShadow: "3px 3px 8px 0 rgba(0, 0, 0, 0.08)",
  flexDirection: 'column',
  alignItems: 'center',
  marginTop: 0,
  marginBottom: 0,
  padding: '30px 30px 5px 30px',
  boxSizing: 'border-box',
};

const detailListStyle = { 
  listStyle: 'none', 
  margin: 0, 
  padding: 0, 
  position: 'relative',
};

const detailItemStyle = {
  display: 'flex',
  alignItems: 'flex-start',
  width: '264px',
  height: '59px',
  gap: "12px",
  alignSelf: "stretch",
  marginTop: 0,
  marginBottom: '25px',
  //flexDirection: 'row',
};

const itemTextStyle = {
  width: 220,
  height: 35,
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
};

const itemNameStyle = {
  color: "#505050",
  fontFamily: "Pretendard",
  fontSize: "14px",
  fontStyle: "normal",
  fontWeight: 600,
  lineHeight: "140%",
  letterSpacing: "-0.35px",
};

const itemTypeStyle = {
  color: "#767676",
  fontFamily: "Pretendard",
  fontSize: "11px",
  fontStyle: "normal",
  fontWeight: 500,
  lineHeight: "140%",
  letterSpacing: "-0.275px",
};

const itemIconStyle = {
  width: 32,
  height: 59,
  display: "flex",
  width: "32px",
  flexDirection: "column",
  alignItems: "center",
  gap: "11px",
}

const itemDotStyle = {
  height: 32,
};

const itemStickStyle = {
  height: 16,
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
export default function PortfolioAwardsPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const [userData, setUserData] = useState(null);
  const [awards, setAwards] = useState([]);

  useEffect(() => {
    const passedData = location.state || {};

    const finalUserData = {
      title: '유행을 선도하는 기획자',
      name: passedData.name || '심재서',
    };

    const finalAwards = passedData.awards || [
        { id: 1, name: '캠퍼스 라이프 앱 리디자인', type: '금상' },
        { id: 2, name: '로컬 카페 SNS 브랜딩 캠페인', type: '동상' },
        { id: 3, name: '대학생 커뮤니티 플랫폼 기획', type: '장려상' },
        { id: 4, name: '소비자 행동 분석 리포트', type: '장려상' },
    ];
    
    setUserData(finalUserData);
    setAwards(finalAwards);

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

              <section style={detailSectionStyle}>
                <h3 style={detailTitleStyle}>Projects</h3>
                <div style={detailListContainerStyle}>
                  <ul style={detailListStyle}>
                    {awards.map(item => (
                      <li key={item.id} style={detailItemStyle}>
                        <div style={itemIconStyle}>
                          <div style={itemDotStyle}><Dot/></div>
                          <div style={itemStickStyle}><Stick/></div>
                        </div>
                        <div style={itemTextStyle}>
                          <span style={itemNameStyle}>{item.name}</span>
                          <span style={itemTypeStyle}>{item.type}</span>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
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
