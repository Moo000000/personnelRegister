import { Request, Response } from 'express';
import { EmployeeRepository } from '../repository/employeeRepository';
import { Employee } from '../models/employee';

export class EmployeeController {
	constructor(private employeeRepo: EmployeeRepository) {}

	addEmployee = async (req: Request<{}, {}, Employee>, res: Response) => {
		const employee = req.body
		const existingEmployee = await this.employeeRepo.findByEmail(employee.email);
		if (existingEmployee) {
			res.status(400).json({ error: "Email already exists"});
		}

		const id = await this.employeeRepo.add(employee);
		res.status(201).json({ id, ...employee });
	}

	deleteEmployee = async (req: Request<{}, {}, Employee>, res: Response) => {
		const deleted = await this.employeeRepo.deleteByEmail(req.body.email);
		if (!deleted) {
			return res.status(404).json({ error: "Employee not found" });
		}

		res.status(204).send();
	}

	fetchEmployees = async (req: Request, res: Response) => {
		const employees = await this.employeeRepo.getAll();
		res.status(200).json(employees);
	}
}
