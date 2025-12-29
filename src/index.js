import cors from "cors";
import dotenv from "dotenv";
import express from "express";

dotenv.config();
const app = express();
const apiPort = 8000;

import { todoRoutes } from "./routes/api.js";

app.use(cors(), express.json(), express.urlencoded({ extended: true }));

app.use("/todos", todoRoutes);

app.get("/users/:userId/:bookId", (req, res) => {
	res.send(req.params);
});

app.get("/user/:id", (req, res, next) => {
	if (req.params.id === "0") {
		return next("route");
	}
	res.send(`User ${req.params.id}`);
});

app.get("/user/:id", (req, res) => {
	res.send({
		msg: "Special handler for user ID 0 Hahaha",
		body: req.body,
	});
});

app.get("/", (req, res) => {
	res.send({ msg: "GET method is running..." });
});

app.post("/", (req, res) => {
	res.send({ msg: "POST method is running..." });
});

app.put("/", (req, res) => {
	res.send({ msg: "PUT method is running..." });
});

app.patch("/", (req, res) => {
	res.send({ msg: "PATCH method is running..." });
});

app.delete("/", (req, res) => {
	res.send({ msg: "DELETE method is running..." });
});

app.listen(apiPort, () => {
	console.log(`Example app listening on port ${apiPort}`);
});
