import React, { useState, useEffect } from "react";
import styled from "styled-components";
import ReactApexChart from "react-apexcharts";
import { utils } from "ethers";

const Wrapper = styled.div`
  margin: 3rem;
`;

interface IApex {
  marketContract: any;
  forceRerender: boolean;
}

const Apex = ({ marketContract, forceRerender }: IApex) => {
  const [painted, setPainted] = useState(false);
  const [TrumpBettingPeriod1, setTrumpBettingPeriod1] = useState<number>(0);
  const [TrumpBettingPeriod2, setTrumpBettingPeriod2] = useState<number>(0);
  const [TrumpBettingPeriod3, setTrumpBettingPeriod3] = useState<number>(0);
  const [TrumpBettingPeriod4, setTrumpBettingPeriod4] = useState<number>(0);
  const [TrumpBettingPeriod5, setTrumpBettingPeriod5] = useState<number>(0);
  const [BidenBettingPeriod1, setBidenBettingPeriod1] = useState<number>(0);
  const [BidenBettingPeriod2, setBidenBettingPeriod2] = useState<number>(0);
  const [BidenBettingPeriod3, setBidenBettingPeriod3] = useState<number>(0);
  const [BidenBettingPeriod4, setBidenBettingPeriod4] = useState<number>(0);
  const [BidenBettingPeriod5, setBidenBettingPeriod5] = useState<number>(0);

  if (forceRerender) {
    console.log({ forceRerender })
  }

  useEffect(() => {
    (async () => {
      //!BETS
      //!Trump
      let betsForTrump: string[] = [];
      let amountOfBetsForTrump = await marketContract.getBetAmountsArray(0);
      amountOfBetsForTrump.forEach((bet: any) => {
        let formattedBets = utils.formatEther(bet.toString());
        betsForTrump.push(formattedBets);
      });

      //!Biden
      let betsForBiden: string[] = [];
      let amountOfBetsForBiden = await marketContract.getBetAmountsArray(1);
      amountOfBetsForBiden.forEach((bet: any) => {
        let formattedBet = utils.formatEther(bet.toString());
        betsForBiden.push(formattedBet);
      });

      //!TIMESTAMP
      //!Trump
      let timestampsForTrump: string[] = [];
      let betTimestampsOnTrump = await marketContract.getTimestampsArray(0);
      betTimestampsOnTrump.forEach((timestamp: any) => {
        let formattedTimestamp = timestamp.toString();
        timestampsForTrump.push(formattedTimestamp);
      });

      //!Biden
      let timestampsForBiden: string[] = [];
      let betTimestampsOnBidem = await marketContract.getTimestampsArray(1);
      betTimestampsOnBidem.forEach((timestamp: any) => {
        let formattedTimestamp = timestamp.toString();
        timestampsForBiden.push(formattedTimestamp);
      });

      //! Combine
      interface IBetsAndTimestamps {
        id: number;
        amount: number;
        timestamp: number;
      }
      //!Trump
      let trumpBetsAndTimestamp: IBetsAndTimestamps[] = [];
      for (let i = 0; i < timestampsForTrump.length; i++) {
        let id = i;
        let amount = betsForTrump[i];
        let timestamp = timestampsForTrump[i];
        let newBetAndTimestamp = {
          id: id,
          amount: parseInt(amount),
          timestamp: parseInt(timestamp),
        };

        trumpBetsAndTimestamp.push(newBetAndTimestamp);
      }

      //!Biden
      let bidenBetsAndTimestamp: IBetsAndTimestamps[] = [];
      for (let i = 0; i < timestampsForBiden.length; i++) {
        let id = i;
        let amount = betsForBiden[i];
        let timestamp = timestampsForBiden[i];
        let newBetAndTimestamp = {
          id: id,
          amount: parseInt(amount),
          timestamp: parseInt(timestamp),
        };
        bidenBetsAndTimestamp.push(newBetAndTimestamp);
      }

      //!CHART
      const start = await marketContract.marketOpeningTimeActual();
      const startPeriod = start.toNumber();

      //!Trump
      let totalTrumpBettingPeriod1 = 0;
      let totalTrumpBettingPeriod2 = 0;
      let totalTrumpBettingPeriod3 = 0;
      let totalTrumpBettingPeriod4 = 0;
      let totalTrumpBettingPeriod5 = 0;
      trumpBetsAndTimestamp.forEach((item: any) => {
        if (startPeriod < item.timestamp && item.timestamp < startPeriod + 60) {
          totalTrumpBettingPeriod1 = totalTrumpBettingPeriod1 + item.amount;
        } else if (
          startPeriod + 60 < item.timestamp &&
          item.timestamp < startPeriod + 120
        ) {
          totalTrumpBettingPeriod2 = totalTrumpBettingPeriod2 + item.amount;
        } else if (
          startPeriod + 120 < item.timestamp &&
          item.timestamp < startPeriod + 180
        ) {
          totalTrumpBettingPeriod3 = totalTrumpBettingPeriod3 + item.amount;
        } else if (
          startPeriod + 180 < item.timestamp &&
          item.timestamp < startPeriod + 240
        ) {
          totalTrumpBettingPeriod4 = totalTrumpBettingPeriod4 + item.amount;
        } else if (
          startPeriod + 240 < item.timestamp &&
          item.timestamp < startPeriod + 300
        ) {
          totalTrumpBettingPeriod5 = totalTrumpBettingPeriod5 + item.amount;
        } else {
          console.log("Transaction Timestamp Extends Charts X-Axis...");
        }

        setTrumpBettingPeriod1(totalTrumpBettingPeriod1);
        setTrumpBettingPeriod2(totalTrumpBettingPeriod2);
        setTrumpBettingPeriod3(totalTrumpBettingPeriod3);
        setTrumpBettingPeriod4(totalTrumpBettingPeriod4);
        setTrumpBettingPeriod5(totalTrumpBettingPeriod5);
      });

      //!Biden
      // start ...83420
      // period1 ...83420 - 83480
      // period2 ...83480 - 83540
      // period3 ...83540 - 83600 (83552)
      // period4 ...83600 - 83660 (83628)
      // period5 ...83660 - 83720
      let totalBidenBettingPeriod1 = 0;
      let totalBidenBettingPeriod2 = 0;
      let totalBidenBettingPeriod3 = 0;
      let totalBidenBettingPeriod4 = 0;
      let totalBidenBettingPeriod5 = 0;
      bidenBetsAndTimestamp.forEach((item: any) => {
        if (startPeriod < item.timestamp && item.timestamp < startPeriod + 60) {
          totalBidenBettingPeriod1 = totalBidenBettingPeriod1 + item.amount;
        } else if (
          startPeriod + 60 < item.timestamp ||
          item.timestamp < startPeriod + 120
        ) {
          totalBidenBettingPeriod2 = totalBidenBettingPeriod2 + item.amount;
        } else if (
          startPeriod + 120 < item.timestamp ||
          item.timestamp < startPeriod + 180
        ) {
          totalBidenBettingPeriod3 = totalBidenBettingPeriod3 + item.amount;
        } else if (
          startPeriod + 180 < item.timestamp &&
          item.timestamp < startPeriod + 240
        ) {
          totalBidenBettingPeriod4 = totalBidenBettingPeriod4 + item.amount;
        } else if (
          startPeriod + 240 < item.timestamp &&
          item.timestamp < startPeriod + 300
        ) {
          totalBidenBettingPeriod5 = totalBidenBettingPeriod5 + item.amount;
        } else {
          console.log("Transaction Timestamp Extends Charts X-Axis...");
        }

        setBidenBettingPeriod1(totalBidenBettingPeriod1);
        setBidenBettingPeriod2(totalBidenBettingPeriod2);
        setBidenBettingPeriod3(totalBidenBettingPeriod3);
        setBidenBettingPeriod4(totalBidenBettingPeriod4);
        setBidenBettingPeriod5(totalBidenBettingPeriod5);
      });
      setPainted(true);
    })();
  }, [marketContract, forceRerender]);

  let series = [
    {
      name: "Donald Trump",
      data: [
        TrumpBettingPeriod1,
        TrumpBettingPeriod2,
        TrumpBettingPeriod3,
        TrumpBettingPeriod4,
        TrumpBettingPeriod5,
      ],
    },
    {
      name: "Joe Biden",
      data: [
        BidenBettingPeriod1,
        BidenBettingPeriod2,
        BidenBettingPeriod3,
        BidenBettingPeriod4,
        BidenBettingPeriod5,
      ],
    },
  ];

  const [options] = useState({
    chart: {
      width: 5,
      type: "line",
      dropShadow: {
        enabled: true,
        color: "#000",
        top: 18,
        left: 7,
        blur: 10,
        opacity: 0.2,
      },
      toolbar: {
        show: false,
      },
    },
    colors: ["#FF0000", "#0015BC"],
    dataLabels: {
      enabled: true,
    },
    stroke: {
      curve: "smooth",
    },
    grid: {
      borderColor: "#e7e7e7",
      row: {
        colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
        opacity: 0.5,
      },
    },
    markers: {
      size: 1,
    },
    xaxis: {
      categories: ["0 min", "1 min", "2 min", "3 min", "4 min"],
    },
    yaxis: {
      min: 0,
      max: 25,
    },
    legend: {
      show: true,
      position: "top",
      horizontalAlign: "left",
      floating: true,
      offsetY: -5,
    },
  });

  return !painted ? null : (
    <Wrapper>
      <ReactApexChart
        options={options}
        series={series}
        type="line"
        height={350}
      />
    </Wrapper>
  );
};

export default Apex;
