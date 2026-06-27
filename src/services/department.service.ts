import { pool } from "../config/db.js";
import { Department, CreateDepartmentRequest, UpdateDepartmentRequest } from "../types/department.types.js";

const findAll = async (): Promise<Department[]> => {
  const result = await pool.query<Department>(`
    SELECT
      department_id,
      department_name
    FROM departments
    ORDER BY department_id;
  `);

  return result.rows;
};

const findById = async (
  departmentId: number
): Promise<Department | null> => {
  const result = await pool.query<Department>(
    `
    SELECT
      department_id,
      department_name
    FROM departments
    WHERE department_id = $1;
    `,
    [departmentId]
  );

  return result.rows[0] ?? null;
};

const create = async (
  department: CreateDepartmentRequest
): Promise<Department> => {
  const result = await pool.query<Department>(
    `
    INSERT INTO departments (
      department_name
    )
    VALUES ($1)
    RETURNING
      department_id,
      department_name;
    `,
    [department.department_name]
  );

  return result.rows[0]!;
};

const update = async (
  departmentId: number,
  department: UpdateDepartmentRequest
): Promise<Department | null> => {
  const result = await pool.query<Department>(
    `
    UPDATE departments
    SET
      department_name = $1
    WHERE department_id = $2
    RETURNING
      department_id,
      department_name;
    `,
    [
      department.department_name,
      departmentId,
    ]
  );

  return result.rows[0] ?? null;
};

const remove = async (
  departmentId: number
): Promise<Department | null> => {
  const result = await pool.query<Department>(
    `
    DELETE FROM departments
    WHERE department_id = $1
    RETURNING
      department_id,
      department_name;
    `,
    [departmentId]
  );

  return result.rows[0] ?? null;
};

export const departmentService = {
  findAll,
  findById,
  create,
  update,
  remove
};