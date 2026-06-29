import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI || "mongodb://localhost:27017/tiles-gallery";

const globalForMongo = globalThis as unknown as {
  mongoClient: MongoClient | undefined;
};

export const client =
  globalForMongo.mongoClient ?? new MongoClient(uri, { serverSelectionTimeoutMS: 5000 });

if (process.env.NODE_ENV !== "production") {
  globalForMongo.mongoClient = client;
}

export async function getDb() {
  await client.connect();
  return client.db(process.env.MONGODB_DB_NAME || "tiles-gallery");
}
