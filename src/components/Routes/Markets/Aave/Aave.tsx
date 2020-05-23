import React, { useEffect, useState } from "react";
//import { gql } from "apollo-boost";
//import { useQuery } from "@apollo/react-hooks";
import { providers, Contract } from "ethers";
import styled from "styled-components";

import { shortenAddress } from "utils/ShortenAddress";
import BTMarketContract from "abis/BTMarket.json";

// import {
//   TableRow,
// } from "../Markets.style";

declare let window: any;

const Address = styled.a`
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`;

// const GET_LAST_DEPOSITS_FROM_MARKET = gql`
//   query deposits($market: ID!) {
//     users(where: { id: $market }) {
//       reserves {
//         aTokenBalanceHistory(orderBy: timestamp) {
//           balance
//           timestamp
//         }
//         depositHistory(orderBy: timestamp) {
//           amount
//           timestamp
//         }
//       }
//     }
//   }
// `;

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
  const [question, setQuestion] = useState<number>(0);
  const [questionId, setQuestionId] = useState<number>(0);
  const [maxInterests, setMaxInterest] = useState<number>(0);
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
      const _question = await marketContract.eventName();
      const _questionId = await marketContract.questionId();
      const _maxInterests = await marketContract.getMaxTotalInterest();
      const _marketResolutionTime = await marketContract.marketResolutionTime();
      const _winningOutcomeId = await marketContract.winningOutcome();
      let _winningOutcome;

      if (_winningOutcomeId.toString() !== "69") {
        _winningOutcome = await marketContract.outcomeNames(_winningOutcomeId);
      }

      setQuestion(_question);
      setQuestionId(_questionId);
      setMaxInterest(_maxInterests);
      setMarketResolutionTime(_marketResolutionTime);
      setWinningOutcome(_winningOutcome);
    })();
  }, [market]);

  /* const { loading, error, data } = useQuery(GET_LAST_DEPOSITS_FROM_MARKET, {
    variables: { market: market.toLowerCase() },
  }); */

  return (
    <>
      {
        <>
          <th>
            <Address href={`https://kovan.etherscan.io/address/${market}`}>
              {shortenAddress(market)}
            </Address>
          </th>
          <th>
            <Address
              href={`https://realitio.github.io/#!/question/${questionId}`}
            >
              {question}
            </Address>
          </th>
          <th>
            {winningOutcome ? winningOutcome.toString() : "Not yet resolved"}
          </th>
          <th>{`${getFormattedNumber(maxInterests / 1e18, 18)} DAI`}</th>
          <th>{new Date(marketResolutionTime * 1000).toUTCString()}</th>
        </>
      }
    </>
  );
}

export default Aave;
