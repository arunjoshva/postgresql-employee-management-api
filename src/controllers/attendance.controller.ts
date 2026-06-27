import { Request, Response } from "express";

import { attendanceService } from "../services/attendance.service.js";

import {
  CreateAttendanceRequest,
  UpdateAttendanceRequest,
} from "../types/attendance.types.js";

const getAttendances = async (
  _req: Request,
  res: Response
) => {
  try {
    const attendances = await attendanceService.findAll();

    return res.status(200).json(attendances);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Failed to fetch attendance records.",
    });
  }
};

const getAttendanceById = async (
  req: Request,
  res: Response
) => {
  try {
    const attendanceId = Number(req.params.id);

    if (Number.isNaN(attendanceId)) {
      return res.status(400).json({
        message: "Invalid attendance id.",
      });
    }

    const attendance = await attendanceService.findById(
      attendanceId
    );

    if (!attendance) {
      return res.status(404).json({
        message: "Attendance record not found.",
      });
    }

    return res.status(200).json(attendance);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Failed to fetch attendance record.",
    });
  }
};

const createAttendance = async (
  req: Request,
  res: Response
) => {
  try {
    const attendance: CreateAttendanceRequest = req.body;

    const newAttendance =
      await attendanceService.create(attendance);

    return res.status(201).json(newAttendance);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Failed to create attendance record.",
    });
  }
};

const updateAttendance = async (
  req: Request,
  res: Response
) => {
  try {
    const attendanceId = Number(req.params.id);

    if (Number.isNaN(attendanceId)) {
      return res.status(400).json({
        message: "Invalid attendance id.",
      });
    }

    const attendance: UpdateAttendanceRequest = req.body;

    const updatedAttendance =
      await attendanceService.update(
        attendanceId,
        attendance
      );

    if (!updatedAttendance) {
      return res.status(404).json({
        message: "Attendance record not found.",
      });
    }

    return res.status(200).json(updatedAttendance);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Failed to update attendance record.",
    });
  }
};

const deleteAttendance = async (
  req: Request,
  res: Response
) => {
  try {
    const attendanceId = Number(req.params.id);

    if (Number.isNaN(attendanceId)) {
      return res.status(400).json({
        message: "Invalid attendance id.",
      });
    }

    const deletedAttendance =
      await attendanceService.remove(attendanceId);

    if (!deletedAttendance) {
      return res.status(404).json({
        message: "Attendance record not found.",
      });
    }

    return res.status(200).json({
      message: "Attendance record deleted successfully.",
      attendance: deletedAttendance,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Failed to delete attendance record.",
    });
  }
};

export const attendanceController = {
  getAttendances,
  getAttendanceById,
  createAttendance,
  updateAttendance,
  deleteAttendance,
};