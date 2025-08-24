import styled from "styled-components";

export const C = {
  primary: "#1A96FE",   
  text: "#111111",
  caption: "#94A3B8",   
  line: "#E6EAF5",
  bg: "#FFFFFF",
};

export const Page = styled.main`
  width: 100%;
  max-width: 390px;
  min-height: 100dvh;
  margin: 0 auto;
  background: ${C.bg};
  display: grid;
  grid-template-rows: auto 1fr; 
  font-family: 'Pretendard', sans-serif;
`;

export const TopBar = styled.header`
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 12px;
  //border-bottom: 1px solid ${C.line};
`;

export const BackBtn = styled.button`
  width: 28px;
  height: 28px;
  border: none;
  background: transparent;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
`;

export const Title = styled.h3`
  font-size: 16px;
  font-weight: 700;
  margin: 0;
`;

export const SubTitle = styled.p`
  color: #000;
  text-align: left;
  font-size: 20px;
  font-weight: 600;
  line-height: 28px;         
  letter-spacing: -0.5px;
  margin: 12px 0 6px;      
  padding-left: 8px; 
  padding-bottom: 10px;  
`;

export const TopTitle = styled.h2`
  flex: 1;
  text-align: center;
  font-family: Pretendard, sans-serif;
  font-size: 20px;
  font-weight: 700;
  line-height: 20px;
  letter-spacing: -0.5px;
  color: ${C.text};
  margin: 0;
`;

export const StoreName = styled.h1`
  color: #000;
  text-align: left;
  font-size: 32px;
  font-weight: 700;
  line-height: 40px;       
  letter-spacing: -0.5px;
  margin: 0 0 14px;        
  font-kerning: normal;     
  font-variant-ligatures: normal;
  padding-left: 8px; 
`;

export const ProgressWrap = styled.div`
  height: 4px;
  background: #EEF2FF;
`;

export const Progress = styled.div`
  height: 100%;
  background: ${C.primary};
  transition: width .25s ease;
`;

export const Body = styled.div`
  padding: 16px 20px 140px; 
`;

export const H1 = styled.h1`
  font-size: 25px;            
  font-weight: 700;
  line-height: 36px;          
  color: ${C.text};
  margin: 16px 0 4px;
`;

export const Accent = styled.span`
  color: ${C.primary};
`;

export const Hint = styled.p`
  margin: 6px 0 18px;
  font-size: 14px;            
  line-height: 20px;
  color: ${C.caption};
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px 18px;  
  margin-top: 50px;          
`;

export const TypeBtn = styled.button`
  aspect-ratio: 1 / 1;        
  border-radius: 14px;        
  border: 1px solid ${C.primary};
  background: ${(p) => (p.$active ? C.primary : "#fff")};
  color: ${(p) => (p.$active ? "#fff" : C.text)};
  font-size: 20px;
  font-weight: 600;
  line-height: 20px;
  letter-spacing: -0.5px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: ${(p) =>
    p.$active ? "0 18px 38px rgba(26, 150, 254, 0.28)" : "none"};
  transition: background .2s ease, box-shadow .2s ease, color .2s ease, transform .05s ease;

  &:active { transform: translateY(1px); }
`;

export const Label = styled.div`
  color: #343539;
  font-family: Pretendard;
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  margin-bottom: 10px;
`;

export const Input = styled.input`
  width: 100%;
  border: none;
  border-bottom: 2px solid ${C.primary};
  font-size: 18px;
  padding: 8px 0;
  outline: none;
`;

export const TextArea = styled.textarea`
  width: 100%;
  border: 1px solid ${C.line};
  border-radius: 12px;
  padding: 12px;
  font-size: 14px;
  outline: none;
`;

export const Card = styled.div`
  width: 100%;
  max-width: 300px;          
  border-radius: 16px;
  border: 1px solid #E3E3E3;
  background: linear-gradient(180deg, rgba(255,255,255,0.50) 0%, rgba(255,255,255,0.60) 100%);
  box-shadow: 3px 3px 8px rgba(0,0,0,0.08);
  padding: 18px 16px;      
  margin: 0 auto;  
  margin-top: 40px;         
`;

export const Row = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
  padding: 10px 0;
`;

export const Key = styled.div`
  width: 98px;
  color: #343539;
  font-size: 16px;
  font-weight: 500;
  line-height: 20px;
  letter-spacing: -0.5px;
`;

export const Val = styled.div`
  flex: 1;
  color: #343539;
  font-size: 16px;
  font-weight: 400;
  line-height: 20px;
  letter-spacing: -0.5px;
  white-space: pre-line;     
`;

export const Bottom = styled.footer`
  position: fixed;
  left: 0;
  right: 0;
  bottom: calc(env(safe-area-inset-bottom) + 40px); 
  display: flex;
  justify-content: center;
  pointer-events: none;
`;

const BaseBtn = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 172px;
  height: 46px;
  padding: 13px 20px;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 700;
  letter-spacing: -0.5px;
  line-height: 20px;
`;

export const NextBtn = styled.button`
  pointer-events: auto;   
  display: flex;
  justify-content: center;
  align-items: center;
  width: 220px;              
  height: 48px;
  margin: 0 auto;             
  border: none;
  border-radius: 8px;
  background: ${C.primary};
  color: #fff;
  font-size: 20px;
  font-weight: 600;
  line-height: 20px;
  letter-spacing: -0.5px;
  box-shadow: 10px 10px 30px rgba(0, 0, 0, 0.12);
  opacity: ${(p) => (p.disabled ? 0.45 : 1)};
  transition: transform .05s ease, opacity .2s ease;

  &:active { transform: translateY(1px); }
`;

export const Actions = styled.div`
  pointer-events: auto;
  display: flex;
  gap: 20px;
`;

export const OutlineBtn = styled(BaseBtn)`
  background: #fff;
  color: ${C.primary};
  border: 1px solid ${C.primary};
`;

export const PrimaryBtn = styled(BaseBtn)`
  background: ${C.primary};
  color: #fff;
  border: none;
`;
