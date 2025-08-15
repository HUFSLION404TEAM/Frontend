import React, { useEffect } from 'react';
import styled, { css } from 'styled-components';

const Backdrop = styled.div`
  position: fixed; 
  inset: 0;
  display: grid; 
  place-items: center;
  background: rgba(0,0,0,0.35);
  z-index: 9999;
`;

const Dialog = styled.div`
  width: 90%;
  max-width: 390px;
  border-radius: 12px;
  background: #fff;
  box-shadow: 0 10px 30px rgba(0,0,0,0.25);
  padding: 24px;
  position: relative;
  ${({ offsetY = 0 }) => css`transform: translateY(${offsetY});`}
`;

const CloseBtn = styled.button`
  position: absolute; 
  top: 12px; 
  right: 12px;
  width: 28px; 
  height: 28px;
  border: 0; 
  background: transparent; 
  cursor: pointer;
  display: grid; 
  place-items: center;
  svg{width:20px;height:20px;}
`;

export default function ModalStudent({ open, onClose, children, closeOnBackdrop = true, offsetY = '-55%' }) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === 'Escape' && onClose?.();
    document.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <Backdrop onClick={closeOnBackdrop ? onClose : undefined}>
      <Dialog offsetY={offsetY} onClick={(e) => e.stopPropagation()}>
        <CloseBtn aria-label="닫기" onClick={onClose}>
          <svg viewBox="0 0 24 24" fill="none" stroke="#9A9AA0" strokeWidth="2" strokeLinecap="round">
            <path d="M6 6L18 18M18 6L6 18" />
          </svg>
        </CloseBtn>
        {children}
      </Dialog>
    </Backdrop>
  );
}
