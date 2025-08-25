import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

// --- SVG 아이콘 Import ---
import { ReactComponent as BackIcon } from "../../../assets/Back.svg";
import { ReactComponent as HeartH } from "../../../assets/Heart.svg"; // 헤더용 꽉 찬 하트
import { ReactComponent as Heart } from "../../../assets/Heart2.svg"; // 카드용 꽉 찬 하트
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
  top: '113px',
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
  top: '177px',
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
const listInfoStyle = {
  width: '100%',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '10px 4px 0 4px',
  boxSizing: 'border-box',
};
const itemCountStyle = {
  color: "#A69F9F",
  fontSize: "12px",
};
const sortButtonStyle = {
  ...chipButtonStyle,
  border: 'none',
  padding: 0,
  background: 'transparent'
};
const listContainerStyle = {
  position: "absolute",
  top: "231px",
  bottom: 0,
  left: 0,
  right: 0,
  padding: '12px 24px 24px 24px',
  overflowY: "auto",
  display: "flex",
  flexDirection: "column",
  gap: '12px',
};
const cardStyle = {
  width: '100%',
  height: '124px',
  display: "flex",
  position:'relative',
  padding: "12px",
  alignItems: "center",
  gap: "16px",
  borderRadius: "16px",
  background: "linear-gradient(180deg, rgba(255, 255, 255, 0.40) 0%, rgba(255, 255, 255, 0.60) 100%)",
  boxShadow: "3px 3px 8px 0 rgba(0, 0, 0, 0.08)",
  boxSizing: 'border-box',
  cursor: 'pointer',
  flexShrink: 0,
};
const imagePlaceholderStyle = {
  width: "100px",
  height: "100px",
  borderRadius: "12px",
  background: "#E9ECEF",
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'flex-end',
  padding: '8px',
  boxSizing: 'border-box',
};
const locationBadgeStyle = {
  padding: '4px 10px',
  borderRadius: '8px',
  background: "rgba(0, 0, 0, 0.60)",
  color: "#FFF",
  fontSize: "11px",
  fontWeight: 500,
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
const modalOverlayStyle = { /* ... */ }; // 이전 답변의 스타일과 동일
const modalContentStyle = { /* ... */ }; // 이전 답변의 스타일과 동일
const modalHeaderStyle = { /* ... */ }; // 이전 답변의 스타일과 동일
const optionStyle = { /* ... */ }; // 이전 답변의 스타일과 동일

// --- 자식 컴포넌트 ---

const BottomSheet = ({ isOpen, onClose, title, options, selectedValue, onSelect }) => {
  if (!isOpen) return null;
  // ... (이전 답변의 BottomSheet 코드와 동일)
};

const BusinessListItem = ({ business, onSelect, onLike }) => {
  const handleLikeClick = (e) => {
    e.stopPropagation();
    onLike(business.id, !business.isLiked);
  };

  return (
    <div style={cardStyle} onClick={() => onSelect(business.id)}>
      <div style={imagePlaceholderStyle}>
        <div style={locationBadgeStyle}>{business.location}</div>
      </div>
      <div style={infoContainerStyle}>
        <div style={titleStyle}>{business.name}</div>
        <div style={subtitleStyle}>
          {`${business.category} ∙ ${business.status} ∙ ${business.postedTime}`}
        </div>
        <div style={temperatureStyle}><Temp/> {business.temperature}°C</div>
      </div>
      <button style={likeButtonStyle} onClick={handleLikeClick}>
        {business.isLiked ? <Heart /> : <EmptyHeart />}
      </button>
    </div>
  );
};


// --- 메인 페이지 컴포넌트 ---
export default function SearchStudent() { // 학생이 소상공인을 검색하는 페이지
  const navigate = useNavigate();
  
  const [businesses, setBusinesses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [totalCount, setTotalCount] = useState(0);

  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    region: '지역',
    category: '업종',
    status: '모집 상태'
  });
  const [sortBy, setSortBy] = useState('추천순');
  
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [sheetContent, setSheetContent] = useState({ title: '', options: [], type: '' });

  const fetchBusinesses = useCallback(async () => {
    setLoading(true);
    setError(null);
    const token = localStorage.getItem('accessToken');
    if (!token) {
      alert('로그인이 필요합니다.');
      navigate('/login');
      return;
    }
    try {
      // 소상공인 목록 검색 API (POST 방식, 엔드포인트는 백엔드와 협의 필요)
      const response = await axios.post(
        'https://unibiz.lion.it.kr/api/business/search',
        {
          query: searchTerm,
          filters: {
            region: filters.region === '지역' ? null : filters.region,
            category: filters.category === '업종' ? null : filters.category,
            status: filters.status === '모집 상태' ? null : filters.status,
          },
          sortBy: sortBy === '추천순' ? null : sortBy,
        },
        { headers: { 'Authorization': `Bearer ${token}` } }
      );

      const transformedData = (response.data.businesses || []).map(item => ({
        id: item.businessId,
        name: item.storeName,
        location: item.region,
        category: item.category,
        status: item.recruitmentStatus,
        postedTime: item.postedTime, // 예: '30 min'
        temperature: item.temperature,
        isLiked: item.isLikedByStudent,
      }));
      setBusinesses(transformedData);
      setTotalCount(response.data.totalCount || 0);

    } catch (err) {
      setError('소상공인 목록을 불러오는 데 실패했습니다.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [searchTerm, filters, sortBy, navigate]);

  useEffect(() => {
    fetchBusinesses();
  }, [fetchBusinesses]);

  const handleLikeToggle = async (businessId, willLike) => {
    // ... (이전 답변의 찜하기 로직과 동일, 엔드포인트만 /api/business/{id}/like 등으로 변경)
  };
  
  const openSheet = (type) => {
    const contentMap = {
      filter: { title: '필터', options: ['전체', '옵션1'] }, // TODO: 필터 상세 내용 정의
      region: { title: '지역 선택', options: ['지역', '서울', '경기', '인천'] },
      category: { title: '업종 선택', options: ['업종', '요식업', '서비스업', 'IT'] },
      status: { title: '모집 상태', options: ['모집 상태', '모집 중', '모집 완료'] },
      sort: { title: '정렬 순서', options: ['추천순', '최신순', '인기순'] }
    };
    setSheetContent({ ...contentMap[type], type });
    setIsSheetOpen(true);
  };

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
          <h1 style={headerTitleStyle}>소상공인 조회</h1>
          <button style={heartHeaderButtonStyle} onClick={() => navigate('/student/heart')}>
            <HeartH />
          </button>
        </header>

        <div style={searchInputContainerStyle}>
          <input 
            style={searchInputStyle} 
            placeholder="검색어를 입력하세요"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && fetchBusinesses()}
          />
          <button onClick={fetchBusinesses} style={{background: 'none', border: 'none', cursor: 'pointer'}}><SearchIcon /></button>
        </div>

        <div style={filterBarStyle}>
          <div style={filterButtonsContainerStyle}>
            <button style={chipButtonStyle} onClick={() => openSheet('filter')}>필터 <DropDownB /></button>
            <button style={chipButtonStyle} onClick={() => openSheet('region')}>{filters.region} <DropDownB /></button>
            <button style={chipButtonStyle} onClick={() => openSheet('category')}>{filters.category} <DropDownB /></button>
            <button style={chipButtonStyle} onClick={() => openSheet('status')}>{filters.status} <DropDownB /></button>
          </div>
        </div>

        <div style={listContainerStyle}>
          <div style={listInfoStyle}>
            <span style={itemCountStyle}>{totalCount}개</span>
            <button style={sortButtonStyle} onClick={() => openSheet('sort')}>{sortBy}<DropDownB /></button>
          </div>
          {loading && <p style={{textAlign: 'center', color: '#868e96'}}>로딩 중...</p>}
          {error && <p style={{textAlign: 'center', color: 'red'}}>{error}</p>}
          {!loading && !error && businesses.length === 0 && (
            <p style={{textAlign: 'center', color: '#868e96', paddingTop: '50px'}}>검색 결과가 없습니다.</p>
          )}
          {!loading && !error && businesses.map(biz => (
            <BusinessListItem 
              key={biz.id} 
              business={biz}
              onSelect={(businessId) => navigate(`/business/detail/${businessId}`)} // 상세 페이지 경로 협의 필요
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