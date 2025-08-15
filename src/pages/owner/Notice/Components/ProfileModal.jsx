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
  name: '000님',
  birth: '2004.08.04(22)',
  school: '한국외국어대학교(재학)',
  major: '경영학과',
  temp: 15,
};

export function normalizeProfile(apiData) {
  if (!apiData) return null;
  return {
    name: apiData.name || apiData.company_name || SAMPLE_PROFILE.name,
    birth: apiData.birth || apiData.birthe || SAMPLE_PROFILE.birth,
    school: apiData.school || apiData.sch || SAMPLE_PROFILE.school,
    major: apiData.major || apiData.maj || SAMPLE_PROFILE.major,
    temp: apiData.temp ?? apiData.temperature ?? SAMPLE_PROFILE.temp,
  };
}


function useProfileData(input) {
  const normalized =
    input && ('company_name' in input || 'birthe' in input || 'sch' in input || 'maj' in input || 'temperature' in input)
      ? normalizeProfile(input)
      : input;

  return normalized || SAMPLE_PROFILE;
}

export default function ProfileModalOwner({ data }) {
  const { name, birth, school, major, temp } = useProfileData(data);

  return (
    <>
      <Header>
        <Avatar />
        <Name>{name}</Name>
      </Header>
      <Info>
        <dt>생년월일(나이)</dt><dd>{birth}</dd>
        <dt>학력(재학/휴학/졸업)</dt><dd>{school}</dd>
        <dt>전공</dt><dd>{major}</dd>
        <dt>온도</dt><dd>{temp}</dd>
      </Info>
    </>
  );
}
