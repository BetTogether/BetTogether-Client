import React, { useState } from "react";
import styled from "styled-components";
import ReactApexChart from "react-apexcharts";

const Wrapper = styled.div`
  margin: 3rem;
`;

interface outcome {
  name: string;
  percentage: number;
}

interface IApex {
  outcomes: outcome[];
}

const Apex = ({ outcomes }: IApex) => {
  const [series] = useState([
    {
      name: "Donald Trump",
      data: [68, 45, 61, 36],
    },
    {
      name: "Joe Biden",
      data: [32, 55, 39, 80],
    },
  ]);

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
      categories: ["Jan", "Feb", "Mar", "Apr"],
    },
    yaxis: {
      min: 0,
      max: 100,
    },
    legend: {
      show: true,
      position: "top",
      horizontalAlign: "left",
      floating: true,
      offsetY: -5,
    },
  });

  return (
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
