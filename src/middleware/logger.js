import express from "express";

const router = express.Router();

router.use((req, res, next) => {
	console.log(`${Date.now()} ${req.originalUrl} ${req.method}`);
	next();
});

export default router;
