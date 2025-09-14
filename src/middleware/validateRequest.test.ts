import { validateRequest } from './validateRequest';
import { AddEmployeeRequestSchema } from '../models/employee';

describe("validate requests", () => {
	
	it("should call next when request is valid", () => {
		const body = { email: "test@test.se", name: "test", lastName: "test" };
		const req: any = { body };
		const res: any = {};
		const next = jest.fn();

		validateRequest(AddEmployeeRequestSchema)(req, res, next);
		expect(next).toHaveBeenCalled();
	});

	it("should return 400 when request is invalid", () => {
		const body = { email: "test@test.se", name: "", lastName: "test" };
		const req: any = { body };
		const res: any = {
			status: jest.fn().mockReturnThis(),
			json: jest.fn(),
		};
		const next = jest.fn();

		validateRequest(AddEmployeeRequestSchema)(req, res, next);

		expect(res.status).toHaveBeenCalledWith(400);
		expect(res.json).toHaveBeenCalled();
		expect(next).not.toHaveBeenCalled();
	});
});
