// 아래 코드를 파일 전체에 복사하여 붙여넣으세요.

import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

// SVG 아이콘 import
import { ReactComponent as BackIcon } from "../../../assets/Back2.svg";
import { ReactComponent as ArrowDownIcon } from "../../../assets/Dropdown.svg";
import { ReactComponent as SearchIcon } from "../../../assets/Search.svg";


const containerStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: '100vh',
  backgroundColor: "#f0f0f0",
  fontFamily: "Pretendard, sans-serif",
};

const frameStyle = {
  width: 390,
  height: 844,
  backgroundColor: "#FFFFFF",
  position: "relative",
  display: 'flex',
  flexDirection: 'column',
};

const headerStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'relative',
  height: 45,
  marginTop: '44px',
  flexShrink: 0,
};

const backButtonStyle = {
  position: 'absolute',
  left: '16px',
  border: 'none',
  background: 'none',
  cursor: 'pointer',
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
  flexDirection: 'column',
  alignItems: 'center',
  padding: '42px 29px 0 29px',
  width: '100%',
  boxSizing: 'border-box',
};

const questionContainerStyle = {
 display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  justifyContent: 'center',
  width: '328px',
  height: '100px',
  gap: '8px',
  marginTop: 0,
  marginBottom: '50px',
};

const mainQuestionStyle = {
  fontFamily: "Pretendard",
  fontSize: "25px",
  fontStyle: "normal",
  fontWeight: 700,
  lineHeight: "36px",
  marginTop: 0,
  marginBottom: 0,
};

const subQuestionStyle = {
  color: "#7A89A5",
  fontFamily: "Pretendard",
  fontSize: "14px",
  fontStyle: "normal",
  fontWeight: 400,
  lineHeight: "20px",
  marginTop: 0,
  marginBottom: 0,
};

const inputContainerStyle = {
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  gap: '25px',
  marginTop: 0,
  marginBottom: 0,
};

const inputStyle = {
  width: '318px',
  border: 'none',
  borderBottom: '1px solid #0080FF',

  fontSize: '20px',
  color: "#343539",
  fontFamily: "Pretendard",
  fontSize: "20px",
  fontStyle: "normal",
  fontWeight: 400,
  lineHeight: "normal",
};

const disabledInputStyle = {
  ...inputStyle,
  color: "#343539",
  fontFamily: "Pretendard",
  fontSize: "20px",
  fontStyle: "normal",
  fontWeight: 400,
  lineHeight: "normal",
  borderBottom: '1px solid #F0F0F0',
};

const dropdownTriggerStyle = {
  ...inputStyle,
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  cursor: 'pointer',
  borderBottom: '1px solid #0080FF',
};

const placeholderStyle = {
  color: "#343539",
  fontFamily: "Pretendard",
  fontSize: "20px",
  fontStyle: "normal",
  fontWeight: 400,
  lineHeight: "normal",
};

// --- 드롭다운 스타일 (이미지에 맞게 새로 작성) ---
const dropdownWrapperStyle = {
  position: 'relative',
  width: '318px',
};

const dropdownMenuStyle = {
  position: 'absolute',
  top: 'calc(100% + 11px)', // 입력 필드 바로 아래에 위치
  left: 0,
  width: '100%',
  height: 310,
  backgroundColor: 'white',
  borderRadius: '16px',
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
  overflow: 'hidden',
  display: 'flex',
  flexDirection: 'column',
  zIndex: 10,
};

const searchContainerStyle = {
  display: 'flex',
  alignItems: 'center',
  padding: '12px 16px',
  borderBottom: '1px solid #F0F0F0',
};

const searchInputStyle = {
  border: 'none',
  outline: 'none',
  flex: 1,
  fontSize: '16px',
  color: "#343539",
  fontFamily: "Pretendard",
  fontStyle: "normal",
  fontWeight: 500,
  lineHeight: "140%", // 16.8px
  letterSpacing: "-0.3px",
};

const uniListStyle = {
  listStyle: 'none',
  margin: 0,
  padding: '8px',
  overflowY: 'auto',
  flex: 1,
};

const uniItemStyle = {
  padding: '14px 12px',
  borderRadius: '8px',
  cursor: 'pointer',
  color: "#343539",
  fontFamily: "Pretendard",
  fontSize: "16px",
  fontStyle: "normal",
  fontWeight: 500,
  lineHeight: "140%", // 16.8px
  letterSpacing: "-0.3px",
};

// --- 대학교 목록 데이터 ---
const allUni = [
  '가천대학교', '건국대학교', '경기대학교', '경희대학교', '고려대학교', '광운대학교',
  '국민대학교', '단국대학교', '동국대학교', '서강대학교', '서울대학교', '서울시립대학교',
  '성균관대학교', '세종대학교', '숙명여자대학교', '숭실대학교', '아주대학교',
  '연세대학교', '이화여자대학교', '인하대학교', '중앙대학교', '한국외국어대학교',
  '한양대학교', '홍익대학교'
];


// --- 페이지 컴포넌트 ---
export default function OnboardingUniversityPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const dropdownRef = useRef(null);

  // 이전 페이지에서 넘어온 정보
  const name = location.state?.name || '이름';
  const birthdate = location.state?.birthdate || '생년월일';
  const phoneNumber = location.state?.phoneNumber || '전화번호';
  const email = location.state?.email || '이메일';

  // 상태 관리
  const [selectedUniversity, setSelectedUniversity] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [filteredUniversities, setFilteredUniversities] = useState(allUni);

  // 검색어에 따라 대학교 목록 필터링
  useEffect(() => {
    const results = allUni.filter(uni =>
      uni.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredUniversities(results);
  }, [searchTerm]);

  // 외부 클릭 시 드롭다운 닫기
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // 대학교 선택 처리 함수
  const handleUniversitySelect = (university) => {
    setSelectedUniversity(university);
    setSearchTerm(''); // 검색어 초기화
    setFilteredUniversities(allUni); // 필터링된 목록 초기화
    setIsDropdownOpen(false);
  };

  return (
    <div style={containerStyle}>
      <div style={frameStyle}>
        <header style={headerStyle}>
          <button style={backButtonStyle} onClick={() => navigate(-1)}>
            <BackIcon />
          </button>
          <h1 style={headerTitleStyle}>포트폴리오</h1>
        </header>

        <main style={mainContentStyle}>
          <div style={questionContainerStyle}>
            <h2 style={mainQuestionStyle}>
              기획자님의<br />
              <span style={{ color: '#0080FF' }}>재학 중인 대학교</span>를 입력해주세요!
            </h2>
            <p style={subQuestionStyle}>포트폴리오 생성을 위해 필요합니다.</p>
          </div>

          <div style={inputContainerStyle}>
            {/* 이전 정보를 보여주는 비활성화된 입력 필드들 */}
            <input type="text" value={name} readOnly style={disabledInputStyle} />
            <input type="text" value={birthdate} readOnly style={disabledInputStyle} />
            <input type="text" value={phoneNumber} readOnly style={disabledInputStyle} />
            <input type="text" value={email} readOnly style={disabledInputStyle} />
            
            {/* 대학교 선택 드롭다운 */}
            <div style={dropdownWrapperStyle} ref={dropdownRef}>
              {/* 드롭다운을 열고 닫는 버튼 역할의 입력 필드 */}
              <div
                style={dropdownTriggerStyle}
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                {selectedUniversity ? (
                  <span>{selectedUniversity}</span>
                ) : (
                  <span style={placeholderStyle}>대학</span>
                )}
                <ArrowDownIcon />
              </div>

              {/* isDropdownOpen 상태일 때만 보이는 메뉴 */}
              {isDropdownOpen && (
                <div style={dropdownMenuStyle}>
                  <div style={searchContainerStyle}>
                    <input
                      type="text"
                      placeholder="검색"
                      style={searchInputStyle}
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      autoFocus // 드롭다운이 열릴 때 자동으로 포커스
                    />
                    <SearchIcon />
                  </div>
                  <ul style={uniListStyle}>
                    {filteredUniversities.length > 0 ? (
                      filteredUniversities.map(uni => (
                        <li
                          key={uni}
                          style={uniItemStyle}
                          onClick={() => handleUniversitySelect(uni)}
                          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f5f5f5'}
                          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                        >
                          {uni}
                        </li>
                      ))
                    ) : (
                      <li style={{ ...uniItemStyle, color: '#B0B0B0', cursor: 'default' }}>
                        검색 결과가 없습니다.
                      </li>
                    )}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}