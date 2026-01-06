// /*eslint-disable*/
// import React, { useState, useMemo, memo } from "react";
// import { Card } from "components/ui";
// import { ArrowUpRightIcon } from "lucide-react";
// import TwdTable from "components/TwdTable";
// import SubRow from "./SubRow";

// const Booking = ({ profileData }) => {
//   let [refresh, setRefresh] = useState(0);





//   const fallback = (value, defaultValue = "—") =>
//     value !== undefined && value !== null && value !== "" ? value : defaultValue;
// const mockOrders = [
//   {
//     id: 1,
//     date: "2024-02-15",
//     time: "10:30 AM",
//     orderId: "OR00005",
//     customer: "John Smith",
//     product: "Wooden Dining Table",
//     category: "Dining",
//     amount: "57,200",
//     staff: "Rahul (Sales Rep)",
//     status: "Delivered",
//     sku: "PR00001",
//     qty: 1,
//     mrp: 60000,
//     price: 57200,
//     total: 57200,
//   },
//   {
//     id: 2,
//     date: "2024-02-20",
//     time: "03:15 PM",
//     orderId: "OR00006",
//     customer: "Sarah Wilson",
//     product: "Leather Sofa Set",
//     category: "Living Room",
//     amount: 45000.0,
//     staff: "Anjali (Sales Rep)",
//     status: "Pending",
//     sku: "PR00002",
//     qty: 1,
//     mrp: 48000,
//     price: 45000,
//     total: 45000,
//   },
//   {
//     id: 3,
//     date: "2024-02-25",
//     time: "11:00 AM",
//     orderId: "OR00007",
//     customer: "Mike Davis",
//     product: "King Size Bed",
//     category: "Bedroom",
//     amount: 28000.0,
//     staff: "Kiran (Sales Rep)",
//     status: "Processing",
//     sku: "PR00003",
//     qty: 1,
//     mrp: 30000,
//     price: 28000,
//     total: 28000,
//   },
//   {
//     id: 4,
//     date: "2024-03-01",
//     time: "02:00 PM",
//     orderId: "OR00008",
//     customer: "Emma Thompson",
//     product: "Office Chair",
//     category: "Office",
//     amount: 7500.0,
//     staff: "Sneha (Sales Rep)",
//     status: "Delivered",
//     sku: "PR00004",
//     qty: 1,
//     mrp: 8000,
//     price: 7500,
//     total: 7500,
//   },
//   {
//     id: 5,
//     date: "2024-03-05",
//     time: "09:30 AM",
//     orderId: "OR00009",
//     customer: "Robert Lee",
//     product: "Bookshelf",
//     category: "Study",
//     amount: 5500.0,
//     staff: "Arjun (Sales Rep)",
//     status: "Cancelled",
//     sku: "PR00005",
//     qty: 1,
//     mrp: 6000,
//     price: 5500,
//     total: 5500,
//   },
// ];

//   const [filter, setFilter] = useState({});
//   const [page, setPage] = useState(1);
//   const [limit, setLimit] = useState(10);
//   const [count, setCount] = useState(mockOrders.length);

//   const fetchTableList = (filterProps, pageCount, limitCount) => {
//     console.log("Fetching data with:", { filterProps, pageCount, limitCount });
//   };

//   const tableConfig = useMemo(() => {
//     return {
//       columns: [
//         { field: "sku", label: "SKU", type: "text", enableSorting: true },
//         { field: "product", label: "Product", type: "text", enableSorting: true },
//         {
//           field: "qty",
//           label: " Qty",
//           enableSorting: true,
//         },
//         {
//           field: "mrp",
//           label: "MRP",
//           enableSorting: true,
//         },
//         { field: "price", label: "Price", enableSorting: true },
//           { field: "total", label: "Total", enableSorting: true },

//       ],
//       rows: mockOrders.map((row) => ({
//         ...row,
//         date: fallback(row.date, "2024-01-01"),
//         time: fallback(row.time, "00:00"),
//         customerId: fallback(row.customerId, "N/A"),
//         amount: fallback(row.amount, 0),
//         staff: fallback(row.staff, "Not Assigned"),
//         status: fallback(row.status, "Pending"),
//       })),
//     };
//   }, [mockOrders]);

//   return (
//     <div>


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
//     </div>
//   );
// };

// export default memo(Booking);
/* eslint-disable */
/*eslint-disable*/
/*eslint-disable*/
import TwdTable from "components/TwdTable";
import { useMemo, useEffect, useState } from "react";
import { get } from "utility";

const ViewItems = ({ leadId, isOpen, onClose, loading }) => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    if (!leadId) return;

    const fetchItems = async () => {
      try {
        const res = await get(`customer/lead/leaditems/${leadId}`);
        setItems(Array.isArray(res?.data) ? res.data : []);
      } catch (err) {
        console.error("Failed to fetch lead items:", err);
        setItems([]);
      }
    };
    fetchItems();
  }, [leadId]);

  const tableConfig = useMemo(
    () => ({
      columns: [
        { label: "SKU", field: "sku" },
        { label: "Product", field: "product" },
        { label: "Qty", field: "qty" },
        { label: "MRP", field: "mrp" },
        { label: "Price", field: "price" },
        { label: "Total", field: "total" },
      ],
      rows: items.map((item) => ({
        sku: item.productId?.uniqueId  || "-",
        product: item.productId?.name || item.name || "-",
        qty: item.quantity || 0,
        mrp: item.currentMrp || item.initialMrp || 0,
        price: item.currentPrice || item.initialPrice || 0,
        total: item.total || item.initialTotal || 0,
      })),
    }),
    [items]
  );

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg w-11/12 max-w-3xl relative">
        <button
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
          onClick={onClose}
        >
          ✕
        </button>
        <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">
          Lead Items
        </h2>

        {loading ? (
          <div className="flex justify-center items-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
            <span className="ml-2 text-gray-600 dark:text-gray-300">
              Loading items...
            </span>
          </div>
        ) : (
          <TwdTable
            facedFilter={null}
            data={tableConfig}
            count={items.length}
            settings={false}
            pagination={false}
          />
        )}
      </div>
    </div>
  );
};

export default ViewItems;