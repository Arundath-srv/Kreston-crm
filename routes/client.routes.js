import { Router } from "express";
const router = Router();

import auth from "@/middleware/crmAuth.js";


import * as controller from "../controllers/client.controller.js";

router.post('/', auth({master: true}), controller.addClient);
router.put('/', auth({master: true}), controller.updateClient);
router.delete('/', controller.deleteClient);
router.get('/list', controller.listClient);

export default router;