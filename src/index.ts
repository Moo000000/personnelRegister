import express from 'express';
import { createEmployeeRoutes }from './routes/employeeRoutes';
import { createDB } from './repository/db';

const PORT = 8080

async function main() {
	const db = await createDB();

	const app = express();
	app.use(express.json());

	app.use("/employees", createEmployeeRoutes(db));

	app.listen(PORT, () => {
		console.log("Server running on http://localhost:8080");
	});

	['SIGINT', 'SIGTERM', 'SIGQUIT']
  .forEach(signal => process.on(signal, async () => {
		console.log("Shutting down...");
		await db.close();
    process.exit();
  }));
}

main();
