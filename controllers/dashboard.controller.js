import { asyncErrorHandler, Response } from "express-error-catcher";

export const dashBoardSummary = asyncErrorHandler(async(req) => {

    return new Response("dashboard api test", null, 200);
});