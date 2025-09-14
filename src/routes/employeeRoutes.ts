import { Router } from "express";
import { EmployeeController } from "../controllers/employeeController";
import { validateRequest } from '../middleware/validateRequest';
import { EmailSchema, EmployeeSchema } from '../models/employee';
import { Database } from "sqlite";
import { EmployeeRepository } from "../repository/employeeRepository";

export function createEmployeeRoutes(db: Database): Router {
	const router = Router();
	const employeeRepo = new EmployeeRepository(db);
	const controller = new EmployeeController(employeeRepo);

	router.get("/", controller.fetchEmployees);
	router.post("/", validateRequest(EmployeeSchema), controller.addEmployee);
	router.delete("/", validateRequest(EmailSchema), controller.deleteEmployee);

	return router;
}


