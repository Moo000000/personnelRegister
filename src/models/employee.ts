import { z } from 'zod';

export const EmployeeSchema = z.object({
  email: z.string().email(),
  name: z.string().min(1),
  lastName: z.string().min(1),
});

export const EmailSchema = z.object({
  email: z.string().email()
});

export type Employee = z.infer<typeof EmployeeSchema>;
export type Email = z.infer<typeof EmailSchema>;
