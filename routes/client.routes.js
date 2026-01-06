import { Router } from "express";
const router = Router();

import auth from "@/middleware/crmAuth.js";


import * as controller from "../controllers/client.controller.js";

router.post('/', auth({common: true}), controller.addClient);

router.put('/', auth({common: true}), controller.updateClient);

router.delete('/', auth({common: true}), controller.deleteClient);

router.get('/list', auth({common: true}), controller.listClient);

router.get('/singleclient/:id', auth({common: true}), controller.singleClient);

router.get('/dashboard/:id', controller.getClientDashboardCount);

export default router;