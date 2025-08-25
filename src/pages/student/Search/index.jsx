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
  display: "flex", width: "306px", padding: "10px 12px 10px 20px",
  alignItems: "center", gap: "20px", boxSizing: "border-box", borderRadius: "12px",
  border: "1px solid #0080FF", background: "linear-gradient(92deg, rgba(255, 255, 255, 0.60) 0%, rgba(255, 255, 255, 0.80) 100%)",
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
const filterButtonsContainerStyle = { display: 'flex', gap: '20px',};
const chipButtonStyle = {
  display: "flex", padding: "6px 10px", alignItems: "center",
  gap: "10px", borderRadius: "10px", border: "1px solid #0080FF", boxShadow: "0 4px 7px 0 rgba(0, 0, 0, 0.25)",
  backdropFilter: "blur(7.5px)", backgroundColor: 'white',

  color: "#000", textAlign: "center", fontFamily: "Pretendard", fontSize: "10px",
  fontStyle: "normal", fontWeight: 500, lineHeight: "normal",
};

const listInfoStyle = {
  width: '100%', display: 'flex', justifyContent: 'space-between',
  alignItems: 'center', padding: '10px 4px', boxSizing: 'border-box',
};
const itemCountStyle = { color: "#A8A8A8", fontSize: "12px" };
const sortButtonStyle = { ...chipButtonStyle, border: 'none' };
const listContainerStyle = {
  padding: '0 24px 24px 24px', overflowY: "auto", flex: 1,
  display: "flex", flexDirection: "column", gap: '12px',
};
const cardStyle = {
  width: '100%', height: '124px', display: "flex", position:'relative',
  padding: "12px", alignItems: "center", gap: "16px", borderRadius: "16px",
  background: "#FFF", boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.05)",
  boxSizing: 'border-box', cursor: 'pointer', flexShrink: 0,
};
const imagePlaceholderStyle = {
  width: "100px", height: "100px", borderRadius: "12px",
  background: "#E9ECEF", display: 'flex', justifyContent: 'center',
  alignItems: 'flex-end', padding: '8px', boxSizing: 'border-box',
};
const locationBadgeStyle = {
  padding: '4px 10px', borderRadius: '8px',
  background: "rgba(0, 0, 0, 0.60)", color: "#FFF", fontSize: "11px",
};
const infoContainerStyle = {
  display: "flex", flexDirection: "column",
  justifyContent: "center", gap: "6px", flex: 1,
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

const BusinessListItem = ({ business, onSelect, onLike }) => {
  const handleLikeClick = (e) => {
    e.stopPropagation();
    onLike(business.businessNumber, !business.isLiked);
  };
  // 주소에서 '시'와 '구' 정보만 추출 (예: "경기도 용인시 처인구" -> "용인시 처인구")
  const simpleAddress = business.address.split(' ').slice(1, 3).join(' ');

  return (
    <div style={cardStyle} onClick={() => onSelect(business.businessNumber)}>
      <div style={imagePlaceholderStyle}>
        <div style={locationBadgeStyle}>{simpleAddress}</div>
      </div>
      <div style={infoContainerStyle}>
        <div style={titleStyle}>{business.storeName}</div>
        <div style={subtitleStyle}>{`${business.category} ∙ 모집 중 ∙ 1 day`}</div>
        <div style={temperatureStyle}><TempIcon/> {business.temperature}°C</div>
      </div>
      <button style={likeButtonStyle} onClick={handleLikeClick}>
        {business.isLiked ? <FilledHeartIcon /> : <EmptyHeartIcon />}
      </button>
    </div>
  );
};

export default function StoreSearchPage() {
  const navigate = useNavigate();
  const [stores, setStores] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({ region: '지역', category: '업종', status: '모집 상태' });
  const [sortBy, setSortBy] = useState('추천순');
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [sheetContent, setSheetContent] = useState({ title: '', options: [], type: '' });

  const fetchStores = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const params = {
        query: searchTerm,
        region: filters.region === '지역' ? undefined : filters.region,
        category: filters.category === '업종' ? undefined : filters.category,
        status: filters.status === '모집 상태' ? undefined : filters.status,
        sortBy: sortBy === '추천순' ? undefined : sortBy,
      };
      // [수정] GET /api/store 엔드포인트 사용
      const response = await axiosInstance.get('/api/store', { params });
      // [수정] 제공된 JSON 데이터 구조에 맞게 매핑
      const transformedData = (response.data.data || []).map(item => ({
        ...item,
        isLiked: false, // API에 찜하기 정보가 없으므로 기본값 false로 설정
      }));
      setStores(transformedData);
    } catch (err) {
      setError('소상공인 목록을 불러오는 데 실패했습니다.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [searchTerm, filters, sortBy]);

  useEffect(() => {
    fetchStores();
  }, [fetchStores]);

  const handleLikeToggle = async (businessNumber, willLike) => {
    // UI 즉시 업데이트 (Optimistic Update)
    setStores(prevStores => prevStores.map(store => 
      store.businessNumber === businessNumber ? { ...store, isLiked: willLike } : store
    ));
    try {
      // 찜하기 API 호출 (엔드포인트는 백엔드와 협의 필요)
      await axiosInstance.post(`/api/store/${businessNumber}/like`);
    } catch (error) {
      alert('찜하기 처리 중 오류가 발생했습니다.');
      // 실패 시 UI 롤백
      setStores(prevStores => prevStores.map(store => 
        store.businessNumber === businessNumber ? { ...store, isLiked: !willLike } : store
      ));
    }
  };
  
  const openSheet = (type) => {
    const contentMap = {
      filter: { title: '필터', options: ['전체', '옵션1'] },
      region: { title: '지역 선택', options: ['지역', '용인시 처인구', '용인시 수지구', '성남시 분당구'] },
      category: { title: '업종 선택', options: ['업종', '요식업', '제과점업', '음료점업', '소매업'] },
      status: { title: '모집 상태', options: ['모집 상태', '모집 중', '모집 완료'] },
      sort: { title: '정렬 순서', options: ['추천순', '최신순', '인기순'] }
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
          <h1 style={headerTitleStyle}>소상공인 조회</h1>
          <button style={heartHeaderButtonStyle} onClick={() => navigate('/favorites')}><HeartIcon /></button>
        </header>

        <div style={searchAndFilterContainerStyle}>
          <div style={searchInputContainerStyle}>
            <input 
              style={searchInputStyle} 
              placeholder="검색어를 입력하세요"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && fetchStores()}
            />
            <button onClick={fetchStores} style={{background: 'none', border: 'none', cursor: 'pointer'}}><SearchIcon /></button>
          </div>
          <div style={filterBarStyle}>
            <div style={filterButtonsContainerStyle}>
              <button style={chipButtonStyle} onClick={() => openSheet('region')}>{filters.region} <DropDownIcon /></button>
              <button style={chipButtonStyle} onClick={() => openSheet('category')}>{filters.category} <DropDownIcon /></button>
              <button style={chipButtonStyle} onClick={() => openSheet('status')}>{filters.status} <DropDownIcon /></button>
            </div>
          </div>
        </div>

        <div style={listContainerStyle}>
          <div style={listInfoStyle}>
            <span style={itemCountStyle}>{stores.length}개</span>
            <button style={sortButtonStyle} onClick={() => openSheet('sort')}>{sortBy} <DropDownIcon /></button>
          </div>
          {loading && <p>로딩 중...</p>}
          {error && <p>{error}</p>}
          {!loading && !error && stores.map(store => (
            <BusinessListItem 
              key={store.businessNumber} 
              business={store}
              onSelect={(businessNumber) => navigate(`/store/detail/${businessNumber}`)}
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