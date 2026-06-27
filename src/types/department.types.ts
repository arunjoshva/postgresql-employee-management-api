export interface Department {
  department_id: number;
  department_name: string;
}

export interface CreateDepartmentRequest {
  department_name: string;
}

export interface UpdateDepartmentRequest {
  department_name: string;
}