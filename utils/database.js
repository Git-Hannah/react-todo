import { MongoClient } from "mongodb";

let client;

export async function connectDatabase(url) {
	client = new MongoClient(url);
	await client.connect();
}

export function getTodoCollection() {
	client.db().collection("todos");
}

// export function getTodoCollection(name) {
// 	client.db().collection(name);
// }
