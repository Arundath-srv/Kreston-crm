import models from "@/models/index.js";
import { asyncErrorHandler, Response } from "express-error-catcher";

export const dashBoardSummary = asyncErrorHandler(async(req) => {

    const today = moment().format("YYYY-MM-DD");
  const startOfWeek = moment().startOf("week").format("YYYY-MM-DD");
  const endOfWeek = moment().endOf("week").format("YYYY-MM-DD");
  const startOfMonth = moment().startOf("month").format("YYYY-MM-DD");
  const endOfMonth = moment().endOf("month").format("YYYY-MM-DD");
  const startOfToday = new Date();
  startOfToday.setHours(0, 0, 0, 0);
  const endOfToday = new Date();
  endOfToday.setHours(23, 59, 59, 999);


  let todayOrderCount = 0;
  let todayDeliveryCount = 0;
  let todayDispatchCount = 0;
  let todaySalesTotal = 0;
  
  

//   const isLivable = req.domain === "livableinterior";

//   const normalCondition = {domain: req.domain,status:0};
//   // if (!req.isAdmin) {
//     normalCondition.assigned = req.user._id; 
   
//   // }
//  if(!isNull(req.branch)) normalCondition.branch = ObjectId(req.branch);
// console.log(normalCondition, "normalCondition")
//   const {domain, ...orderCondition} = normalCondition;
  const [todayProjectCount, weekProjectCount, monthProjectCount, totalProjectCount, 
    wipProjectCount, completedProjectCount, cancelledProjectCount, totalAuditCount, wipAuditCount,
    totalTaxCount, wipTaxCount,
    totalValCount, wipValCount,
    totalIcvCount, wipIcvCount,
    canIcvpCount
  ] = await Promise.all([
    models.Project.countDocuments({
    //   ...normalCondition,
      date: today,
    }),
    models.Project.countDocuments({
    //   ...normalCondition,
      date: { $gte: startOfWeek, $lte: endOfWeek },
    }),

    models.Project.countDocuments({
    //   ...normalCondition,
      date: { $gte: startOfMonth, $lte: endOfMonth },
    }),

    models.Project.countDocuments(),

    models.Project.countDocuments({
        pStatus: 2
    }),

    models.Project.countDocuments({
        pStatus: 1
    }),

    models.Project.countDocuments({
        pStatus: 5
    }),

    models.Project.countDocuments({
        pType: 1
    }),

    models.Project.countDocuments({
        pType: 1,
        pStatus: 2
    }),

    models.Project.countDocuments({
        pType: 2
    }),

    models.Project.countDocuments({
        pType: 2,
        pStatus: 2
    }),

    models.Project.countDocuments({
        pType: 3
    }),

    models.Project.countDocuments({
        pType: 3,
        pStatus: 2
    }),

    models.Project.countDocuments({
        pType: 4
    }),

    models.Project.countDocuments({
        pType: 4,
        pStatus: 2
    }),

    models.Project.countDocuments({
      pType: 4,
      pStatus: 5
    })
  ]);

//  if(!isLivable){
//   todayOrderCount = await models.Lead.countDocuments({
//     ...normalCondition,
//     orderId: { $exists: true, $ne: null },
//     createdAt: { $gte: startOfToday, $lte: endOfToday },
//   });
//   const salesResult = await models.Order.aggregate([
//     {
//       $match: {
//         ...orderCondition,
//         date: today,
//       },
//     },
//     {
//       $group: {
//         _id: null,
//         totalSales: { $sum: "$totalAmount" },
//       },
//     },
//   ]);
//   todaySalesTotal = salesResult.length > 0 ? salesResult[0].totalSales : 0;
//   [todayDeliveryCount, todayDispatchCount] = await Promise.all([
//     models.Order.countDocuments({
//       ...orderCondition,
//       deliveryDate: today,
//     }),

//     models.Order.countDocuments({
//       ...orderCondition,
//       upDate: today,
//       $or: [{ "count.readyToDispatch": { $gt: 0 } }, { "count.transit": { $gt: 0 } }],
//     }),
//   ]);
// }
//   /* -------------------- LAST 6 MONTH PROJECT GRAPH -------------------- */

  const sixMonthsAgo = moment().subtract(5, "months").startOf("month").toDate();

  const projectGraph = await models.Project.aggregate([
    {
      $match: {
        // ...normalCondition,
        createdAt: { $gte: sixMonthsAgo },
      },
    },
    {
      $group: {
        _id: {
          year: { $year: "$createdAt" },
          month: { $month: "$createdAt" },
        },
        count: { $sum: 1 },
      },
    },
    {
      $sort: { "_id.year": 1, "_id.month": 1 },
    },
  ]);

  // Ensure all 6 months exist (even zero values)
  const lastSixMonths = [];
  for (let i = 5; i >= 0; i--) {
    const m = moment().subtract(i, "months");
    const found = projectGraph.find((x) => x._id.year === m.year() && x._id.month === m.month() + 1);

    lastSixMonths.push({
      month: m.format("MMM"),
      count: found ? found.count : 0,
    });
  }
//   /* -------------------- POJECT STATUS COUNTS -------------------- */

  // const leadStatusCounts = await models.Lead.aggregate([
  //   {
  //     $match: normalCondition,
  //   },
  //   {
  //     $lookup: {
  //       from: COLLECTIONS.LEAD_STATUS,
  //       localField: "latestFollowUpStatus",
  //       foreignField: "_id",
  //       as: "status",
  //     },
  //   },
  //   {
  //     $unwind: {
  //       path: "$status",
  //       preserveNullAndEmptyArrays: true,
  //     },
  //   },
  //   {
  //     $group: {
  //       _id: {
  //         $ifNull: ["$status.name", "New"],
  //       },
  //       count: { $sum: 1 },
  //     },
  //   },
  // ]);

  const leadStatusSummary = {};
  leadStatusCounts.forEach((item) => {
    leadStatusSummary[item._id] = item.count;
  });

//   const responseData = {
//     leads: {
//         today: todayLeadCount,
//         week: weekLeadCount,
//         month: monthLeadCount,
//         total: totalLeadCount,
//         lastSixMonths,
//         statusSummary: leadStatusSummary,
//       },
//   }
//   if(!isLivable){
//     responseData.orders = {
//     today: todayOrderCount,
//     dispatchToday: todayDispatchCount,
//     deliveryToday: todayDeliveryCount,
//   };

//   responseData.sales = {
//     today: todaySalesTotal,
//   };
//   }
//   return new Response(
//     null,
//     responseData,
//     200
//   );

    const dashboardData = {
        project: {
            todayProjectCount, 
            totalProjectCount,
            weekProjectCount,
            monthProjectCount,
            completedProjectCount,
            wipProjectCount,
            cancelledProjectCount,
            lastSixMonths
        },
        audit:{
            totalAuditCount,
            wipAuditCount
        },
        tax:{
          totalTaxCount, 
          wipTaxCount,
        },
        icv:{
          totalIcvCount, 
          wipIcvCount,
          canIcvpCount
        }
    };

    return new Response("dashboard api test", dashboardData, 200);
});