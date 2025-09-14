import { Database } from "sqlite"
import { createDB } from "./db"
import { EmployeeRepository } from "./employeeRepository"
import { Employee } from "../models/employee";
import { email } from "zod";

describe("Employee repository", () => {
	let db: Database;
	let repo: EmployeeRepository;
	let employeeMock: Employee = { email: "test@test.se", name: "testName", lastName: "testLastName" };

	beforeEach(async () => {
		db = await createDB();
		repo = new EmployeeRepository(db);
	});

	afterEach(async () => {
		await db.close();
	});

	it("Should add an employee and return an ID", async () => {
		const id = await repo.add(employeeMock);

		expect(id).toBe(1);
	});

	it("Should throw error when adding employee with email that already exists", async () => {
		await repo.add(employeeMock);

		await expect(repo.add(employeeMock)).rejects.toThrow();
	});

	it("Should return true when an employee is deleted", async () => {
		await repo.add(employeeMock);
		const isDeleted = await repo.deleteByEmail(employeeMock.email);

		expect(isDeleted).toBeTruthy();
	});

	it("Should return false when an employee to be deleted does not exist", async () => {
		const isDeleted = await repo.deleteByEmail(employeeMock.email);

		expect(isDeleted).toBeFalsy();
	});

	it("Should return all employees", async () => {
		const employeesMock = [
			{ email: "test@test.se", name: "testName", lastName: "testLastName" },
			{ email: "test2@test.se", name: "testName", lastName: "testLastName" },
			{ email: "test3@test.se", name: "testName", lastName: "testLastName" },
			{ email: "test4@test.se", name: "testName", lastName: "testLastName" }
		]
		await Promise.all(employeesMock.map(e => repo.add(e)));
		const employees = await repo.getAll();

		expect(employees).toEqual(
			expect.arrayContaining(
				employeesMock.map(e => expect.objectContaining(e))
			)
		);
	});

	it("Should return employee when employee with given email exists", async () => {
		await repo.add(employeeMock);

		const employee = await repo.findByEmail(employeeMock.email);

		expect(employee).toEqual(employeeMock);
	});
})
