import React, { useState, useEffect, useCallback } from 'react'; // [수정] useCallback을 import에 추가
import { useNavigate } from 'react-router-dom';

// --- SVG 아이콘 임포트 ---
import { ReactComponent as BackIcon } from "../../../assets/Back.svg";
import { ReactComponent as DefaultStoreIcon } from "../../../assets/PersonProfile.svg";
import { ReactComponent as LoadingSpinnerIcon } from "../../../assets/Loading75.svg";
import { ReactComponent as StatusPendingIcon } from "../../../assets/Loading0.svg";
import { ReactComponent as StatusInProgressIcon } from "../../../assets/Loading25.svg";
import { ReactComponent as StatusCompletedIcon } from "../../../assets/Loading100.svg";
import axiosInstance from '../../common/Auth/axios';


// --- 스타일 객체 ---
const containerStyle = { 
  display: 'flex', 
  justifyContent: 'center', 
  alignItems: 'center', 
  minHeight: '100vh', 
  backgroundColor: "#F5F5F5", 
  fontFamily: "Pretendard, sans-serif" 
};
const frameStyle = { 
  width: 390, 
  height: 844,
  backgroundColor: "#FFFFFF",
  display: 'flex', 
  position: 'relative',
  flexDirection: 'column',
};
const headerStyle = { 
  height: 30,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'relative',
  marginTop: '44px',
  marginBottom: '30px',
  flexShrink: 0,
};
const backButtonStyle = { 
  background:'none',
  border: 'none',
  padding: 0,
  position: 'absolute',
  left: '20px',
  cursor: 'pointer',
};
const headerTitleStyle = { 
  color: '#000',
  fontFamily: 'Pretendard',
  fontSize: '20px',
  fontStyle: 'normal',
  fontWeight: 600,
  margin: 0,
};
const mainContentStyle = { 
  flex: 1,
  overflowY: 'auto',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '0 20px',
  gap:'16px',
};
const messageStyle = {
  marginTop: '20px',
  fontSize: '16px',
  color: '#888',
};
const itemStyle = { 
  width: "335px",
  minHeight: "107px",
  boxSizing: 'border-box',
  borderRadius: "16px",
  backgroundColor: "#FFF",
  boxShadow: "0px 4px 12px 0px rgba(0, 0, 0, 0.05)",
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '20px',
  flexShrink: 0,
};
const itemContentStyle = { 
  display: 'flex', 
  alignItems: 'center', 
  gap: '16px',
  flex: 1,
};
const imageContainerStyle = {
  width: '64px',
  height: '64px',
  borderRadius: '12px',
  overflow: 'hidden',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: '#f0f0f0',
  flexShrink: 0,
};
const textContentStyle = { 
  display: 'flex', 
  flexDirection: 'column', 
  justifyContent: 'center',
  gap: '8px',
};
const nameStyle = { 
  color: "#111",
  fontFamily: "Pretendard",
  fontSize: "18px",
  fontWeight: 600,
};
const subTextStyle = { 
  color: "#A8A8A8",
  fontFamily: "Pretendard",
  fontSize: "14px",
  fontWeight: 500,
  display: 'flex',
  alignItems: 'center',
  gap: '4px',
};
const baseButtonStyle = { 
  display: "inline-flex",
  padding: '6px 14px',
  justifyContent: "center",
  alignItems: "center",
  borderRadius: "8px",
  border: "1px solid #0183F0",
  backgroundColor: "#FFF",
  color: "#0183F0",
  fontFamily: "Pretendard",
  fontSize: "14px",
  fontWeight: 500,
  cursor: 'pointer',
};
const singleButtonStyle = {
  ...baseButtonStyle,
  width: 'auto',
};
const buttonGroupStyle = { 
  display: 'flex', 
  gap: '8px', 
};
const statusContainerStyle = { 
  position: 'relative', 
  display: 'flex', 
  alignItems: 'center', 
  justifyContent: 'center', 
  width: '60px', 
  height: '60px',
  flexShrink: 0,
};
const statusTextStyle = {
  color: '#808080',
  textAlign: 'center',
  position: 'absolute',
  fontFamily: 'Pretendard',
  fontSize: '11px',
  fontWeight: 500,
};

// --- 컴포넌트 ---
const MatchItem = ({ match, onEnd, onAccept, onReject, onGoToFeedback }) => {
  const renderActionArea = () => {
    switch (match.status) {
      case 'pending':
        return <div style={subTextStyle}>{match.subText} <LoadingSpinnerIcon /></div>;
      case 'in_progress':
        return <button style={singleButtonStyle} onClick={() => onEnd(match.id)}>종료하기</button>;
      case 'completed':
        return <button style={singleButtonStyle} onClick={() => onGoToFeedback(match.id)}>AI 피드백</button>;
      case 'needs_action':
        return (
          <div style={buttonGroupStyle}>
            <button style={{...baseButtonStyle, backgroundColor: '#0183F0', color: '#FFF'}} onClick={() => onAccept(match.id)}>수락</button>
            <button style={baseButtonStyle} onClick={() => onReject(match.id)}>거절</button>
          </div>
        );
      default:
        return null;
    }
  };
  const renderStatusIcon = () => {
    switch (match.status) {
      case 'pending':
        return (
          <>
            <StatusPendingIcon />
            <span style={statusTextStyle}>매칭대기</span>
          </>
        );
      case 'in_progress':
        return (
          <>
            <StatusInProgressIcon />
            <span style={statusTextStyle}>진행중</span>
          </>
        );
      case 'completed':
        return (
          <>
            <StatusCompletedIcon />
            <span style={statusTextStyle}>진행완료</span>
          </>
        );
      default:
        return null;
    }
  };
  return (
    <div style={itemStyle}>
      <div style={itemContentStyle}>
        <div style={imageContainerStyle}>
          <DefaultStoreIcon width="100%" height="100%" />
        </div>
        <div style={textContentStyle}>
          <div style={nameStyle}>{match.name}</div>
          {renderActionArea()}
        </div>
      </div>
      <div style={statusContainerStyle}>
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

  const mapApiStatusToFrontendStatus = useCallback((apiStatus) => {
    const statusMap = {
      'PENDING': 'pending', 'ACCEPTED': 'in_progress', 'IN_PROGRESS': 'in_progress',
      'COMPLETED': 'completed', 'OFFERED': 'needs_action', 'REJECTED': 'rejected',
    };
    return statusMap[apiStatus] || '';
  }, []);

  const getSubTextForStatus = useCallback((apiStatus) => {
    const subTextMap = { 'PENDING': '매칭 대기중!' };
    return subTextMap[apiStatus] || '';
  }, []);

  const fetchMatches = useCallback(async () => {
    const studentId = localStorage.getItem('onboardingName'); 
    if (!studentId) {
      alert('로그인 정보가 없습니다. 다시 로그인해주세요.');
      navigate('/login');
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const response = await axiosInstance.get(
        '/api/matching/student',
        { params: { studentId } }
      );
      if (response.data && response.data.success) {
        const transformedData = response.data.data
          .map(item => ({
            id: item.id,
            name: item.storeName,
            status: mapApiStatusToFrontendStatus(item.status),
            subText: getSubTextForStatus(item.status),
          }))
          .filter(item => item.status && item.status !== 'rejected');
        setMatches(transformedData);
      } else {
        throw new Error(response.data.message || '데이터를 불러오는데 실패했습니다.');
      }
    } catch (err) {
      setError('매칭 현황을 불러오는 중 오류가 발생했습니다.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [navigate, mapApiStatusToFrontendStatus, getSubTextForStatus]);

  useEffect(() => {
    fetchMatches();
  }, [fetchMatches]);

  const createApiHandler = useCallback((action, { successMessage, errorMessage }) => {
    return async (matchId) => {
      const endpoint = `/api/matching/${matchId}/${action}`;
      try {
        const response = await axiosInstance.post(endpoint);
        if (response.data && response.data.success) {
          alert(successMessage);
          fetchMatches();
        } else {
          throw new Error(response.data.message || errorMessage);
        }
      } catch (err) {
        alert(errorMessage);
        console.error(`${action} 처리 중 오류:`, err);
      }
    };
  }, [fetchMatches]);

  const handleAccept = createApiHandler('accept', {
    successMessage: '매칭을 수락했습니다.',
    errorMessage: '매칭 수락 중 오류가 발생했습니다.'
  });
  const handleReject = createApiHandler('reject', {
    successMessage: '매칭을 거절했습니다.',
    errorMessage: '매칭 거절 중 오류가 발생했습니다.'
  });
  const handleEnd = createApiHandler('end', {
    successMessage: '프로젝트를 종료했습니다.',
    errorMessage: '프로젝트 종료 중 오류가 발생했습니다.'
  });
  const handleGoToFeedback = (matchId) => navigate(`/feedback/${matchId}`);

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
          {loading ? (
            <div style={messageStyle}>매칭 현황을 불러오는 중...</div>
          ) : error ? (
            <div style={messageStyle}>{error}</div>
          ) : matches.length > 0 ? (
            matches.map(match => (
              <MatchItem 
                key={match.id} 
                match={match}
                onAccept={handleAccept}
                onReject={handleReject}
                onEnd={handleEnd}
                onGoToFeedback={handleGoToFeedback}
              />
            ))
          ) : (
            <div style={messageStyle}>진행중인 매칭이 없습니다.</div>
          )}
        </main>
      </div>
    </div>
  );
}