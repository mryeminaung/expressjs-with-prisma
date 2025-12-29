import express from "express";
import {
	createTodo,
	deleteTodo,
	getTodo,
	getTodos,
} from "../controllers/todoController.js";
const router = express.Router();

router.get("/", getTodos);
router.post("/", createTodo);
router.get("/:todoId", getTodo);
router.delete("/:todoId", deleteTodo);

export default router;
