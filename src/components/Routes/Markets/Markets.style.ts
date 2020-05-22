import styled from "styled-components";

export const ActiveMarketsWrapper = styled.div`
  background-color: ${(props) => props.theme.palette3.gray};
  margin: 0;
  padding: 1rem;
`;

export const ActiveMarkets = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  margin: 0 auto;
  width: 100%;
`;

export const ActiveMarketsPair = styled.div<{ isBottom?: boolean }>`
  display: flex;
  flex: 1;
  justify-content: space-between;
  margin: ${(props) => (props.isBottom ? "1.5rem 0 0" : "0")};
`;

export const ActiveMarket = styled.div`
  background-color: ${(props) => props.theme.palette3.white};
  box-shadow: rgba(0, 0, 0, 0.04) 0 0 1.5rem 0;
  color: #1e2026;
  flex: 1;
  font-size: 0.8rem;
  margin-right: 1rem;
  padding: 1rem;
  position: relative;
  text-decoration: none;
`;

export const PastMarketsWrapper = styled.div`
  background-color: ${(props) => props.theme.palette3.white};
  margin: 0;
  padding: 1.5rem 1rem;
`;

export const Table = styled.table`
  width: 100%;
`;

export const TableBody = styled.tbody``;

export const TableHead = styled.th`
  border-bottom: 1px solid #ddd;
  background-color: #dddddd;
  color: ${(props) => props.theme.palette3.white};
`;

export const TableHeadTop = styled.thead`
  border-bottom: 1px solid #ddd;
  background-color: #dddddd;
  color: ${(props) => props.theme.palette3.white};
`;

export const TableRow = styled.tr`
  border-bottom: 1px solid #ddd;
`;

export const PastMarkets = styled.div``;
