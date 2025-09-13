import sqlite3 from 'sqlite3';
import { open, Database } from 'sqlite';

export async function createDB(): Promise<Database> {
	const db = await open({
		filename: ":memory:",
		driver: sqlite3.Database
	});

	await db.exec(`CREATE TABLE employee (
			id INTEGER PRIMARY KEY,
			email TEXT NOT NULL UNIQUE,
			name TEXT NOT NULL,
			lastName TEXT NOT NULL
		)
	`)

	return db;
}
