import { Database } from 'sqlite';
import { AddEmployeeRequest, EmployeeResponse } from '../models/employee';

interface EmployeeRepositoryInterface {
	add(employee: AddEmployeeRequest): Promise<number | undefined>;
	deleteByEmail(email: string): Promise<boolean>;
	getAll(): Promise<AddEmployeeRequest[]>;
	findByEmail(email: string): Promise<AddEmployeeRequest | undefined>;
}

export class EmployeeRepository implements EmployeeRepositoryInterface {
	constructor(private db: Database) {}

	async add(employee: AddEmployeeRequest): Promise<number | undefined> {
		const result = await this.db.run(
			"INSERT INTO employee (email, name, lastName) VALUES (?, ?, ?)",
			[employee.email, employee.name, employee.lastName]);

		return result.lastID;
	}

	/**
	* returns true if result.changes is defined and is greater than 0 (i.e., at least one row was affected)
	*/
	async deleteByEmail(email: string): Promise<boolean> {
		const result = await this.db.run("DELETE FROM employee WHERE email = ?", [email]);
		return (!!result.changes && result.changes > 0);
	}

	async getAll(): Promise<EmployeeResponse[]> {
		return await this.db.all<EmployeeResponse[]>("SELECT id, email, name, lastName FROM employee");
	}

	async findByEmail(email: string): Promise<AddEmployeeRequest | undefined> {
		return await this.db.get<AddEmployeeRequest>("SELECT email, name, lastName FROM employee WHERE email = ?", [email]);
	}
}
