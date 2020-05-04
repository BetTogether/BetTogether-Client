import React from "react";
import styled from "styled-components";
import { ShortenAddress } from "utils/ShortenAddress";

const Wrapper = styled.div`
  background-color: #fafafa;
  margin: 0;
  padding: 1rem;
`;

const ActiveMarkets = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  margin: 0 auto;
  max-width: 1260px;
`;

const ActiveMarketsPair = styled.div<{ isBottom?: boolean }>`
  display: flex;
  flex: 1;
  justify-content: space-between;
  margin: ${(props) => (props.isBottom ? "1.5rem 0 0" : "0")};
`;

const ActiveMarket = styled.div`
  background-color: white;
  box-shadow: rgba(0, 0, 0, 0.04) 0 0 1.5rem 0;
  color: #1e2026;
  flex: 1;
  font-size: 0.8rem;
  margin: 0 1rem 0 0;
  padding: 1rem;
  position: relative;
  text-decoration: none;
`;

const PastMarketsWrapper = styled.div`
  background-color: white;
  margin: 0;
  padding: 1.5rem 1rem;
`;

const Table = styled.table`
  width: 100%;
`;

const TableBody = styled.tbody``;

const TableHead = styled.th`
  border-bottom: 1px solid #ddd;
  background-color: #dddddd;
  color: white;
`;

const TableRow = styled.tr`
  border-bottom: 1px solid #ddd;
`;

const PastMarkets = styled.div``;

const Markets = () => {
  let MarketPots = [
    {
      id: 1,
      address: "0x6b175474e89094c44da98b954eedeac495271d0f",
      question: "How many active users will Binance receive by the end of May",
      winner: "0x8f6e73043242842f0d097bacf880a51c2f0f9642",
      winnings: 1000000000000000,
    },
    {
      id: 2,
      address: "0x6b175474e89094c44da98b954eedeac495271d0f",
      question: "How many active users will AirSwap receive by the end of May",
      winner: "0x8f6e73043242842f0d097bacf880a51c2f0f9642",
      winnings: 1000000000000000,
    },
    {
      id: 3,
      address: "0x6b175474e89094c44da98b954eedeac495271d0f",
      question: "How many active users will 0x receive by the end of May",
      winner: "0x8f6e73043242842f0d097bacf880a51c2f0f9642",
      winnings: 1000000000000000,
    },
    {
      id: 4,
      address: "0x6b175474e89094c44da98b954eedeac495271d0f",
      question: "How many active users will Kyber receive by the end of May",
      winner: "0x8f6e73043242842f0d097bacf880a51c2f0f9642",
      winnings: 1000000000000000,
    },
  ];

  return (
    <>
      <Wrapper>
        <ActiveMarkets>
          <ActiveMarketsPair>
            <ActiveMarket>ActiveMarket 1</ActiveMarket>
            <ActiveMarket>ActiveMarket 2</ActiveMarket>
          </ActiveMarketsPair>
          <ActiveMarketsPair isBottom>
            <ActiveMarket>ActiveMarket 3</ActiveMarket>
            <ActiveMarket>ActiveMarket 4</ActiveMarket>
          </ActiveMarketsPair>
        </ActiveMarkets>
      </Wrapper>
      <PastMarketsWrapper>
        <PastMarkets>
          <Table>
            <TableBody>
              <TableRow>
                <TableHead>Address</TableHead>
                <TableHead>Question</TableHead>
                <TableHead>Winner</TableHead>
                <TableHead>Winnings</TableHead>
              </TableRow>

              {MarketPots.length &&
                MarketPots.map((Pot) => (
                  <TableRow key={Pot.id}>
                    <th>{ShortenAddress(Pot.address)}</th>
                    <th>{Pot.question}</th>
                    <th>{ShortenAddress(Pot.winner)}</th>
                    <th>{Pot.winnings}</th>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </PastMarkets>
      </PastMarketsWrapper>
    </>
  );
};

export default Markets;
