import React, { useEffect, useState } from "react";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";
import { shortenAddress } from "utils/ShortenAddress";
import { providers, Contract } from "ethers";

import BTMarketContract from "abis/BTMarket.json";

// import {
//   TableRow,
// } from "../Markets.style";

declare let window: any;

const GET_LAST_DEPOSITS_FROM_MARKET = gql`
  query deposits($market: ID!) {
    users(where: { id: $market }) {
      reserves {
        aTokenBalanceHistory(orderBy: timestamp) {
          balance
          timestamp
        }
        depositHistory(orderBy: timestamp) {
          amount
          timestamp
        }
      }
    }
  }
`;

const getFormattedNumber = (floatBalance: number, decimals: number) => {
  if (floatBalance === 0) {
    return 0;
  } else if (floatBalance < 1) {
    const decimalDigits = floatBalance.toFixed(decimals).slice(2);
    const leadingZeros = decimalDigits.search(/[1-9]/);
    const firstTwoDigits = decimalDigits.slice(leadingZeros, leadingZeros + 2);

    return `0.${"0".repeat(leadingZeros)}${firstTwoDigits}`;
  } else if (floatBalance < 10) return Math.round(floatBalance * 10) / 10;

  return Math.round(floatBalance);
};

function Aave({ market }: { market: string }) {
  const [marketResolutionTime, setMarketResolutionTime] = useState<number>(0);
  const [winningOutcome, setWinningOutcome] = useState<number>(0);

  useEffect(() => {
    (async () => {
      const provider = new providers.Web3Provider(window.web3.currentProvider);
      const wallet = provider.getSigner();
      const marketContract: any = new Contract(
        market,
        BTMarketContract.abi,
        wallet
      );
      const _marketResolutionTime = await marketContract.marketResolutionTime();
      const _winningOutcome = await marketContract.winningOutcome();
      setMarketResolutionTime(_marketResolutionTime);
      setWinningOutcome(_winningOutcome);
    })();
  }, [market]);

  const { loading, error, data } = useQuery(GET_LAST_DEPOSITS_FROM_MARKET, {
    variables: { market: market.toLowerCase() },
  });

  let totalInterestsFormated: string | number = 0;

  if (data && data.users.length > 0 && data.users[0].reserves.length > 0) {
    const { aTokenBalanceHistory, depositHistory } = data.users[0].reserves[0];

    // TODO use real _marketResolutionTime
    const fakeMarketResolutionTime =
      aTokenBalanceHistory.length > 2
        ? aTokenBalanceHistory[2].timestamp - 2
        : 0;

    const accruedInterestChanges = aTokenBalanceHistory.filter(
      (aTokenBalanceChange: any) => {
        return aTokenBalanceChange.timestamp < fakeMarketResolutionTime;
      }
    );

    // filtering deposits probably not required for real contracts?
    const filteredDeposits = depositHistory.filter((deposit: any) => {
      return deposit.timestamp < fakeMarketResolutionTime;
    });

    if (filteredDeposits.length > 0 && accruedInterestChanges.length > 0) {
      const currentAtokenBalance = parseInt(
        accruedInterestChanges[accruedInterestChanges.length - 1].balance,
        10
      );
      const totalDeposits = filteredDeposits.reduce(
        (depositSum: number, currentValue: any) =>
          depositSum + parseInt(currentValue.amount, 10),
        0
      );
      const totalInterests = currentAtokenBalance - totalDeposits;

      totalInterestsFormated = getFormattedNumber(totalInterests / 1e18, 17);
    }
  }

  if (data && !totalInterestsFormated) {
    totalInterestsFormated = "?";
  }

  return (
    <>
      {!loading && !error && data && (
        <>
          <th>{shortenAddress(market)}</th>
          <th>{"TODO Question"}</th>
          <th>{winningOutcome.toString()}</th>
          <th>
            {totalInterestsFormated
              ? `${totalInterestsFormated} DAI`
              : "Loading"}
          </th>
          <th>{new Date(marketResolutionTime).toUTCString()}</th>
        </>
      )}
    </>
  );
}

export default Aave;
