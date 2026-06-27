import express from "express";
import { payrollController } from "../controllers/payroll.controller.js";

const router = express.Router(); // creates mini express application and need to mount it into the main express application

router.get("/", payrollController.getPayrolls); // read operation
router.get("/:id", payrollController.getPayrollById) // read operation

router.post("/", payrollController.createPayroll); // create operation

router.put("/:id", payrollController.updatePayroll); // update operation

router.delete("/:id", payrollController.deletePayroll); // delete operation

export default router;
