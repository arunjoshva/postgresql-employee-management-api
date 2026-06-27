import { pool } from "../config/db.js"
import { createEmployeeRequest, Employee, updateEmployeeRequest } from "../types/employee.types.js";

const findAll = async (): Promise<Employee[]> => {
    const result = await pool.query<Employee>(`
        SELECT
            employee_id,
            first_name,
            last_name,
            email,
            phone,
            salary,
            department_id
        FROM employees
        ORDER BY employee_id;        
        `);

    return result.rows;
}

const findById = async (employeeId: Number): Promise<Employee | null> => {
    const result = await pool.query<Employee>(`
        SELECT
            employee_id,
            first_name,
            last_name,
            email,
            phone,
            salary,
            department_id
        FROM employees
        WHERE employee_id = $1`,
        [employeeId]
    );

    return result.rows[0] ?? null;
}

const create = async (employee: createEmployeeRequest): Promise<Employee> => {
    const result = await pool.query<Employee>(
        `
        INSERT INTO employees(
            first_name,
            last_name,
            email,
            phone,
            salary,
            department_id
        )
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING
            employee_id,
            first_name,
            last_name,
            email,
            phone,
            salary,
            department_id        
        `, 
        [
            employee.first_name,
            employee.last_name,
            employee.email,
            employee.phone,
            employee.salary,
            employee.department_id
        ]
    );

    return result.rows[0]!;
};

const update = async (employeeId: number, employee: updateEmployeeRequest): Promise<Employee | null> => {
    
    const result = await pool.query<Employee>(
        `
            UPDATE employees
            SET 
                first_name = $1,
                last_name = $2,
                email = $3,
                phone = $4,
                salary = $5,
                department_id = $6
            WHERE employee_id = $7
            RETURNING 
                employee_id,
                first_name,
                last_name,
                email,
                phone,
                salary,
                department_id;
        `,
        [
            employee.first_name,
            employee.last_name,
            employee.email,
            employee.phone,
            employee.salary,
            employee.department_id,
            employeeId
        ]
    );

    return result.rows[0] ?? null;
};

const remove = async (employeeId: number): Promise<Employee | null> => {
    const result = await pool.query<Employee>(
        `
            DELETE FROM employees
            WHERE employee_id = $1
            RETURNING
                employee_id,
                first_name,
                last_name,
                email,
                phone,
                salary,
                department_id
        `,
        [employeeId]        
    );

    return result.rows[0] ?? null;
}

export const employeeService = {
    findAll, 
    findById,
    create,
    update,
    remove
};