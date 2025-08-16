import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import {ReactComponent as BackIcon} from "../../../assets/Back2.svg";
import arrowDown from "../../../assets/Dropdown.svg";
import {ReactComponent as Search} from "../../../assets/Search.svg"

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


//메인
const mainContentStyle = {
    display: 'flex',
    width: '390px',
    height: '333px',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '50px',
    marginTop: '42px',
    marginBottom: 0,
};

const questionContainerStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  justifyContent: 'center',
  width: '361px',
  height: '100px',
  gap: '8px',
  marginLeft: '29px',
  marginTop: 0,
  marginBottom: 0,
};

//질문
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

//입력
const inputContainerStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
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
    color: '#B0B0B0', // 회색으로 처리하여 비활성화된 느낌을 줌
    borderBottom: '2px solid #F0F0F0',

};

//대학
const allUni = [
  '가천대학교', '건국대학교', '경기대학교', '경희대학교', '고려대학교',
  '광운대학교', '국민대학교', '단국대학교', '동국대학교', '서강대학교',
  '서울대학교', '서울시립대학교', '성균관대학교', '세종대학교', '숙명여자대학교',
  '숭실대학교', '아주대학교', '연세대학교', '이화여자대학교', '인하대학교',
  '중앙대학교', '한국외국어대학교', '한양대학교', '홍익대학교'
];

const dropdownContainerStyle = {
    positon: 'relative',
    width: '317px',
    height: '36px',
};

const dropdownHeaderStyle = {
  display: 'flex',
  width: "169px",
  padding: "11px 134px 11px 14px",
  alignItems: "center",
  borderRadius: "15px",
  background: "rgba(255, 255, 255, 0.40)",
  boxShadow: "0 4px 10px 0 rgba(0, 0, 0, 0.25)",
};

const dropdownPlaceholdertyle = {
  color: "#343539",
  fontFamily: "Pretendard",
  fontSize: "12px",
  fontStyle: "normal",
  fontWeight: 500,
  lineHeight: "140%", // 16.8px
  letterSpacing: "-0.3px",
};

dropdownListCOntainerStyle = {

};


const uniInputContainerStyle = {
  position: 'relative',
  width: '168px',
  height: '310px',
};

const uniInputStyle = {
  ...inputStyle,
  paddingRight: '30px'
};

const searchIconStyle = {
  position: 'absolute',
  width: '24px',
  height: '24px',
  transform: 'translateY(-50%)', 
  pointerEvents: 'none'
};

const uniListStyle = {
  position: 'absolute',
  width: "168px",
  height: "260px",
  flexShrink: 0,
  background: "rgba(0, 0, 0, 0.07)",
  backdropFilter: "blur(5px)",
};

const uniItemStyle = {
  width: "168px",
  height: "48px",
  flexShrink: 0,
  borderRadius: "24px",
  background: "rgba(255, 255, 255, 0.8)"
};


//페이지 구조
export default function OnboardingUniversityPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const dropdownRef = useRef(null);

  const name = location.state?.name || '이름을 입력하세요'; // 이전 페이지에서 이름이 안 넘어왔을 경우 기본값
  const birthdate = location.state?.birthdate || '생일을 입력하세요';
  const phoneNumber = location.state?.phoneNumber || '전화번호를 입력하세요';
  const email = location.state?.email || '이메일을 입력하세요';

  const [universitySearchTerm, setUniversitySearchTerm] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [filteredUniversities, setFilteredUniversities] = useState([]);
  
  const [isFocused, setIsFocused] = useState(false);


  // 검색어에 따라 대학교 목록 필터링
  useEffect(() => {
    if (universitySearchTerm) {
      const results = allUni.filter(uni =>
        uni.toLowerCase().includes(universitySearchTerm.toLowerCase())
      );
      setFilteredUniversities(results);
    } else {
      setFilteredUniversities(allUni); // 검색어가 없을 땐 전체 목록 보여주기
    }
  }, [universitySearchTerm]);

  // 외부 클릭 시 드롭다운 닫기
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [dropdownRef]);

  const handleUniversitySelect = (university) => {
    setUniversitySearchTerm(university); // 선택한 대학을 입력창에 표시
    setIsDropdownOpen(false);
  };

return (
    <div style = {containerStyle}>
        <style>
          {`
            .name-input:focus {
              outline: none;
            }
            .birthdate-input:focus {
              outline: none;
            }
            .phone-input:focus {
              outline: none;
            }
            .email-input:focus {
              outline: none;
            }
            /**.uni-input:focus {
              outline: none;
              border-bottom-color: #5A87FF; /* 포커스 시 밑줄 색상 변경은 유지 */
            }*/
            .uni-item:hover { 
              background-color: #f5f5f5;
            }
          `}

        </style>

        <div style = {frameStyle}>
            <header style = {headerStyle}>
                <button style = {backButtonStyle} onClick={() => navigate(-1)}>
                    <BackIcon/>
                </button>
                <h1 style = {headerTitleStyle}>포트폴리오</h1>
            </header>

            <main style = {mainContentStyle}>
              <div style = {questionContainerStyle}>
                <h2 style = {mainQuestionStyle}>
                  기획자님의<br />
                  <span style = {{color: '#0080FF' }}>재학 중인 대학교</span>
                  를 입력해주세요!
                </h2>
                <h2 style = {subQuestionStyle}>
                  포트폴리오 생성을 위해 필요합니다.
                </h2>
              </div>

              <div style = {inputContainerStyle}>
                <input
                  type="text"
                  value={name}
                  className = 'name-input'
                  readOnly // 읽기 전용으로 설정
                  style={disabledInputStyle}
                />
                <input
                  type="text"
                  value={birthdate}
                  className="birthdate-input"
                  readOnly
                  style={disabledInputStyle}
                />
                <input 
                  type="text" 
                  value={phoneNumber}
                  className = 'phone-input'
                  readOnly 
                  style={disabledInputStyle} 
                />
                <input 
                  type="email" 
                  value={email} 
                  className = 'email-input'
                  readOnly
                  style={disabledInputStyle}
                />


                    {/* ✅ STEP 1: 대학교 선택 필드를 검색 기능이 있는 input으로 변경 */}
                <div style={dropdownContainerStyle} ref={dropdownRef}>
                  <div style={uniInputContainerStyle}>
                    <input
                      type="text"
                      placeholder="대학교"
                      value={universitySearchTerm}
                      onChange={(e) => setUniversitySearchTerm(e.target.value)}
                      onFocus={() => setIsDropdownOpen(true)}
                      style={uniInputStyle}
                    />
                    <div style={searchIconStyle}><Search/></div>
                  </div>
                  
                  {/* ✅ STEP 2: 드롭다운 목록은 포커스될 때 나타남 */}
                  {isDropdownOpen && (
                    <ul style={uniListStyle}>
                      {filteredUniversities.length > 0 ? (
                        filteredUniversities.map(uni => (
                          <li key={uni} className="uni-item" style={uniItemStyle} onClick={() => handleUniversitySelect(uni)}>
                            {uni}
                          </li>
                        ))
                      ) : (
                        <li style={{...uniItemStyle, cursor: 'default'}}>검색 결과가 없습니다.</li>
                      )}
                    </ul>
                  )}
                </div>
              </div>
            </main>
        </div>
    </div>
);
}
