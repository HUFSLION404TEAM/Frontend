import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';

// --- SVG 아이콘 임포트 ---
import { ReactComponent as BackIcon } from "../../../assets/Back.svg";
import { ReactComponent as DefaultPersonIcon } from "../../../assets/PersonProfile.svg";
import { ReactComponent as WarningIcon } from "../../../assets/Warning.svg";
import StarEmptyIcon from "../../../assets/EmptyStar.svg";
import StarFilledIcon from "../../../assets/FillStar.svg";

import axiosInstance from '../../common/Auth/axios';

// --- 스타일 객체 ---
const containerStyle = {
  display: 'flex', justifyContent: 'center', alignItems: 'center',
  minHeight: '100vh', backgroundColor: "#F5F5F5", fontFamily: "Pretendard, sans-serif"
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
const userInfoStyle = {
  display: 'flex', flexDirection: "column", alignItems: 'center',
  gap: '12px', padding: '30px 0',
};
const userImageStyle = { width: 50, height: 50 };
const userNameStyle = {
  color: '#000', textAlign: 'center', fontFamily: 'Pretendard',
  fontSize: '16px', fontWeight: 500, lineHeight: '140%', margin: 0,
};
const rateSectionStyle = {
  display: 'flex', flexDirection: "column", alignItems: 'center',
  gap: 8, padding: '10px 0 30px 0',
};
const rateTitleStyle = {
  color: '#555', textAlign: 'center', fontFamily: 'Pretendard',
  fontSize: '15px', fontWeight: 600, lineHeight: '140%', margin: 0,
};
const rateQuestionStyle = {
  color: '#A6A6A6', textAlign: 'center', fontFamily: 'Pretendard',
  fontSize: '14px', fontWeight: 500, lineHeight: '140%', margin: 0,
};
const starContainerStyle = { display: 'flex', gap: 8, marginTop: '10px' };
const starStyle = { width: 30, height: 30, cursor: 'pointer' };
const reviewSectionStyle = {
  display: 'flex', width: '100%', boxSizing: 'border-box',
  flexDirection: 'column', padding: '0 25px',
};
const reviewTitleStyle = {
  color: '#717171', fontFamily: 'Pretendard', fontSize: '15px',
  fontWeight: 600, lineHeight: '140%', marginLeft: '5px',
  marginBottom: '15px', marginTop: 0,
};
const textAreaStyle = {
  width: '340px', height: '180px', padding: '20px',
  boxSizing: "border-box", borderRadius: '8px', backgroundColor: '#F8F8F8',
  border: 'none', resize: 'none', outline: 'none',
  color: "#000", fontFamily: "Pretendard", fontSize: "15px",
  fontWeight: 500, lineHeight: "140%",
};
const noticeAreaStyle = {
  display: "flex", alignItems: "center", gap: "5px",
  marginTop: '10px', padding: '0 25px',
};
const noticeTextStyle = {
  color: '#A8A8A8', fontFamily: 'Pretendard', fontSize: '12px',
  fontWeight: 500, lineHeight: '140%',
};
const buttonAreaStyle = {
  position: 'absolute', bottom: 0, display: 'flex',
  width: '390px', height: '80px', alignItems: 'center', justifyContent: 'center',
};
const submitButtonStyle = {
  display: 'flex', width: '335px', height: '53px',
  justifyContent: 'center', alignItems: 'center',
  borderRadius: '8px', border: 'none', backgroundColor: '#0183F0',
  color: '#FFF', fontFamily: 'Pretendard', fontSize: '16px',
  fontWeight: 600, cursor: 'pointer',
};
const disabledButtonStyle = {
  ...submitButtonStyle,
  backgroundColor: '#D9D9D9', cursor: 'not-allowed',
};

// --- 컴포넌트 ---
export default function ReviewPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { matchingId } = useParams();

  // 이전 페이지에서 전달받은 리뷰 대상의 이름
  const targetName = location.state?.targetName || '리뷰 대상';

  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [content, setContent] = useState("");

  // [개선] 제출 가능 여부를 상태로 관리
  const isSubmittable = rating > 0 && content.trim() !== '';

  const handleSubmit = async () => {
    if (!isSubmittable) {
      alert("별점과 후기 내용을 모두 입력해주세요.");
      return;
    }

    const reviewData = {
      matchingId: parseInt(matchingId),
      rating: rating,
      content: content,
    };

    try {
      // [개선] 중앙 관리되는 axiosInstance 사용
      await axiosInstance.post('/api/review', reviewData);
      alert('리뷰가 성공적으로 제출되었습니다!');
      navigate(-1); // 제출 후 이전 페이지로 돌아가기
    } catch (error) {
      const errorMessage = error.response?.data?.message || '리뷰 제출 중 오류가 발생했습니다.';
      alert(errorMessage);
      console.error("Review submission failed:", error);
    }
  };

  return (
    <div style={containerStyle}>
      <div style={frameStyle}>
        <header style={headerStyle}>
          <button onClick={() => navigate(-1)} style={backButtonStyle}>
            <BackIcon />
          </button>
          <h1 style={headerTitleStyle}>리뷰쓰기</h1>
        </header>

        <main>
          <div style={userInfoStyle}>
            <DefaultPersonIcon style={userImageStyle} />
            <p style={userNameStyle}>{targetName}</p>
          </div>

          <section style={rateSectionStyle}>
            <h2 style={rateTitleStyle}>만족도</h2>
            <p style={rateQuestionStyle}>결과가 어떠셨나요? 별점을 매겨주세요!</p>
            <div
              style={starContainerStyle}
              onMouseLeave={() => setHoverRating(0)}
            >
              {[1, 2, 3, 4, 5].map((starIndex) => (
                <img
                  key={starIndex}
                  src={(hoverRating || rating) >= starIndex ? StarFilledIcon : StarEmptyIcon}
                  alt={`${starIndex}점`}
                  style={starStyle}
                  onClick={() => setRating(starIndex)}
                  onMouseEnter={() => setHoverRating(starIndex)}
                />
              ))}
            </div>
          </section>

          <section style={reviewSectionStyle}>
            <h2 style={reviewTitleStyle}>후기</h2>
            <textarea
              style={textAreaStyle}
              placeholder='진행했던 후기를 남겨주세요.'
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </section>

          <div style={noticeAreaStyle}>
            <WarningIcon />
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={noticeTextStyle}>작성해 주시는 후기는 학생들에게 큰 힘이 됩니다.</span>
              <span style={noticeTextStyle}>고객님들의 격려와 지적에 보다 나은 결과로 보답하겠습니다.</span>
            </div>
          </div>
        </main>

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
  );
}