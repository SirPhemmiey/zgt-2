
import { Router } from "express";
import { validate } from "../../../middlewares/validationMiddleware";
import { injectService } from "../../../middlewares/serviceMidleware";
import { createLead, deleteAll, deleteById, getAllLeads, submitRequest } from "./controller";
import { createLeadSchema, submitLeadRequestSchema } from "./schema";

const router = Router();

router.post('/create', validate(createLeadSchema), injectService, createLead);

router.get('/all', injectService, getAllLeads);

router.post('/submit_request', validate(submitLeadRequestSchema), injectService, submitRequest);

router.delete('/all', injectService, deleteAll);

router.delete('/:lead_id', injectService, deleteById);

export { router as leadRoute };
