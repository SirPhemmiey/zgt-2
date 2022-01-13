
import { Router } from "express";
import { injectService, validateToken } from "../../../middlewares/serviceMidleware";
import { translatePage } from "./controller";

const router = Router();

router.get('/:url', validateToken, injectService, translatePage);

export { router as translateRoute };
