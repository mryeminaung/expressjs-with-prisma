import { prisma } from "../config/prisma";

export const getStudents = async (req, res) => {
	try {
		const students = await prisma.student.findMany();
		res.json({ message: "success", data: students });
	} catch (error) {
		res
			.status(500)
			.json({ message: "Failed to fetch students", error: error.message });
	}
};

export const getStudent = async (req, res) => {
	try {
		const student = await prisma.student.findFirst({
			where: { id: Number(req.params.studentId) },
		});
		if (!student)
			res.status(404).json({
				message: "Student does not exist or already deleted",
			});
		res.json({ message: "success", data: student });
	} catch (error) {
		res
			.status(500)
			.json({ message: "Failed to fetch student", error: error.message });
	}
};

export const createStudent = async (req, res) => {
	try {
		const data = req.body;
		const student = await prisma.student.create({
			data,
		});
		res.status(201).json({ message: "success", data: student });
	} catch (error) {
		res
			.status(400)
			.json({ message: "Failed to create student", error: error.message });
	}
};

export const updateStudent = async (req, res) => {
	try {
		const student = await prisma.student.update({
			where: { id: Number(req.params.studentId) },
			data: req.body,
		});
		res.json({ message: "success", data: student });
	} catch (error) {
		res.status(400).json({ message: "Update failed", error: error.message });
	}
};

export const deleteStudent = async (req, res) => {
	try {
		await prisma.student.delete({
			where: { id: Number(req.params.studentId) },
		});
		res.status(200).json({ message: "Student deleted successfully" });
	} catch (error) {
		res.status(404).json({ message: "Student not found or already deleted" });
	}
};
