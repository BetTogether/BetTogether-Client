import React from "react";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";
import { ShortenAddress } from "utils/ShortenAddress";

import {
  TableRow,
} from "../Markets.style";

const GET_LAST_DEPOSITS_FROM_MARKET = gql`
  query deposits($market: ID!) {
    deposits(where: { user: $market }) {
      user {
        id
      }
      amount
      timestamp
      pool {
        lendingPool
      }
    }
  }
`;

function Aave({ market }: { market: string }) {
  const { loading, error, data } = useQuery(GET_LAST_DEPOSITS_FROM_MARKET, {
    variables: { market },
  });

  const totalDepositAmount = data && data.deposits.reduce((acc: number, v: any) => acc+parseInt(v.amount, 10), 0);

  console.log({ market, data, totalDepositAmount })

  return (
    <>
      {!loading &&
        !error &&
        data &&
        <>
          <th>{ShortenAddress(market)}</th>
          <th>{'TODO Question'}</th>
          <th>{`TODO Winner`}</th>
          <th>{`${totalDepositAmount / 1e18}$`}</th>
          <th>{'TODO Timestamp'}</th>
        </>
      }
    </>
  );
}

export default Aave;
