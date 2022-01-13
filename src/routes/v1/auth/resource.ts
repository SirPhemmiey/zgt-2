
import { Router } from "express";
import { injectService, validateToken } from "../../../middlewares/serviceMidleware";
import { generateToken, login } from "./controller";

const router = Router();

router.post('/generate_token', injectService, generateToken);
router.post('/login', injectService, login);

export { router as authRoute };
