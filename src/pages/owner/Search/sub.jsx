import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

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



const StudentListItem = ({ student, onSelect }) => {
  const [isLiked, setIsLiked] = useState(student.isLiked || false);
  
  const handleLikeClick = (e) => {
    e.stopPropagation(); // 카드 전체 클릭 이벤트(페이지 이동) 방지
    setIsLiked(prev => !prev);
    // TODO: 찜하기(관심 목록) API 호출 로직 추가
  };

  return (
    // 목록 아이템 클릭 시 onSelect 함수 호출
    <div style={cardStyle} onClick={() => onSelect(student.id)}>
      <div style={imagePlaceholderStyle}>
        {/* <img src={student.profileImageUrl} /> */}
      </div>
      <div style={infoContainerStyle}>
        <div style={titleStyle}>{student.name}</div>
        <div style={subtitleStyle}>
          {`${student.location} ∙ ${student.career}건 ∙ ${student.status}`}
        </div>
        <div style={temperatureStyle}><Temp/> {student.temperature}°C</div>
      </div>
      <button style={likeButtonStyle} onClick={handleLikeClick}>
        {isLiked ? <Heart /> : <EmptyHeart />}
      </button>
    </div>
  );
};

export default function SearchOwner() {
  const navigate = useNavigate();

  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [totalCount, setTotalCount] = useState(0);

  // 검색 조건 상태
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({});

  // --- API 호출 로직 ---
  const fetchStudents = useCallback(async () => {
    setLoading(true);
    setError(null);

    const token = localStorage.getItem('accessToken');
    if (!token) {
      alert('로그인이 필요합니다.');
      navigate('/login');
      return;
    }

    try {
      // 학생 목록 검색 API
      const response = await axios.post(
        'https://unibiz.lion.it.kr/api/student/search',
        {
          query: searchTerm,
          filters: filters,
        },
        {
          headers: { 'Authorization': `Bearer ${token}` }
        }
      );

      // API 응답 데이터를 UI에 맞게 가공
      const transformedData = response.data.students.map(item => ({
        id: item.studentId,
        name: item.name,
        location: item.region,
        career: item.career, //경력
        status: item.jobStatus, //상태
        temperature: item.temperature,
        isLiked: item.isLikedByOwner, // 찜
      }));

      setStudents(transformedData);
      setTotalCount(response.data.totalCount);

    } catch (err) {
      setError('학생 목록을 불러오는 데 실패했습니다.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [searchTerm, filters, navigate]);

  // 페이지 로딩 시 또는 검색 조건 변경 시 데이터 다시 불러오기
  useEffect(() => {
    fetchStudents();
  }, [fetchStudents]);


 return (
    <div style={containerStyle}>
      <div style={frameStyle}>
        <header style={headerContainerStyle}>
          <button style={headerButtonStyle} onClick={() => navigate(-1)}>
            <BackIcon />
          </button>
          <h1 style={headerTitleStyle}>학생 포트폴리오 조회</h1>
          <button style={headerButtonStyle} onClick={() => navigate('/owner/heart')}>
            <HeartH />
          </button>
        </header>
        <main style={mainContentStyle}>
          <div style={searchBarStyle}>
            <input 
              style={searchInputStyle} 
              placeholder="검색어를 입력하세요"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
            <button onClick={fetchStudents} style={{background: 'none', border: 'none'}}><Search /></button>
          </div>

          <div style={filterContainerStyle}>
            {/* TODO: 필터 버튼들에 onClick 이벤트 연결하여 filters 상태 변경 */}
            <div style={filterButtonsStyle}>
              <button style={filterButtonStyle}>필터 <DropDownB /></button>
              <button style={filterButtonStyle}>지역 <DropDownB /></button>
              <button style={filterButtonStyle}>경력 <DropDownB /></button>
              <button style={filterButtonStyle}>구직상태 <DropDownB /></button>
            </div>
            <div style={listHeaderStyle}>
              <span style={itemCountStyle}>{totalCount}개</span>
              <button style={sortStyle}>추천순<DropDownG/></button>
            </div>
          </div>

          <div style={listWrapperStyle}>
            {loading && <p>로딩 중...</p>}
            {error && <p style={{color: 'red'}}>{error}</p>}
            {!loading && !error && students.map(student => (
              <StudentListItem 
                key={student.id} 
                student={student}
                // 클릭 시 상세 정보 페이지로 이동
                onSelect={(studentId) => navigate(`/student/profile/${studentId}`)}
              />
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}