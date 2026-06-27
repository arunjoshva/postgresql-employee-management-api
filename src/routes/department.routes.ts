import express from "express";
import { departmentController } from "../controllers/department.controller.js";

const router = express.Router();

router.get("/", departmentController.getDepartments); // read operation

router.get("/:id", departmentController.getDepartmentById); // read operation

router.post("/", departmentController.createDepartment); // create operation

router.put("/:id", departmentController.updateDepartment); // update operation

router.delete("/:id", departmentController.deleteDepartment); // delete operation

export default router;