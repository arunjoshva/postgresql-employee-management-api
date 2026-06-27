import { Request, Response } from "express";

import { departmentService } from "../services/department.service.js";

import {
  CreateDepartmentRequest,
  UpdateDepartmentRequest,
} from "../types/department.types.js";

const getDepartments = async (
  _req: Request,
  res: Response
) => {
  try {
    const departments =
      await departmentService.findAll();

    return res.status(200).json(departments);

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Failed to fetch departments.",
    });
  }
};

const getDepartmentById = async (
  req: Request,
  res: Response
) => {
  try {
    const departmentId = Number(req.params.id);

    if (Number.isNaN(departmentId)) {
      return res.status(400).json({
        message: "Invalid department id.",
      });
    }

    const department =
      await departmentService.findById(departmentId);

    if (!department) {
      return res.status(404).json({
        message: "Department not found.",
      });
    }

    return res.status(200).json(department);

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Failed to fetch department.",
    });
  }
};

const createDepartment = async (
  req: Request,
  res: Response
) => {
  try {
    const department: CreateDepartmentRequest =
      req.body;

    const newDepartment =
      await departmentService.create(department);

    return res.status(201).json(newDepartment);

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Failed to create department.",
    });
  }
};

const updateDepartment = async (
  req: Request,
  res: Response
) => {
  try {
    const departmentId = Number(req.params.id);

    if (Number.isNaN(departmentId)) {
      return res.status(400).json({
        message: "Invalid department id.",
      });
    }

    const department: UpdateDepartmentRequest =
      req.body;

    const updatedDepartment =
      await departmentService.update(
        departmentId,
        department
      );

    if (!updatedDepartment) {
      return res.status(404).json({
        message: "Department not found.",
      });
    }

    return res.status(200).json(updatedDepartment);

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Failed to update department.",
    });
  }
};

const deleteDepartment = async (
  req: Request,
  res: Response
) => {
  try {
    const departmentId = Number(req.params.id);

    if (Number.isNaN(departmentId)) {
      return res.status(400).json({
        message: "Invalid department id.",
      });
    }

    const deletedDepartment =
      await departmentService.remove(departmentId);

    if (!deletedDepartment) {
      return res.status(404).json({
        message: "Department not found.",
      });
    }

    return res.status(200).json({
      message: "Department deleted successfully.",
      department: deletedDepartment,
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Failed to delete department.",
    });
  }
};

export const departmentController = {
  getDepartments,
  getDepartmentById,
  createDepartment,
  updateDepartment,
  deleteDepartment,
};