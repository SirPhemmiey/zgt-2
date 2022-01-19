
import { Router } from "express";
import { injectService } from "../../../middlewares/serviceMidleware";
import { createLead, deleteAll, deleteById, getAllLeads, submitRequest } from "./controller";

const router = Router();

router.post('/create', injectService, createLead);

router.get('/all', injectService, getAllLeads);

router.post('/submit_request', injectService, submitRequest);

router.delete('/all', injectService, deleteAll);

router.delete('/:lead_id', injectService, deleteById);

export { router as leadRoute };
