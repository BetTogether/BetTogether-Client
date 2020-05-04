import React from "react";
import {
  Wrapper,
  ActiveMarkets,
  ActiveMarketsPair,
  ActiveMarket,
  PastMarketsWrapper,
  Table,
  TableBody,
  TableHead,
  TableRow,
  PastMarkets,
} from "./Markets.style";
import { ShortenAddress } from "utils/ShortenAddress";

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