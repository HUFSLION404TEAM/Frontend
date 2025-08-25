import React, {useState} from 'react'; 
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

//아이콘
import BackIcon from "../../../assets/Back.svg";
import PersonProfile from "../../../assets/PersonProfile.svg";
import WarningIcon from "../../../assets/Warning.svg";
import StarEmptyIcon from "../../../assets/EmptyStar.svg";
import StarFilledIcon from "../../../assets/FillStar.svg";


//기본 레이아웃
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


//유저정보
const userInfoStyle = {
  display: 'flex',
  width: '390px',
  height: '116px',
  flexDirection: "column",
  alignItems: 'center',
  gap: '20px',
  padding: '31px 0 0 0',
};

const userImageStyle = {
  width: 50,
  height: 50,
};

const userNameStyle = {
  color: '#000',
  textAlign: 'center',
  fontFamily: 'Pretendard',
  fontSize: '15px',
  fontStyle: 'normal',
  fontWeight: 500,
  lineHeight: '140%', // 21px
  letterSpacing: '-0.375px',
  marginBottom: 0,
  marginTop:0,
};


//별점
const rateStyle = {
  display: 'flex',
  flexDirection: "column",
  alignItems: 'center',
  gap: 8,
  marginBottom: 0,
  marginTop:0,
};

const rateTitleStyle = {
  color: '#A69F9F',
  textAlign: 'center',
  fontFamily: 'Pretendard',
  fontSize: '15px',
  fontStyle: 'normal',
  fontWeight: 600,
  lineHeight: '140%', // 21px
  letterSpacing: '-0.375px',
  marginBottom: 0,
  marginTop: 0,
};

const rateQuestionStyle = {
  color: '#D9D6D6',
  textAlign: 'center',
  fontFamily: 'Pretendard',
  fontSize: '15px',
  fontStyle: 'normal',
  fontWeight: 600,
  lineHeight: '140%', // 21px
  letterSpacing: '-0.375px',
  marginBottom: 0,
  marginTop: 0,
};

const starContainerStyle = {
  display: 'flex',
  flexDirection: "row",
  alignItems: 'center',
  gap: 8,
};

const starStyle = {
  width: 30,
  height: 30,
};


//후기입력
const textAreaStyle = {
  display: 'flex',
  width: '338px',
  flexDirection: 'column',
  alignItems: 'flex-start',
  justifyContent: 'center',
  gap: '10px',
  padding: '30px 26px 0 26px',
  marginBottom: 0,
  marginTop:0,
};

const textTitleStyle = {
  color: '#717171',
  fontFamily: 'Pretendard',
  fontSize: '15px',
  fontStyle: 'normal',
  fontWeight: 600,
  lineHeight: '140%', // 21px
  letterSpacing: '-0.375px',
  marginLeft: '8px',
  marginBottom: 0,
  marginTop: 0,
};

const textWriteStyle = {
  display: 'flex',
  width: '338px',
  height: '213px',
  padding: '20px 25px 172px 25px',
  marginBottom: 0,
  marginTop: 0,
  flexShrink: 0,
  boxSizing: 'border-box',
  outline: 'None',
  border: 'None',
  borderRadius: '8px',
  background: 'rgba(255, 255, 255, 0.40)',
  boxShadow: '0 4px 10px 0 rgba(0, 0, 0, 0.25)',
  color: '#A1A1A1',
  fontFamily: 'Pretendard',
  fontSize: '15px',
  fontStyle: 'normal',
  fontWeight: 600,
  lineHeight: '140%',
  letterSpacing: '-0.375px',
};

const textWriteFocusStyle = {
  outline: 'None',
  border: 'None',
  boxShadow: '0 4px 10px 0 rgba(0, 0, 0, 0.25)',
};


//경고
const noticeAreaStyle = {
  display: "flex",
  width: '390px',
  heith: '154px',
  alignItems: "flex-start",
  gap: "5px",
  flexDirection: 'row',
  padding: '8px 32px 118px 32px',
  marginBottom: 0,
  marginTop:0,
};

const noticeIconStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: 5,
};

const noticeTextAreaStyle = {
  display: 'flex',
  width: '310px',
  height: '36px',
  marginTop: 0,
  marginBottom: 0,
  boxSizing: 'border-box',
  flexDirection: 'column',
  alignItems: 'flex-start',
  justifyContent: 'center',
};

const noticeTextStyle = {
  color: '#A8A8A8',
  fontFamily: 'Pretendard',
  fontSize: '12px',
  fontStyle: 'normal',
  fontWeight: 600,
  lineHeight: '140%', // 16.8px
  letterSpacing: '-0.3px',
};


//제출버튼
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


export default function ReviewStudentPage() {
  const navigate = useNavigate();
  const { matchingId } = useParams();
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [isTextareaFocused, setIsTextareaFocused] = useState(false);
  
  const handleGoBack = () => {
    navigate(-1);
  };

  // '제출하기' 버튼을 눌렀을 때 실행될 함수
  const handleSubmit = async () => {
    // 유효성 검사: 별점이 0점이거나 리뷰 내용이 비어있으면 제출 방지
    if (rating === 0) {
      alert("별점을 매겨주세요.");
      return;
    }
    if (reviewText.trim() === "") {
      alert("후기 내용을 입력해주세요.");
      return;
    }

    // 로그인 시 저장된 인증 토큰을 가져옴
    const token = localStorage.getItem('accessToken');
    if (!token) {
      alert('리뷰를 작성하려면 로그인이 필요합니다.');
      navigate('/login');
      return;
    }

   // API 명세에 맞게 전송할 데이터 만들기
    const reviewData = {
      matchingId: parseInt(matchingId), 
      rating: rating,
      content: reviewText,
    };

    try {
      // axios를 사용해 POST 요청 보내기
      await axios.post(
        'https://unibiz.lion.it.kr/api/review', // 백엔드 API 주소
         reviewData,
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );

      alert('리뷰가 성공적으로 제출되었습니다!');
      navigate(-1); // 제출 후 이전 페이지로 돌아가기

    } catch (error) {
      if (error.response && error.response.status === 401) {
        alert('인증에 실패했습니다. 다시 로그인해주세요.');
        navigate('/login');
      } else {
        alert('리뷰 제출 중 오류가 발생했습니다.');
      }
      console.error("API Error:", error);
    }
  };

return (
  <div style = {containerStyle}>
    <div style = {frameStyle}>
      <header style = {headerStyle}>
        <button onClick = {handleGoBack} style = {backButtonStyle}>
          <img
          src = {BackIcon}
          alt = '뒤로가기'
          />
        </button>
        <h1 style = {headerTitleStyle}>리뷰쓰기</h1>
      </header>

      <main style = {mainContentStyle}>
        <div style = {userInfoStyle}>
          <img
            src = {PersonProfile}
            alt = "프로필"
            style = {userImageStyle}
          />
          <p style = {userNameStyle}>컴포즈커피 한국외대점</p>
        </div>

        <section style = {rateStyle}>
          <h2 style = {rateTitleStyle}>만족도</h2>
          <p style = {rateQuestionStyle}>결과가 어떠셨나요? 별점을 매겨주세요!</p>
          <div
            style = {starContainerStyle}
            onMouseLeave={() => setHoverRating(0)}>
            {[1, 2, 3, 4, 5].map((starIndex) => {
                const isFilled = starIndex <= (hoverRating || rating);
                  return (
                    <img
                      key = {starIndex}
                      src= {isFilled ? StarFilledIcon : StarEmptyIcon}
                      alt = {'${starIndex}점'}
                      style = {starStyle}
                      onClick={() => setRating(starIndex)}
                      onMouseEnter={() => setHoverRating(starIndex)}
                    />
                  );
                })} 
          </div> 
        </section>

        <section style = {textAreaStyle}>
          <h2 style = {textTitleStyle}>후기</h2>
          <textarea
            style = {
               isTextareaFocused
                ? { ...textWriteStyle, ...textWriteFocusStyle }
                : textWriteStyle
            }
            placeholder='진행했던 후기를 남겨주세요.'
            value = {reviewText}
            onChange = {(e) => setReviewText(e.target.value)}
            onFocus={() => setIsTextareaFocused(true)}
            onBlur={() => setIsTextareaFocused(false)}
          />
        </section>

        <div style = {noticeAreaStyle}>
          <img
            src = {WarningIcon}
            alt = "경고" 
          />
          <div style =  {noticeTextAreaStyle}>
            <span style = {noticeTextStyle}>
              작성해 주시는 후기는 소상공인들에게 큰 힘이 됩니다.
            </span>
            <span style = {noticeTextStyle}>
              고객님들의 격려와 지적에 보다 나은 결과로 보답하겠습니다.
            </span>
          </div>
        </div>
      </main>
      <section style = {buttonAreaStyle}>
        <button style = {submitButtonStyle} onClick={handleSubmit}>제출하기</button>
      </section>
    </div>
  </div>
);
}