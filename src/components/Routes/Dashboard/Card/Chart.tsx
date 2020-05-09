import React, { useState } from "react";
import styled from "styled-components";
import ReactApexChart from "react-apexcharts";

const Wrapper = styled.div`
  margin: 3rem;
`;

const Apex = () => {
  const [series] = useState([
    {
      name: "London England",
      data: [28, 29, 33, 36],
    },
    {
      name: "Dublin, Ireland",
      data: [12, 11, 14, 18],
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
    colors: ["#77B6EA", "#545454"],
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
