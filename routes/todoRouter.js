import { Router } from "express";
import TodoController from "../controllers/TodoController.js";

const GET_TODOS = "/getTodos/:author";
const ADD_TODO = "/addTodo";
const CHECK_TODO = "/checkTodo";
const DELETE_TODO = "/deleteTodo/:id";

const router = Router();

router.get(GET_TODOS, TodoController.get);
router.post(ADD_TODO, TodoController.add);
router.post(CHECK_TODO, TodoController.check);
router.delete(DELETE_TODO, TodoController.delete);

export default router;
