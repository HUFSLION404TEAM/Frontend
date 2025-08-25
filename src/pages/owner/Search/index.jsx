import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as BackIcon } from "../../../assets/Back.svg";
import { ReactComponent as HeartIcon } from "../../../assets/Heart.svg";
import { ReactComponent as SearchIcon } from "../../../assets/SearchB.svg";
import { ReactComponent as DropDownIcon } from "../../../assets/downBar.svg";
import { ReactComponent as TempIcon } from "../../../assets/Temperature.svg";
import { ReactComponent as EmptyHeartIcon } from "../../../assets/emptyHeart.svg";
import { ReactComponent as FilledHeartIcon } from "../../../assets/Heart2.svg";
import axiosInstance from '../../common/Auth/axios';

// --- 스타일 객체 ---
const containerStyle = { 
  display: 'flex', justifyContent: 'center', alignItems: 'center', 
  minHeight: '100vh', backgroundColor: "#F5F5F5", fontFamily: "Pretendard, sans-serif" 
};
const frameStyle = { 
  width: 390, height: 844, backgroundColor: "#FFFFFF",
  position: "relative", overflow: "hidden", display: 'flex', flexDirection: 'column'
};
const headerContainerStyle = { 
  display: 'flex', alignItems: 'center', justifyContent: 'center',
  padding: '0 20px', height: '30px', flexShrink: 0, marginTop: '59px',
};
const backButtonStyle = { 
  position: 'absolute', left: '20px', cursor: 'pointer',
  background: 'none', border: 'none'
};
const headerTitleStyle = { 
  color: '#000', fontFamily: 'Pretendard', fontSize: '20px',
  fontStyle: 'normal', fontWeight: 600, lineHeight: '140%',
  letterSpacing: '-0.5px',
};
const heartHeaderButtonStyle = {
  position: 'absolute', right: '20px', cursor: 'pointer',
  background: 'none', border: 'none'
};
const searchAndFilterContainerStyle = {
  display: 'flex', alignItems: 'center', justifyContent: 'center',
  flexDirection: "column",padding: '10px 24px', flexShrink: 0,
};
const searchInputContainerStyle = {
  display: "flex", width: "100%", padding: "10px 16px",
  alignItems: "center", gap: "10px", boxSizing: "border-box", borderRadius: "12px",
  border: "1px solid #0183F0", background: "#FFF",
};
const searchInputStyle = {
  flex: 1, border: 'none', outline: 'none', color: "#000",
  fontFamily: "Pretendard", fontSize: "14px", fontStyle: "normal",
  fontWeight: 500, lineHeight: "140%", letterSpacing: "-0.35px",
};
const filterBarStyle = {
  width: 390, display: 'flex', alignItems: "center", marginTop: '14px', borderTop: '1px solid #D9D9D9', 
  justifyContent: 'space-between', flexDirection: 'column', gap: '14px', padding: '20px 0 0 0',
};
const filterButtonsContainerStyle = { display: 'flex', gap: '8px'};
const chipButtonStyle = {
  display: "flex", padding: "6px 12px", alignItems: "center",
  gap: "4px", borderRadius: "16px", border: "1px solid #E0E0E0",
  backgroundColor: 'white', fontFamily: "Pretendard", fontSize: "12px",
  cursor: 'pointer',
};
const listInfoStyle = {
  width: '100%', display: 'flex', justifyContent: 'space-between',
  alignItems: 'center', padding: '10px 28px', boxSizing: 'border-box',
  flexShrink: 0,
};
const itemCountStyle = { color: "#A8A8A8", fontSize: "12px" };
const sortButtonStyle = { ...chipButtonStyle, border: 'none', paddingRight: 0 };
const listContainerStyle = {
  padding: '0 24px 24px 24px', overflowY: "auto", flex: 1,
  display: "flex", flexDirection: "column", gap: '12px',
};
const cardStyle = {
  width: '100%', height: '110px', display: "flex", position:'relative',
  padding: "12px", alignItems: "center", gap: "16px", borderRadius: "16px",
  background: "#FFF", boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.05)",
  boxSizing: 'border-box', cursor: 'pointer', flexShrink: 0,
};
const imagePlaceholderStyle = {
  width: "80px", height: "80px", borderRadius: "50%",
  background: "#E9ECEF", flexShrink: 0,
};
const infoContainerStyle = {
  display: "flex", flexDirection: "column", justifyContent: "center",
  gap: "6px", flex: 1,
};
const titleStyle = { fontSize: "18px", fontWeight: 600, color: '#111' };
const subtitleStyle = { fontSize: "13px", color: "#868E96" };
const temperatureStyle = {
  fontSize: "13px", color: "#495057", display: "flex",
  alignItems: "center", gap: "4px",
};
const likeButtonStyle = {
  background: 'none', border: 'none', padding: 0, 
  position: 'absolute', top: '12px', right: '12px', cursor: 'pointer',
};
const modalOverlayStyle = {
  position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.5)', zIndex: 1000,
};
const modalContentStyle = {
  position: 'fixed', bottom: 0, left: 0, right: 0,
  backgroundColor: 'white', borderTopLeftRadius: '20px',
  borderTopRightRadius: '20px', padding: '20px',
  animation: 'slideUp 0.3s ease-out', zIndex: 1001,
};
const modalHeaderStyle = {
  fontSize: '18px', fontWeight: 'bold', marginBottom: '20px'
};
const optionStyle = {
  padding: '15px 10px', fontSize: '16px', cursor: 'pointer',
};

// --- 컴포넌트 ---
const BottomSheet = ({ isOpen, onClose, title, options, selectedValue, onSelect }) => {
  if (!isOpen) return null;
  return (
    <div style={modalOverlayStyle} onClick={onClose}>
      <style>{`
        @keyframes slideUp {
          from { transform: translateY(100%); }
          to { transform: translateY(0); }
        }
      `}</style>
      <div style={modalContentStyle} onClick={(e) => e.stopPropagation()}>
        <h3 style={modalHeaderStyle}>{title}</h3>
        <div>
          {options.map(option => (
            <div key={option} style={{ ...optionStyle, fontWeight: selectedValue === option ? 'bold' : 'normal' }}
                 onClick={() => { onSelect(option); onClose(); }}>
              {option}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const StudentListItem = ({ student, onSelect, onLike }) => {
  const handleLikeClick = (e) => {
    e.stopPropagation();
    onLike(student.id, !student.isLiked);
  };

  return (
    <div style={cardStyle} onClick={() => onSelect(student.id)}>
      <div style={imagePlaceholderStyle} />
      <div style={infoContainerStyle}>
        <div style={titleStyle}>{student.name}</div>
        <div style={subtitleStyle}>
          {`${student.region} ∙ ${student.career}건 ∙ ${student.isEmployment ? '구직 중' : '휴식 중'}`}
        </div>
        <div style={temperatureStyle}><TempIcon/> {student.temperature}°C</div>
      </div>
      <button style={likeButtonStyle} onClick={handleLikeClick}>
        {student.isLiked ? <FilledHeartIcon /> : <EmptyHeartIcon />}
      </button>
    </div>
  );
};

export default function StudentSearchPage() {
  const navigate = useNavigate();
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({ region: '지역', career: '경력', status: '구직 상태' });
  const [sortBy, setSortBy] = useState('추천순');
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [sheetContent, setSheetContent] = useState({ title: '', options: [], type: '' });

  const fetchStudents = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const params = {
        query: searchTerm || undefined,
        region: filters.region === '지역' ? undefined : filters.region,
        career: filters.career === '경력' ? undefined : filters.career,
        status: filters.status === '구직 상태' ? undefined : filters.status,
        sortBy: sortBy === '추천순' ? undefined : sortBy,
      };
      const response = await axiosInstance.get('/api/student', { params });
      const transformedData = (response.data.data || []).map(item => ({
        ...item,
        isLiked: false, 
      }));
      setStudents(transformedData);
    } catch (err) {
      setError('학생 포트폴리오를 불러오는 데 실패했습니다.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [searchTerm, filters, sortBy]);

  useEffect(() => {
    fetchStudents();
  }, [fetchStudents]);

  const handleLikeToggle = async (studentId, willLike) => {
    setStudents(prev => prev.map(s => s.id === studentId ? { ...s, isLiked: willLike } : s));
    try {
      await axiosInstance.post(`/api/student/${studentId}/like`);
    } catch (error) {
      alert('찜하기 처리에 실패했습니다.');
      setStudents(prev => prev.map(s => s.id === studentId ? { ...s, isLiked: !willLike } : s));
    }
  };
  
  const openSheet = (type) => {
    const contentMap = {
      region: { title: '지역 선택', options: ['지역', '용인시 처인구', '용인시 수지구'] },
      career: { title: '경력 선택', options: ['경력', '10건 이하', '10-30건', '30건 이상'] },
      status: { title: '구직 상태', options: ['구직 상태', '구직 중', '휴식 중'] },
      sort: { title: '정렬 순서', options: ['추천순', '최신순'] }
    };
    setSheetContent({ ...contentMap[type], type });
    setIsSheetOpen(true);
  };

  const handleFilterSelect = (selectedValue) => {
    const { type } = sheetContent;
    if (type === 'sort') setSortBy(selectedValue);
    else setFilters(prev => ({ ...prev, [type]: selectedValue }));
  };

  return (
    <div style={containerStyle}>
      <div style={frameStyle}>
        <header style={headerContainerStyle}>
          <button style={backButtonStyle} onClick={() => navigate(-1)}><BackIcon /></button>
          <h1 style={headerTitleStyle}>학생 포트폴리오 조회</h1>
          <button style={heartHeaderButtonStyle} onClick={() => navigate('/owner/favorites')}><HeartIcon /></button>
        </header>

        <div style={searchAndFilterContainerStyle}>
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
              <button style={chipButtonStyle} onClick={() => openSheet('region')}>{filters.region} <DropDownIcon /></button>
              <button style={chipButtonStyle} onClick={() => openSheet('career')}>{filters.career} <DropDownIcon /></button>
              <button style={chipButtonStyle} onClick={() => openSheet('status')}>{filters.status} <DropDownIcon /></button>
            </div>
          </div>
        </div>

        <div style={listInfoStyle}>
          <span style={itemCountStyle}>{students.length}개</span>
          <button style={sortButtonStyle} onClick={() => openSheet('sort')}>{sortBy}<DropDownIcon /></button>
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
              onSelect={(studentId) => navigate(`/student/detail/${studentId}`)}
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