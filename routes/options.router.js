import { Router } from "express";
const router = Router();

import * as controller from "@/controllers/options.controller.js";

//! Common Options
router.get("/countries", controller.countries).get("/states", controller.states).get("/districts", controller.districts);


//! Core Options
router.get("/privilege", controller.privilege).get("/module", controller.module).get("/user", controller.user)

router.get("/partner", controller.partner).get("/manager", controller.manager).get("/client", controller.client).get("/audit", controller.audit);

router.get("/project-type", controller.projectType);

export default router;
