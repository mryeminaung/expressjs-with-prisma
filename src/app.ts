import cors from "cors";
import { config } from "dotenv";
import express from "express";
import { disconnectDB, prisma } from "./config/prisma";
import todoRouter from "./routes/todoRoutes";
import studentRouter from "./routes/studentRoutes";
import proposalRouter from "./routes/proposalRoutes";

config();
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/todos", todoRouter);
app.use("/api/students", studentRouter);
app.use("/api/proposals", proposalRouter);

app.get("/api/stu-with-proposals/:stuId", async(req, res)=>{
	
	const data = await prisma.student.findMany({
		where: {id: Number(req.params.stuId)},
		select: {
			name: true,
			email: true,
			proposals: {
				select: {
					title: true,
					description: true,
					submittedAt: true,
					submitter: {
						select: {
							name: true
						}
					}
				}
			}
		},
	})

	res.status(200).json({
		message: 'success',
		data
	});
});

const server = app.listen(process.env.PORT || 5001, "0.0.0.0", () => {
	console.log(`Server running on PORT ${process.env.PORT}`);
});

// Handle unhandled promise rejections (e.g., database connection errors)
process.on("unhandledRejection", (err) => {
	console.error("Unhandled Rejection:", err);
	server.close(async () => {
		await disconnectDB();
		process.exit(1);
	});
});

// Handle uncaught exceptions
process.on("uncaughtException", async (err) => {
	console.error("Uncaught Exception:", err);
	await disconnectDB();
	process.exit(1);
});

// Graceful shutdown
process.on("SIGTERM", async () => {
	console.log("SIGTERM received, shutting down gracefully");
	server.close(async () => {
		await disconnectDB();
		process.exit(0);
	});
});
