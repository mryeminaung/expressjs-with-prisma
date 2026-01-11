import { prisma } from "../config/prisma";

export const getAllTodos = async () => {
	let todos = await prisma.todo.findMany();
	return todos;
};

export const getTodo = async (todoId) => {
	let todo = await prisma.todo.findFirst({
		where: { id: todoId },
	});
	return todo;
};

export const createTodo = async (todo) => {
	let newTodo = await prisma.todo.create({
		data: todo,
	});
	return newTodo;
};

export const updateTodo = async (todoId, todo) => {
	let updatedTodo = await prisma.todo.update({
		where: { id: todoId },
		data: todo,
	});
	return updatedTodo;
};

export const deleteTodo = async (todoId) => {
	let todo = await prisma.todo.delete({ where: { id: todoId } });
	return todo;
};
