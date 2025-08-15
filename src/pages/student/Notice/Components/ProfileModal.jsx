import React from 'react';
import styled from 'styled-components';

const Header = styled.div`
  display: grid;
  grid-template-columns: 72px 1fr;
  gap: 16px; 
  align-items: center;
  margin-bottom: 18px;
`;
const Avatar = styled.div`
  width: 72px; 
  height: 72px;
  border-radius: 12px; 
  background: #8E8E8E;
`;
const Name = styled.h2`
  margin: 0; 
  font-size: 22px; 
  font-weight: 700; 
  color: #111;
`;
const Info = styled.dl`
  display: grid;
  grid-template-columns: 1fr 2fr;
  row-gap: 10px; 
  column-gap: 16px;
  margin: 6px 0 0;
  dt{color:#333;font-size:14px;}
  dd{margin:0;color:#111;font-size:14px;}
`;

/* ------- 더미데이터 ------- */
export const SAMPLE_PROFILE = {
  name: '업체이름님',
  phone: '010-1234-5678',
  address: '경기도 용인시 처인구 192-4',
  category: '카페',
  temp: 15,
};

export function normalizeProfile(apiData) {
  if (!apiData) return null;
  return {
    name: apiData.name || apiData.company_name || SAMPLE_PROFILE.name,
    phone: apiData.phone || apiData.contact || SAMPLE_PROFILE.phone,
    address: apiData.address || apiData.addr || SAMPLE_PROFILE.address,
    category: apiData.category || apiData.biz_type || SAMPLE_PROFILE.category,
    temp: apiData.temp ?? apiData.temperature ?? SAMPLE_PROFILE.temp,
  };
}


function useProfileData(input) {
  const normalized =
    input && ('company_name' in input || 'contact' in input || 'addr' in input || 'biz_type' in input || 'temperature' in input)
      ? normalizeProfile(input)
      : input;

  return normalized || SAMPLE_PROFILE;
}

export default function ProfileModalStudent({ data }) {
  const { name, phone, address, category, temp } = useProfileData(data);

  return (
    <>
      <Header>
        <Avatar />
        <Name>{name}</Name>
      </Header>
      <Info>
        <dt>업체 연락처</dt><dd>{phone}</dd>
        <dt>위치</dt><dd>{address}</dd>
        <dt>업종</dt><dd>{category}</dd>
        <dt>온도</dt><dd>{temp}</dd>
      </Info>
    </>
  );
}
