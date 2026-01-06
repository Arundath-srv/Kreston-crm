/* eslint-disable */

import React, { useState, useEffect, useMemo, memo, useCallback, useRef } from "react";
import { Card } from "components/ui";
import TwdTable from "components/TwdTable";
import { useParams } from "react-router";
import { get } from "utility";
import moment from "moment";
import { API_URL } from "constants/app.constant";

const ComplaintList = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [filter, setFilter] = useState({ search: "" });
  const [tableState, setTableState] = useState({ complaints: [], count: 0 });
  const abortControllerRef = useRef(null);
  const fetchComplaints = useCallback(async () => {
    if (!id) {
      setTableState({ complaints: [], count: 0 });
      return;
    }
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    const controller = new AbortController();
    abortControllerRef.current = controller;
    setLoading(true);
    try {
      const res = await get(
        `/customer/complaintlist?customer=${id}&page=${page}&limit=${limit}&search=${encodeURIComponent(
          filter.search || ""
        )}`,
        { signal: controller.signal }
      );
      const data = Array.isArray(res?.data) ? res.data : [];
      const totalCount = res?.count ?? data.length;
      const mappedData = data.map((item) => {
        const imageFileElement = item.imageFile ? (
          <a
            href={`${API_URL}${item.imageFile}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              alt="complaint"
              src={`${API_URL}${item.imageFile}`}
              width={60}
              height={50}
              className="rounded-lg object-cover"
            />
          </a>
        ) : "----";
        const audioFileElement = item.audioFile ? (
          <audio controls className="w-48">
            <source src={`${API_URL}${item.audioFile}`} type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio>
        ) : "----";
        let followupStatus = parseInt(item.followupStatus, 10);
        if (isNaN(followupStatus)) followupStatus = null;
        let statusLabel = { label: "Unknown", color: "default" };
        switch (followupStatus) {
          case 1:
            statusLabel = { label: "Escalated", color: "error" };
            break;
          case 2:
            statusLabel = { label: "Closed", color: "success" };
            break;
          case 3:
            statusLabel = { label: "Replacement", color: "warning" };
            break;
          case 4:
            statusLabel = { label: "Repair", color: "info" };
            break;
          case 5:
            statusLabel = { label: "Pending", color: "secondary" };
            break;
          case 6:
            statusLabel = { label: "New", color: "new" };
            break;
          default:
            statusLabel = { label: "Reopen", color: "default" };
        }
        return {
          ...item,
          complaintId: item.uniqueId || "-",
          totalComplaints: item.customerId?.totalComplaints || 0,
          category: item.complaintCategory?.name || "-",
          imageFile: imageFileElement,
          audioFile: audioFileElement,
          remark: item.remark || "-",
          addedByName: item.addedBy
            ? `${item.addedBy.firstName || ""} ${item.addedBy.lastName || ""}`.trim()
            : "-",
          updatedByName: item.updateBy
            ? `${item.updateBy.firstName || ""} ${item.updateBy.lastName || ""}`.trim()
            : "-",
          date: item.date ? moment(item.date).format("YYYY-MM-DD") : "-",
          statusLabel,
        };
      });
      setTableState({ complaints: mappedData, count: totalCount });
    } catch (err) {
      if (err.name === "AbortError") {
        console.log("Fetch complaints aborted");
      } else {
        console.error("❌ Failed to fetch complaints:", err);
        setTableState({ complaints: [], count: 0 });
      }
    } finally {
      setLoading(false);
    }
  }, [id, page, limit, filter.search]);
  useEffect(() => {
    fetchComplaints();
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [fetchComplaints]);
  const handleFilterChange = useCallback((newFilter, newPage, newLimit) => {
    setFilter(newFilter);
    setPage(newPage);
    setLimit(newLimit);
  }, []);
  const tableConfig = useMemo(() => ({
    columns: [
      { field: "date", label: "Date", type: "date", enableSorting: true },
      { field: "complaintId", label: "Complaint ID", enableSorting: true },
      { field: "category", label: "Complaint Category", enableSorting: true },
      { field: "audioFile", label: "Audio" },
      { field: "imageFile", label: "Image" },
       {
      field: "remark",
      label: "Remarks",
      enableSorting: true,
      className: "whitespace-pre-wrap break-words max-w-[250px]",
    },
      { field: "addedByName", label: "Added By", enableSorting: true },
      {
        field: "statusLabel",
        label: "Follow-up Status",
        type: "badge",
        variant: "filled",
        enableSorting: false,
      },
    ],
    rows: tableState.complaints,
  }), [tableState.complaints]);
  if (!id) {
    return (
      <div className="p-6 text-center text-gray-500">Invalid Customer ID</div>
    );
  }
  if (loading && tableState.complaints.length === 0) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
        <span className="ml-2 text-gray-600">Loading complaints...</span>
      </div>
    );
  }
  return (
    <div>
      <h2 className="mb-0 text-xl font-semibold text-gray-800 dark:text-gray-200">
        Complaints
      </h2>
      <Card className="overflow-hidden border-0">
        <TwdTable
          data={tableConfig}
          selectable={false}
          pagination={false}
          count={tableState.count}
          page={page}
          limit={limit}
          handleFilterChange={handleFilterChange}
        />
      </Card>
    </div>
  );
};

export default memo(ComplaintList);