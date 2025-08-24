import React, { forwardRef } from "react";
import styled from "styled-components";

const C = {
  primary: "#0080FF",
  text: "#111",
  caption: "#505050",
  line: "#E9E9EB",
  bg: "#FFFFFF",
  chip: "#F5F7FA",
};

const SectionTitle = styled.h2`
  margin: 0 0 -5px 10px;
  font-size: 20px;
  font-weight: 600;
  line-height: 140%;
  letter-spacing: -0.5px;
  color: ${C.text};
  color: #000;
  font-family: Pretendard;
`;

const Card = styled.section`
  border-radius: 12px;
  background: linear-gradient(180deg, rgba(255,255,255,0.40) 0%, rgba(255,255,255,0.60) 100%);
  box-shadow: 3px 3px 8px rgba(0,0,0,.08);
  border: 1px solid ${C.line};
  padding: 12px;
  color: #000;
  font-family: Pretendard;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 140%; 
  letter-spacing: -0.3px;
`;

const ProfileTop = styled.div`
  display: flex;
  gap: 10px;
`;

const Avatar = styled.div`
  width: 62px;
  height: 62px;
  border-radius: 50%;
  background: #d9d9d9;
  flex: 0 0 auto;
  border: 1px solid #eee;
`;

const NameLine = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  margin-bottom: 6px;
`;

const Name = styled.div`
  font-size: 20px;
  font-weight: 400;
  line-height: 140%;
  letter-spacing: -0.5px;
  color: ${C.text};
  margin-left: 8px;
`;

const Badge = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 3px 5px;
  border-radius: 8px;
  border: 1px solid ${C.primary};
  background: #fff;
  color: ${C.caption};
  font-size: 12px;
  line-height: 1;
  margin-left: 135px;
  color: #767676;
  font-weight: 500;
  line-height: 140%;
  letter-spacing: -0.3px;
`;

const Thermo = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
  <path d="M7.43077 6.70017V2.46967C7.42777 2.08966 7.27716 1.7257 7.01077 1.45467C6.86518 1.31039 6.69026 1.1991 6.49788 1.12836C6.3055 1.05762 6.10016 1.02908 5.89578 1.04467C5.52578 1.0809 5.18315 1.25559 4.93651 1.53375C4.68987 1.81192 4.55745 2.173 4.56578 2.54467L4.57077 6.68467C4.20469 6.95963 3.92578 7.33446 3.76756 7.7641C3.60934 8.19374 3.57855 8.65993 3.67888 9.10666C3.7792 9.55338 4.00639 9.96163 4.33313 10.2824C4.65987 10.6031 5.07227 10.8227 5.52078 10.9147C5.67735 10.9445 5.83638 10.9596 5.99577 10.9597C6.62617 10.9598 7.23085 10.7098 7.67707 10.2645C8.12329 9.81922 8.37458 9.21506 8.37578 8.58467C8.37652 8.21855 8.29142 7.85736 8.12731 7.53008C7.96319 7.2028 7.72463 6.91856 7.43077 6.70017ZM7.19078 10.0302C6.97362 10.2079 6.71963 10.3352 6.44722 10.4026C6.1748 10.4701 5.89079 10.4761 5.61577 10.4202C5.25078 10.3475 4.9162 10.1664 4.65573 9.90058C4.39527 9.63476 4.22103 9.29657 4.15577 8.93017C4.09078 8.58655 4.1233 8.2316 4.24967 7.90552C4.37604 7.57943 4.5912 7.29525 4.87077 7.08517C4.93102 7.04062 4.98002 6.98261 5.01388 6.91577C5.04773 6.84893 5.0655 6.7751 5.06578 6.70017V2.54467C5.06002 2.30033 5.14539 2.06259 5.30529 1.87774C5.46519 1.69289 5.68815 1.57416 5.93077 1.54467C5.95386 1.54052 5.97733 1.53884 6.00078 1.53967C6.2467 1.54202 6.48189 1.64075 6.65579 1.81465C6.82969 1.98856 6.92843 2.22375 6.93077 2.46967V6.70017C6.93105 6.7751 6.94882 6.84893 6.98267 6.91577C7.01653 6.98261 7.06553 7.04062 7.12578 7.08517C7.35301 7.25523 7.53857 7.47475 7.66842 7.72712C7.79827 7.97949 7.86901 8.2581 7.87527 8.54185C7.88153 8.82559 7.82316 9.10705 7.70457 9.3649C7.58598 9.62276 7.41028 9.85026 7.19078 10.0302Z" fill="#0080FF"/>
  <path d="M6.94666 8.5847C6.94666 8.83533 6.8471 9.07569 6.66988 9.25291C6.49265 9.43013 6.25229 9.5297 6.00166 9.5297C5.75103 9.5297 5.51067 9.43013 5.33344 9.25291C5.15622 9.07569 5.05666 8.83533 5.05666 8.5847C5.05534 8.37803 5.12296 8.17683 5.24884 8.01292C5.37472 7.84901 5.55165 7.73175 5.75166 7.6797V2.7002C5.75166 2.63389 5.778 2.5703 5.82488 2.52342C5.87177 2.47653 5.93536 2.4502 6.00166 2.4502C6.06796 2.4502 6.13155 2.47653 6.17844 2.52342C6.22532 2.5703 6.25166 2.63389 6.25166 2.7002V7.68019C6.45111 7.73308 6.62745 7.85049 6.75317 8.01411C6.87889 8.17772 6.94693 8.37835 6.94666 8.5847Z" fill="#0080FF"/>
</svg>
);

const KV = styled.div`
  display: grid;
  grid-template-columns: 46px 1fr;
  margin-left: 10px;
  gap: 6px;
  font-size: 12px;
  line-height: 140%;
  letter-spacing: -0.3px;
`;
const KVLabel = styled.span`
  color: ${C.primary};
  font-weight: 400;
  font-family: Pretendard;
  font-size: 12px;
  line-height: 140%; 
  letter-spacing: -0.3px;
`;
const KVValue = styled.b`
  color: ${C.text};
  font-weight: 400;
  color: #000;
  font-family: Pretendard;
  font-size: 12px;
  font-style: normal;
  line-height: 140%;
  letter-spacing: -0.3px;
`;

const Bullet = styled.li`
  margin: 0 0 6px 16px;
  font-size: 12px;
  line-height: 140%;
  font-weight: 400;
  color: ${C.text};
  &::marker { color: ${C.primary}; }
`;

const SubLabel = styled.div`
  margin: 2px 0 8px;
  font-size: 12px;
  font-weight: 600;
  line-height: 140%;
  letter-spacing: -0.3px;
  color: ${C.primary};
`;

const Profile = forwardRef(function ProfileSection(
  { stickyGap = 76, profile },
  ref
) {
  return (
    <>
      <div ref={ref} style={{ height: 1, scrollMarginTop: stickyGap }} />

      <SectionTitle>학생 프로필</SectionTitle>

      <Card>
        <ProfileTop>
          <Avatar />
          <div style={{ flex: 1 }}>
            <NameLine>
              <Name>{profile.name}</Name>
              <Badge><Thermo /> {profile.temp}°C</Badge>
            </NameLine>

            <KV>
              <KVLabel>대학교</KVLabel>
              <KVValue>{profile.univ}</KVValue>
            </KV>

            <KV>
              <KVLabel>전공</KVLabel>
              <KVValue>{profile.major}</KVValue>
            </KV>

            <KV>
              <KVLabel>경력</KVLabel>
              <KVValue>{profile.exp}</KVValue>
            </KV>
          </div>
        </ProfileTop>
      </Card>

      <Card>
        <SubLabel>자기소개</SubLabel>
        <ul style={{ padding: 0, margin: 0 }}>
          {profile.intro.map((s, i) => <Bullet key={i}>{s}</Bullet>)}
        </ul>
      </Card>

      <Card>
        <SubLabel>보유 역량</SubLabel>
        <ul style={{ padding: 0, margin: 0 }}>
          {profile.skills.map((s, i) => <Bullet key={i}>{s}</Bullet>)}
        </ul>
      </Card>
    </>
  );
});

export default Profile;
