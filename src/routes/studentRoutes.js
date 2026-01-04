import express from "express";
import {
	createStudent,
	deleteStudent,
	getStudent,
	getStudents,
	updateStudent,
} from "../controllers/studentController";

const router = express.Router();

router.get("/", getStudents);
router.get("/:studentId", getStudent);
router.post("/", createStudent);
router.put("/:studentId", updateStudent);
router.patch("/:studentId", updateStudent);
router.delete("/:studentId", deleteStudent);

export default router;
