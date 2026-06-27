import { pool } from "../config/db.js";

import {
  Payroll,
  CreatePayrollRequest,
  UpdatePayrollRequest,
} from "../types/payroll.types.js";

const findAll = async (): Promise<Payroll[]> => {
  const result = await pool.query<Payroll>(`
    SELECT
      payroll_id,
      employee_id,
      basic_salary,
      bonus,
      deduction,
      net_salary,
      payment_date
    FROM payroll
    ORDER BY payroll_id;
  `);

  return result.rows;
};

const findById = async (
  payrollId: number
): Promise<Payroll | null> => {
  const result = await pool.query<Payroll>(
    `
    SELECT
      payroll_id,
      employee_id,
      basic_salary,
      bonus,
      deduction,
      net_salary,
      payment_date
    FROM payroll
    WHERE payroll_id = $1;
    `,
    [payrollId]
  );

  return result.rows[0] ?? null;
};

const create = async (
  payroll: CreatePayrollRequest
): Promise<Payroll> => {
  const result = await pool.query<Payroll>(
    `
    INSERT INTO payroll (
      employee_id,
      basic_salary,
      bonus,
      deduction,
      net_salary,
      payment_date
    )
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING
      payroll_id,
      employee_id,
      basic_salary,
      bonus,
      deduction,
      net_salary,
      payment_date;
    `,
    [
      payroll.employee_id,
      payroll.basic_salary,
      payroll.bonus,
      payroll.deduction,
      payroll.net_salary,
      payroll.payment_date,
    ]
  );

  return result.rows[0]!;
};

const update = async (
  payrollId: number,
  payroll: UpdatePayrollRequest
): Promise<Payroll | null> => {
  const result = await pool.query<Payroll>(
    `
    UPDATE payroll
    SET
      employee_id = $1,
      basic_salary = $2,
      bonus = $3,
      deduction = $4,
      net_salary = $5,
      payment_date = $6
    WHERE payroll_id = $7
    RETURNING
      payroll_id,
      employee_id,
      basic_salary,
      bonus,
      deduction,
      net_salary,
      payment_date;
    `,
    [
      payroll.employee_id,
      payroll.basic_salary,
      payroll.bonus,
      payroll.deduction,
      payroll.net_salary,
      payroll.payment_date,
      payrollId,
    ]
  );

  return result.rows[0] ?? null;
};

const remove = async (
  payrollId: number
): Promise<Payroll | null> => {
  const result = await pool.query<Payroll>(
    `
    DELETE FROM payroll
    WHERE payroll_id = $1
    RETURNING
      payroll_id,
      employee_id,
      basic_salary,
      bonus,
      deduction,
      net_salary,
      payment_date;
    `,
    [payrollId]
  );

  return result.rows[0] ?? null;
};

export const payrollService = {
  findAll,
  findById,
  create,
  update,
  remove,
};