import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  padding: 1rem 0;
  width: 100%;
  margin: 0 auto;
  @media (min-width: 800px) {
    width: 90%;
  }
`;

const Content = styled.div`
  width: 100%;
  padding: 0.75rem;
`;

const ColorTop = styled.div`
  border-top-right-radius: 1rem;
  border-top-left-radius: 1rem;
  background: ${(props) => props.theme.palette3.red};
  height: 0.5rem;
`;

const Container = ({ children }: any) => {
  return (
    <Wrapper>
      <Content>
        <ColorTop />
        {children}
      </Content>
    </Wrapper>
  );
};

export default Container;
