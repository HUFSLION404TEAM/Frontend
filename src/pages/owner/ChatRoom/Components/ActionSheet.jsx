import React from "react";
import styled from "styled-components";

const C = { primary: "#0080FF", line: "#E9E9EB", sheetBg: "#FFFFFF" };

const Dim = styled.div`
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.25);
  z-index: 30;
`;

const Card = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  background: ${C.sheetBg};
  border-radius: 16px 16px 0 0;
  box-shadow: 0 -1px 0 ${C.line} inset, 0 -6px 20px rgba(0, 0, 0, 0.06);
  padding-bottom: calc(env(safe-area-inset-bottom) + 8px);
  z-index: 31;
  transform: translateY(0);
  animation: rise 200ms ease;

  @keyframes rise {
    from {
      transform: translateY(12%);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }
`;

const SheetList = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 10px;
  gap: 10px;
`;

const Row = styled.button`
  width: 100%;
  padding: 10px 20px;
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 17px;
  line-height: 140%;
  letter-spacing: -0.425px;
  font-weight: 400;
  border: 0;
  background: #ffffff;
  cursor: pointer;
  border-bottom: 1px solid #e9e9eb;

  &:last-child {
    border-bottom: 0;
  }
`;

const IconWrap = styled.span`
  width: 15px;
  height: 15px;
  flex-shrink: 0;
  aspect-ratio: 1 / 1;
  display: inline-flex;
  align-items: center;
  justify-content: center;

  svg {
    width: 15px;
    height: 15px;
  }
`;

const Label = styled.span`
  display: inline-block;
`;

const BackBar = styled.div`
  padding: 12px 20px 20px;
  background: #ffffff;
`;

const BackBtn = styled.button`
  width: 100%;
  height: 44px;
  border: 0;
  border-radius: 8px;
  background: #f5f5f7;
  font-weight: 400;
  font-size: 17px;
  color: #000000;
  cursor: pointer;
`;

const IconMatch = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="none">
    <g clipPath="url(#clip0)">
      <path d="M12.375 2.375H9.7625C9.5 1.65 8.8125 1.125 8 1.125C7.1875 1.125 6.5 1.65 6.2375 2.375H3.625C2.9375 2.375 2.375 2.9375 2.375 3.625V12.375C2.375 13.0625 2.9375 13.625 3.625 13.625H12.375C13.0625 13.625 13.625 13.0625 13.625 12.375V3.625C13.625 2.9375 13.0625 2.375 12.375 2.375ZM8 2.375C8.34375 2.375 8.625 2.65625 8.625 3C8.625 3.34375 8.34375 3.625 8 3.625C7.65625 3.625 7.375 3.34375 7.375 3C7.375 2.65625 7.65625 2.375 8 2.375ZM9.25 11.125H4.875V9.875H9.25V11.125ZM11.125 8.625H4.875V7.375H11.125V8.625ZM11.125 6.125H4.875V4.875H11.125V6.125Z" fill="black"/>
    </g>
    <defs>
      <clipPath id="clip0">
        <rect width="15" height="15" fill="white" transform="translate(0.5 0.5)"/>
      </clipPath>
    </defs>
  </svg>
);

const IconInfo = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="none">
    <path d="M8 0.5C3.858 0.5 0.5 3.858 0.5 8C0.5 12.142 3.858 15.5 8 15.5C12.142 15.5 15.5 12.142 15.5 8C15.5 3.858 12.142 0.5 8 0.5ZM8.536 11.616C8.536 11.69 8.475 11.75 8.402 11.75H7.598C7.525 11.75 7.464 11.69 7.464 11.616V7.063C7.464 6.989 7.525 6.929 7.598 6.929H8.402C8.475 6.929 8.536 6.989 8.536 7.063V11.616ZM8 5.857C7.79 5.853 7.589 5.766 7.442 5.616C7.295 5.466 7.213 5.264 7.213 5.054C7.213 4.843 7.295 4.641 7.442 4.491C7.589 4.341 7.79 4.254 8 4.25C8.21 4.254 8.411 4.341 8.558 4.491C8.705 4.641 8.787 4.843 8.787 5.054C8.787 5.264 8.705 5.466 8.558 5.616C8.411 5.766 8.21 5.853 8 5.857Z" fill="black"/>
  </svg>
);

const IconPhoto = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="none">
    <path d="M3.227 12.773V15.5H15.5V3.889H12.773M1.182 12.091L4.591 8L6.636 10.045L9.364 6.636L12.773 10.727M0.5 0.5H12.773V12.773H0.5V0.5ZM3.909 5.273C4.286 5.273 4.591 4.967 4.591 4.591C4.591 4.214 4.286 3.909 3.909 3.909C3.533 3.909 3.227 4.214 3.227 4.591C3.227 4.967 3.533 5.273 3.909 5.273Z" stroke="black"/>
  </svg>
);

const IconReport = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="none">
    <path d="M8 1.75C4.554 1.75 1.75 4.554 1.75 8C1.75 11.446 4.554 14.25 8 14.25C11.446 14.25 14.25 11.446 14.25 8C14.25 4.554 11.446 1.75 8 1.75ZM3 8C3 6.846 3.396 5.786 4.055 4.939L11.061 11.945C10.187 12.629 9.109 13 8 13C5.243 13 3 10.757 3 8ZM11.945 11.061L4.939 4.055C5.813 3.371 6.891 3 8 3C10.757 3 13 5.243 13 8C13 9.109 12.628 10.187 11.945 11.061Z" fill="black"/>
  </svg>
);

const DEFAULT_ICONS = {
  match: <IconMatch />,
  profile: <IconInfo />,
  photo: <IconPhoto />,
  report: <IconReport />,
};

export default function ActionSheet({ open, onClose, onAction, items }) {
  if (!open) return null;

  const list =
    items ??
    [
      { key: "match", label: "매칭 신청하기" },
      { key: "profile", label: "대학생 정보 확인하기" },
      { key: "photo", label: "사진 첨부하기" },
      { key: "report", label: "신고하기" },
    ];

  const handleClick = (key) => {
    onClose?.();
    onAction?.(key);
  };

  return (
    <>
      <Dim onClick={onClose} />
      <Card role="dialog" aria-modal="true">
        <SheetList>
          {list.map((it) => (
            <Row key={it.key} onClick={() => handleClick(it.key)}>
              <IconWrap>{it.icon ?? DEFAULT_ICONS[it.key]}</IconWrap>
              <Label>{it.label}</Label>
            </Row>
          ))}
        </SheetList>
        <BackBar>
          <BackBtn onClick={onClose}>뒤로가기</BackBtn>
        </BackBar>
      </Card>
    </>
  );
}
