import React, { useState } from 'react'; 

import BackIcon from "../../../assets/Back.svg";
import PersonProfile from "../../../assets/PersonProfile.svg";
import Loading0 from "../../../assets/Loading0.svg";
import Loading25 from "../../../assets/Loading25.svg";
import Loading75 from "../../../assets/Loading75.svg";
import Loading100 from "../../../assets/Loading100.svg";
import Alarm2 from "../../../assets/Alarm2.svg";

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
  height: 30,
  display: 'flex',
  flexDirection: "row",
  alignItems: 'center',
  justifyContent: 'center',
  position: 'relative',
  marginTop: '44px',
};

const backButtonStyle = {
  background:'none',
  border: 'none',
  padding: 0,
  position: 'absolute',
  left: '20px'
}

const headerTitleStyle = {
  color: '#000',
  fontFamily: 'Pretendard',
  fontSize: '20px',
  fontStyle: 'normal',
  fontWeight: 600,
  lineHeight: '140%', // 28px
  letterSpacing: '-0.5px',
};

//메인콘텐츠
const mainContentStyle = {
  padding: '20px 0',
  overflow: 'auto',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'relative',
  flexDirection: 'column',
  gap:'20px',
  marginTop: '24px',
  backgroundColor: 'green',
};

//매칭바
const barStyle = {
  width: "335px",
  height: "107px",
  boxSizing: 'border-box',
  borderRadius: "16px",
  background: "linear-gradient(180deg, rgba(255, 255, 255, 0.40) 0%, rgba(255, 255, 255, 0.60) 100%)",
  boxShadow: "3px 3px 8px 0 rgba(0, 0, 0, 0.08)",
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-start',
  position: 'relative',
  flexDirection: 'row',
  padding: '0 20px',
  backgroundColor: 'yellow',
};

const barProfileIconStyle = {
  width: 50,
  height: 50,
};

const barInfoStyle = {
  display: "flex",
  width: "123px",
  height: "59px",
  alignItems: "center",
  justifyContent: "flex-start",
  flexDirection: 'column',
  gap: "10px",
  paddingLeft: '36px',
  backgroundColor: 'white',
};

const barSubtextStyle = {
  display: 'flex',
  width: '96px',
  height: '21px',
  alignItems: "center",
  justifyContent: "flex-start",
  flexDirection: 'row',
  gap: "10px",
  backgroundColor: 'green',
};

const barNameStyle = {
  color: "#111",
  fontFamily: "Pretendard",
  fontSize: "20px",
  fontStyle: "normal",
  fontWeight: 600,
  lineHeight: "140%", // 28px
  letterSpacing: "-0.5px",
  backgroundColor: 'red',
};

const barTextStyle = {
  color: "#A8A8A8",
  fontFamily: "Pretendard",
  fontSize: "15px",
  fontStyle: "normal",
  fontWeight: 500,
  lineHeight: "140%", // 21px
  letterSpacing: "-0.375px",
  backgroundColor: 'blue',
}

const barSingleBtnStyle = {
  display: "flex",
  height: "29px",
  padding: "4px 12px",
  justifyContent: "center",
  alignItems: "center",
  gap: "8px",
  flexShrink: 0,
  alignSelf: "stretch",
  borderRadius: "8px",
  border: "0.4px solid #0183F0",
  background: "#FFF",
};

const barDoubleBtnStyle = {
  display: "flex",
  height: "29px",
  padding: "4px 12px",
  justifyContent: "center",
  alignItems: "center",
  gap: "8px",
  flexShrink: 0,
  alignSelf: "stretch",
  borderRadius: "8px",
  border: "0.4px solid #0183F0",
  background: "#FFF",
};


const statusIconContainerStyle = {
  position: "relative",
  width: 60,
  height: 60,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const barStatusStyle = {
  width: 50,
  height: 50,
};

const barStatusTextStyle = {
  color: "#808080",
  textAlign: "center",
  fontFamily: "Pretendard",
  fontSize: "11px",
  fontStyle: "normal",
  fontWeight: 500,
  lineHeight: "140%", // 15.4px
  letterSpacing: "-0.275px",
};

const alarmStyle = {
  width: 16,
  height: 16,
};


//Bar 컴포넌트
function MatchBar({match}) {
  const renderBarActions = () => {
    switch (match.type) {
      case 'pending':
        return <div style = {barStatusStyle}>매칭대기</div>;
      case 'deposit':
        return (
          <>
            <button style = {barSingleBtnStyle}>송금하기</button>
            <img
              src = {Loading25}
              alt = '25% 진행중'
              style = {barStatusStyle}
            />
          </>
        );
      case 'reviewable':
        return (
          <>
            <button style = {barSingleBtnStyle}>리뷰쓰기</button>
            <img
              src = {Loading100}
              alt = '진행완료'
              style = {barStatusStyle}
            />
          </>
        );
      case 'decision':
        return (
          <>
            <button style = {barDoubleBtnStyle}>수락</button>
            <button style = {barDoubleBtnStyle}>거절</button>
          </>
        );
      default:
        return null;
    }
  };

return (
  <div style = {barStyle}>
    <img
      src = {PersonProfile}
      alt = "프로필"
      style = {barProfileIconStyle}
    />
    <div style = {barInfoStyle}>
      <div style = {barNameStyle}>{match.name}</div>
      {match.statusText && <div style={barTextStyle}>{match.statusText}</div> }
    </div>
    <div style = {barStatusStyle}>
      <h1 style = {barStatusTextStyle}>진행상태</h1>
    </div>
  </div>
);  
}

// 중앙 영역 (버튼 또는 텍스트)
const ActionArea = ({ status, subText }) => {
  switch (status) {
    case 'pending':
      return <div style={barTextStyle}>{subText} <Loading75/></div>;
    case 'payment_due':
      return <button style={barSingleBtnStyle}>송금하기</button>;
    case 'completed':
      return <button style={barSingleBtnStyle}>리뷰쓰기</button>;
    case 'needs_action':
      return (
        <div style={{ }}>
          <button style={barDoubleBtnStyle}>수락</button>
          <button style={barDoubleBtnStyle}>거절</button>
        </div>
      );
    default:
      return null;
  }
};

// 상태 아이콘
export const StatusIcon = ({ status }) => {
  switch (status) {
    case "pending":
      return (
        <div style={statusIconContainerStyle}>
          <img 
            src = {Loading0}
            width={50} 
            height={50}
            alt='0%' 
          />
          <span style={{ ...barStatusTextStyle, color: "#B0B0B0" }}>매칭대기</span>
        </div>
      );

    case "payment_due":
      return (
        <div style={statusIconContainerStyle}>
          <img 
            src = {Loading25}
            width={50} 
            height={50}
            alt='0%' 
          />
          <span style={{ ...barStatusTextStyle, color: "#0183F0" }}>진행중</span>
        </div>
      );

    case "completed":
      return (
        <div style={statusIconContainerStyle}>
          <img 
            src = {Loading100}
            width={50} 
            height={50}
            alt='100%' 
          />
          <div style={{ position: "absolute", top: -2, right: -2 }}>
            <Alarm2 width={16} height={16} />
          </div>
          <span style={{ ...barStatusTextStyle, color: "#FFFFFF" }}>진행완료</span>
        </div>
      );

    case "needs_action":
    default:
      return null;
  }
};

//데이터 추가
export default function StudentMatch() {

  const mockMatches = [
  {
    id: 1,
    name: '한국외대 김대학',
    status: 'pending', // 매칭 대기
    subText: '매칭 대기중!',
  },
  {
    id: 2,
    name: '한국외대 이대학',
    status: 'payment_due', // 송금 대기 (진행중)
  },
  {
    id: 3,
    name: '한국외대 박대학',
    status: 'completed', // 진행 완료
  },
  {
    id: 4,
    name: '한국외대 윤대학',
    status: 'needs_action', // 수락/거절 필요
  },
];

//기본 컴포넌트

  const [matches, setMatches] = useState(mockMatches);

  return (
    <div style = {containerStyle}>
      <div style = {frameStyle}>
        <header style = {headerStyle}>
          <img 
            src = {BackIcon} 
            alt = "뒤로가기"
            width={30}
            height={30}
            style = {backButtonStyle}
          />
          <h1 style = {headerTitleStyle}>매칭 현황</h1>
        </header>

        <main style = {mainContentStyle}>
          {matches.map(match => (
            <MatchBar key={match.id} match={match} />
          ))}
        </main>
      </div>
    </div>
  );
}
