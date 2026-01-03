import { Router } from "express";

import * as controller from "../controllers/projectType.controller.js";

import auth from "@/middleware/crmAuth.js";

const router = Router();

router.post("/", controller.addProjectType);

router.get("/list", controller.listProjectType);

router.put("/", controller.updateProjectType);

router.delete("/", auth({common: true}), controller.deleteProjectType);

export default router;