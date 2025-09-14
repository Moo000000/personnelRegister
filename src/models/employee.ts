import { z } from 'zod';

export const AddEmployeeRequestSchema = z.object({
  email: z.string().email(),
  name: z.string().min(1),
  lastName: z.string().min(1),
});

export const EmployeeResponseSchema = z.object({
  id: z.int().nonoptional(),
  email: z.string().email(),
  name: z.string().min(1),
  lastName: z.string().min(1),
});

export const EmployeesResponseSchema = z.object({
  employees: z.array(EmployeeResponseSchema).default([])
});

export const DeleteEmployeeRequestSchema = z.object({
  email: z.string().email()
});

export type AddEmployeeRequest = z.infer<typeof AddEmployeeRequestSchema>;
export type DeleteRequest = z.infer<typeof DeleteEmployeeRequestSchema>;
export type EmployeeResponse = z.infer<typeof EmployeeResponseSchema>;
export type EmployeesResponse = z.infer<typeof EmployeesResponseSchema>;
