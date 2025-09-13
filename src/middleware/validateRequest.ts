import { Request, Response, NextFunction } from 'express';
import { ZodSchema } from 'zod';
import { Employee } from '../models/employee';

export const validateRequest = (schema: ZodSchema<Employee>) => (req: Request, res: Response, next: NextFunction) => {
	const result = schema.safeParse(req.body);
	if (!result.success) {
		console.log("ERROR: Bad request");
		return res.status(400).json({ errors: result.error.issues });
	}
	req.body = result.data;
	next();
}
