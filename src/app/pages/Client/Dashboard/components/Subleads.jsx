/*eslint-disable*/
import Divider from "components/Divider";
import { Button, Table, TBody, Td, Th, THead, Tr } from "components/ui";
import { memo, useState, useEffect } from "react";
import { get } from "utility";
const fallback = (value, defaultValue = "—") =>
  value !== undefined && value !== null && value !== "" ? value : defaultValue;
const Subleads = ({ close, leadId }) => {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);
  const fetchFollowups = async () => {
    if (!leadId) {
      setRows([]);
      return;
    }
    setLoading(true);
    try {
      const res = await get(`customer/lead/followup/${leadId}`);
      const followups = Array.isArray(res.data) ? res.data : res.data?.data || [];

      if (Array.isArray(followups)) {
        const data = followups.map((f) => ({
          date: f.date ? f.date : "---",
          nextFollowup: f.nextFollowup || "---",
          remarks: f.remarks || "---",
          status: f.followupStatus?.name || "Pending",
          addedBy:
            `${f.addedBy?.firstName || ""} ${f.addedBy?.lastName || ""}`.trim() ||
            "—",
        }));
        setRows(data);
      } else {
        setRows([]);
      }
    } catch (err) {
      console.error("Failed to fetch followups", err);
      setRows([]);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchFollowups();
  }, [leadId]);

  const cols = ["DATE & TIME", "NEXT FOLLOWUP", "STATUS","REMARKS", "ADDED BY"];

  const statusBadgeClass = (status) => {
    const lower = (status || "").toLowerCase();
    if (lower === "order") return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
    if (lower === "new") return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
    if (["price approval", "priceapproval"].includes(lower))
      return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200";
    if (lower === "proposals") return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200";
    return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300";
  };

  const handleClose = () => {
    if (typeof close === "function") {
      close();
    } else {
      console.warn("Subleads: 'close' is not a function. Make sure it's passed from parent.");
    }
  };

  return (
    <div className="flex flex-col items-end justify-start px-5 py-3 w-full">
      <div className="hide-scrollbar flex w-full items-center justify-center overflow-x-auto">
        <Table className="w-full text-left rtl:text-right">
          <THead>
            <Tr className="dark:border-b-dark-500 border-y border-transparent border-b-gray-200">
              {cols.map((title, index) => (
                <Th
                  key={index}
                  className="dark:text-dark-100 font-semibold text-gray-800 capitalize"
                >
                  {title}
                </Th>
              ))}
            </Tr>
          </THead>
          <TBody>
            {loading ? (
              <Tr>
                <Td colSpan={cols.length} className="text-center py-4">
                  Loading...
                </Td>
              </Tr>
            ) : rows.length > 0 ? (
              rows.map((tr, idx) => (
                <Tr
                  key={idx}
                  className="dark:border-b-dark-500 border-y border-transparent border-b-gray-200"
                >
                  <Td>{fallback(tr?.date, "---")}</Td>
                  <Td>{fallback(tr?.nextFollowup, "---")}</Td>
                  <Td>
                    <span
                      className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${statusBadgeClass(
                        tr?.status
                      )}`}
                    >
                      {fallback(tr?.status, "Pending")}
                    </span>
                  </Td>
                  <Td className="whitespace-pre-wrap break-words max-w-[200px]">
  {fallback(tr?.remarks, "---")}
</Td>
                  <Td>{fallback(tr?.addedBy, "—")}</Td>
                </Tr>
              ))
            ) : (
              <Tr>
                <Td colSpan={cols.length} className="text-center py-4">
                  No followup details found.
                </Td>
              </Tr>
            )}
          </TBody>
        </Table>
      </div>

      <div className="mt-6 flex h-8 items-center justify-center gap-4">
        <Divider type="vertical" />
        <Button onClick={handleClose} className="min-w-[7rem]" variant="outlined">
          Close
        </Button>
      </div>
    </div>
  );
};

export default memo(Subleads);