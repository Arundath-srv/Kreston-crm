// Import Dependencies
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
} from "@headlessui/react";
import { EllipsisHorizontalIcon } from "@heroicons/react/20/solid";
import clsx from "clsx";
import { Fragment, useEffect, useState } from "react";
import Chart from "react-apexcharts";

import { Button, Card } from "components/ui";
import { get } from "utility";

// ----------------------------------------------------------------------

export function History() {
  const [series, setSeries] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchChartData();
  }, []);

  const fetchChartData = async () => {
    try {
      const res = await get("leads/dashboarddetails");
      console.log("Chart API 👉", res);

      if (res?.success && res?.leads?.lastSixMonths) {
        const months = res.leads.lastSixMonths.map((i) => i.month);
        const leadCounts = res.leads.lastSixMonths.map((i) => i.count);

        setCategories(months);

        // Only LEADS graph (like your screenshot)
        setSeries([
          {
            name: "New",
            data: leadCounts,
          },
        ]);
      }
    } catch (error) {
      console.error("Chart fetch failed", error);
    } finally {
      setLoading(false);
    }
  };

  const chartConfig = {
    colors: ["#FF9800"],
    chart: {
      parentHeightOffset: 0,
      toolbar: { show: false },
    },
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 1,
        inverseColors: false,
        opacityFrom: 0.35,
        opacityTo: 0.05,
        stops: [20, 100, 100, 100],
      },
    },
    dataLabels: { enabled: false },
    stroke: {
      width: 2,
      curve: "smooth",
    },
    legend: { show: false },
    xaxis: { categories },
    grid: {
      padding: {
        left: 10,
        right: 0,
        top: -10,
        bottom: 0,
      },
    },
  };

  return (
    <Card>
      <div className="flex items-center justify-between px-4 pt-3 sm:px-5">
        <h2 className="text-sm-plus truncate font-medium tracking-wide text-gray-800 dark:text-dark-100">
          Leads
        </h2>
        <ActionMenu />
      </div>

      <div className="px-2">
        {loading ? (
          <div className="flex h-[290px] items-center justify-center text-sm text-gray-500">
            Loading chart...
          </div>
        ) : (
          <Chart
            type="area"
            height={290}
            options={chartConfig}
            series={series}
          />
        )}
      </div>
    </Card>
  );
}

// ----------------------------------------------------------------------

function ActionMenu() {
  return (
    <Menu
      as="div"
      className="relative inline-block text-left ltr:-mr-1.5 rtl:-ml-1.5"
    >
      <MenuButton
        as={Button}
        variant="flat"
        isIcon
        className="size-8 rounded-full"
      >
        <EllipsisHorizontalIcon className="size-5" />
      </MenuButton>

      <Transition
        as={Fragment}
        enter="transition ease-out"
        enterFrom="opacity-0 translate-y-2"
        enterTo="opacity-100 translate-y-0"
        leave="transition ease-in"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 translate-y-2"
      >
        <MenuItems className="absolute z-100 mt-1.5 min-w-[10rem] rounded-lg border border-gray-300 bg-white py-1 shadow-lg dark:border-dark-500 dark:bg-dark-700 ltr:right-0 rtl:left-0">
          {["Action", "Another action", "Other action"].map((item) => (
            <MenuItem key={item}>
              {({ focus }) => (
                <button
                  className={clsx(
                    "flex h-9 w-full items-center px-3 tracking-wide transition-colors",
                    focus &&
                      "bg-gray-100 text-gray-800 dark:bg-dark-600 dark:text-dark-100"
                  )}
                >
                  {item}
                </button>
              )}
            </MenuItem>
          ))}
        </MenuItems>
      </Transition>
    </Menu>
  );
}
