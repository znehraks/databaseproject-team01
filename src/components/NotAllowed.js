import styled from "styled-components";
import React from "react";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 45vw;
`;

const Span = styled.span`
  font-size: 3vw;
`;

export default () => {
  return (
    <Wrapper>
      <Span>준 관리자 이상만 열람 가능합니다.</Span>
    </Wrapper>
  );
};
