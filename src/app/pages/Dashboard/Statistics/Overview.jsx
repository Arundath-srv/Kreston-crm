import {
  CalendarDaysIcon,
  CalendarIcon,
  ChartBarIcon,
  UsersIcon,
  ArrowUpIcon,
  CurrencyDollarIcon,
  PaperAirplaneIcon,
} from "@heroicons/react/24/outline";

import { ShoppingCartIcon, TruckIcon } from "lucide-react";
import { Avatar, Card } from "components/ui";
import { useEffect, useState } from "react";
import { get } from "utility";

const MOCK_DASHBOARD_DATA = {
  success: true,
  leads: {
    today: 5,
    week: 32,
    month: 128,
    total: 1240,
  },
  orders: {
    today: 12,
    deliveryToday: 7,
    dispatchToday: 5,
  },
  sales: {
    today: 45600,
  },
};


export function Overview() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetchDashboard();
  }, []);
  const fetchDashboard = async () => {
    try {
      const res = await get("leads/dashboarddetails");
      console.log("Dashboard API response 👉", res);

      if (res?.success) {
        setStats(res);
      } else {
        console.warn("API returned no data, using mock data");
        setStats(MOCK_DASHBOARD_DATA);
      }
    } catch (error) {
      console.error("Dashboard fetch failed, using mock data", error);
      setStats(MOCK_DASHBOARD_DATA);
    } finally {
      setLoading(false);
    }
  };
  if (loading) {
    return <div className="text-center p-5">Loading...</div>;
  }
  if (!stats) {
    return <div className="text-center p-5">No data available</div>;
  }
  const leadStats = [
    {
      label: "Today",
      value: stats?.leads?.today ?? 0,
      percentage: "—",
      color: "info",
      icon: CalendarDaysIcon,
    },
    {
      label: "This Week",
      value: stats?.leads?.week ?? 0,
      percentage: "—",
      color: "warning",
      icon: CalendarIcon,
    },
    {
      label: "This Month",
      value: stats?.leads?.month ?? 0,
      percentage: "—",
      color: "success",
      icon: ChartBarIcon,
    },
    {
      label: "Total Projects",
      value: stats?.leads?.total ?? 0,
      percentage: "—",
      color: "secondary",
      icon: UsersIcon,
    },
    {
      label: "Today Orders",
      value: stats?.orders?.today ?? 0,
      percentage: "—",
      color: "info",
      icon: ShoppingCartIcon,
    },
    {
      label: "Today Sales",
      value: `₹${(stats?.sales?.today ?? 0).toLocaleString("en-IN")}`,
      percentage: "—",
      color: "success",
      icon: CurrencyDollarIcon,
    },
    {
      label: "Today Delivery",
      value: stats?.orders?.deliveryToday ?? 0,
      percentage: "—",
      color: "warning",
      icon: TruckIcon,
    },
    {
      label: "Total Clients",
      value: stats?.orders?.dispatchToday ?? 0,
      percentage: "—",
      color: "primary",
      icon: PaperAirplaneIcon,
    },
    
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4 lg:gap-6">
      {leadStats.map((item, index) => {
        const Icon = item.icon;

        return (
          <Card key={index} className="flex justify-between p-5">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
                {item.label}
              </p>

              <p className="mt-0.5 text-2xl font-medium text-gray-900 dark:text-gray-100">
                {item.value}
              </p>

              <p className="mt-3 flex items-center gap-1 text-sm text-green-600 dark:text-green-400">
                <ArrowUpIcon className="size-4" />
                <span>{item.percentage}</span>
              </p>
            </div>

            <Avatar
              size={12}
              classNames={{
                display: "mask is-squircle rounded-none",
              }}
              initialVariant="soft"
              initialColor={item.color}
            >
              <Icon className="size-6" />
            </Avatar>
          </Card>
        );
      })}
    </div>
  );
}
