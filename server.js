import cors from "cors";
import express, { response } from "express";
import dotenv from "dotenv";
// import 'dotenv/config';
// import { config } from 'dotenv';
// config(); // This as early as possible in the code
dotenv.config();

import { readFile, writeFile } from "fs/promises";
import { v4 as uuid } from "uuid";
import { connectDatabase, getTodoCollection } from "./utils/database.js";

if (!process.env.MONGODB_URI) {
	throw new Error("No MONGODB_URI available in dotenv");
}

const app = express();
const port = 4000;

app.use(express.json());
app.use(cors);

app.get("/", (request, response) => {
	response.send("Hello World!");
});

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

const DATABASE_URI = "./database/database.json";

// Variante 3, async/await wird deutlich :
app.get("/api/todos", async (request, response, next) => {
	try {
		const data = await readFile(DATABASE_URI, "utf8");
		const json = JSON.parse(data);
		response.json(json.todos);
	} catch (error_) {
		next(error_);
	}
});

app.post("/api/todos", async (request, response, next) => {
	try {
		const collection = getTodoCollection();

		const todo = {
			...request.body,
			isChecked: false,
			id: uuid(),
		};

		const mongoDbResponse = await collection.insertOne(todo);

		response.status(201).send(`Insertion successful, document id:${mongoDbResponse.inserted}`);
	} catch (error_) {
		next(error_);
	}
});

/* Alte Variante:
	app.post("/api/todos/", async (request, response, next) => {
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
}); */

app.delete("/api/todos", async (request, response, next) => {
	const { id } = request.body;
	try {
		const data = await readFile(DATABASE_URI, "utf-8");
		const json = JSON.parse(data);
		const index = json.todos.findIndex(user => user.id === id);
		if (index < 0) {
			response.status(400);
			response.json({ error: { message: "This entry does not exist" } });
			return;
		}
		json.todos.splice(index, 1);
		await writeFile(DATABASE_URI, JSON.stringify(json, null, 4));
		// Send a 204 (No Content)
		response.status(204);
		response.send();
		// Or 200
		// response.status(200);
		// response.send("entry deleted");
	} catch (error_) {
		next(error_);
	}
});

// Update:
app.put("/api/todos", async (request, response, next) => {
	try {
		const { id, update } = request.body;
		const data = await readFile(DATABASE_URI, "utf-8");
		const json = JSON.parse(data);
		const index = json.todos.findIndex(user => user.id === id);
		if (index < 0) {
			response.status(400);
			response.json({ error: { message: "This entry does not exist" } });
			return;
		}
		json.todos[index] = { ...json.todos[index], ...update, id };
		await writeFile(DATABASE_URI, JSON.stringify(json, null, 4));
		// Send a 200
		response.status(200);
		response.send(json.todos[index]);
		// Or 204 (No Content)
		// response.status(204);
		// response.send();
	} catch (error_) {
		next(error_);
	}
});

connectDatabase(process.env.MONGODB_URI).then(() => {
	app.listen(port, () => {
		console.log(`ToDoApp is listening on port ${port}`);
	});
});
