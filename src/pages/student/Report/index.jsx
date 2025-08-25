import React, { useState, useRef, useEffect } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";

// [개선] SVG 파일을 컴포넌트로 임포트하여 일관성 있게 사용합니다.
import { ReactComponent as BackIcon } from "../../../assets/Back.svg";
import { ReactComponent as ArrowDownIcon } from "../../../assets/Dropdown.svg";
import { ReactComponent as ArrowUpIcon } from "../../../assets/Fold.svg";
import { ReactComponent as WarningIcon } from "../../../assets/Warning.svg";

import axiosInstance from '../../common/Auth/axios';

// --- 스타일 객체 ---
// ... (Provided styles are used as is)
const containerStyle = {
  display: 'flex', justifyContent: 'center', alignItems: 'center',
  minHeight: '100vh', backgroundColor: "#f0f0f0", fontFamily: "Pretendard, sans-serif"
};
const frameStyle = {
  width: 390, height: 844, backgroundColor: "#FFFFFF",
  position: "relative", display: 'flex', flexDirection: 'column', alignItems: 'center'
};
const headerStyle = {
  width: '100%', height: 30, display: 'flex', alignItems: 'center',
  justifyContent: 'center', position: 'relative', marginTop: '44px', flexShrink: 0,
};
const backButtonStyle = {
  background:'none', border: 'none', padding: 0,
  position: 'absolute', left: '20px', cursor: 'pointer'
};
const headerTitleStyle = {
  color: '#000', fontFamily: 'Pretendard', fontSize: '20px',
  fontWeight: 600, lineHeight: '140%', margin: 0,
};
const targetInfoStyle = {
  display: 'flex', flexDirection: 'column', alignItems: 'center',
  gap: 13, padding: '25px 0 40px 0',
};
const targetImageStyle = {
  width: 80, height: 80, backgroundColor: '#D9D9D9', borderRadius: 12,
};
const targetNameStyle = {
  color: "#000", textAlign: "center", fontFamily: "Pretendard",
  fontSize: "16px", fontWeight: 400,
};
const reportSectionStyle = {
  display: 'flex', width: '100%', boxSizing: 'border-box',
  flexDirection: 'column', padding: '0 25px', marginBottom: '15px',
};
const reportSectionTitleStyle = {
  color: "#717171", fontFamily: "Pretendard", fontSize: "15px",
  fontWeight: 600, lineHeight: "140%", marginLeft: '5px',
  marginBottom:'15px', marginTop: 0,
};
const dropdownContainerStyle = {
  position: 'relative', width: '340px',
};
const dropdownHeaderStyle = {
  display: 'flex', width: '340px', height: '50px',
  padding: '0 13px 0 20px', boxSizing: 'border-box',
  justifyContent: 'space-between', alignItems: 'center',
  borderRadius: '8px', backgroundColor: '#F8F8F8',
  border: 'none', textAlign: 'left', cursor: 'pointer',
};
const dropdownTextStyle = {
  fontFamily: 'Pretendard', fontSize: '15px', fontWeight: 500,
};
const placeholderTextStyle = { ...dropdownTextStyle, color: '#A1A1A1' };
const selectedTextStyle = { ...dropdownTextStyle, color: '#000' };
const dropdownListStyle = {
  position: 'absolute', top: 'calc(100% + 5px)', width: '340px',
  margin: 0, padding: 0, listStyle: 'none',
  borderRadius: '8px', boxShadow: '0 4px 14px 0 rgba(0, 0, 0, 0.10)',
  backgroundColor: '#FFF', zIndex: 1000, overflow: 'hidden'
};
const dropdownItemStyle = {
  width: '100%', height: '44px', padding: '0 20px',
  display: 'flex', alignItems: 'center',
  border: 'none', backgroundColor: 'white',
  textAlign: 'left', cursor: 'pointer',
  color: "#555", fontFamily: "Pretendard", fontSize: "15px", fontWeight: 400,
};
const textAreaStyle = {
  display: 'flex', width: '340px', height: '180px',
  padding: '20px', boxSizing: "border-box",
  borderRadius: '8px', backgroundColor: '#F8F8F8',
  border: 'none', resize: 'none', outline: 'none',
  color: "#000", fontFamily: "Pretendard", fontSize: "15px",
  fontWeight: 500, lineHeight: "140%",
};
const noticeAreaStyle = {
  display: "flex", alignItems: "center", gap: "5px",
  marginTop: '10px',
};
const noticeTextStyle = {
  color: '#A8A8A8', fontFamily: 'Pretendard', fontSize: '12px',
  fontWeight: 500, lineHeight: '140%',
};
const buttonAreaStyle = {
  position: 'absolute', bottom: 0,
  display: 'flex', width: '390px', height: '80px',
  alignItems: 'center', justifyContent: 'center',
};
const submitButtonStyle = {
  display: 'flex', width: '335px', height: '53px',
  justifyContent: 'center', alignItems: 'center',
  borderRadius: '8px', border: 'none',
  backgroundColor: '#0183F0', color: '#FFF',
  fontFamily: 'Pretendard', fontSize: '16px', fontWeight: 600,
  cursor: 'pointer',
};
const disabledButtonStyle = {
  ...submitButtonStyle,
  backgroundColor: '#D9D9D9',
  cursor: 'not-allowed',
};

// API가 요구하는 reportType과 UI에 표시되는 텍스트 매핑
const reportOptions = [
  '무응답 또는 연락 두절',
  '과도한 요구 또는 무리한 요청',
  '부적절한 언행 또는 비매너 행동',
  '허위 정보 등록',
  '외부 홍보 / 광고 목적 활동',
  '기타 (직접 작성)',
];
const REPORT_TYPE_MAP = {
  '무응답 또는 연락 두절': 'NO_RESPONSE',
  '과도한 요구 또는 무리한 요청': 'EXCESSIVE_DEMANDS',
  '부적절한 언행 또는 비매너 행동': 'INAPPROPRIATE_BEHAVIOR',
  '허위 정보 등록': 'FALSE_INFORMATION',
  '외부 홍보 / 광고 목적 활동': 'ADVERTISING',
  '기타 (직접 작성)': 'ETC',
};

// --- 컴포넌트 ---
export default function ReportPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { matchingId } = useParams();

  // 이전 페이지에서 전달받은 신고 대상의 이름과 이미지
  const targetName = location.state?.targetName || '신고 대상';
  // const targetImage = location.state?.targetImage || null; // 이미지가 있다면 사용

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
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // [개선] 제출 가능 여부를 상태로 관리
  const isSubmittable = selectedOption && description.trim() !== '';

  const handleSubmit = async () => {
    if (!isSubmittable) {
      alert('신고 유형과 내용을 모두 입력해주세요.');
      return;
    }

    const reportData = {
      matchingId: parseInt(matchingId),
      reportType: REPORT_TYPE_MAP[selectedOption],
      description: description,
    };

    try {
      // [개선] 중앙 관리되는 axiosInstance 사용
      await axiosInstance.post('/api/report', reportData);
      alert('신고가 정상적으로 접수되었습니다.');
      navigate(-1); // 이전 페이지로 돌아가기
    } catch (error) {
      const errorMessage = error.response?.data?.message || '신고 접수 중 오류가 발생했습니다.';
      alert(errorMessage);
      console.error("Report submission failed:", error);
    }
  };

  return (
    <div style={containerStyle}>
      <div style={frameStyle}>
        <header style={headerStyle}>
          <button style={backButtonStyle} onClick={() => navigate(-1)}>
            <BackIcon />
          </button>
          <h1 style={headerTitleStyle}>신고하기</h1>
        </header>

        <div style={targetInfoStyle}>
          <div style={targetImageStyle}>
            {/* {targetImage ? <img src={targetImage} alt={targetName} style={{width:'100%', height:'100%', objectFit:'cover'}} /> : null} */}
          </div>
          <h2 style={targetNameStyle}>{targetName}</h2>
        </div>

        <section style={reportSectionStyle}>
          <h3 style={reportSectionTitleStyle}>신고 유형</h3>
          <div style={dropdownContainerStyle} ref={dropdownRef}>
            <button type="button" onClick={toggleDropdown} style={dropdownHeaderStyle}>
              <span style={selectedOption ? selectedTextStyle : placeholderTextStyle}>
                {selectedOption || '신고 유형을 선택해주세요.'}
              </span>
              {isOpen ? <ArrowUpIcon /> : <ArrowDownIcon />}
            </button>
            {isOpen && (
              <ul style={dropdownListStyle}>
                {reportOptions.map((option) => (
                  <li key={option} style={{...dropdownItemStyle}} 
                      onMouseDown={() => handleOptionClick(option)}
                      onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#f0f0f0'}
                      onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#fff'}>
                    {option}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </section>

        <section style={reportSectionStyle}>
          <h3 style={reportSectionTitleStyle}>신고 내용</h3>
          <textarea
            style={textAreaStyle}
            placeholder="예) 리뷰에 부적절한 내용이 올라와있고, 협의되지 않은 무리한 요구를 했습니다."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <div style={noticeAreaStyle}>
            <WarningIcon />
            <span style={noticeTextStyle}>이 회원이 신고 대상에 해당하는지 다시 한번 확인하여 주시기 바랍니다.</span>
          </div>
        </section>

        <div style={buttonAreaStyle}>
          <button
            style={isSubmittable ? submitButtonStyle : disabledButtonStyle}
            onClick={handleSubmit}
            disabled={!isSubmittable}
          >
            제출하기
          </button>
        </div>
      </div>
    </div>
  )
};