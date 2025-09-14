import { EmployeeRepository } from "../repository/employeeRepository";
import { EmployeeController } from "./employeeController";

describe("EmployeeController", () => {
	let req: any;
	let res: any;
	let mockedRepo: jest.Mocked<EmployeeRepository>;
	let controller: EmployeeController;
	let mockedAddResponse: number

	beforeEach(() => {
		req = { body: { email: "test@test.se", name: "testName", lastName: "testLastName"} };
		res = { status: jest.fn().mockReturnThis(), json: jest.fn().mockReturnThis(), send: jest.fn() };
		mockedAddResponse = 1;

		mockedRepo = {
			add: jest.fn().mockResolvedValue(mockedAddResponse),
			findByEmail: jest.fn().mockResolvedValue(undefined),
			deleteByEmail: jest.fn(),
			getAll: jest.fn(),
		} as unknown as jest.Mocked<EmployeeRepository>;

		controller = new EmployeeController(mockedRepo);
	});

	it("addEmployee should return 201 when an employee is successfully added", async () => {
		await controller.addEmployee(req, res);

		expect(mockedRepo.findByEmail).toHaveBeenCalledWith(req.body.email);
		expect(mockedRepo.add).toHaveBeenCalledWith(req.body);
		expect(res.status).toHaveBeenCalledWith(201);
		expect(res.json).toHaveBeenCalledWith({ id: mockedAddResponse, ...req.body });
	});

	it("addEmployee should return 409 when email already exists", async () => {
		mockedRepo.findByEmail = jest.fn().mockResolvedValue(req.body);

		await controller.addEmployee(req, res);

		expect(mockedRepo.findByEmail).toHaveBeenCalledWith(req.body.email);
		expect(res.status).toHaveBeenCalledWith(409);
	});

	it("deleteEmployee should return 204 when an employee is successfully deleted", async () => {
		mockedRepo.deleteByEmail = jest.fn().mockResolvedValue(true);

		await controller.deleteEmployee(req, res);

		expect(mockedRepo.deleteByEmail).toHaveBeenCalledWith(req.body.email);
		expect(res.status).toHaveBeenCalledWith(204);
	});

	it("deleteEmployee should return 404 when given employee does not exist", async () => {
		mockedRepo.deleteByEmail = jest.fn().mockResolvedValue(false);

		await controller.deleteEmployee(req, res);

		expect(mockedRepo.deleteByEmail).toHaveBeenCalledWith(req.body.email);
		expect(res.status).toHaveBeenCalledWith(404);
	});

	it("fetchEmployees should return 200 when employees are successfully fetched", async () => {
		mockedRepo.getAll = jest.fn().mockResolvedValue([req.body]);

		await controller.fetchEmployees(req, res);

		expect(mockedRepo.getAll).toHaveBeenCalled();
		expect(res.status).toHaveBeenCalledWith(200);
		expect(res.json).toHaveBeenCalledWith([req.body]);
	});
})
