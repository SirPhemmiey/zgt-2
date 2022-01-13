
import { Router } from "express";
import { injectService, validateToken } from "../../../middlewares/serviceMidleware";
import { downloadFile, uploadFile } from "./controller";
import multer from 'multer';

const router = Router();
const upload = multer();

router.post('/upload', validateToken, injectService, upload.single('file'), uploadFile);
router.post('/download/:identifier', validateToken, injectService, downloadFile);

export { router as fileRoute };
