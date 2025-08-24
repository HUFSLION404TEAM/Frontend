import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { ReactComponent as BackIcon } from "../../../assets/Back.svg";
import { ReactComponent as PersonProfile } from "../../../assets/PersonProfile.svg";
import {ReactComponent as Loading0} from "../../../assets/Loading25.svg";
import {ReactComponent as Loading25} from "../../../assets/Loading25.svg";
import {ReactComponent as Loading100} from "../../../assets/Loading25.svg";
import { ReactComponent as Loading75 } from "../../../assets/Loading75.svg";
import { ReactComponent as Alarm2 } from "../../../assets/Alarm2.svg";

// --- Mock Data ---
const mockMatches = [
  { id: 1, name: '한국외대 김대학', status: 'pending', subText: '매칭 대기중!' },
  { id: 2, name: '한국외대 이대학', status: 'in_progress', subText: '프로젝트 진행중!' },
  { id: 3, name: '한국외대 박대학', status: 'completed' },
  { id: 4, name: '한국외대 윤대학', status: 'needs_action' },
];

// --- 스타일 객체 ---
const containerStyle = { 
  display: 'flex', 
  justifyContent: 'center', 
  alignItems: 'center', 
  minHeight: '100vh', 
  backgroundColor: "#f0f0f0", 
  fontFamily: "Pretendard, sans-serif" 
};

const frameStyle = { 
  width: 390, 
  height: 844,
  backgroundColor: "#FFFFFF",
  display: 'flex', 
  position: 'relative',
  flexDirection: 'column',
  justifyContent: 'center',
};

const headerStyle = { 
  height: 30,
  display: 'flex',
  flexDirection: "row",
  alignItems: 'center',
  justifyContent: 'center',
  position: 'relative',
  marginTop: '44px',
  marginBottom: '30px',
};

const backButtonStyle = { 
  background:'none',
  border: 'none',
  padding: 0,
  position: 'absolute',
  left: '20px'
};

const headerTitleStyle = { 
  color: '#000',
  fontFamily: 'Pretendard',
  fontSize: '20px',
  fontStyle: 'normal',
  fontWeight: 600,
  lineHeight: '140%', // 28px
  letterSpacing: '-0.5px',
};

const mainContentStyle = { 
  padding: '20px 0',
  overflow: 'auto',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'relative',
  flexDirection: 'column',
  gap:'25px', 

  backgroundColor: 'orange',
};


// 매칭 아이템
const itemStyle = { 
  width: "335px",
  height: "107px",
  boxSizing: 'border-box',
  borderRadius: "16px",
  background: "linear-gradient(180deg, rgba(255, 255, 255, 0.40) 0%, rgba(255, 255, 255, 0.60) 100%)",
  boxShadow: "3px 3px 8px 0 rgba(0, 0, 0, 0.08)",
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  position: 'relative',
  flexDirection: 'row',
  padding: '0 20px',
};

const userInfoStyle = { 
  display: 'flex', 
  alignItems: 'center', 
  gap: '30px', 
};

const textContentStyle = { 
  display: 'flex', 
  flexDirection: 'column', 
  gap: '10px',
};

const nameStyle = { 
  color: "#111",
  fontFamily: "Pretendard",
  fontSize: "20px",
  fontStyle: "normal",
  fontWeight: 600,
  lineHeight: "140%", // 28px
  letterSpacing: "-0.5px",
};

const subTextStyle = { 
  color: "#A8A8A8",
  fontFamily: "Pretendard",
  fontSize: "15px",
  fontStyle: "normal",
  fontWeight: 500,
  lineHeight: "140%", // 21px
  letterSpacing: "-0.375px",
  gap: '10px',
  display: 'flex',
  alignItems: 'center',
};

const baseButtonStyle = { 
  display: "flex",
  width: "70px",
  height: "29px",
  justifyContent: "center",
  alignItems: "center",
  flexShrink: 0,
  alignSelf: "stretch",
  borderRadius: "8px",
  border: "0.4px solid #0183F0",
  backgroundColor: "#FFF",

  color: "#0183F0",
  fontFamily: "Pretendard",
  fontSize: "14px",
  fontStyle: "normal",
  fontWeight: 500,
  lineHeight: "18px",
};

const buttonGroupStyle = { 
  display: 'flex', 
  gap: '5px', 
};

const statusIconContainerStyle = { 
  position: 'relative', 
  display: 'flex', 
  alignItems: 'center', 
  justifyContent: 'center', 
  width: '60px', 
  height: '60px',
  
  backgroundColor: 'orange',
};

// --- 단일 MatchItem 컴포넌트 ---
// 이 컴포넌트가 status 값에 따라 내부 모습을 동적으로 변경합니다.
const MatchItem = ({ match }) => {
  
  // 상태에 따른 액션 영역 (버튼 또는 텍스트) 렌더링 함수
  const renderActionArea = () => {
    switch (match.status) {
      case 'pending':
      case 'in_progress':
        return <div style={subTextStyle}>{match.subText} <Loading75 /></div>;
      case 'completed':
        return (
          <div style={buttonGroupStyle}>
            <button style={baseButtonStyle}>송금하기</button>
            <button style={baseButtonStyle}>리뷰쓰기</button>
          </div>
        );
      case 'needs_action':
        return (
          <div style={buttonGroupStyle}>
            <button style={baseButtonStyle}>수락</button>
            <button style={baseButtonStyle}>거절</button>
          </div>
        );
      default:
        return null;
    }
  };

  // 상태에 따른 아이콘 렌더링 함수
  const renderStatusIcon = () => {
    switch (match.status) {
      case 'pending':
        return (
          <>
            <img
              src = {Loading0}
              alt = "매칭대기"
              width = {50}
              height = {50}
            />
            <span style={{ 
              color: '#808080',
              textAlign: 'center',
              position: 'absolute',
              fontFamily: 'Pretendard',
              fontSize: '11px',
              fontStyle: 'normal',
              fontWeight: 500,
              lineHeight: '140%', // 15.4px
              letterSpacing: '-0.275px', }}>매칭대기</span>
          </>
        );
      case 'in_progress':
        return (
          <>
            <img
              src = {Loading25}
              alt = "진행중"
              width = {50}
              height = {50}
            />
            <span style={{ 
              color: '#808080',
              textAlign: 'center',
              position: 'absolute',
              fontFamily: 'Pretendard',
              fontSize: '11px',
              fontStyle: 'normal',
              fontWeight: 500,
              lineHeight: '140%', // 15.4px
              letterSpacing: '-0.275px', }}>진행중</span>
          </>
        );
      case 'completed':
        return (
          <>
            <img
              src = {Loading100}
              alt = "진행완료"
              width = {50}
              height = {50}
            />
            <span style={{ 
              color: '#808080',
              textAlign: 'center',
              position: 'absolute',
              fontFamily: 'Pretendard',
              fontSize: '11px',
              fontStyle: 'normal',
              fontWeight: 500,
              lineHeight: '140%', // 15.4px
              letterSpacing: '-0.275px', }}>진행완료</span>
          </>
        );
      case 'needs_action':
      default:
        return null;
    }
  };

  return (
    <div style={itemStyle}>
      <div style={userInfoStyle}>
        <PersonProfile />
        <div style={textContentStyle}>
          <div style={nameStyle}>{match.name}</div>
          {renderActionArea()}
        </div>
      </div>
      <div style={statusIconContainerStyle}>
        {renderStatusIcon()}
      </div>
    </div>
  );
};

// --- 메인 페이지 컴포넌트 ---
export default function StudentMatchPage() {
  const navigate = useNavigate();
  const [matches, setMatches] = useState(mockMatches);

  return (
    <div style={containerStyle}>
      <div style={frameStyle}>
        <header style={headerStyle}>
          <button style={backButtonStyle} onClick={() => navigate(-1)}>
            <BackIcon />
          </button>
          <h1 style={headerTitleStyle}>매칭 현황</h1>
        </header>
        <main style={mainContentStyle}>
          {matches.map(match => (
            <MatchItem key={match.id} match={match} />
          ))}
        </main>
        {/* 하단 네비게이션 바가 위치할 수 있습니다. */}
      </div>
    </div>
  );
}
