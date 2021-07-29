import { MongoClient } from "mongodb";

export async function connect() {
	const client = new MongoClient(process.env.MONGO_URL, {
		// useUnifiedTopology: true, Not working for my local...I think this option is deprecatetd :(
		keepAlive: true
	});

	const connection = await client.connect();
	
	return connection.db("sample_airbnb");
}
