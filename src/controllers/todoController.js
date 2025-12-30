import { prisma } from "../config/prisma";

export const getTodos = async (req, res) => {
	try {
		const todos = await prisma.todo.findMany();
		res.json({ message: "success", data: todos });
	} catch (error) {
		res
			.status(500)
			.json({ message: "Failed to fetch todos", error: error.message });
	}
};

export const getTodo = async (req, res) => {
	try {
		const todo = await prisma.todo.findFirst({
			where: { id: req.params.todoId },
		});
		res.json({ message: "success", data: todo });
	} catch (error) {
		res
			.status(500)
			.json({ message: "Failed to fetch todo", error: error.message });
	}
};

export const createTodo = async (req, res) => {
	try {
		const { title, description } = req.body;
		const todo = await prisma.todo.create({
			data: { title, description },
		});
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
		const todo = await prisma.todo.update({
			where: { id: todoId },
			data: req.body,
		});
		res.json({ message: "success", data: todo });
	} catch (error) {
		res.status(400).json({ message: "Update failed", error: error.message });
	}
};

export const deleteTodo = async (req, res) => {
	try {
		const { todoId } = req.params;
		await prisma.todo.delete({ where: { id: todoId } });
		res.status(200).json({ message: "Todo deleted successfully" });
	} catch (error) {
		res.status(404).json({ message: "Todo not found or already deleted" });
	}
};
