/*eslint-disable*/
import React, { useState, useMemo, memo } from "react";
import { Card } from "components/ui";
import { EyeIcon, MessageCircleIcon, CheckCircleIcon } from "lucide-react";
import TwdTable from "components/TwdTable";

const Tickets = ({ tickets }) => {
  const mockTickets = [
    {
      id: 1,
      date: "2024-02-15",
      ticketId: "TKT001",
      subject: "Issue with Blood Test Report",
      category: "Report Issues",
      priority: { label: "High", color: "error" },
      status: { label: "Open", color: "info" },
      assignedTo: "Support Team A",
      lastUpdated: "2024-02-16",
    },
    {
      id: 2,
      date: "2024-02-10",
      ticketId: "TKT002",
      subject: "Booking Cancellation Request",
      category: "Booking",
      priority: { label: "Medium", color: "warning" },
      status: { label: "In Progress", color: "warning" },
      assignedTo: "Support Team B",
      lastUpdated: "2024-02-12",
    },
    {
      id: 3,
      date: "2024-02-05",
      ticketId: "TKT003",
      subject: "Payment Gateway Error",
      category: "Payment",
      priority: { label: "High", color: "error" },
      status: { label: "Resolved", color: "success" },
      assignedTo: "Tech Support",
      lastUpdated: "2024-02-06",
    },
    {
      id: 4,
      date: "2024-01-28",
      ticketId: "TKT004",
      subject: "Account Access Issues",
      category: "Account",
      priority: { label: "Medium", color: "warning" },
      status: { label: "Resolved", color: "success" },
      assignedTo: "Support Team A",
      lastUpdated: "2024-01-30",
    },
    {
      id: 5,
      date: "2024-01-25",
      ticketId: "TKT005",
      subject: "Prescription Upload Problem",
      category: "Technical",
      priority: { label: "Low", color: "info" },
      status: { label: "Open", color: "info" },
      assignedTo: "Tech Support",
      lastUpdated: "2024-01-26",
    },
    {
      id: 6,
      date: "2024-01-20",
      ticketId: "TKT006",
      subject: "Family Member Addition Request",
      category: "Account",
      priority: { label: "Low", color: "info" },
      status: { label: "Resolved", color: "success" },
      assignedTo: "Support Team B",
      lastUpdated: "2024-01-22",
    },
    {
      id: 7,
      date: "2024-01-15",
      ticketId: "TKT007",
      subject: "Appointment Rescheduling Issue",
      category: "Booking",
      priority: { label: "Medium", color: "warning" },
      status: { label: "In Progress", color: "warning" },
      assignedTo: "Support Team A",
      lastUpdated: "2024-01-18",
    },
  ];

  const [filter, setFilter] = useState({});
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [count, setCount] = useState(mockTickets.length);

  const fetchTableList = (filterProps, pageCount, limitCount) => {
    console.log("Fetching data with:", { filterProps, pageCount, limitCount });
  };

  const handleView = (ticket) => {
    console.log("Viewing ticket:", ticket);
  };

  const handleReply = (ticket) => {
    console.log("Replying to ticket:", ticket);
  };

  const handleClose = (ticket) => {
    console.log("Closing ticket:", ticket);
  };

  const tableConfig = useMemo(() => {
    return {
      columns: [
        {
          field: "date",
          label: "Date Created",
          type: "date",
          enableSorting: true,
          enableHiding: true,
        },
        {
          field: "ticketId",
          label: "Ticket ID",
          enableSorting: true,
          enableHiding: true,
        },
        {
          field: "subject",
          label: "Subject",
          enableSorting: true,
          enableHiding: true,
        },
        {
          field: "category",
          label: "Category",
          enableSorting: true,
          enableHiding: true,
        },
        {
          field: "priority",
          label: "Priority",
          type: "badge",
          enableSorting: true,
          enableHiding: true,
          variant: "filled"
        },
        {
          field: "status",
          label: "Status",
          type: "badge",
          enableSorting: true,
          enableHiding: true,
          variant: "filled"
        },
        {
          field: "assignedTo",
          label: "Added By",
          enableSorting: true,
          enableHiding: true,
        },
        {
          field: "lastUpdated",
          label: "Last Updated",
          type: "date",
          enableSorting: true,
          enableHiding: true,
        },
        {
          field: "extra_actions",
          label: "Actions",
          dropdown: false,
          actions: [
            {
              label: "View",
              icon: (
                <EyeIcon className="size-4.5 cursor-pointer transition-transform duration-200 hover:scale-125" />
              ),
              onClick: handleView,
            },
            {
              label: "Reply",
              icon: (
                <MessageCircleIcon className="size-4.5 cursor-pointer transition-transform duration-200 hover:scale-125" />
              ),
              onClick: handleReply,
              condition: (row) =>
                row.status === "Open" || row.status === "In Progress",
            },
            {
              label: "Close",
              icon: (
                <CheckCircleIcon className="size-4.5 cursor-pointer transition-transform duration-200 hover:scale-125" />
              ),
              onClick: handleClose,
              condition: (row) => row.status === "Resolved",
            },
          ],
        },
      ],
      rows: mockTickets,
    };
  }, [mockTickets]);

  return (
    <div>
      <h2 className="mb-6 text-xl font-semibold text-gray-800 dark:text-gray-200">
        My Tickets
      </h2>

      {/* Summary Cards */}
      <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="p-4 transition-shadow hover:shadow-lg">
          <div className="text-center">
            <p className="mb-1 text-sm text-gray-600 dark:text-gray-400">
              Total Tickets
            </p>
            <p className="text-2xl font-bold text-blue-600">
              {mockTickets.length}
            </p>
          </div>
        </Card>
        <Card className="p-4 transition-shadow hover:shadow-lg">
          <div className="text-center">
            <p className="mb-1 text-sm text-gray-600 dark:text-gray-400">
              Open Tickets
            </p>
            <p className="text-2xl font-bold text-red-600">
              {mockTickets.filter((t) => t.status === "Open").length}
            </p>
          </div>
        </Card>
        <Card className="p-4 transition-shadow hover:shadow-lg">
          <div className="text-center">
            <p className="mb-1 text-sm text-gray-600 dark:text-gray-400">
              In Progress
            </p>
            <p className="text-2xl font-bold text-yellow-600">
              {mockTickets.filter((t) => t.status === "In Progress").length}
            </p>
          </div>
        </Card>
        <Card className="p-4 transition-shadow hover:shadow-lg">
          <div className="text-center">
            <p className="mb-1 text-sm text-gray-600 dark:text-gray-400">
              Resolved
            </p>
            <p className="text-2xl font-bold text-green-600">
              {
                mockTickets.filter(
                  (t) => t.status === "Resolved" || t.status === "Closed",
                ).length
              }
            </p>
          </div>
        </Card>
      </div>

      {/* Additional Stats Cards */}
      <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-3">
        <Card className="p-4 transition-shadow hover:shadow-lg">
          <div className="text-center">
            <p className="mb-1 text-sm text-gray-600 dark:text-gray-400">
              High Priority
            </p>
            <p className="text-2xl font-bold text-red-600">
              {mockTickets.filter((t) => t.priority === "High").length}
            </p>
          </div>
        </Card>
        <Card className="p-4 transition-shadow hover:shadow-lg">
          <div className="text-center">
            <p className="mb-1 text-sm text-gray-600 dark:text-gray-400">
              Average Resolution Time
            </p>
            <p className="text-2xl font-bold text-blue-600">2.5 Days</p>
          </div>
        </Card>
        <Card className="p-4 transition-shadow hover:shadow-lg">
          <div className="text-center">
            <p className="mb-1 text-sm text-gray-600 dark:text-gray-400">
              This Month
            </p>
            <p className="text-2xl font-bold text-purple-600">
              {mockTickets.filter((t) => t.date.startsWith("2024-02")).length}
            </p>
          </div>
        </Card>
      </div>

      {/* Tickets Table */}
      <Card className="overflow-hidden border-0">
        <TwdTable
          data={tableConfig}
          selectable={false}
          count={count}
          page={page}
          limit={limit}
          handleFilterChange={(filterProps, pageCount, limitCount) => {
            fetchTableList(filterProps, pageCount, limitCount);
            setFilter(filterProps);
            setPage(pageCount);
            setLimit(limitCount);
          }}
        />
      </Card>
    </div>
  );
};

export default memo(Tickets);