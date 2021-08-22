import { MongoClient } from 'mongodb';

export async function getClient() {
	return MongoClient.connect(
		`mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@cluster0.9f6zh.mongodb.net/events?retryWrites=true&w=majority`
	);
}

export async function getAllDocuments(client, collection, sort, filter = {}) {
	const documents = await client
		.db()
		.collection(collection)
		.find(filter)
		.sort(sort)
		.toArray();

	return documents;
}

export async function connectDatabase() {
	return getClient();
}

export async function insertDocument(client, collection, document) {
	const db = client.db();
	const result = await db.collection(collection).insertOne(document);

	return result;
}
