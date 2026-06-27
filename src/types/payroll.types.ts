export interface Payroll {
  payroll_id: number;
  employee_id: number;
  basic_salary: number;
  bonus: number;
  deduction: number;
  net_salary: number;
  payment_date: Date;
}

export interface CreatePayrollRequest {
  employee_id: number;
  basic_salary: number;
  bonus: number;
  deduction: number;
  net_salary: number;
  payment_date: Date;
}

export interface UpdatePayrollRequest {
  employee_id: number;
  basic_salary: number;
  bonus: number;
  deduction: number;
  net_salary: number;
  payment_date: Date;
}