
import { Router } from "express";
import { injectService } from "../../../middlewares/serviceMidleware";
import { createLead, deleteAll, getAllLeads, submitRequest } from "./controller";

const router = Router();

router.post('/create', injectService, createLead);

router.get('/all', injectService, getAllLeads);

router.post('/submit_request', injectService, submitRequest);

router.delete('/all', injectService, deleteAll);

export { router as leadRoute };
