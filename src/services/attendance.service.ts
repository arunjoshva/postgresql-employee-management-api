import { pool } from "../config/db.js";

import {
  Attendance,
  CreateAttendanceRequest,
  UpdateAttendanceRequest,
} from "../types/attendance.types.js";

const findAll = async (): Promise<Attendance[]> => {
  const result = await pool.query<Attendance>(`
    SELECT
      attendance_id,
      employee_id,
      attendance_date,
      status
    FROM attendance
    ORDER BY attendance_id;
  `);

  return result.rows;
};

const findById = async (
  attendanceId: number
): Promise<Attendance | null> => {
  const result = await pool.query<Attendance>(
    `
    SELECT
      attendance_id,
      employee_id,
      attendance_date,
      status
    FROM attendance
    WHERE attendance_id = $1;
    `,
    [attendanceId]
  );

  return result.rows[0] ?? null;
};

const create = async (
  attendance: CreateAttendanceRequest
): Promise<Attendance> => {
  const result = await pool.query<Attendance>(
    `
    INSERT INTO attendance (
      employee_id,
      attendance_date,
      status
    )
    VALUES ($1, $2, $3)
    RETURNING
      attendance_id,
      employee_id,
      attendance_date,
      status;
    `,
    [
      attendance.employee_id,
      attendance.attendance_date,
      attendance.status,
    ]
  );

  return result.rows[0]!;
};

const update = async (
  attendanceId: number,
  attendance: UpdateAttendanceRequest
): Promise<Attendance | null> => {
  const result = await pool.query<Attendance>(
    `
    UPDATE attendance
    SET
      employee_id = $1,
      attendance_date = $2,
      status = $3
    WHERE attendance_id = $4
    RETURNING
      attendance_id,
      employee_id,
      attendance_date,
      status;
    `,
    [
      attendance.employee_id,
      attendance.attendance_date,
      attendance.status,
      attendanceId,
    ]
  );

  return result.rows[0] ?? null;
};

const remove = async (
  attendanceId: number
): Promise<Attendance | null> => {
  const result = await pool.query<Attendance>(
    `
    DELETE FROM attendance
    WHERE attendance_id = $1
    RETURNING
      attendance_id,
      employee_id,
      attendance_date,
      status;
    `,
    [attendanceId]
  );

  return result.rows[0] ?? null;
};

export const attendanceService = {
  findAll,
  findById,
  create,
  update,
  remove,
};