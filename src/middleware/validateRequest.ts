import { Request, Response, NextFunction } from 'express';
import { ZodType } from 'zod';
import { Employee } from '../models/employee';

export const validateRequest = (schema: ZodType<Employee>) => (req: Request, res: Response, next: NextFunction) => {
	const result = schema.safeParse(req.body);
	if (!result.success) {
		return res.status(400).json({ errors: result.error.issues });
	}
	req.body = result.data;
	next();
}
