import React from "react";
import styled from "styled-components";

const C = {
  primary: "#0080FF",
  line: "#E9E9EB",
};

const Form = styled.form`
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 10px 20px;
  background: #E9E9EB;
`;

const PlusBtn = styled.button`
  width: 29px;
  height: 29px;
  border: 0;
  border-radius: 12.5px;
  background: #fff;
  display: grid;
  place-items: center;
  cursor: pointer;
  gap: 10px;
  box-shadow: inset 0 0 0 1px ${C.line};
  flex-shrink: 0;

  span {
    color: ${C.primary};
    font-size: 20px;
    line-height: 22px;
  }
`;

const Field = styled.input`
  flex: 1;
  height: 36px;
  border: 0;
  border-radius: 10px;
  padding: 0 14px;
  background: #fff;
  outline: none;
  font-size: 14px;
`;

const SendBtn = styled.button`
  width: 32px;
  height: 32px;
  border: 0;
  border-radius: 50%;
  background: ${C.primary};
  color: #fff;
  display: grid;
  place-items: center;
  cursor: pointer;
`;

export default function InputBar({
  value,
  onChange,
  onSend,         
  onPlusClick,   
  onFocus,        
  placeholder = "메시지를 입력하세요",
}) {
  const handleSubmit = (e) => {
    e.preventDefault();
    onSend?.();
  };

  return (
    <Form onSubmit={handleSubmit}>
      <PlusBtn type="button" aria-label="더보기" onClick={onPlusClick}>
        <span>+</span>
      </PlusBtn>

      <Field
        value={value}
        onChange={onChange}
        onFocus={onFocus}
        placeholder={placeholder}
      />

      <SendBtn type="submit" aria-label="보내기">
        <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M16.9523 10.6543L10.4698 3.18362C10.4112 3.11602 10.3388 3.0618 10.2574 3.02465C10.176 2.98749 10.0876 2.96826 9.99816 2.96826C9.9087 2.96826 9.82029 2.98749 9.73891 3.02465C9.65753 3.0618 9.58508 3.11602 9.52648 3.18362L3.04602 10.6543C3.02643 10.6768 3.01374 10.7045 3.00944 10.734C3.00514 10.7636 3.00942 10.7937 3.02177 10.8209C3.03411 10.8481 3.05401 10.8711 3.07909 10.8873C3.10416 10.9035 3.13336 10.9121 3.1632 10.9121H4.74524C4.83508 10.9121 4.92102 10.8731 4.98156 10.8047L9.25695 5.87698V16.875C9.25695 16.961 9.32727 17.0313 9.4132 17.0313H10.5851C10.671 17.0313 10.7413 16.961 10.7413 16.875V5.87698L15.0167 10.8047C15.0753 10.8731 15.1613 10.9121 15.253 10.9121H16.8351C16.9679 10.9121 17.0402 10.7559 16.9523 10.6543Z" fill="#FFFFFF"/>
        </svg>
      </SendBtn>
    </Form>
  );
}
