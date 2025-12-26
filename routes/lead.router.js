import {Router} from "express";
import * as controller from "../controllers/lead.controller.js"

const router = Router();

router.post('/', controller.AddLead)

export default router;
