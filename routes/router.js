import { Router } from "express";
import todoRouter from "./todoRouter.js";
import userRouter from "./userRouter.js";

const TODOS = "/todos";
const USER = "/user";

const router = Router();

router.use(TODOS, todoRouter);
router.use(USER, userRouter);

export default router;
