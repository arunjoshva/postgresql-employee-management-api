export interface Attendance {
  attendance_id: number;
  employee_id: number;
  attendance_date: Date;
  status: string;
}

export interface CreateAttendanceRequest {
  employee_id: number;
  attendance_date: Date;
  status: string;
}

export interface UpdateAttendanceRequest {
  employee_id: number;
  attendance_date: Date;
  status: string;
}