/*eslint-disable*/
// import React, { useState, useMemo, memo } from "react";
// import { Card } from "components/ui";
// import { ArrowUpRightIcon, EyeIcon } from "lucide-react";
// import TwdTable from "components/TwdTable";
// import SubProject from "./SubProject";

// const Booking = ({ profileData }) => {
//   let [refresh, setRefresh] = useState(0);
// const mockProjects = [
//   {
//     id: 1,
//     date: "2024-02-15",
//     projectId: "PRJ092500022",
//     projectname: "Luxury Apartment Interior",
//     location: "Bangalore",
//     "2design": "Completed",
//     "2dstatus": "Approved",
//     "3design": "In Progress",
//     "3dstatus": "Pending",
//     execution: "Not Started",
//     executionstatus: "On Hold",
//     completiondate: "2024-06-15",
//     status:"Ongoing"
//   },
//   {
//     id: 2,
//     date: "2024-02-20",
//     projectId: "PRJ092500023",
//     projectname: "Office Renovation",
//     location: "Chennai",
//     "2design": "Completed",
//     "2dstatus": "Approved",
//     "3design": "Completed",
//     "3dstatus": "Approved",
//     execution: "Ongoing",
//     executionstatus: "In Progress",
//     completiondate: "2024-07-30",
//     status:"Ongoing"
//   },
//   {
//     id: 3,
//     date: "2024-02-25",
//     projectId: "PRJ092500024",
//     projectname: "Villa Landscape",
//     location: "Hyderabad",
//     "2design": "Pending",
//     "2dstatus": "Review",
//     "3design": "Not Started",
//     "3dstatus": "N/A",
//     execution: "Not Started",
//     executionstatus: "Planned",
//     completiondate: "2024-08-20",
//       status:"Ongoing"
//   },
//   {
//     id: 4,
//     date: "2024-03-01",
//     projectId: "PRJ092500025",
//     projectname: "Showroom Setup",
//     location: "Kochi",
//     "2design": "Completed",
//     "2dstatus": "Approved",
//     "3design": "Completed",
//     "3dstatus": "Approved",
//     execution: "Completed",
//     executionstatus: "Delivered",
//     completiondate: "2024-04-10",
//       status:"Ongoing"
//   },
//   {
//     id: 5,
//     date: "2024-03-05",
//     projectId: "PRJ092500026",
//     projectname: "Café Interior",
//     location: "Mumbai",
//     "2design": "Completed",
//     "2dstatus": "Approved",
//     "3design": "In Progress",
//     "3dstatus": "Review",
//     execution: "Ongoing",
//     executionstatus: "In Progress",
//     completiondate: "2024-09-05",
//       status:"Ongoing"
//   },
// ];


//   const [filter, setFilter] = useState({});
//   const [page, setPage] = useState(1);
//   const [limit, setLimit] = useState(10);
//   const [count, setCount] = useState(mockProjects.length);

//   const fetchTableList = (filterProps, pageCount, limitCount) => {
//     console.log("Fetching data with:", { filterProps, pageCount, limitCount });
//   };

//   const handleView = (order) => {
//     console.log("Viewing order:", order);
//   };

//   const tableConfig = useMemo(() => {
//     return {
//       columns: [
//         {
//           field: "date",
//           label: " Project Date",
//           type: "date",
//           enableSorting: true,
//           enableHiding: true,
//         },
//         {
//           field: "projectId",
//           label: "Project ID",
//           enableSorting: true,
//           enableHiding: true,
//         },
//         {
//           field: "projectname",
//           label: "Project Name",
//           enableSorting: true,
//           enableHiding: true,
//         },
//         {
//           field: "location",
//           label: "Location",
//           enableSorting: true,
//           enableHiding: true,
//         },
//           {
//           field: "status",
//           label: "Status",
//           enableSorting: true,
//           enableHiding: true,
//         },

//         {
//                   label: "actions",
//                   field: "extra_actions",
//                   dropdown: false,
//                   actions: [
//                        {
//                       label: "View",
//                       tooltip: true,
//                       tooltipContent: "Report Page",
//                       drawer: true,
//                       subRow: true,
//                       className:
//                         "p-1 bg-gray-150 text-gray-900 hover:bg-gray-200 focus:bg-gray-200 active:bg-gray-200/80 dark:bg-surface-2 dark:text-dark-50 dark:hover:bg-surface-1 dark:focus:bg-surface-1 dark:active:bg-surface-1/90",
//                       icon: <ArrowUpRightIcon className="size-4.5 stroke-1" />,
//                       children: (props) => {
//                         return <SubProject {...props} setRefresh={setRefresh} />;
//                       },
//                     },

//                   ],
//                 },
//       ],
//       rows: mockProjects,
//     };
//   }, [mockProjects]);

//   return (
//     <div>
//       <h2 className="mb-0 text-xl font-semibold text-gray-800 dark:text-gray-200">
//         Livable Projects
//       </h2>

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
// Projects.jsx - Option 1
import React, { useState, useEffect, useCallback, useRef, memo } from "react";
import { MapPin, Coins, FileText, ChevronDown, ChevronUp } from "lucide-react";
import { useParams } from "react-router";
import { get } from "utility";
import moment from "moment";
import { motion, AnimatePresence } from "framer-motion";
import SubProject from "./SubProject";
const Projects = () => {
  const { id } = useParams();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [expandedProject, setExpandedProject] = useState(null);
  const abortControllerRef = useRef(null);
  const fetchProjects = useCallback(async () => {
    if (!id) return setProjects([]);
    if (abortControllerRef.current) abortControllerRef.current.abort();
    const controller = new AbortController();
    abortControllerRef.current = controller;
    setLoading(true);
    try {
      const res = await get(`/customer/projectlist?customer=${id}`, { signal: controller.signal });
      const data = Array.isArray(res?.data) ? res.data : [];
      setProjects(
        data.map((p) => ({
          _id: p._id,
          name: p.name || "-",
          uniqueId: p.uniqueId || "-",
          customerUniqueId: p.customer?.uniqueId || "-",
          estimateAmount: p.estimateAmount || 0,
          status: p.status === 0 ? "Active" : "Inactive",
          date: p.date ? moment(p.date).format("DD MMM YYYY") : "-",
        }))
      );
    } catch (err) {
      console.error("Failed to fetch projects:", err);
      setProjects([]);
    } finally {
      setLoading(false);
    }
  }, [id]);
  useEffect(() => {
    fetchProjects();
    return () => abortControllerRef.current?.abort();
  }, [fetchProjects]);
  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      {loading ? (
        <div className="flex justify-center py-10">
          <div className="animate-spin h-6 w-6 border-3 border-blue-500 border-t-transparent rounded-full"></div>
        </div>
      ) : projects.length === 0 ? (
        <p className="text-center text-gray-500 py-6 text-sm">No projects found.</p>
      ) : (
        <div className="space-y-6">
          {projects.map((p) => (
            <motion.div
              key={p._id}
              layout
              className="group bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-sm hover:shadow-md transition-all overflow-hidden"
            >
              <div
                className="p-5 cursor-pointer flex flex-col sm:flex-row sm:items-center sm:justify-between"
                onClick={() =>
                  setExpandedProject(expandedProject === p._id ? null : p._id)
                }
              >
                <div>
                  <div className="flex items-center justify-between sm:justify-start gap-3 mb-2">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white truncate">
                      {p.name}
                    </h3>
                    <span
                      className={`px-2 py-0.5 text-xs font-medium rounded ${
                        p.status === "Active"
                          ? "bg-green-100 text-green-800"
                          : "bg-gray-200 text-gray-700"
                      }`}
                    >
                      {p.status}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs text-gray-600 dark:text-gray-400">
                    <div className="flex items-center gap-1 truncate">
                      <FileText className="w-3 h-3" />
                      <span>ID: {p.uniqueId}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Coins className="w-3 h-3" />
                      ₹{p.estimateAmount.toLocaleString()}
                    </div>
                    <div>Date: {p.date}</div>
                  </div>
                </div>
                <div className="mt-4 sm:mt-0 text-blue-600 font-medium flex items-center justify-end sm:justify-center">
                  {expandedProject === p._id ? (
                    <>
                      Hide Details <ChevronUp className="w-4 h-4 ml-1" />
                    </>
                  ) : (
                    <>
                      View Follow-ups <ChevronDown className="w-4 h-4 ml-1" />
                    </>
                  )}
                </div>
              </div>
              <AnimatePresence>
                {expandedProject === p._id && (
                  <motion.div
                    key="details"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 p-5"
                  >
                    <SubProject projectId={p._id} />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default memo(Projects);