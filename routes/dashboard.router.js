import { Router } from "express";
const router = Router();

import * as controller from "../controllers/dashboard.controller.js";


router.get('/summary', controller.dashBoardSummary);

export default router;