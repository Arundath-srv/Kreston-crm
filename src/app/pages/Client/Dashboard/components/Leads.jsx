/*eslint-disable*/
// import React, { useState, useMemo, memo } from "react";
// import { Card } from "components/ui";
// import { ArrowUpRightIcon, EyeIcon } from "lucide-react";
// import TwdTable from "components/TwdTable";


// import  Viewlead  from "./Viewlead";
// import Subleads from "./Subleads";
// import { useDisclosure } from "hooks";

// const Family = ({ profileData }) => {
//     let [refresh, setRefresh] = useState(0);
//       const [show, { close, open }] = useDisclosure(false);
//       const [modalData, setModalData] = useState({});
//  const sampleData = [
//   {
//     id: 1,
//     nextFollowup: "2025-09-15",
//     remarks: "Customer showed initial interest",
//     status: "New",
//     addedBy: "John",
//   },
//   {
//     id: 2,
//     nextFollowup: "2025-09-17",
//     remarks: "Revised pricing sent to customer",
//     status: "Price revised",
//     addedBy: "Michael",
//   },
//   {
//     id: 3,
//     nextFollowup: "2025-09-19",
//     remarks: "Waiting for customer's response",
//     status: "Follow up",
//     addedBy: "Priya",
//   },
//   {
//     id: 4,
//     nextFollowup: "2025-09-21",
//     remarks: "Customer confirmed the order",
//     status: "Order",
//     addedBy: "Amit",
//   },
//   {
//     id: 5,
//     nextFollowup: "2025-09-23",
//     remarks: "Quotation shared via email",
//     status: "Quotation",
//     addedBy: "Sneha",
//   },
//   {
//     id: 6,
//     nextFollowup: "2025-09-25",
//     remarks: "Awaiting internal price approval",
//     status: "Price approval",
//     addedBy: "Rahul",
//   },
// ];


//   const fallback = (value, defaultValue = "—") =>
//     value !== undefined && value !== null && value !== "" ? value : defaultValue;
//   const [selectedDeal, setSelectedDeal] = useState(null);
//   const mockFurnitureLeads = [
//     {
//       id: 1,
//       customerId: "LD00001",
//       customerName: "Arun Kumar",
//       product: "Sofa Set",
//       lastBooking: "2025-02-15",
//       status: "Available",
//       staff: "Anjali",
//       remarks: "Requested fabric change",
//     },
//     {
//       id: 2,
//       customerId: "LD00002",
//       customerName: "Meera Nair",
//       product: "Dining Table",
//       lastBooking: "2025-02-12",
//       status: "Pending",
//       staff: "Rahul",
//       remarks: "Waiting for quotation",
//     },
//     {
//       id: 3,
//       customerId: "LD00003",
//       customerName: "Suresh Babu",
//       product: "King Size Bed",
//       lastBooking: "2025-02-10",
//       status: "Processing",
//       staff: "Divya",
//       remarks: "Measurement taken",
//     },
//     {
//       id: 4,
//       customerId: "LD00004",
//       customerName: "Lakshmi Menon",
//       product: "Wardrobe",
//       lastBooking: "2025-01-28",
//       status: "Available",
//       staff: "Arjun",
//       remarks: "Delivery scheduled",
//     },
//     {
//       id: 5,
//       customerId: "LD00005",
//       customerName: "Ramesh Pillai",
//       product: "TV Unit",
//       lastBooking: "2025-01-20",
//       status: "Available",
//       staff: "Sneha",
//       remarks: "Custom design approved",
//     },
//   ];

//   const [filter, setFilter] = useState({});
//   const [page, setPage] = useState(1);
//   const [limit, setLimit] = useState(10);
//   const [count, setCount] = useState(mockFurnitureLeads.length);

//   const fetchTableList = (filterProps, pageCount, limitCount) => {
//     console.log("Fetching data with:", { filterProps, pageCount, limitCount });
//   };

//   const tableConfig = useMemo(() => {
//     const defaultRows = mockFurnitureLeads.map((lead, index) => ({
//       dateDisplay: lead.lastBooking,
//       time: `${9 + index}:00 AM`,
//       leadid: lead.customerId,

//       status: lead.status,
//       staff: lead.staff,
//       remarks: lead.remarks,
//       ...lead,
//     }));

//     return {
//       columns: [
//         { field: "dateDisplay", label: "Date", type: "date" },
//         { field: "time", label: "Time", type: "text" },
//         { field: "leadid", label: "Lead Id" },
//     {field:"staff",label:"Added By"},


//         {
//           label: "actions",
//           field: "extra_actions",
//           dropdown: false,
//           actions: [
//               {
//               label: "View",
//               icon: <EyeIcon className="size-4.5 stroke-1" />,
//               onClick: ({ doc }) => {
//                 open();
//                 setModalData({ id: doc?._id });
//               },
//             },
//       {
//                    label: "View",
//                    tooltip: true,
//                    tooltipContent: "Report Page",
//                    drawer: true,
//                    subRow: true,
//                    className:
//                      "p-1 bg-gray-150 text-gray-900 hover:bg-gray-200 focus:bg-gray-200 active:bg-gray-200/80 dark:bg-surface-2 dark:text-dark-50 dark:hover:bg-surface-1 dark:focus:bg-surface-1 dark:active:bg-surface-1/90",
//                    icon: <ArrowUpRightIcon className="size-4.5 stroke-1" />,
//                    children: (props) => {
//                      return <Subleads {...props} setRefresh={setRefresh} />;
//                    },
//                  },
//           ],
//         },
//       ],
//       rows: defaultRows,
//     };
//   }, []);

//   return (
//     <div>
//       <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-0">
//         Leads/FollowUps
//       </h2>

//       {/* Main Leads Table */}
//       <Card className="overflow-hidden border-0">
//         <TwdTable
//           data={tableConfig}
//           selectable={false}
//           count={count}
//           page={page}
//           limit={limit}
//           handleFilterChange={(filterProps, pageCount, limitCount) => {
//             fetchTableList(filterProps, pageCount, limitCount);
//             setFilter(filterProps);
//             setPage(pageCount);
//             setLimit(limitCount);
//           }}
//         />
//       </Card>

//           <Viewlead
//             {...modalData}
//         isOpen={show}
//         onClose={() => {
//           close();
//           setModalData({});
//         }}
//           />
//     </div>
//   );
// };

// export default memo(Family);
/* eslint-disable */
import React, { useState, useEffect, useMemo, memo, useCallback, useRef } from "react";
import { Card } from "components/ui";
import { ArrowUpRightIcon, EyeIcon } from "lucide-react";
import TwdTable from "components/TwdTable";
import { useParams } from "react-router";
import { get } from "utility";
import ViewItems from "./ViewItems";
import Subleads from "./Subleads";
import { useDisclosure } from "hooks";
import moment from "moment";
const MemoizedSubleads = memo(({ leadId, close, setRefresh }) => (
  <Subleads leadId={leadId} close={close} setRefresh={setRefresh} />
));
const Leads = () => {
  const { id } = useParams();
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refresh, setRefresh] = useState(0);
  const [page, setPage] = useState(1);
  const [filter, setFilter] = useState({ search: "" });
  const [limit, setLimit] = useState(10);
  const [totalCount, setTotalCount] = useState(0);
  const [showItems, { open: openItems, close: closeItems }] = useDisclosure(false);
  const [modalLeadId, setModalLeadId] = useState(null);
  const [modalLoading, setModalLoading] = useState(false);
  const abortControllerRef = useRef(null); 
  const fetchLeads = useCallback(async () => {
    if (!id) return;
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    const controller = new AbortController();
    abortControllerRef.current = controller;
    setLoading(true);
    try {
      const res = await get(
        `customer/lead/list/${id}?page=${page}&limit=${limit}&search=${encodeURIComponent(
          filter.search || ""
        )}`,
        { signal: controller.signal }
      );
      const list = Array.isArray(res?.data) ? res.data : [];
      const total = res?.count ?? list.length;
      setLeads(
        list.map((lead) => ({
          _id: lead._id,
          leadId: lead.uniqueId || "-",
          addedBy: lead.addedBy
            ? `${lead.addedBy.firstName || ""} ${lead.addedBy.lastName || ""}`.trim()
            : "-",
          createdDate: lead.date ? moment(lead.date).format("YYYY-MM-DD") : "-",
          createdTime: lead.time ? moment(lead.time, "HH:mm:ss").format("h:mm A") : "-",
        }))
      );
      setTotalCount(total);
    } catch (err) {
      if (err.name === "AbortError") {
        console.log("Leads fetch aborted");
      } else {
        console.error("Failed to fetch leads:", err);
        setLeads([]);
        setTotalCount(0);
      }
    } finally {
      setLoading(false);
    }
  }, [id, page, limit, filter.search]);
  useEffect(() => {
    fetchLeads();
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [fetchLeads]);
  const handleFilterChange = useCallback((newFilter, newPage, newLimit) => {
    setFilter(newFilter);
    setPage(newPage);
    setLimit(newLimit);
  }, []);
  const tableConfig = useMemo(() => {
    const handleViewItems = async (doc) => {
      if (!doc?._id) return;
      setModalLeadId(null);
      setModalLoading(true);
      const controller = new AbortController();
      abortControllerRef.current = controller;
      try {
        await get(`customer/lead/leaditems/${doc._id}`, { signal: controller.signal });
        setModalLeadId(doc._id);
        openItems();
      } catch (err) {
        if (err.name === "AbortError") {
          console.log("ViewItems fetch aborted");
        } else {
          console.error("Failed to fetch lead items:", err);
        }
      } finally {
        setModalLoading(false);
      }
    };
    return {
      columns: [
        { field: "createdDate", label: "Date", type: "date", enableSorting: true },
        { field: "createdTime", label: "Time", enableSorting: true },
        { field: "leadId", label: "Lead ID", enableSorting: true },
        { field: "addedBy", label: "Added By", enableSorting: true },
        {
          label: "Actions",
          field: "extra_actions",
          dropdown: false,
          actions: [
            {
              label: "View",
              icon: <EyeIcon className="size-4.5 stroke-1" />,
              onClick: ({ doc }) => handleViewItems(doc),
            },
            {
              label: "Report",
              tooltip: true,
              tooltipContent: "Report Page",
              drawer: true,
              subRow: true,
              className:
                "p-1 bg-gray-150 text-gray-900 hover:bg-gray-200 focus:bg-gray-200 active:bg-gray-200/80 dark:bg-surface-2 dark:text-dark-50 dark:hover:bg-surface-1 dark:focus:bg-surface-1 dark:active:bg-surface-1/90",
              icon: <ArrowUpRightIcon className="size-4.5 stroke-1" />,
              children: ({ doc, close }) => (
                <MemoizedSubleads leadId={doc?._id} close={close} setRefresh={setRefresh} />
              ),
            },
          ],
        },
      ],
      rows: leads,
    };
  }, [leads, openItems, setRefresh]);

  if (loading && leads.length === 0) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
        <span className="ml-2 text-gray-600 dark:text-gray-300">Loading leads...</span>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-0">
        Leads / FollowUps
      </h2>

      <Card className="overflow-hidden border-0">
        <TwdTable
          data={tableConfig}
          selectable={false}
          count={totalCount}
          page={page}
          pagination={false}
          limit={limit}
          handleFilterChange={handleFilterChange}
        />
      </Card>

      <ViewItems
        leadId={modalLeadId}
        isOpen={showItems}
        loading={modalLoading}
        onClose={() => {
          closeItems();
          setModalLeadId(null);
        }}
      />
    </div>
  );
};

export default memo(Leads);