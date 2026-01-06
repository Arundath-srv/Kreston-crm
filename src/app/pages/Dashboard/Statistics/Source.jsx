/*eslint-disable*/
// Local Imports
import { Card } from "components/ui";
import { source } from "../data";
import CountCard from "./CountCard";
import ReactApexChart from "react-apexcharts";
import { useState } from "react";

// ----------------------------------------------------------------------

export function Source() {
  const colors = ["#4472C4", "#549D6A", "#ff9800"];

  const [state] = useState({
    series: [
      {
        data: [18000, 22000, 10000],
      },
    ],
    options: {
      chart: {
        height: 350,
        type: "bar",
        events: {
          click: function (chart, w, e) {},
        },
      },
      colors: colors,
      plotOptions: {
        bar: {
          columnWidth: "45%",
          distributed: true,
        },
      },
      dataLabels: {
        enabled: false,
      },
      legend: {
        show: false,
      },
      xaxis: {
        categories: ["Lost", "Order", "Pending"],
        labels: {
          style: {
            colors: colors,
            fontSize: "12px",
          },
        },
      },
    },
  });

  return (
    <Card className="px-4 pb-4 sm:px-5">
      <div className="flex h-14 items-center justify-between py-3">
        <h2 className="text-sm-plus dark:text-dark-100 truncate font-medium tracking-wide text-gray-800">
          Deal pipeline
        </h2>
      </div>{" "}
      <div id="chart">
        <ReactApexChart
          options={state.options}
          series={state.series}
          type="bar"
          height={350}
        />
      </div>
      <div className="flex flex-col space-y-4">
        {source.map((item, key) => (
          <CountCard
            Icon={item.icon}
            color={item.color}
            label={item.label}
            key={key}
            count={Math.floor(Math.random() * 100)}
          />
        ))}
      </div>
    </Card>
  );
}
