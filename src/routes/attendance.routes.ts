import express from "express";
import { attendanceController } from "../controllers/attendance.controller.js";
 

const router = express.Router();

router.get("/", attendanceController.getAttendances); // read operation
router.get("/:id", attendanceController.getAttendanceById); // read operation

router.post("/", attendanceController.createAttendance); // create operation

router.put("/:id", attendanceController.updateAttendance); // update operation

router.delete("/:id", attendanceController.deleteAttendance); // delete operation

export default router;