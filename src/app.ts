import express from "express";
import dotenv from "dotenv";
import employeeRoutes from "./routes/employee.routes.js";
import departmentRoutes from "./routes/department.routes.js";
import attendanceRoutes from "./routes/attendance.routes.js";
import payrollRoutes from "./routes/payroll.routes.js";

dotenv.config();

const app = express();

//middleware
app.use(express.json());

// Root Route
app.get("/", (_req, res) => {
  res.status(200).json({
    project: "Employee Management REST API",
    status: "Running",
    version: "1.0.0",
    endpoints: {
      employees: "/api/v1/employees",
      departments: "/api/v1/departments",
      attendance: "/api/v1/attendance",
      payroll: "/api/v1/payroll",
    },
  });
});

//register the route
app.use("/api/v1/employees", employeeRoutes);
app.use("/api/v1/departments", departmentRoutes);
app.use("/api/v1/attendance", attendanceRoutes);
app.use("/api/v1/payroll", payrollRoutes );


export default app;