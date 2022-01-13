
import { Router } from "express";
import { injectService, validateToken } from "../../../middlewares/serviceMidleware";
import { parseUrl } from "./controller";

const router = Router();

router.get('/:url', validateToken, injectService, parseUrl);

export { router as parserRoute };
