import styled from "styled-components";

export const Content = styled.div`
  background-color: ${(props) => props.theme.palette3.white};
  border-top-width: 1px;
  border-bottom-width: 1px;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
  @media (max-width: 640px) {
    border-radius: 0.25rem;
  }
  padding-bottom: 1rem;
`;

export const Border = styled.div`
  border-bottom-width: 1px;
`;

export const Top = styled.div`
  display: flex;
  margin-bottom: -1px;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1.5rem;
`;

export const Title = styled.h3`
  font-size: 1.5rem;
  font-weight: 500;
  color: ${(props) => props.theme.palette3.black};
`;
