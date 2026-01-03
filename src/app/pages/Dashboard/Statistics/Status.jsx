import { Card } from "components/ui";
import { followupStatus } from "../data";
import CountCard from "./CountCard";
import { useEffect, useState } from "react";
import { get } from "utility";

export function Status() {
  const [statusCounts, setStatusCounts] = useState({});

  useEffect(() => {
    get("dashboard/summary").then((res) => {
      setStatusCounts(res?.project?.statusSummary || {});
    });
  }, []);

  return (
    <Card className="px-4 pb-4 sm:px-5">
      <div className="flex h-14 items-center justify-between py-3">
        <h2 className="text-sm-plus truncate font-medium tracking-wide text-gray-800">
          Project Status
        </h2>
      </div>

      <div className="flex flex-col space-y-4">
        {followupStatus.map((item) => (
          <CountCard
            key={item.value}
            color={item.color}
            label={item.label}
            count={statusCounts[item.value] || 0}
          />
        ))}
      </div>
    </Card>
  );
}
