import { Request, Response } from 'express';
import { EmployeeRepository } from '../repository/employeeRepository';
import { AddEmployeeRequest, EmployeeResponse, EmployeesResponse } from '../models/employee';

export class EmployeeController {
	constructor(private employeeRepo: EmployeeRepository) {}

	addEmployee = async (req: Request<{}, {}, AddEmployeeRequest>, res: Response) => {
		const employee = req.body
		const existingEmployee = await this.employeeRepo.findByEmail(employee.email);
		if (existingEmployee) {
			return res.status(409).json({ error: "Email already exists"});
		}

		const id = await this.employeeRepo.add(employee);
		if (!id) return res.status(500).json({ error: "Internal server error" });
		const response: EmployeeResponse = {
			id,
			...req.body
		}
		res.status(201).json(response);
	}

	deleteEmployee = async (req: Request<{}, {}, AddEmployeeRequest>, res: Response) => {
		const deleted = await this.employeeRepo.deleteByEmail(req.body.email);
		if (!deleted) {
			return res.status(404).json({ error: "Employee not found" });
		}

		res.status(204).send();
	}

	fetchEmployees = async (_: any, res: Response) => {
		const employees: EmployeesResponse = { employees: await this.employeeRepo.getAll() };
		res.status(200).json(employees);
	}
}
