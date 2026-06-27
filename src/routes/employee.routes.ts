import express from "express";
import { employeeController } from "../controllers/employee.controllers.js";

const router = express.Router(); // creates mini express application

router.get("/", employeeController.getEmployees); // read operation

router.get("/:id", employeeController.getEmployeeById); // read operation

router.post("/", employeeController.createEmployee); // create operation

router.put("/:id", employeeController.updateEmployee); // update operation put request

router.delete("/:id", employeeController.deleteEmployee); // delete operation

export default router;