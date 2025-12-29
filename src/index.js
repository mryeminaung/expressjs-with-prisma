import cors from "cors";
import dotenv from "dotenv";
import express from "express";
dotenv.config();

// creating an instance of express
const app = express();

// build-in middleware
app.use(cors(), express.json(), express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
	res.send("Hello World!");
});

// get the port from .env
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
	console.log(`App is listening at port ${PORT}`);
});
