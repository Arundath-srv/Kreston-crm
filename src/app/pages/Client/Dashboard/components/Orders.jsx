
// import React, { memo, useEffect, useState } from 'react';
// import { useForm } from "react-hook-form";
// import { Card } from "components/ui";
// import { useParams } from 'react-router';
// import { get } from 'utility';

// const OrderHistory = () => {
//   const { id } = useParams();
//   const [profileData, setProfileData] = useState(null);
//   const [loading, setLoading] = useState(false);

//   const { reset } = useForm({ defaultValues: {} });

//   useEffect(() => {
//     if (!id) return;

//     const fetchProfile = async () => {
//       try {
//         setLoading(true);

//         const res = await get(`/customer/orderlist?customer=${id}`);
//         console.log("API response:", res);

//         const orders = res?.data?.data || []; // <- notice .data.data

//         if (orders.length === 0) {
//           setProfileData({});
//           reset({});
//           return;
//         }

//         const customer = orders[0].customer || {};

//         const profileDataMapped = {
//           firstName: customer.name?.split(" ")[0] || "N/A",
//           lastName: customer.name?.split(" ")[1] || "N/A",
//           mobile: customer.mobile || "N/A",
//           uniqueId: customer.uniqueId || "N/A",
//           totalOrders: customer.totalOrders || orders.length,
//           orders: orders,
//         };

//         setProfileData(profileDataMapped);
//         reset(profileDataMapped);
//       } catch (err) {
//         console.error("Failed to fetch customer orders:", err);
//         setProfileData({});
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProfile();
//   }, [id, reset]);

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center py-8">
//         <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
//         <span className="ml-2 text-gray-600">Loading profile...</span>
//       </div>
//     );
//   }

//   if (!profileData || !profileData.uniqueId) {
//     return (
//       <Card className="p-6 text-center">
//         <h3 className="text-lg font-medium text-red-600">Customer Not Found</h3>
//         <p className="text-gray-500 mt-2">No profile or order data found for this customer.</p>
//       </Card>
//     );
//   }

//   return (
//     <div>
//       <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
//         Profile Information
//       </h2>

//       <div className="mb-4 p-3 bg-gray-50 dark:bg-gray-800 rounded-md text-sm">
//         <span className="font-medium text-gray-700 dark:text-gray-300">Customer ID:</span>{" "}
//         <span className="font-mono">{profileData.uniqueId}</span>
//       </div>

//       <Card className="gap-4 p-4 sm:px-5 mb-6">
//         <div className="grid grid-cols-4 max-lg:grid-cols-2 max-sm:grid-cols-1 sm:gap-5 lg:gap-6">
//           <div><strong>First Name:</strong> {profileData.firstName}</div>
//           <div><strong>Last Name:</strong> {profileData.lastName}</div>
//           <div><strong>Mobile:</strong> {profileData.mobile}</div>
//           <div><strong>Total Orders:</strong> {profileData.totalOrders}</div>
//         </div>
//       </Card>

//       <h3 className="text-lg font-semibold mt-6 mb-2 text-gray-800 dark:text-gray-200">
//         Order History
//       </h3>

//       {profileData.orders.length > 0 ? (
//         <Card className="overflow-x-auto p-4">
//           <table className="min-w-full border border-gray-200 dark:border-gray-700">
//             <thead className="bg-gray-100 dark:bg-gray-800">
//               <tr>
//                 <th className="px-4 py-2 border">Order ID</th>
//                 <th className="px-4 py-2 border">Delivery Date</th>
//                 <th className="px-4 py-2 border">Total Amount</th>
//                 <th className="px-4 py-2 border">Pending Amount</th>
//                 <th className="px-4 py-2 border">Driver</th>
//                 <th className="px-4 py-2 border">Vehicle</th>
//               </tr>
//             </thead>
//             <tbody>
//               {profileData.orders.map((order) => (
//                 <tr key={order._id} className="text-sm border-b border-gray-200 dark:border-gray-700">
//                   <td className="px-4 py-2 border">{order.uniqueId}</td>
//                   <td className="px-4 py-2 border">{order.deliveryDate}</td>
//                   <td className="px-4 py-2 border">{order.totalAmount}</td>
//                   <td className="px-4 py-2 border">{order.pendingAmount}</td>
//                   <td className="px-4 py-2 border">{order.driver?.name || "-"}</td>
//                   <td className="px-4 py-2 border">{order.vehicle?.number || "-"}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </Card>
//       ) : (
//         <p className="mt-2 text-gray-500">No orders found for this customer.</p>
//       )}
//     </div>
//   );
// };

// export default memo(OrderHistory);
/*eslint-disable*/
/*eslint-disable*/
/*eslint-disable*/
// import React, { useState, useEffect, useMemo, memo } from "react";
// import { Card } from "components/ui";
// import { ArrowUpRightIcon, Boxes, HomeIcon, Hourglass, ShoppingBag } from "lucide-react";
// import TwdTable from "components/TwdTable";
// import SubRow from "./SubRow";
// import { useParams } from "react-router";
// import { get } from "utility";

// const Booking = () => {
//   const { id } = useParams(); 
//   console.log("Customer ID from URL:", id);

//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [refresh, setRefresh] = useState(0);
//   const [page, setPage] = useState(1);
//   const [limit, setLimit] = useState(10);

//   const fallback = (value, defaultValue = "—") =>
//     value !== undefined && value !== null && value !== "" ? value : defaultValue;

//   const fetchOrders = async () => {
//     if (!id) return;
//     try {
//       setLoading(true);
//       const res = await get(`/customer/orderlist?customer=${id}`);
//       console.log("Fetching orders for customer:", id, "Response:", res);

//       if (res?.data && Array.isArray(res.data)) {
//         setOrders(res.data);
//       } else {
//         setOrders([]);
//       }
//     } catch (err) {
//       console.error("Failed to fetch orders:", err);
//       setOrders([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchOrders();
//   }, [id, refresh]);

//   const fetchTableList = (filterProps, pageCount, limitCount) => {
//     console.log("Fetching data with:", { filterProps, pageCount, limitCount });
//     setPage(pageCount);
//     setLimit(limitCount);
//   };

//   const tableConfig = useMemo(() => {
//     return {
//       columns: [
//         { field: "date", label: "Date", type: "date", enableSorting: true },
//         { field: "orderId", label: "Order ID", enableSorting: true },
//         {
//           field: "itemsCount",
//           label: "Items",
//           icon: <Boxes className="h-4 w-4" />,
//         },
//         {
//           field: "productsCount",
//           label: "Pending",
//            icon: <Hourglass className="h-4 w-4" />,
//         },
//         {
//           field: "pendingQty",
//           label: "Products",

//            icon: <ShoppingBag className="h-4 w-4" />,
//         },
//         {
//           field: "delivered",
//           label: "Delivered",
//           icon: <HomeIcon className="h-4 w-4" />,
//         },
//         {
//           field: "totalAmount",
//           label: "Total Amount (₹)",
//           enableSorting: true,
//         },
//         {
//           field: "pendingAmount",
//           label: "Due Amount (₹)",

//         },
//         {
//           label: "actions",
//           field: "extra_actions",
//           dropdown: false,
//           actions: [
//             {
//               label: "View",
//               tooltip: true,
//               tooltipContent: "Report Page",
//               drawer: true,
//               subRow: true,
//               className:
//                 "p-1 bg-gray-150 text-gray-900 hover:bg-gray-200 focus:bg-gray-200 active:bg-gray-200/80 dark:bg-surface-2 dark:text-dark-50 dark:hover:bg-surface-1 dark:focus:bg-surface-1 dark:active:bg-surface-1/90",
//               icon: <ArrowUpRightIcon className="size-4.5 stroke-1" />,
//               children: (props) => <SubRow {...props} setRefresh={setRefresh} />,
//             },
//           ],
//         },
//       ],
//       rows: orders.map((order) => {
//         // Derive values from `items` array
//         const items = Array.isArray(order.items) ? order.items : [];
//         const totalItemsCount = items.length;
//         const totalProductsCount = items.length; // if you want distinct products, use Set on product IDs
//         const totalPendingQty = items.reduce((sum, item) => sum + (item.pending || 0), 0);
//         const totalDeliveredQty = items.reduce((sum, item) => sum + (item.delivery || 0), 0);

//         return {
//           date: fallback(order.date, "N/A"),
//           deliveryDate: fallback(order.deliveryDate, "N/A"),
//           orderId: fallback(order.uniqueId, "N/A"),
//           itemsCount: fallback(totalItemsCount, 0),
//           productsCount: fallback(totalProductsCount, 0),
//           pendingQty: fallback(totalPendingQty, 0),
//           delivered: fallback(totalDeliveredQty, 0),
//           totalAmount: fallback(order.totalAmount, 0),
//           pendingAmount: fallback(order.pendingAmount, 0),
//           staff: fallback(order.driver?.name || "-", "Not Assigned"),
//         };
//       }),
//     };
//   }, [orders]);

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center py-8">
//         <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
//         <span className="ml-2 text-gray-600">Loading orders...</span>
//       </div>
//     );
//   }

//   return (
//     <div>
//       <h2 className="mb-0 text-xl font-semibold text-gray-800 dark:text-gray-200">Orders</h2>
//       <Card className="overflow-hidden border-0">
//         <TwdTable
//           data={tableConfig}
//           selectable={false}
//           count={orders.length}
//           page={page}
//           limit={limit}
//           handleFilterChange={fetchTableList}
//         />
//       </Card>
//     </div>
//   );
// };

// export default memo(Booking);
import React, { useState, useEffect, useMemo, memo, useCallback, useRef } from "react";
import { Card } from "components/ui";
import {
  ArrowUpRightIcon,
  Boxes,
  HomeIcon,
  Hourglass,
  ShoppingBag,
} from "lucide-react";
import TwdTable from "components/TwdTable";
import SubRow from "./SubRow";
import { useParams } from "react-router";
import { get } from "utility";
const MemoizedSubRow = memo(({ doc, close, onRefresh }) => (
  <SubRow doc={doc} close={close} onRefresh={onRefresh} />
));
const Booking = () => {
  const { id } = useParams();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [totalCount, setTotalCount] = useState(0);
  const [filter, setFilter] = useState({ search: "" });
  const abortControllerRef = useRef(null);
  const fetchOrders = useCallback(async () => {
    if (!id) return;
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    const controller = new AbortController();
    abortControllerRef.current = controller;
    setLoading(true);
    try {
      const res = await get(
        `/customer/orderlist?id=${id}&page=${page}&limit=${limit}&search=${encodeURIComponent(
          filter.search || ""
        )}`,
        { signal: controller.signal }
      );
      const data = Array.isArray(res?.data) ? res.data : [];
      const total = res?.count ?? data.length;
      const mapped = data.map((order) => {
        const items = Array.isArray(order.items) ? order.items : [];
        return {
          ...order,
          customerId: order.customer?.uniqueId || "-",
          name: order.customer?.name || "-",
          mobile: order.customer?.mobile || "-",
          itemsCount: items.length,
          productsCount: new Set(items.map((i) => i.product)).size,
          pendingQty: items.reduce((sum, i) => sum + (i.pending || 0), 0),
          delivered: items.reduce((sum, i) => sum + (i.delivery || 0), 0),
          totalAmount: items.reduce((sum, i) => sum + (i.amount || 0), 0),
          pendingAmount: items.reduce((sum, i) => sum + (i.rate || 0), 0),
          staff: order.driver?.name || "-",
        };
      });
      setOrders(mapped);
      setTotalCount(total);
    } catch (err) {
      if (err.name === "AbortError") {
        console.log("Orders fetch aborted");
      } else {
        console.error("Failed to fetch orders:", err);
        setOrders([]);
        setTotalCount(0);
      }
    } finally {
      setLoading(false);
    }
  }, [id, page, limit, filter.search]);
  useEffect(() => {
    fetchOrders();
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [fetchOrders]);
  const handleFilterChange = useCallback((newFilter, newPage) => {
    setFilter(newFilter);
    setPage(newPage);
  }, []);
  const tableConfig = useMemo(
    () => ({
      columns: [
        { field: "date", label: "Date", type: "date", enableSorting: true },
        { field: "uniqueId", label: "Order ID" },
        {
          field: "itemsCount",
          label: "Items",
          enableSorting: true,
          icon: <Boxes className="h-4 w-4" />,
        },
        {
          field: "productsCount",
          label: "Products",
          enableSorting: true,
          icon: <ShoppingBag className="h-4 w-4" />,
        },
        {
          field: "pendingQty",
          label: "Pending Qty",
          enableSorting: true,
          icon: <Hourglass className="h-4 w-4" />,
        },
        {
          field: "delivered",
          label: "Delivered",
          enableSorting: true,
          icon: <HomeIcon className="h-4 w-4" />,
        },
        { field: "totalAmount", label: "Total Amount (₹)", enableSorting: true },
        { field: "pendingAmount", label: "Due Amount (₹)", enableSorting: true },
        {
          label: "Actions",
          field: "extra_actions",
          dropdown: false,
          actions: [
            {
              label: "View",
              tooltip: true,
              tooltipContent: "Report Page",
              drawer: true,
              subRow: true,
              className:
                "p-1 bg-gray-150 text-gray-900 hover:bg-gray-200 focus:bg-gray-200 active:bg-gray-200/80 dark:bg-surface-2 dark:text-dark-50 dark:hover:bg-surface-1 dark:focus:bg-surface-1 dark:active:bg-surface-1/90",
              icon: <ArrowUpRightIcon className="size-4.5 stroke-1" />,
              children: ({ doc, close }) => (
                <MemoizedSubRow doc={doc} close={close} onRefresh={fetchOrders} />
              ),
            },
          ],
        },
      ],
      rows: orders,
    }),
    [orders, fetchOrders]
  );
  if (loading && orders.length === 0) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
        <span className="ml-2 text-gray-600">Loading orders...</span>
      </div>
    );
  }
  return (
    <div>
      <h2 className="mb-0 text-xl font-semibold text-gray-800 dark:text-gray-200">
        Orders
      </h2>
      <Card className="overflow-hidden border-0">
        <TwdTable
          data={tableConfig}
          selectable={false}
          count={totalCount}
          pagination={false}
          page={page}
          limit={limit}
          handleFilterChange={handleFilterChange}
        />
      </Card>
    </div>
  );
};

export default memo(Booking);

// import {
//   Boxes,
//   Hourglass,
//   CheckSquare,
//   Package,
//   Truck,
//   Home,
//   ClipboardCheck,
// } from "lucide-react";
// import { EyeIcon } from "@heroicons/react/24/outline";

// const tableConfig = useMemo(() => {
//   return {
//     columns: [
//       // Basic Info
//       { field: "date", label: "Order Date", type: "date", sortable: true },
//       { field: "uniqueId", label: "Order ID", enableHiding: true },
//       { field: "name", label: "Customer", enableHiding: true },
//       { field: "mobile", label: "Mobile", enableHiding: true },
//       { field: "amount", label: "Collectable", type: "amount" },
//       { field: "salesPerson", label: "Sales Person", enableHiding: true },
//       { field: "location", label: "Location" },

//       // Order Status Columns
//       {
//         field: "items",
//         label: "Items",
//         enableHiding: true,
//         icon: <Boxes className="h-4 w-4" />,
//       },
//       {
//         field: "pending",
//         label: "Pending",
//         enableHiding: true,
//         icon: <Hourglass className="h-4 w-4" />,
//       },
//       {
//         field: "readyToGo",
//         label: "QA Checked",
//         enableHiding: true,
//         icon: <CheckSquare className="h-4 w-4" />,
//       },
//       {
//         field: "readyToDispatch",
//         label: "Ready To Dispatch",
//         enableHiding: true,
//         defaultHiding: true,
//         icon: <Package className="h-4 w-4" />,
//       },
//       {
//         field: "dispatch",
//         label: "Transit",
//         enableHiding: true,
//         defaultHiding: true,
//         icon: <Truck className="h-4 w-4" />,
//       },
//       {
//         field: "delivery",
//         label: "Delivered",
//         enableHiding: true,
//         icon: <Home className="h-4 w-4" />,
//       },

//       // Actions
//       {
//         field: "actions",
//         label: "Actions",
//         dropdown: false,
//         actions: [
//           {
//             label: "View",
//             icon: <EyeIcon className="size-4.5 stroke-1" />,
//             onClick: ({ doc }) => {
//               open();
//               setModalData({
//                 id: doc?._id,
//                 itemStatus: ORDER_ITEM_STATUS.DEFAULT,
//               });
//             },
//           },
//           {
//             label: "Delivery Note",
//             icon: <ClipboardCheck className="size-4.5 stroke-1" />,
//           },
//         ],
//       },
//     ],
//     rows: tableData,
//   };
// }, [tableData]); // eslint-disable-line