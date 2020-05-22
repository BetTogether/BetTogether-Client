import React, { useState, useEffect } from "react";
import { providers, Contract } from "ethers";
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
import BTMarketFactoryContract from "abis/BTMarketFactory.json";

import addresses, { KOVAN_ID } from "utils/addresses";

declare let window: any;

const Markets = () => {
  const [markets, setMarkets] = useState([]);

  const marketFactoryAddressKovan = addresses[KOVAN_ID].marketFactory;

  const fetchMarkets = async (factory: any) => {
    try {
      const markets = await factory.getMarkets();
      setMarkets(markets);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const provider = new providers.Web3Provider(window.web3.currentProvider);
    const wallet = provider.getSigner();
    const FactoryInstance: any = new Contract(
      marketFactoryAddressKovan,
      BTMarketFactoryContract.abi,
      wallet
    );

    fetchMarkets(FactoryInstance);
  }, [marketFactoryAddressKovan]);

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
              {
                markets.length > 0 &&
                  markets.map((market: string) => {
                    return (
                      <TableRow key={market}>
                        <Aave market={market}/>
                      </TableRow>
                    );
                  }
                )
              }
            </TableBody>
          </Table>
        </PastMarkets>
      </PastMarketsWrapper>
    </>
  );
};

// <Aave key={market} market={market}/>

export default Markets;
