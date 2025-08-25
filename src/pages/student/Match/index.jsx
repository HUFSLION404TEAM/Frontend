import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import { ReactComponent as BackIcon } from "../../../assets/Back.svg";
import { ReactComponent as PersonProfile } from "../../../assets/PersonProfile.svg";
import {ReactComponent as Loading0} from "../../../assets/Loading25.svg";
import {ReactComponent as Loading25} from "../../../assets/Loading25.svg";
import {ReactComponent as Loading100} from "../../../assets/Loading25.svg";
import { ReactComponent as Loading75 } from "../../../assets/Loading75.svg";

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

const singleButtonStyle = {
    display: 'flex',
    height: '29px',
    padding: '4px 12px',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '8px',
    flexShrink: 0,
    alignSelf: 'stretch',

    borderRadius: '8px',
    border: '0.4px solid #0183F0',
    background: '#FFF',

    color: '#0183F0',
    fontFamily: 'Pretendard',
    fontSize: '14px',
    fontStyle: 'normal',
    fontWeight: 500,
    lineHeight: '140%', // 19.6px
    letterSpacing: '-0.35px',
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


// --- 컴포넌트 ---
const MatchItem = ({ match, onEnd, onAccept, onReject, onGoToFeedback }) => {
  // 상태에 따른 액션 렌더링 함수
  const renderActionArea = () => {
    switch (match.status) {
      case 'pending':
        return <div style={subTextStyle}>{match.subText}</div>;
      case 'in_progress':
        return (
          <div style={buttonGroupStyle}>
            <button style={singleButtonStyle} onClick={() => onEnd(match.id)}>종료하기</button>
          </div>
        );
      case 'completed':
        return (
          <div style={buttonGroupStyle}>
            <button style={singleButtonStyle} onClick={() => onGoToFeedback(match.id)}>AI 피드백</button>
          </div>
        );

      case 'needs_action':
        return (
          <div style={buttonGroupStyle}>
            <button style={baseButtonStyle} onClick={() => onAccept(match.id)}>수락</button>
            <button style={baseButtonStyle} onClick={() => onReject(match.id)}>거절</button>
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
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMatches = async () => {
    //로그인 시 저장된 학생아이디와 토큰을 가져옴
    const studentID = localStorage.getItem('studentID'); 
    const token = localStorage.getItem('accessToken');

    if (!token || ! studentID) {
        alert('로그인 정보 또는 학생정보가 없습니다. 다시 로그인해주세요.');
        navigate('/login');
        return;
      }
    
    try {
      // axios.get 요청 시 params 옵션을 사용해 학생아이디를 전달합니다.
      const response = await axios.get(
        'https://unibiz.lion.it.kr/api/matching/student',
        { 
          params: { studentID },
          headers: { 'Authorization': `Bearer ${token}` } 
        }
      );
      const transformedData = response.data.data.map(item => ({
        id: item.id,
        name: item.studentName,
        status: mapApiStatusToFrontendStatus(item.status),
        subText: getSubTextForStatus(item.status),
      }));
      setMatches(transformedData);
    
    } catch (err) {
      setError('매칭 현황을 불러오는 데 실패했습니다.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  fetchMatches();
}, [navigate]);
  
  // API 상태값을 UI 상태값으로 변환하는 함수
  const mapApiStatusToFrontendStatus = (apiStatus) => {
    const statusMap = {
      'PENDING': 'pending',
      'ACCEPTED': 'in_progress',
      'IN_PROGRESS': 'in_progress',
      'COMPLETED': 'completed',
      'OFFERED': 'needs_action',
      'REJECTED': 'rejected'
    };
    return statusMap[apiStatus] || '';
  };

  // API 상태값에 따른 서브 텍스트를 생성하는 함수
  const getSubTextForStatus = (apiStatus) => {
    const subTextMap = {
      'PENDING': '매칭 대기중!',
      'ACCEPTED': '프로젝트 진행중!',
      'IN_PROGRESS': '프로젝트 진행중!',
      'REJECTED': '매칭이 거절되었습니다.'
    };
    return subTextMap[apiStatus] || '';
  };
  
  // 버튼 클릭 핸들러 함수들
  const handleAccept = (matchId) => alert(`${matchId}번 매칭 수락 (API 연동 필요)`);
  const handleReject = (matchId) => alert(`${matchId}번 매칭 거절 (API 연동 필요)`);
  const handleGoToPayment = (matchId) => navigate(`/payment/${matchId}`);
  const handleGoToReview = (matchId) => navigate(`/review/${matchId}`);


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
