import styled, { keyframes } from "styled-components";

const spin = keyframes`
  to {
    transform: rotate(360deg);
  }
`;

const Spinner = styled.div`
  width: 3rem;
  height: 3rem;
  border: 0.5rem solid ${(props) => props.theme.palette3.red};
  border-bottom-color: transparent;
  border-radius: 50%;
  animation: 1.5s linear infinite ${spin};
`;

export default Spinner;
