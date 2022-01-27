import cors from "cors";
import express from "express";
import dotenv from "dotenv";

import { readFile, writeFile } from "fs/promises";
import { v4 as uuid } from "uuid";
import { connectDatabase } from "./utils/database";

if (!process.env.MONGODB_URI) {
	throw new Error("No MONGODB_URI available in dotenv");
}

const app = express();
const port = 4000;

app.use(express.json());

app.get("/", (request, response) => {
	response.send("Hello World!");
});

const data = await readFile("./database/database.json", "utf8");
const json = JSON.parse(data);
console.log(json);

// Variante 1, .then() - chaining :
/* app.get("/api/todos/", (request, response) => {
	readFile("./database/database.json", "utf8")
	.then(data => JSON.parse(data))
	.then(json => {
		response.json(json.todos);
	})
}); */

// Variante 2, slight refactoring, only one .then() :
/* app.get("/api/todos", (request, response) => {
	readFile("./database/database.json", "utf8")
	.then(data => {
		const json = JSON.parse(data);
		response.json(json.todos);
	});
}); */

// Variante 3, async/await wird deutlich :
app.get("/api/todos", async (request, response) => {
	const data = await readFile("./database/database.json", "utf8");
	const json = JSON.parse(data);
	response.json(json.todos);
});

const DATABASE_URI = "./database/database.json";

app.post("/api/todos/", async (request, response) => {
	// console.log(request.body)
	const data = await readFile(DATABASE_URI, "utf8");
	const json = JSON.parse(data);

	const todo = {
		...request.body,
		id: uuid(),
	};

	json.todos.push(todo);
	await writeFile(DATABASE_URI, JSON.stringify(json, null, 4));
	response.status(201);
	response.json(todo);
});

connectDatabase(process.env.MONGODB_URI).then(() => {
	app.listen(port, () => {
		console.log(`ToDoApp is listening on port ${port}`);
	});
});
