import * as todoService from "../services/todoService.js";

export const getTodos = async (req, res) => {
	try {
		const todos = await todoService.getAllTodos();
		res.json({ message: "success", data: todos });
	} catch (error) {
		res
			.status(500)
			.json({ message: "Failed to fetch todos", error: error.message });
	}
};

export const getTodo = async (req, res) => {
	try {
		const { todoId } = req.params;
		const todo = await todoService.getTodo(todoId);
		if (!todo)
			res.status(404).json({ message: "Todo not found or already deleted" });
		res.json({ message: "success", data: todo });
	} catch (error) {
		res
			.status(500)
			.json({ message: "Failed to fetch todo", error: error.message });
	}
};

export const createTodo = async (req, res) => {
	try {
		if (!req.body.title) res.json({ message: "Title is required" });
		const todo = await todoService.createTodo(req.body);
		res.status(201).json({ message: "success", data: todo });
	} catch (error) {
		res
			.status(400)
			.json({ message: "Failed to create todo", error: error.message });
	}
};

export const updateTodo = async (req, res) => {
	try {
		const { todoId } = req.params;
		if (!todoId) {
			return res.status(400).json({ message: "Todo ID is required" });
		}
		const todo = await todoService.updateTodo(todoId, req.body);
		res.json({ message: "success", data: todo });
	} catch (error) {
		res.status(400).json({ message: "Update failed", error: error.message });
	}
};

export const deleteTodo = async (req, res) => {
	try {
		const { todoId } = req.params;
		if (!todoId) {
			return res.status(400).json({ message: "Todo ID is required" });
		}
		await todoService.deleteTodo(todoId);
		res.sendStatus(204);
		// res.status(204).json({ message: "Todo deleted successfully" });
	} catch (error) {
		res.status(404).json({ message: "Todo not found or already deleted" });
	}
};
