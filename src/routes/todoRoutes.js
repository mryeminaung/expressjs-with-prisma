import express from "express";
import {
	createTodo,
	deleteTodo,
	getTodo,
	getTodos,
	updateTodo,
} from "../controllers/todoController";

const router = express.Router();

router.get("/", getTodos);
router.get("/:todoId", getTodo);
router.post("/", createTodo);
router.put("/:todoId", updateTodo);
router.delete("/:todoId", deleteTodo);

export default router;
