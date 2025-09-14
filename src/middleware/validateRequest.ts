import { Request, Response, NextFunction } from 'express';
import { ZodType } from 'zod';
import { Email, Employee } from '../models/employee';

export const validateRequest = (schema: ZodType<Employee | Email>) => (req: Request, res: Response, next: NextFunction) => {
	const result = schema.safeParse(req.body);
	if (!result.success) {
		return res.status(400).json({ errors: result.error.issues });
	}
	req.body = result.data;
	next();
}
