import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  text-align: center;
  margin-top: 1rem;
  height: 100%;
`;

const Title = styled.h1``;

const Description = styled.p``;

const Numbers = styled.h1`
  font-style: normal;
  font-size: 200px;
  margin-top: 0.2rem;
`;

const NotFound = () => {
  return (
    <Wrapper>
      <Title>Page Not Found</Title>
      <Description>
        Sorry, but the requested page you are looking for does not exist
      </Description>
      <Numbers>404</Numbers>
    </Wrapper>
  );
};

export default NotFound;
