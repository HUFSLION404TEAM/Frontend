import React, { useState, useRef, useEffect } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import axios from "axios";

import BackIcon from "../../../assets/Back.svg";
import arrowDown from "../../../assets/Dropdown.svg";
import arrowUp from "../../../assets/Fold.svg";
import WarningIcon from "../../../assets/Warning.svg";

//기본레이아웃
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

const mainContentStyle = {
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

//메인_신고대상정보
const targetInfoStyle = {
  display: 'flex',
  width: '390px',
  flexDirection: 'column',
  alignItems: 'center',
  gap: 13,
  marginTop: 0,
  marginBottom: 0,
  padding: '25px 0 0 0',
};

const targetImageStyle = {
  width: 80,
  height: 80,
  backgroundColor: '#A6A6A6',
  borderRadius: 12,
};

const targetNameStyle = {
  color: "#000",
  textAlign: "center",
  fontFamily: "Pretendard",
  fontSize: "16px",
  fontStyle: "normal",
  fontWeight: 400,
  lineHeight: "normal",
  letterSpacing: "-0.4px",
  marginTop: 0,
  marginBottom: 0,
};

//메인_신고입력
const reportSectionStyle = {
  display: 'flex',
  width: '390px',
  flexDirection: 'column',
  alignItems: 'flex-start',
  justifyContet: 'center',
  //gap: '15px',
  marginTop: 0,
  marginBottom: 0,
  padding: '40px 25px 0 25px',
};

const reportSectionTitleStyle = {
  color: "#717171",
  fontFamily: "Pretendard",
  fontSize: "15px",
  fontStyle: "normal",
  fontWeight: 600,
  lineHeight: "140%", // 21px
  letterSpacing: "-0.375px",
  marginLeft: '5px',
  marginTop: 0,
  marginBottom:'15px',
};

//메인_신고입력_유형
const reportOptions = [
  '무응답 또는 연락 두절',
  '과도한 요구 또는 무리한 요청',
  '부적절한 언행 또는 비매너 행동',
  '허위 정보 등록',
  '외부 홍보 / 광고 목적 활동',
  '기타 (직접 작성)',
];

const dropdownContainerStyle = {
  position: 'relative',
  width: '338px',
  color: '#A1A1A1',
  //fontFamily: 'Pretendard',
  fontSize: 16,
  fontStyle: 'normal',
  fontWeight: 400,
  lineHeight: 'normal',
};

const dropdownHeaderStyle = {
  display: 'flex',
  width: '340px',
  height: '50px',
  padding: '0 20px 0 13px',
  justifyContent: 'space-between',
  alignItems: 'center',
  borderRadius: '8px',
  backgroundColor: 'white',
  border: 'None',
  background: 'rgba(255, 255, 255, 0.40)',
  boxShadow: '0 4px 10px 0 rgba(0, 0, 0, 0.25)',
};

const placeholderTextStyle = {
  color: '#A1A1A1',
  fontFamily: 'Pretendard',
  fontSize: '15px',
  fontStyle: 'normal',
  fontWeight: 600,
  lineHeight: '140%',
  letterSpacing: '-0.375px',
}

const dropdownHeaderTextStyle = {
  color: '#A1A1A1',
  fontFamily: 'Pretendard',
  fontSize: '15px',
  fontStyle: 'normal',
  fontWeight: 600,
  lineHeight: '140%',
  letterSpacing: '-0.375px',
};

const dropdownHeaderIconStyle = {
  display: 'flex',
  justifyContent: 'space-between'
};

const ArrowIcon = ({ isOpen }) => (
  <img src={isOpen ? arrowUp : arrowDown} alt="arrow icon" width={30} height={30} />
);

const dropdownListStyle = {
  position: 'absolute',
  top: '100%',
  width: '338px',
  height: '264px',
  left: 0,
  right: 0, 
  margin: 0,
  padding: 0,
  borderTop: 0,
  flexShrink: 0,
  borderRadius: '8px',
  boxShadow: '0 4px 14px 0 rgba(0, 0, 0, 0.10)',
  listStyle: 'none',
  zIndex: 1000,
};

const dropdownItemStyle = {
  width: '338px',
  height: '44px',
  display: 'flex',
  padding: '10px 13px 10px 20px',
  alignItems: 'flex-start',
  flexShrink: 0,
  alignSelf: 'stretch', 
  flexDirection: 'column',
  border: 'None',
  borderRadius: '8px',
  backgroundColor: 'white',
  color: "#A1A1A1",
  fontFamily: "Pretendard",
  fontSize: "16px",
  fontStyle: "normal",
  fontWeight: 400,
  lineHeight: "normal",
};


//메인_신고입력_내용
const textAreaStyle = {
  display: 'flex',
  width: '340px',
  height: '213px',
  padding: '20px 23px 151px 24px',
  boxSizing: "border-box",
  justifyContent: 'center',
  alignItems: 'center',
  flexShrink: 0,
  outline: 'None',
  border: 'None',
  borderRadius: '8px',
  background: 'rgba(255, 255, 255, 0.40)',
  boxShadow: '0 4px 10px 0 rgba(0, 0, 0, 0.25)',
  marginBottom: 0,
  marginTop:0,

  color: "#A1A1A1",
  fontFamily: "Pretendard",
  fontSize: "15px",
  fontStyle: "normal",
  fontWeight: 600,
  lineHeight: "140%", // 21px
  letterSpacing: "-0.375px",
};

//하단_안내문구
const noticeAreaStyle = {
  display: "flex",
  alignItems: "center",
  gap: "5px",
  color: '#A8A8A8',
  fontFamily: 'Pretendard',
  fontSize: '12px',
  fontStyle: 'normal',
  fontWeight: 600,
  lineHeight: '140%', // 16.8px
  letterSpacing: '-0.3px',
  marginBottom: '103px',
  marginTop: '10px',
};

const noticeIconStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: 5,
};

const noticeTextStyle = {
  color: '#A8A8A8',
  fontFamily: 'Pretendard',
  fontSize: '12px',
  fontStyle: 'normal',
  fontWeight: 600,
  lineHeight: '140%',
  letterSpacing: '-0.3px',
};


//하단_제출버튼
const buttonAreaStyle = {
  display: 'flex',
  width: '390px',
  height: '66px',
  marginTop: 0,
  boxSizing : 'border-box',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '0 55px 13px 55px',
  marginBottom: 0,
  marginTop:0,
};

const submitButtonStyle = {
  display: 'flex',
  width: '280px',
  height: '53px',
  padding: '4px 12px',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '8px',
  flexShrink: 0,
  borderRadius: '8px',
  border: '0.4px solid var(--primary-color-600, #0183F0)',
  background: '#FFF',
  color: 'var(--primary-color-600, #0183F0)',
  fontFamily: 'Pretendard',
  fontSize: '14px',
  fontStyle: 'normal',
  fontWeight: 500,
  lineHeight: '18px',
};

// API가 요구하는 reportType과 UI에 표시되는 텍스트 매핑
const REPORT_TYPE_MAP = {
  '무응답 또는 연락 두절': 'NO_RESPONSE',
  '과도한 요구 또는 무리한 요청': 'EXCESSIVE_DEMANDS',
  '부적절한 언행 또는 비매너 행동': 'INAPPROPRIATE_BEHAVIOR',
  '허위 정보 등록': 'FALSE_INFORMATION',
  '외부 홍보 / 광고 목적 활동': 'ADVERTISING',
  '기타 (직접 작성)': 'ETC',
};

//메인컴포넌트
export default function ReportPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { matchingId } = useParams(); // URL에서 matchingId 가져오기

  const targetName = location.state?.targetName || '신고 대상'; // 이전 페이지에서 넘겨받은 이름

  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [description, setDescription] = useState('');
  const dropdownRef = useRef(null);

  const toggleDropdown = () => setIsOpen(!isOpen);
  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  // '제출하기' 버튼 클릭 시 실행될 API 호출 함수
  const handleSubmit = async () => {
    if (!selectedOption) {
      alert('신고 유형을 선택해주세요.');
      return;
    }
    if (description.trim() === '') {
      alert('신고 내용을 입력해주세요.');
      return;
    }

    const token = localStorage.getItem('accessToken');
    if (!token) {
      alert('로그인이 필요합니다.');
      navigate('/login');
      return;
    }

    const reportData = {
      matchingId: parseInt(matchingId),
      reportType: REPORT_TYPE_MAP[selectedOption],
      description: description,
    };

    try {
      await axios.post(
        'https://unibiz.lion.it.kr/api/report',
        reportData,
        { headers: { 'Authorization': `Bearer ${token}` } }
      );
      alert('신고가 정상적으로 접수되었습니다.');
      navigate(-1);
    } catch (error) {
      alert('신고 접수 중 오류가 발생했습니다.');
      console.error(error);
    }
  };

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
          <h1 style = {headerTitleStyle}>신고하기</h1>
        </header>

        <main style = {mainContentStyle}>
          <div style = {targetInfoStyle}>
            <div style = {targetImageStyle}/>
            <h2 style = {targetNameStyle}>컴포즈커피 용인외대점</h2>
          </div>

          <section style={reportSectionStyle}>
            <h2 style={reportSectionTitleStyle}>신고 유형</h2>
            <div style={dropdownContainerStyle} ref={dropdownRef}>
              <button type="button" onClick={toggleDropdown} style={dropdownHeaderStyle}>
                <span>{selectedOption || '신고 유형을 선택해주세요.'}</span>
                <img src={isOpen ? arrowUp : arrowDown} alt="arrow" />
              </button>
              {isOpen && (
                <ul style={dropdownListStyle}>
                  {reportOptions.map((option, index) => (
                    <li key={index}>
                      <button
                          type="button"
                          className="dropdown-item" // hover 스타일을 위한 클래스
                          style={dropdownItemStyle}
                          onClick={() => handleOptionClick(option)}
                      >
                        {option}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </section>

          <section style={reportSectionStyle}>
            <h2 style={reportSectionTitleStyle}>신고 내용</h2>
            <textarea
              style={textAreaStyle}
              placeholder="예) 리뷰에 부적절한 내용이 올라와있고, 협의되지 않은 무리한 요구를 했습니다."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
          />
            <div style={noticeAreaStyle}>
              <img src={WarningIcon} alt="경고" />
              <span>이 회원이 신고 대상에 해당하는지 다시 한번 확인하여 주시기 바랍니다.</span>
            </div>
          </section>
        </main>

        <section style = {buttonAreaStyle}>
          <button style={submitButtonStyle} onClick={handleSubmit}>제출하기</button>
        </section>
      </div>
    </div>
  )
};








