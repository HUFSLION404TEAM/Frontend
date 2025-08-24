import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { ReactComponent as BackIcon } from "../../../assets/Back.svg";
import { ReactComponent as HeartH } from "../../../assets/Heart.svg";
import { ReactComponent as Heart } from "../../../assets/Heart2.svg";
import { ReactComponent as Search } from "../../../assets/SearchB.svg";
import { ReactComponent as DropDownB } from "../../../assets/downBar.svg";
import { ReactComponent as DropDownG } from "../../../assets/Dropdown.svg";
import { ReactComponent as Temp } from "../../../assets/Temperature.svg";
import { ReactComponent as EmptyHeart} from "../../../assets/emptyHeart.svg";

const businessData = [
  { id: '1', name: '김대학', category: '구직 중', location: '용인시 처인구', time: '20건', temp: 36.5 },
  { id: '2', name: '박대학', category: '휴식 중', location: '용인시 수지구', time: '30건', temp: 37.5 },
  { id: '3', name: '이대학', category: '구직 중', location: '용인시 기흥구', time: '10건', temp: 36.0 },
  { id: '4', name: '김대학', category: '구직 중', location: '용인시 처인구', time: '20건', temp: 36.2 },
];

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

const headerContainerStyle = { 
  height: 30,
  display: 'flex',
  flexDirection: "row",
  alignItems: 'center',
  justifyContent: 'space-between',
  position: 'relative',
  padding: '0 20px',
  marginTop: '59px',
  marginBottom: '10px',
};

const headerButtonStyle = { 
  background:'none',
  border: 'none',
  padding: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

const headerTitleStyle = { 
  color: '#000',
  fontFamily: 'Pretendard',
  fontSize: '20px',
  fontStyle: 'normal',
  fontWeight: 600,
  lineHeight: '140%', // 28px
  letterSpacing: '-0.5px',

  position: 'absolute',
  left: '50%',
  transform: 'translateX(-50%)',
  pointerEvent: 'none',
};

const searchBarStyle = {
  display: "flex",
  width: "306px",
  padding: "10px 12px 10px 20px",
  alignItems: "center",
  gap: "20px",
  boxSizing: "border-box",

  borderRadius: "12px",
  border: "1px solid #0080FF",
  background: "linear-gradient(92deg, rgba(255, 255, 255, 0.60) 0%, rgba(255, 255, 255, 0.80) 100%)",
};

const searchInputStyle = {
  flex: 1,
  border: 'none',
  outline: 'none',
  color: "#000",
  fontFamily: "Pretendard",
  fontSize: "14px",
  fontStyle: "normal",
  fontWeight: 500,
  lineHeight: "140%", // 19.6px
  letterSpacing: "-0.35px",
};


const filterContainerStyle = {
  width: 360,
  height: 75,
  display: 'flex',
  alignItems: "center",
  justifyContent: 'space-between',
  flexDirection: 'column',
  gap: '14px',
};

const filterButtonsStyle = {
  width: 308,
  display: 'flex',
  alignItems: "center",
  justifyContent: 'space-between',
};

const filterButtonStyle = {
  display: "flex",
  padding: "6px 10px",
  alignItems: "center",
  gap: "10px",
  borderRadius: "10px",
  border: "1px solid #0080FF",
  boxShadow: "0 4px 7px 0 rgba(0, 0, 0, 0.25)",
  backdropFilter: "blur(7.5px)",
  backgroundColor: 'white',

  color: "#000",
  textAlign: "center",
  fontFamily: "Pretendard",
  fontSize: "10px",
  fontStyle: "normal",
  fontWeight: 500,
  lineHeight: "normal",
};

const listHeaderStyle = {
  width: 360,
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
};

const itemCountStyle = {
  color: "#A69F9F",
  fontFamily: "Pretendard",
  fontSize: "12px",
  fontStyle: "normal",
  fontWeight: 400,
  lineHeight: "140%", // 16.8px
  letterSpacing: "-0.3px",
};

const sortStyle = {
  display: 'flex',
  boxSizing: "border-box",
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: 0,
  border: 'none',

  color: "#A69F9F",
  fontFamily: "Pretendard",
  fontSize: "12px",
  fontStyle: "normal",
  fontWeight: 400,
  lineHeight: "140%", // 16.8px
  letterSpacing: "-0.3px",
  backgroundColor: 'white',
};

const listWrapperStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '20px',
};

const mainContentStyle = { 
  padding: '20px 0',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'relative',
  flexDirection: 'column',
  gap:'20px',
};

const cardStyle = {
  width: 345,
  heigth: 100,
  display: "flex",
  position:'relative',
  width: "345px",
  padding: "10px",
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
  gap: "20px",

  borderRadius: "16px",
  background: "linear-gradient(180deg, rgba(255, 255, 255, 0.40) 0%, rgba(255, 255, 255, 0.60) 100%)",
  boxShadow: "3px 3px 8px 0 rgba(0, 0, 0, 0.08)",
};

const imagePlaceholderStyle = {
  display: "flex",
  boxSizing: "border-box",
  position: 'relative',
  width: "80px",
  height: "80px",
  aspectRatio: "1 / 1",
  borderRadius: "100px",
  background: "#ABB0BC",
};

const infoContainerStyle = {
  display: "flex",
  width: "185px",
  padding: "10px",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "flex-start",
  gap: "4px",
};

const titleStyle = {
  color: "#111",
  fontFamily: "Pretendard",
  fontSize: "20px",
  fontStyle: "normal",
  fontWeight: 600,
  lineHeight: "140%", // 28px
  letterSpacing: "-0.5px",
};

const subtitleStyle = {
  color: "#111",
  fontFamily: "Pretendard",
  fontSize: "12px",
  fontStyle: "normal",
  fontWeight: 400,
  lineHeight: "140%", // 16.8px
  letterSpacing: "-0.3px",
  marginBottom: '3px',
};

const temperatureStyle = {
  color: "#767676",
  fontFamily: "Pretendard",
  fontSize: "12px",
  fontStyle: "normal",
  fontWeight: 500,
  lineHeight: "140%", // 16.8px
  letterSpacing: "-0.3px",

  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
  gap: "6px",
};

const likeButtonStyle = {
  background: 'none',
  border: 'none',
  padding: 0, 
  position: 'absolute',
  top: '10px',
  right: '10px',
  boxSizing: "border-box",

  width: 24,
  heigth: 24
};



const BusinessListItem = ({ business }) => {
  const [isLiked, setIsLiked] = useState(false);
  const handleLikeClick = () => {
    setIsLiked(prevState => !prevState);
  };

  return (
    <div style={cardStyle}>
      <div style={imagePlaceholderStyle}>
      </div>
      <div style={infoContainerStyle}>
        <div style={titleStyle}>{business.name}</div>
        <div style={subtitleStyle}>
          {`${business.location} ∙ ${business.category} ∙ ${business.time}`}
        </div>
        <div style={temperatureStyle}><Temp/> {business.temp}°C</div>
      </div>
      <button style={likeButtonStyle} onClick={handleLikeClick}>
        {/* isLiked 상태에 따라 다른 아이콘을 보여줍니다. */}
        {isLiked ? <Heart /> : <EmptyHeart />}
      </button>
    </div>
  );
};

export default function SearchOwner() {
  const navigate = useNavigate();
  const [businesses, setBusinesses] = useState(businessData);

  return (
    <div style={containerStyle}>
      <div style={frameStyle}>
        <header style={headerContainerStyle}>
          <button style={headerButtonStyle} onClick={() => navigate(-1)}>
            <BackIcon />
          </button>
          <h1 style={headerTitleStyle}>학생 포트폴리오 조회</h1>
          <button style={headerButtonStyle}>
            <HeartH />
          </button>
        </header>
        <main style={mainContentStyle}>
          <div style={searchBarStyle}>
            <input style={searchInputStyle} placeholder="검색어를 입력하세요" />
            <Search />
          </div>

          <div style={filterContainerStyle}>
            <div style={filterButtonsStyle}>
              <button style={filterButtonStyle}>필터 <DropDownB /></button>
              <button style={filterButtonStyle}>지역 <DropDownB /></button>
              <button style={filterButtonStyle}>경력 <DropDownB /></button>
              <button style={filterButtonStyle}>구직상태 <DropDownB /></button>
            </div>
            <div style={listHeaderStyle}>
              <span style={itemCountStyle}>120개</span>
              <button style={sortStyle}>추천순<DropDownG/></button>
            </div>
          </div>

          <div style={listWrapperStyle}>
            {businesses.map(business => (
              <BusinessListItem key={business.id} business={business} />
            ))}
          </div>
        </main>
        {/* 하단 네비게이션 바가 위치할 수 있습니다. */}
      </div>
    </div>
  );
}
