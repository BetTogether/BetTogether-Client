import React, { useState, useContext } from "react";
import { ContractContext } from "store/context/ContractContext";
import Aave from "./Aave";
import {
  ActiveMarketsWrapper,
  ActiveMarkets,
  ActiveMarketsPair,
  ActiveMarket,
  PastMarketsWrapper,
  Table,
  TableBody,
  TableHead,
  TableHeadTop,
  TableRow,
  PastMarkets,
} from "./Markets.style";

const Markets = () => {
  const [markets, setMarkets] = useState([]);
  const { contractState } = useContext(ContractContext);
  const factory = contractState[0];

  const fetchMarkets = async () => {
    try {
      const markets = await factory.getMarkets();
      setMarkets(markets);
    } catch (error) {
      console.error(error);
    }
  };

  fetchMarkets();

  return (
    <>
      <ActiveMarketsWrapper>
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
      </ActiveMarketsWrapper>
      <PastMarketsWrapper>
        <PastMarkets>
          <Table>
            <TableHeadTop>
              <TableRow>
                <TableHead>Address</TableHead>
                <TableHead>Question</TableHead>
                <TableHead>Winning Outcome</TableHead>
                <TableHead>Winnings</TableHead>
                <TableHead>Finish Date</TableHead>
              </TableRow>
            </TableHeadTop>
            <TableBody>
              {markets.length > 0 &&
                markets.map((market: string) => {
                  return (
                    <TableRow key={market}>
                      <Aave market={market} />
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </PastMarkets>
      </PastMarketsWrapper>
    </>
  );
};

// <Aave key={market} market={market}/>

export default Markets;
