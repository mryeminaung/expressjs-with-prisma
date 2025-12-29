export const getTodos = (req, res) => {
	res.status(200).json({
		id: 1,
		name: "Learn Express in 2026",
		completed: false,
	});
};

export const getTodo = (req, res) => {
	const { todoId } = req.params;
	res.status(200).json({
		msg: "Success",
		todo: {
			id: todoId,
			name: "Learn Express in 2026",
			completed: false,
		},
	});
};

export const createTodo = (req, res) => {
	const task = req.body;
	if (!task.name || !task.completed) {
		res.json({
			msg: "Error",
		});
	}

	res.status(201).json({
		msg: "Success",
		todo: { id: task.id, name: task.name, completed: task.completed },
	});
};

export const deleteTodo = (req, res) => {
	const { todoId } = req.params;
	res.status(202).json({ msg: `Todo '${todoId}' is deleted!` });
};
