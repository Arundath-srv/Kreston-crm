
// import Divider from "components/Divider";
// import { Button, Table, TBody, Td, Th, THead, Tr } from "components/ui";

// import { memo } from "react";

// const fallback = (value, defaultValue = "—") =>
//   value !== undefined && value !== null && value !== "" ? value : defaultValue;

// const SubRow = ({ close, doc }) => {
//   const cols = [
//     "#",
//     "SKU",
//     "Product",
//     "Qty",
//     "MRP(₹)",
//     "Price(₹)",
//     "Total Amount (₹)",
//     "Status",
//   ];


//   const mockRows = [
//     {
//       sku: "PR00001",
//       productName: "Modern Office Chair",
//       quantity: 2,
//       mrp: 8500,
//       price: 7200,
//       totalAmount: 14400,
//       status: "New",
//     },
//     {
//       sku: "PR00002",
//       productName: "Wooden Study Table",
//       quantity: 1,
//       mrp: 12000,
//       price: 9800,
//       totalAmount: 9800,
//       status: "Price changed",
//     },

//   ];

//   // Use real data if available, else mock for design
//   const rows = doc?.billTests && doc.billTests.length > 0 ? doc.billTests : mockRows;

//   return (
//     <div className="flex flex-col items-end justify-start px-5 py-3">
//       <div className="hide-scrollbar flex w-full items-center justify-center overflow-x-auto">
//         <Table className="w-10/12 text-left rtl:text-right">
//           <THead>
//             <Tr className="dark:border-b-dark-500 border-y border-transparent border-b-gray-200">
//               {cols.map((title, index) => (
//                 <Th
//                   key={index}
//                   className="dark:text-dark-100 font-semibold text-gray-800 capitalize"
//                 >
//                   {title}
//                 </Th>
//               ))}
//             </Tr>
//           </THead>
//           <TBody>
//             {rows.map((tr, idx) => (
//               <Tr
//                 key={idx}
//                 className="dark:border-b-dark-500 border-y border-transparent border-b-gray-200"
//               >
//                 <Td>{idx + 1}</Td>
//                 <Td>{fallback(tr?.sku, "N/A")}</Td>
//                 <Td>{fallback(tr?.productName, "N/A")}</Td>
//                 <Td>{fallback(tr?.quantity, 0)}</Td>
//                 <Td>₹{fallback(tr?.mrp, 0).toLocaleString()}</Td>
//                 <Td>₹{fallback(tr?.price, 0).toLocaleString()}</Td>
//                 <Td>₹{fallback(tr?.totalAmount, 0).toLocaleString()}</Td>
//                 <Td>
//                   <span
//                     className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
//                       tr?.status === "Confirmed"
//                         ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
//                         : tr?.status === "Pending"
//                         ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
//                         : tr?.status === "Cancelled"
//                         ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
//                         : "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300"
//                     }`}
//                   >
//                     {fallback(tr?.status, "Pending")}
//                   </span>
//                 </Td>
//               </Tr>
//             ))}
//           </TBody>
//         </Table>
//       </div>
//       <div className="mt-6 flex h-8 justify-center">
//         <Divider type="vertical" />
//         <Button onClick={close} className="min-w-[7rem]" variant="outlined">
//           Close
//         </Button>
//       </div>
//     </div>
//   );
// };

// export default memo(SubRow);
/* eslint-disable */
/* eslint-disable */
/* eslint-disable */
/* eslint-disable */
import Divider from "components/Divider";
import { Button, Table, TBody, Td, Th, THead, Tr } from "components/ui";
import { memo, useEffect, useState } from "react";
import {
  Hourglass,
  CheckSquare,
  Package,
  Truck,
  Home,
} from "lucide-react";

const fallback = (value, defaultValue = "—") =>
  value !== undefined && value !== null && value !== "" ? value : defaultValue;

const SubRow = ({ close, doc, onRefresh }) => {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);

  const columns = [
    { field: "productName", label: "Products" },
    { field: "quantity", label: "Qty" },
    { field: "pending", icon: <Hourglass className="h-4 w-4" />, tooltip: "Pending" },
    { field: "qaChecked", icon: <CheckSquare className="h-4 w-4" />, tooltip: "QA Checked" },
    { field: "readyToDispatch", icon: <Package className="h-4 w-4" />, tooltip: "Ready to Dispatch" },
    { field: "transit", icon: <Truck className="h-4 w-4" />, tooltip: "In Transit" },
    { field: "delivery", icon: <Home className="h-4 w-4" />, tooltip: "Delivered" },
  ];

  useEffect(() => {
    const fetchItems = async () => {
      if (!doc?._id) {
        setRows([]);
        return;
      }

      try {
        setLoading(true);
        const items = doc.items || [];
        const mappedRows = items.map((item) => ({
          productName: item.name ,
          quantity: item.quantity,
          pending: item.pending,
          qaChecked: item.qaChecked,
          readyToDispatch: item.readyToDispatch,
          transit: item.transit,
          delivery: item.delivery,
        }));
        setRows(mappedRows);
      } catch (err) {
        console.error("Failed to map subrow items:", err);
        setRows([]);
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, [doc]);

  const handleClose = () => {
    if (typeof close === "function") {
      close();
    } else {
      console.warn(
        "SubRow: 'close' prop is missing or not a function. Ensure parent passes it correctly."
      );
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
        <span className="ml-2 text-gray-600">Loading items...</span>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-end justify-start px-5 py-3">
      <div className="hide-scrollbar flex w-full items-center justify-center overflow-x-auto">
        <Table className="w-[95%] text-left rtl:text-right">
          <THead>
            <Tr className="border-y border-transparent border-b-gray-200 dark:border-b-dark-500">
              {columns.map((col) => (
                <Th
                  key={col.field}
                  className="font-semibold text-gray-800 capitalize dark:text-dark-100"
                >
                  <div className="flex items-center gap-1">
                    {col.icon ? (
                      <span
                        data-tooltip
                        data-tooltip-content={col.tooltip}
                        className="cursor-pointer flex items-center"
                      >
                        {col.icon}
                      </span>
                    ) : (
                      col.label
                    )}
                  </div>
                </Th>
              ))}
            </Tr>
          </THead>

          <TBody>
            {rows.length > 0 ? (
              rows.map((row, idx) => (
                <Tr
                  key={idx}
                  className="border-y border-transparent border-b-gray-200 dark:border-b-dark-500"
                >
                  <Td>{fallback(row.productName)}</Td>
                  <Td>{fallback(row.quantity, 0)}</Td>
                  <Td>{fallback(row.pending, 0)}</Td>
                  <Td>{fallback(row.qaChecked, 0)}</Td>
                  <Td>{fallback(row.readyToDispatch, 0)}</Td>
                  <Td>{fallback(row.transit, 0)}</Td>
                  <Td>{fallback(row.delivery, 0)}</Td>
                </Tr>
              ))
            ) : (
              <Tr>
                <Td
                  colSpan={columns.length}
                  className="text-center text-gray-500 py-4"
                >
                  No items found
                </Td>
              </Tr>
            )}
          </TBody>
        </Table>
      </div>

      <div className="mt-6 flex h-8 items-center justify-center gap-4">
        <Divider type="vertical" />
        <Button
          onClick={handleClose}
          className="min-w-[7rem]"
          variant="outlined"
        >
          Close
        </Button>
      </div>
    </div>
  );
};

export default memo(SubRow);