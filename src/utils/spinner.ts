import styled, { keyframes } from "styled-components";

const spin360 = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

const Spinner = styled.div`
  width: 6rem;
  height: 6rem;
  border: 2rem solid black;
  border-bottom-color: white;
  border-radius: 50%;
  animation: 1.5s linear infinite ${spin360};
`;

export default Spinner;
