import { Router, type IRouter } from "express";
import healthRouter from "./health";
import qualifyRouter from "./qualify";
import projectCheckRouter from "./project-check";
import contactRouter from "./contact";

const router: IRouter = Router();

router.use(healthRouter);
router.use(qualifyRouter);
router.use(projectCheckRouter);
router.use(contactRouter);

export default router;
