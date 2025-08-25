import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

// --- SVG 아이콘 Import ---
import { ReactComponent as BackIcon } from "../../../assets/Back.svg";
import { ReactComponent as HeartH } from "../../../assets/Heart.svg";
import { ReactComponent as Heart } from "../../../assets/Heart2.svg";
import { ReactComponent as SearchIcon } from "../../../assets/SearchB.svg";
import { ReactComponent as DropDownB } from "../../../assets/downBar.svg";
import { ReactComponent as Temp } from "../../../assets/Temperature.svg";
import { ReactComponent as EmptyHeart} from "../../../assets/emptyHeart.svg";

// --- 스타일 객체 (DashOwner 스타일과 통합 및 수정) ---
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
  position: "relative",
  overflow: "hidden",
};
const headerContainerStyle = { 
  position: 'absolute',
  top: '44px',
  left: 0,
  right: 0,
  height: '59px',
  display: 'flex',
  flexDirection: "row",
  alignItems: 'center',
  justifyContent: 'center',
  padding: '0 20px',
  zIndex: 3,
  backgroundColor: 'white',
};
const backButtonStyle = { 
  background:'none',
  border: 'none',
  padding: 0,
  position: 'absolute',
  left: '20px',
  cursor: 'pointer',
};
const headerTitleStyle = { 
  color: '#000',
  fontSize: '20px',
  fontWeight: 600,
};
const heartHeaderButtonStyle = {
  background:'none',
  border: 'none',
  padding: 0,
  position: 'absolute',
  right: '20px',
  cursor: 'pointer',
};
const searchInputContainerStyle = {
  position: 'absolute',
  top: '113px', // Header 아래 위치
  left: '50%',
  transform: 'translateX(-50%)',
  display: "flex",
  width: "342px",
  padding: "10px 20px",
  alignItems: "center",
  gap: "10px",
  boxSizing: "border-box",
  borderRadius: "12px",
  border: "1px solid #E0E0E0",
  background: "#F8F9FA",
  zIndex: 2,
};
const searchInputStyle = {
  flex: 1,
  border: 'none',
  outline: 'none',
  fontSize: "14px",
  fontWeight: 500,
  background: 'transparent',
};
const filterBarStyle = {
  position: 'absolute',
  top: '177px', // 검색창 아래 위치
  left: '24px',
  right: '24px',
  height: '44px',
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  zIndex: 1,
};
const filterButtonsContainerStyle = {
  display: 'flex',
  gap: '8px',
};
const chipButtonStyle = {
  display: "flex",
  padding: "6px 12px",
  alignItems: "center",
  gap: "6px",
  borderRadius: "16px",
  border: "1px solid #E0E0E0",
  background: 'white',
  fontSize: "12px",
  cursor: 'pointer',
};
const listContainerStyle = {
  position: "absolute",
  top: "231px", // 필터바 아래 위치
  bottom: 0,
  left: 0,
  right: 0,
  padding: '0 24px 24px 24px',
  overflowY: "auto",
  display: "flex",
  flexDirection: "column",
  gap: '12px',
};
const cardStyle = {
  width: '100%',
  height: '110px',
  display: "flex",
  position:'relative',
  padding: "12px",
  flexDirection: "row",
  alignItems: "center",
  gap: "16px",
  borderRadius: "16px",
  background: "linear-gradient(180deg, rgba(255, 255, 255, 0.40) 0%, rgba(255, 255, 255, 0.60) 100%)",
  boxShadow: "3px 3px 8px 0 rgba(0, 0, 0, 0.08)",
  boxSizing: 'border-box',
  cursor: 'pointer',
};
const imagePlaceholderStyle = {
  width: "80px",
  height: "80px",
  borderRadius: "50%",
  background: "#E9ECEF",
  flexShrink: 0,
};
const infoContainerStyle = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "flex-start",
  gap: "6px",
  flex: 1,
};
const titleStyle = {
  fontSize: "18px",
  fontWeight: 600,
  color: '#111',
};
const subtitleStyle = {
  fontSize: "13px",
  color: "#868E96",
};
const temperatureStyle = {
  fontSize: "13px",
  color: "#495057",
  display: "flex",
  alignItems: "center",
  gap: "4px",
};
const likeButtonStyle = {
  background: 'none',
  border: 'none',
  padding: 0, 
  position: 'absolute',
  top: '12px',
  right: '12px',
  cursor: 'pointer',
};
const modalOverlayStyle = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.4)',
  zIndex: 10,
};
const modalContentStyle = {
  position: 'fixed',
  bottom: 0,
  left: '50%',
  transform: 'translateX(-50%)',
  backgroundColor: 'white',
  borderTopLeftRadius: '16px',
  borderTopRightRadius: '16px',
  padding: '20px',
  zIndex: 11,
  boxSizing: 'border-box',
  width: '100%',
  maxWidth: '390px',
};
const modalHeaderStyle = {
  fontSize: '18px',
  fontWeight: 'bold',
  marginBottom: '20px',
};
const optionStyle = {
  padding: '12px 0',
  fontSize: '16px',
  cursor: 'pointer',
  borderBottom: '1px solid #f0f0f0',
};


// --- 자식 컴포넌트 ---

// 바텀 시트(필터) 컴포넌트
const BottomSheet = ({ isOpen, onClose, title, options, selectedValue, onSelect }) => {
  if (!isOpen) return null;

  return (
    <div style={modalOverlayStyle} onClick={onClose}>
      <div style={modalContentStyle} onClick={(e) => e.stopPropagation()}>
        <h3 style={modalHeaderStyle}>{title}</h3>
        {options.map((option, index) => (
          <div 
            key={index} 
            style={{...optionStyle, fontWeight: selectedValue === option ? 'bold' : 'normal', color: selectedValue === option ? '#0080FF' : '#111'}}
            onClick={() => {
              onSelect(option);
              onClose();
            }}
          >
            {option}
          </div>
        ))}
      </div>
    </div>
  );
};

// 학생 목록 아이템 컴포넌트
const StudentListItem = ({ student, onSelect, onLike }) => {
  const handleLikeClick = (e) => {
    e.stopPropagation();
    onLike(student.id, !student.isLiked);
  };

  return (
    <div style={cardStyle} onClick={() => onSelect(student.id)}>
      <div style={imagePlaceholderStyle}>
        {/* <img src={student.profileImageUrl} alt={student.name} /> */}
      </div>
      <div style={infoContainerStyle}>
        <div style={titleStyle}>{student.name}</div>
        <div style={subtitleStyle}>
          {`${student.location} ∙ ${student.career}건 ∙ ${student.status}`}
        </div>
        <div style={temperatureStyle}><Temp/> {student.temperature}°C</div>
      </div>
      <button style={likeButtonStyle} onClick={handleLikeClick}>
        {student.isLiked ? <Heart /> : <EmptyHeart />}
      </button>
    </div>
  );
};


// --- 메인 페이지 컴포넌트 ---
export default function SearchOwner() {
  const navigate = useNavigate();
  
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [totalCount, setTotalCount] = useState(0);

  // 검색/필터/정렬을 위한 상태
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    region: '지역',
    career: '경력',
    status: '구직상태'
  });
  const [sortBy, setSortBy] = useState('추천순');
  
  // 모달 제어를 위한 상태
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [sheetContent, setSheetContent] = useState({ title: '', options: [], type: '' });

  // API 호출 로직
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
      const response = await axios.post(
        'https://unibiz.lion.it.kr/api/student/search',
        {
          query: searchTerm,
          filters: {
            region: filters.region === '지역' ? null : filters.region,
            career: filters.career === '경력' ? null : filters.career,
            status: filters.status === '구직상태' ? null : filters.status,
          },
          sortBy: sortBy === '추천순' ? null : sortBy,
        },
        { headers: { 'Authorization': `Bearer ${token}` } }
      );

      const transformedData = (response.data.students || []).map(item => ({
        id: item.studentId,
        name: item.name,
        location: item.region,
        career: item.career,
        status: item.jobStatus,
        temperature: item.temperature,
        isLiked: item.isLikedByOwner,
      }));

      setStudents(transformedData);
      setTotalCount(response.data.totalCount || 0);

    } catch (err) {
      setError('학생 목록을 불러오는 데 실패했습니다.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [searchTerm, filters, sortBy, navigate]);

  useEffect(() => {
    fetchStudents();
  }, [fetchStudents]);

  // 찜하기 API 호출 함수
  const handleLikeToggle = async (studentId, willLike) => {
    setStudents(currentStudents =>
      currentStudents.map(student =>
        student.id === studentId ? { ...student, isLiked: willLike } : student
      )
    );

    try {
      const token = localStorage.getItem('accessToken');
      await axios.post(
        `/api/student/${studentId}/like`, 
        { like: willLike },
        { headers: { 'Authorization': `Bearer ${token}` } }
      );
    } catch (err) {
      alert('찜하기 처리에 실패했습니다. 다시 시도해주세요.');
      setStudents(currentStudents =>
        currentStudents.map(student =>
          student.id === studentId ? { ...student, isLiked: !willLike } : student
        )
      );
    }
  };
  
  // 모달을 여는 함수
  const openSheet = (type) => {
    const contentMap = {
      region: { title: '지역 선택', options: ['지역', '서울', '경기', '인천'] },
      career: { title: '경력 선택', options: ['경력', '1년 이하', '1-3년', '3년 이상'] },
      status: { title: '구직상태 선택', options: ['구직상태', '구직 중', '휴식 중'] },
      sort: { title: '정렬 순서', options: ['추천순', '최신순', '인기순'] }
    };
    setSheetContent({ ...contentMap[type], type });
    setIsSheetOpen(true);
  };

  // 모달에서 옵션을 선택했을 때 상태를 업데이트하는 함수
  const handleFilterSelect = (selectedValue) => {
    const { type } = sheetContent;
    if (type === 'sort') {
      setSortBy(selectedValue);
    } else {
      setFilters(prev => ({ ...prev, [type]: selectedValue }));
    }
  };

  return (
    <div style={containerStyle}>
      <div style={frameStyle}>
        <header style={headerContainerStyle}>
          <button style={backButtonStyle} onClick={() => navigate(-1)}>
            <BackIcon />
          </button>
          <h1 style={headerTitleStyle}>학생 포트폴리오 조회</h1>
          <button style={heartHeaderButtonStyle} onClick={() => navigate('/owner/heart')}>
            <HeartH />
          </button>
        </header>

        <div style={searchInputContainerStyle}>
          <input 
            style={searchInputStyle} 
            placeholder="검색어를 입력하세요"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && fetchStudents()}
          />
          <button onClick={fetchStudents} style={{background: 'none', border: 'none', cursor: 'pointer'}}><SearchIcon /></button>
        </div>

        <div style={filterBarStyle}>
          <div style={filterButtonsContainerStyle}>
            <button style={chipButtonStyle} onClick={() => openSheet('region')}>{filters.region} <DropDownB /></button>
            <button style={chipButtonStyle} onClick={() => openSheet('career')}>{filters.career} <DropDownB /></button>
            <button style={chipButtonStyle} onClick={() => openSheet('status')}>{filters.status} <DropDownB /></button>
          </div>
          <button style={chipButtonStyle} onClick={() => openSheet('sort')}>{sortBy}<DropDownB /></button>
        </div>

        <div style={listContainerStyle}>
          {loading && <p style={{textAlign: 'center', color: '#868e96'}}>로딩 중...</p>}
          {error && <p style={{textAlign: 'center', color: 'red'}}>{error}</p>}
          {!loading && !error && students.length === 0 && (
            <p style={{textAlign: 'center', color: '#868e96', paddingTop: '50px'}}>검색 결과가 없습니다.</p>
          )}
          {!loading && !error && students.map(student => (
            <StudentListItem 
              key={student.id} 
              student={student}
              onSelect={(studentId) => navigate(`/student/profile/${studentId}`)}
              onLike={handleLikeToggle}
            />
          ))}
        </div>

        <BottomSheet
          isOpen={isSheetOpen}
          onClose={() => setIsSheetOpen(false)}
          title={sheetContent.title}
          options={sheetContent.options}
          selectedValue={sheetContent.type === 'sort' ? sortBy : filters[sheetContent.type]}
          onSelect={handleFilterSelect}
        />
      </div>
    </div>
  );
}