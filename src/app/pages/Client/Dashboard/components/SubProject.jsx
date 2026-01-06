// /* eslint-disable */ first design
// import Divider from "components/Divider";
// import { Button, Card } from "components/ui";
// import { memo } from "react";


// // ✅ Safe fallback for any value
// const fallback = (value, defaultValue = "—") =>
//   value !== undefined && value !== null && value !== "" ? value : defaultValue;

// const SubProject = ({ close, doc }) => {
//   const mockRows = [
//     {
//       twoDDesigner: "Rahul Sharma",
//       twoDStatus: "Approved",
//       threeDDesigner: "Priya Mehta",
//       threeDStatus: "In Review",
//       executor: "Production Team A",
//       executionStatus: "Started",
//       completionDate: "—",
//       status: "Confirmed",
//     },
//     {
//       twoDDesigner: "Amit Patel",
//       twoDStatus: "Draft",
//       threeDDesigner: "Not Assigned",
//       threeDStatus: "Pending",
//       executor: "Production Team B",
//       executionStatus: "Not Started",
//       completionDate: "—",
//       status: "Pending",
//     },
//   ];

//   const rows = doc?.billTests && doc.billTests.length > 0 ? doc.billTests : mockRows;

//   return (
//     <div className="flex flex-col px-5 py-3">
//       {/* Cards instead of Table */}
//       <div className="grid gap-4 w-full">
//         {rows.map((tr, idx) => (
//           <Card
//             key={idx}
//             className="rounded-2xl border border-gray-200 dark:border-gray-700 p-4 shadow-sm"
//           >
//             <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-sm">
//               <div>
//                 <p className="text-gray-500">2D Designer</p>
//                 <p className="font-medium">{fallback(tr?.twoDDesigner, "Not Assigned")}</p>
//               </div>
//               <div>
//                 <p className="text-gray-500">2D Status</p>
//                 <p className="font-medium">{fallback(tr?.twoDStatus, "Pending")}</p>
//               </div>
//               <div>
//                 <p className="text-gray-500">3D Designer</p>
//                 <p className="font-medium">{fallback(tr?.threeDDesigner, "Not Assigned")}</p>
//               </div>
//               <div>
//                 <p className="text-gray-500">3D Status</p>
//                 <p className="font-medium">{fallback(tr?.threeDStatus, "Pending")}</p>
//               </div>
//               <div>
//                 <p className="text-gray-500">Executor</p>
//                 <p className="font-medium">{fallback(tr?.executor, "Not Assigned")}</p>
//               </div>
//               <div>
//                 <p className="text-gray-500">Execution Status</p>
//                 <p className="font-medium">{fallback(tr?.executionStatus, "Not Started")}</p>
//               </div>
//               <div>
//                 <p className="text-gray-500">Completion Date</p>
//                 <p className="font-medium">{fallback(tr?.completionDate, "—")}</p>
//               </div>
//               <div>
//                 <p className="text-gray-500">Final Status</p>
//                 <span
//                   className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
//                     tr?.status === "Confirmed"
//                       ? "bg-green-100 text-green-700"
//                       : tr?.status === "Pending"
//                       ? "bg-yellow-100 text-yellow-700"
//                       : tr?.status === "Cancelled"
//                       ? "bg-red-100 text-red-700"
//                       : "bg-gray-100 text-gray-600"
//                   }`}
//                 >
//                   {fallback(tr?.status, "Pending")}
//                 </span>
//               </div>
//             </div>
//           </Card>
//         ))}
//       </div>

//       {/* Close Button */}
//       <div className="mt-6 flex h-8 justify-center">
//         <Divider type="vertical" />
//         <Button onClick={close} className="min-w-[7rem]" variant="outlined">
//           Close
//         </Button>
//       </div>
//     </div>
//   );
// };

// export default memo(SubProject);


//third design
// export default memo(SubProject);
/* eslint-disable */
// import Divider from "components/Divider";
// import { Button, Card } from "components/ui";
// import { memo } from "react";

// ✅ Safe fallback
// const fallback = (value, defaultValue = "—") =>
//   value !== undefined && value !== null && value !== "" ? value : defaultValue;

// const stageConfig = [
//   { key: "twoD", label: "2D Design", designerKey: "twoDDesigner", statusKey: "twoDStatus" },
//   { key: "threeD", label: "3D Design", designerKey: "threeDDesigner", statusKey: "threeDStatus" },
//   { key: "execution", label: "Execution", designerKey: "executor", statusKey: "executionStatus" },
//   { key: "completion", label: "Completion", designerKey: "completionDate", statusKey: "status" },
// ];

// const statusColors = {
//   Approved: "bg-green-100 text-green-700",
//   Confirmed: "bg-green-100 text-green-700",
//   Pending: "bg-yellow-100 text-yellow-700",
//   "In Review": "bg-blue-100 text-blue-700",
//   Draft: "bg-gray-100 text-gray-600",
//   Cancelled: "bg-red-100 text-red-700",
//   Started: "bg-purple-100 text-purple-700",
// };

// const SubProject = ({ close, doc }) => {
//   const mockRows = [
//     {
//       twoDDesigner: "Rahul Sharma",
//       twoDStatus: "Approved",
//       threeDDesigner: "Priya Mehta",
//       threeDStatus: "In Review",
//       executor: "Production Team A",
//       executionStatus: "Started",
//       completionDate: "—",
//       status: "Confirmed",
//     },
//     {
//       twoDDesigner: "Amit Patel",
//       twoDStatus: "Draft",
//       threeDDesigner: "Not Assigned",
//       threeDStatus: "Pending",
//       executor: "Production Team B",
//       executionStatus: "Not Started",
//       completionDate: "—",
//       status: "Pending",
//     },
//   ];

//   const rows = doc?.billTests && doc.billTests.length > 0 ? doc.billTests : mockRows;

//   return (
//     <div className="flex flex-col px-5 py-3">
//       {/* Kanban Style Columns */}
//       <div className="grid grid-cols-1 md:grid-cols-4 gap-5 w-full">
//         {stageConfig.map((stage, idx) => (
//           <div key={stage.key} className="flex flex-col">
//             <h3 className="font-semibold text-gray-800 dark:text-gray-100 mb-3 text-center">
//               {stage.label}
//             </h3>
//             <div className="space-y-4">
//               {rows.map((tr, i) => (
//                 <Card
//                   key={`${stage.key}-${i}`}
//                   className="rounded-xl border border-gray-200 dark:border-gray-700 p-3 shadow-sm"
//                 >
//                   <p className="text-sm text-gray-500">Assigned To</p>
//                   <p className="font-medium">
//                     {fallback(tr?.[stage.designerKey], "Not Assigned")}
//                   </p>
//                   <span
//                     className={`mt-2 inline-block text-xs px-2 py-1 rounded-full ${
//                       statusColors[tr?.[stage.statusKey]] || "bg-gray-100 text-gray-600"
//                     }`}
//                   >
//                     {fallback(tr?.[stage.statusKey], "Pending")}
//                   </span>
//                 </Card>
//               ))}
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Close Button */}
//       <div className="mt-6 flex h-8 justify-center">
//         <Divider type="vertical" />
//         <Button onClick={close} className="min-w-[7rem]" variant="outlined">
//           Close
//         </Button>
//       </div>
//     </div>
//   );
// };

// export default memo(SubProject);
/* eslint-disable */
// import Divider from "components/Divider";
// import { Button, Card } from "components/ui";
// import { memo, useState, useEffect } from "react";
// import { CheckCircleIcon, ClockIcon, XCircleIcon } from "@heroicons/react/24/outline";
// import { get } from "utility";

// const fallback = (value, defaultValue = "—") =>
//   value !== undefined && value !== null && value !== "" ? value : defaultValue;

// const statusColors = {
//   "Work Completed": "bg-emerald-50 text-emerald-700 border-emerald-100",
//   Approved: "bg-blue-50 text-blue-700 border-blue-100",
//   Confirmed: "bg-blue-50 text-blue-700 border-blue-100",
//   Pending: "bg-sky-50 text-sky-700 border-sky-100",
//   "In Review": "bg-cyan-50 text-cyan-700 border-cyan-100",
//   Draft: "bg-gray-50 text-gray-600 border-gray-100",
//   Cancelled: "bg-rose-50 text-rose-600 border-rose-100",
//   Started: "bg-blue-100 text-blue-800 border-blue-200",
//   Assigned: "bg-sky-50 text-sky-700 border-sky-100",
//   "In Progress": "bg-amber-50 text-amber-700 border-amber-100",
//   "Revision Requested": "bg-purple-50 text-purple-700 border-purple-100",
// };

// const iconColors = {
//   "2D Design": "text-blue-600 bg-blue-50",
//   "3D Design": "text-cyan-600 bg-cyan-50",
//   Execution: "text-sky-600 bg-sky-50",
//   Completion: "text-emerald-600 bg-emerald-50",
// };

// const extractStatus = (item) => {
//   if (item.stageFollowups?.length) {
//     const latest = item.stageFollowups.reduce((prev, curr) =>
//       new Date(curr.createdAt) > new Date(prev.createdAt) ? curr : prev
//     );
//     if (latest.followupStatus) return latest.followupStatus;
//   }
//   if (item.staffTeam && item.staffTeam !== "—") {
//     return "Assigned";
//   }
//   return "Pending";
// };

// const SubProject = ({ close, projectId }) => {
//   const [consolidatedRow, setConsolidatedRow] = useState(null);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     if (!projectId) {
//       setConsolidatedRow(null);
//       return;
//     }

//     const fetchModes = async () => {
//       setLoading(true);
//       try {
//         const res = await get(`/customer/getallmodes/${projectId}`);
//         const modes = Array.isArray(res.data) ? res.data : [];
//         const latestByMode = {};
//         modes.forEach((item) => {
//           if (!item.mode) return;
//           const key = item.mode.toUpperCase();
//           if (!latestByMode[key] || new Date(item.createdAt) > new Date(latestByMode[key].createdAt)) {
//             latestByMode[key] = item;
//           }
//         });

//         const row = {
//           twoDDesigner: "—",
//           twoDStatus: "Pending",
//           twoDDate: "—",
//           threeDDesigner: "—",
//           threeDStatus: "Pending",
//           threeDDate: "—",
//           executor: "—",
//           executionStatus: "Pending",
//           executionDate: "—",
//           completionDate: "—",
//           status: "Pending",
//         };

//         if (latestByMode["2D DESIGN"]) {
//           const item = latestByMode["2D DESIGN"];
//           row.twoDDesigner = fallback(item.staffTeam);
//           row.twoDStatus = extractStatus(item);
//           row.twoDDate = fallback(item.date);
//         }

//         if (latestByMode["3D DESIGN"]) {
//           const item = latestByMode["3D DESIGN"];
//           row.threeDDesigner = fallback(item.staffTeam);
//           row.threeDStatus = extractStatus(item);
//           row.threeDDate = fallback(item.date);
//         }

//         const execKeys = ["EXECUTION", "PROJECT MANAGER", "PM"];
//         for (const key of execKeys) {
//           if (latestByMode[key]) {
//             const item = latestByMode[key];
//             row.executor = fallback(item.staffTeam);
//             row.executionStatus = extractStatus(item);
//             row.executionDate = fallback(item.date);
//             break;
//           }
//         }

//         const dates = [row.twoDDate, row.threeDDate, row.executionDate].filter(d => d !== "—");
//         row.completionDate = dates.length ? dates[dates.length - 1] : "—";

//         const completedStatuses = ["Approved", "Confirmed", "Work Completed"];
//         const subStatuses = [row.twoDStatus, row.threeDStatus, row.executionStatus];

//         if (subStatuses.every(s => completedStatuses.includes(s))) {
//           row.status = "Confirmed";
//         } else if (subStatuses.some(s => s !== "Pending")) {
//           row.status = "Started";
//         }

//         setConsolidatedRow(row);
//       } catch (err) {
//         console.error("Failed to fetch project stages:", err);
//         setConsolidatedRow(null);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchModes();
//   }, [projectId]);

//   const handleClose = () => {
//     if (typeof close === "function") {
//       close();
//     } else {
//       console.warn("SubProject: 'close' is not a function. Ensure it's passed from parent.");
//     }
//   };

//   if (loading) {
//     return (
//       <div className="flex flex-col px-5 py-3">
//         <p className="text-center py-8 text-blue-500 animate-pulse font-medium">Loading design stages...</p>
//         <div className="mt-6 flex justify-center">
//           <Divider type="vertical" />
//           <Button onClick={handleClose} className="min-w-[7rem]" variant="outlined">
//             Close
//           </Button>
//         </div>
//       </div>
//     );
//   }

//   if (!consolidatedRow) {
//     return (
//       <div className="flex flex-col px-5 py-3">
//         <p className="text-center py-8 text-gray-500">No design stages found.</p>
//         <div className="mt-6 flex justify-center">
//           <Divider type="vertical" />
//           <Button onClick={handleClose} className="min-w-[7rem]" variant="outlined">
//             Close
//           </Button>
//         </div>
//       </div>
//     );
//   }

//   const renderStage = (title, person, status, date, icon, iconColor) => (
//     <div className="flex-1 flex flex-col items-center text-center group">
//       <div className={`flex h-12 w-12 items-center justify-center rounded-full mb-2 transition-all duration-300 ${iconColor} group-hover:scale-110 border border-white shadow-sm`}>
//         {icon}
//       </div>
//       <p className="text-xs font-semibold text-gray-600 uppercase tracking-wider">{title}</p>
//       <p className="font-bold text-gray-800 mt-1">{person}</p>
//       {status && (
//         <span className={`mt-1.5 text-xs px-2.5 py-1 rounded-full font-medium border ${statusColors[status] || "bg-gray-50 text-gray-600 border-gray-100"}`}>
//           {status}
//         </span>
//       )}
//       <p className="text-xs text-gray-500 mt-1.5">{date}</p>
//     </div>
//   );

//   return (
//     <div className="flex flex-col px-5 py-4">
//       <div className="space-y-6">
//         <Card className="rounded-2xl border border-gray-200 bg-white/80 backdrop-blur-sm p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
//           <div className="flex items-center justify-between mb-6">
//             <span className={`px-4 py-2 rounded-full text-sm font-medium ${statusColors[consolidatedRow.status] || "bg-gray-50 text-gray-600"}`}>
//               {fallback(consolidatedRow.status)}
//             </span>
//           </div>

//           <div className="flex items-start justify-between relative">
//             {renderStage(
//               "2D Design",
//               consolidatedRow.twoDDesigner,
//               consolidatedRow.twoDStatus,
//               consolidatedRow.twoDDate,
//               <CheckCircleIcon className="h-6 w-6" />,
//               iconColors["2D Design"]
//             )}

//             <div className="absolute top-6 left-[12.5%] right-[12.5%] h-0.5 bg-gradient-to-r from-blue-100 via-cyan-100 to-sky-100 z-0"></div>

//             {renderStage(
//               "3D Design",
//               consolidatedRow.threeDDesigner,
//               consolidatedRow.threeDStatus,
//               consolidatedRow.threeDDate,
//               <ClockIcon className="h-6 w-6" />,
//               iconColors["3D Design"]
//             )}

//             {renderStage(
//               "Execution",
//               consolidatedRow.executor,
//               consolidatedRow.executionStatus,
//               consolidatedRow.executionDate,
//               <XCircleIcon className="h-6 w-6" />,
//               iconColors.Execution
//             )}

//             {renderStage(
//               "Completion",
//               consolidatedRow.completionDate,
//               null,
//               "",
//               <CheckCircleIcon className="h-6 w-6" />,
//               iconColors.Completion
//             )}
//           </div>
//         </Card>
//       </div>

//       <div className="mt-8 flex justify-center">
//         <Divider type="vertical" />
//         <Button
//           onClick={handleClose}
//           className="min-w-[8rem] px-6 py-2 bg-gradient-to-r from-blue-50 to-cyan-50 text-blue-700 font-medium rounded-lg border border-blue-100 shadow-sm hover:from-blue-100 hover:to-cyan-100 transition-all duration-300 transform hover:scale-105"
//         >
//           Close
//         </Button>
//       </div>
//     </div>
//   );
// };

// export default memo(SubProject);

/*eslint-disable*/
import { memo, useState, useEffect } from "react";
import { get } from "utility";
import { CalendarDays, Clock, User, MessageSquare, Activity } from "lucide-react";
const formatTime = (time24) => {
  if (!time24) return "—";
  const [hours, minutes] = time24.split(":").map(Number);
  const period = hours >= 12 ? "PM" : "AM";
  const h = hours % 12 || 12;
  return `${h}:${String(minutes).padStart(2, "0")} ${period}`;
};
const formatDate = (date) => {
  if (!date) return "—";
  const d = new Date(date);
  return d.toLocaleDateString("en-GB");
};
const SubProject = ({ projectId }) => {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);
  const fetchFollowups = async () => {
    if (!projectId) return;
    setLoading(true);
    try {
      const res = await get(`/customer/projectaction/${projectId}`);
      const list = Array.isArray(res.data) ? res.data : res.data?.data || [];
      const formatted = list.map((f) => ({
        date: formatDate(f.date),
        time: formatTime(f.time),
        mode: f.mode || "—",
        remarks: f.remarks || "—",
        status: f.followupStatus
          ? f.followupStatus.charAt(0).toUpperCase() + f.followupStatus.slice(1)
          : "—",
        addedBy:
          typeof f.addedBy === "object"
            ? `${f.addedBy.firstName || ""} ${f.addedBy.lastName || ""}`.trim()
            : f.addedBy || "—",
      }));
      setRows(formatted);
    } catch (err) {
      console.error("Failed to fetch follow-ups:", err);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchFollowups();
  }, [projectId]);
  const statusColor = (status) => {
    const s = status?.toLowerCase();
    if (["completed", "done"].includes(s)) return "bg-green-100 text-green-800";
    if (["pending", "new"].includes(s)) return "bg-yellow-100 text-yellow-800";
    if (["working", "in progress"].includes(s)) return "bg-blue-100 text-blue-800";
    return "bg-gray-100 text-gray-800";
  };
  if (loading)
    return (
      <div className="flex justify-center py-8">
        <div className="animate-spin h-6 w-6 border-4 border-blue-400 border-t-transparent rounded-full"></div>
      </div>
    );
  if (rows.length === 0)
    return <p className="text-center text-gray-500 py-4 text-sm">No follow-up details found.</p>;
  return (
 <div className="space-y-3">
  {rows.map((item, idx) => (
    <div
      key={idx}
      className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-2 rounded-lg shadow-sm hover:shadow-md transition-all duration-300"
    >
      <div className="flex justify-between items-center mb-1">
        <div className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-300">
          <CalendarDays className="w-3.5 h-3.5" />
          {item.date}
          <Clock className="w-3.5 h-3.5 ml-2" />
          {item.time}
        </div>
        <span className={`text-[11px] px-2 py-0.5 rounded-full font-medium ${statusColor(item.status)}`}>
          {item.status}
        </span>
      </div>

      <div className="flex items-start gap-2 mb-2">
        <MessageSquare className="w-3.5 h-3.5 text-blue-600 mt-0.5" />
        <p className="text-gray-700 dark:text-gray-200 text-xs leading-relaxed">
          {item.remarks}
        </p>
      </div>

      <div className="flex justify-between items-center text-[11px] sm:text-xs text-gray-600 dark:text-gray-300">
        <div className="flex items-center gap-1.5">
          <User className="w-3.5 h-3.5 text-gray-500" />
          {item.addedBy}
        </div>
        <div className="flex items-center gap-1.5 italic">
          <Activity className="w-3.5 h-3.5 text-indigo-500" />
          {item.mode}
        </div>
      </div>
    </div>
  ))}
</div>

  );
};
export default memo(SubProject);