import { Router, type IRouter } from "express";
import healthRouter from "./health";
import qualifyRouter from "./qualify";
import projectCheckRouter from "./project-check";
import contactRouter from "./contact";
import generateSystemRouter from "./generate-system";
import anfragenFilterRouter from "./anfragen-filter";
import demoEmailRouter from "./demo-email";

const router: IRouter = Router();

router.use(healthRouter);
router.use(qualifyRouter);
router.use(projectCheckRouter);
router.use(contactRouter);
router.use(generateSystemRouter);
router.use(anfragenFilterRouter);
router.use(demoEmailRouter);

export default router;
