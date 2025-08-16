import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import {ReactComponent as BackIcon} from "../../../assets/Back2.svg";

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
  transition: 'filter 0.3s ease-out',
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
    height: '517px',
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
  width: '318px',
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
    backgroundColor: 'white',
};


//이메일 인증
const verifInputContainerStyle ={
  position: 'relative',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column',
  width: '318px',
  gap: '25px',
  marginTop: 0,
  marginBottom: 0,
};

const verifInputStyle = {
  ...inputStyle,
  paddingRight: '42px',
  width: '276px',
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

const verifButtonStyle = {
  position: 'absolute',
  right: 0,
  bottom: '8px',
  display: "inline-flex",
  padding: "2px 10px",
  justifyContent: "center",
  alignItems: "center",
  borderRadius: "8px",
  background: "#1A96FE",
  border: 'None',
  //boxShadow: "10px 10px 30px 0 rgba(0, 0, 0, 0.12)",

  color: "#F3F4F6",
  textAlign: "center",
  fontFamily: "Pretendard",
  fontSize: "12px",
  fontStyle: "normal",
  fontWeight: 600,
  lineHeight: "20px", // 166.667%
  letterSpacing: "-0.5px"
};

const disableButtonStyle = {
  position: 'absolute',
  right: 0,
  bottom: '8px',
  display: "inline-flex",
  padding: "2px 10px",
  justifyContent: "center",
  alignItems: "center",
  borderRadius: "8px",
  background: "#343539",
  border: 'None',
  //boxShadow: "10px 10px 30px 0 rgba(0, 0, 0, 0.12)",

  color: "#F3F4F6",
  textAlign: "center",
  fontFamily: "Pretendard",
  fontSize: "12px",
  fontStyle: "normal",
  fontWeight: 600,
  lineHeight: "20px", // 166.667%
  letterSpacing: "-0.5px"
};

//팝업 메세지
const modalOverlayStyle = {
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  display: "inline-flex",
  width: '340px',
  height: '214px',
  marginBottom: 0,
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  gap: "37px",
  borderRadius: "10px",
  boxShadow: "0 4px 10px 0 rgba(0, 0, 0, 0.25)",
  backgroundColor: 'white',
};

const modalContentStyle = {
  display: "flex",
  width: "184px",
  height: '138px',
  flexDirection: "column",
  alignItems: "center",
  gap: "37px",
  flexShrink: 0,
  marginTop: 0,
  marginBottom: 0,
};

const modalTextStyle = {
  alignSelf: "stretch",
  color: "#344053",
  fontFamily: "Pretendard",
  fontSize: "20px",
  fontStyle: "normal",
  fontWeight: 700,
  lineHeight: "36px",
  lineHeight: "140%", // 28px
  letterSpacing: "-0.5px",
  whiteSpace: 'pre-line',
  marginTop: 0,
  marginBottom: 0,
};

const modalButtonStyle = {
  display: "flex",
  width: "170px",
  height: '45px',
  padding: "13px 0 12px 0",
  justifyContent: "center",
  alignItems: "center",
  borderRadius: "8px",
  backgroundColor: "#1A96FE",
  border: 'None',
  boxShadow: "10px 10px 30px 0 rgba(0, 0, 0, 0.12)",

  color: "#F3F4F6",
  textAlign: "center",
  fontFamily: "Pretendard",
  fontSize: "20px",
  fontStyle: "normal",
  fontWeight: 600,
  lineHeight: "20px", // 100%
  letterSpacing: "-0.5px",

  marginTop: 0,
  marginBottom: 0,
};


//페이지 구조

export default function OnboardingUniEmailPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const name = location.state?.name || '이름을 입력하세요'; // 이전 페이지에서 이름이 안 넘어왔을 경우 기본값
  const birthdate = location.state?.birthdate || '생일을 입력하세요';
  const phoneNumber = location.state?.phoneNumber || '전화번호를 입력하세요';
  const email = location.state?.email || '이메일을 입력하세요';
  const uni = location.state?.uni || '대학교를 입력하세요';

  // 상태 관리
  const [uniEmail, setEmail] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [isCodeSent, setIsCodeSent] = useState(false); // 인증 코드 전송 여부
  const [isVerified, setIsVerified] = useState(false); // 인증 완료 여부
  const [showModal, setShowModal] = useState(false); // 팝업 표시 여부
  const [modalMessage, setModalMessage] = useState(''); // 팝업 메시지

  // 실제 앱에서는 서버에서 받은 코드를 사용해야 합니다.
  const CORRECT_CODE = '123456'; 

  // 1. 인증 코드 전송 처리 함수
  const handleSendCode = () => {
    if (!uniEmail || isCodeSent) return; // 이메일이 없거나 이미 보냈으면 중단
    console.log(`${uniEmail}로 인증 코드 전송!`);
    setIsCodeSent(true);
    // 실제로는 여기서 서버에 API 요청을 보냅니다.
  };

  // 2. 인증 코드 확인 처리 함수
  const handleVerifyCode = () => {
    if (verificationCode === CORRECT_CODE) {
      setModalMessage('인증이 완료되었습니다!');
      setIsVerified(true);
    } else {
      setModalMessage('인증코드가 \n 일치하지 않습니다.');
    }
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    if (isVerified) {
      // 인증 성공 시 다음 페이지로 이동
      navigate('/onboarding/next-step');
    }
  }

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
            .uni-input:focus {
              outline: none;
            }
            .uniEmail-input:focus {
              outline: none;
              border-bottom-color: #5A87FF; /* 포커스 시 밑줄 색상 변경은 유지 */
            }
            .verif-input:focus {
              outline: none;
              border-bottom-color: #5A87FF;
            }
          `}
        </style>

        <div style={{
          ...frameStyle,
          filter: showModal ? 'blur(4px)' : 'none',
        }}>
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
                  <span style = {{color: '#0080FF' }}>이메일</span>
                  을 입력해주세요!
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
                  type="text" 
                  value={email}
                  className = 'email-input'
                  readOnly 
                  style={disabledInputStyle} 
                />
                <input 
                  type="text" 
                  value={uni}
                  className = 'uni-input'
                  readOnly 
                  style={disabledInputStyle} 
                />

                {/* 학교 이메일 입력 */}
                <div style={verifInputContainerStyle}>
                  <input
                    type="email"
                    placeholder="학교 이메일"
                    value={uniEmail}
                    className = 'uniEmail-input'
                    onChange={(e) => setEmail(e.target.value)}
                    style={verifInputStyle}
                    disabled={isCodeSent} // 코드 전송 후 비활성화
                  />
                  <button onClick={handleSendCode} style={isCodeSent ? disableButtonStyle : verifButtonStyle}>
                    {isCodeSent ? '전송완료' : '인증'}
                  </button>
                </div>

                {/* 인증 코드 입력 (isCodeSent가 true일 때만 보임) */}
                {isCodeSent && !isVerified && (
                  <div style={verifInputContainerStyle}>
                    <input
                      type="text"
                      placeholder="인증코드"
                      value={verificationCode}
                      className = 'verif-input'
                      onChange={(e) => setVerificationCode(e.target.value)}
                      style={verifInputStyle}
                    />
                    <button onClick={handleVerifyCode} style={verifButtonStyle}>
                      확인
                    </button>
                  </div>
                )}
              </div>
            </main>
        </div>

         {/* 팝업 모달 (showModal이 true일 때만 보임) */}
          {showModal && (
            <div style={modalOverlayStyle}>
              <div style={modalContentStyle}>
                <p style={modalTextStyle}>{modalMessage}</p>
                <button onClick={closeModal} style={modalButtonStyle}>확인</button>
              </div>
            </div>
          )}              
    </div>
);
}
