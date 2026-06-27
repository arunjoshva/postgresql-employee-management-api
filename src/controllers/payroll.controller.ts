import { Request, Response } from "express";

import { payrollService } from "../services/payroll.service.js";

import {
  CreatePayrollRequest,
  UpdatePayrollRequest,
} from "../types/payroll.types.js";

const getPayrolls = async (
  _req: Request,
  res: Response
) => {
  try {
    const payrolls = await payrollService.findAll();

    return res.status(200).json(payrolls);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Failed to fetch payroll records.",
    });
  }
};

const getPayrollById = async (
  req: Request,
  res: Response
) => {
  try {
    const payrollId = Number(req.params.id);

    if (Number.isNaN(payrollId)) {
      return res.status(400).json({
        message: "Invalid payroll id.",
      });
    }

    const payroll = await payrollService.findById(payrollId);

    if (!payroll) {
      return res.status(404).json({
        message: "Payroll record not found.",
      });
    }

    return res.status(200).json(payroll);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Failed to fetch payroll record.",
    });
  }
};

const createPayroll = async (
  req: Request,
  res: Response
) => {
  try {
    const payroll: CreatePayrollRequest = req.body;

    const newPayroll = await payrollService.create(payroll);

    return res.status(201).json(newPayroll);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Failed to create payroll record.",
    });
  }
};

const updatePayroll = async (
  req: Request,
  res: Response
) => {
  try {
    const payrollId = Number(req.params.id);

    if (Number.isNaN(payrollId)) {
      return res.status(400).json({
        message: "Invalid payroll id.",
      });
    }

    const payroll: UpdatePayrollRequest = req.body;

    const updatedPayroll = await payrollService.update(
      payrollId,
      payroll
    );

    if (!updatedPayroll) {
      return res.status(404).json({
        message: "Payroll record not found.",
      });
    }

    return res.status(200).json(updatedPayroll);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Failed to update payroll record.",
    });
  }
};

const deletePayroll = async (
  req: Request,
  res: Response
) => {
  try {
    const payrollId = Number(req.params.id);

    if (Number.isNaN(payrollId)) {
      return res.status(400).json({
        message: "Invalid payroll id.",
      });
    }

    const deletedPayroll = await payrollService.remove(payrollId);

    if (!deletedPayroll) {
      return res.status(404).json({
        message: "Payroll record not found.",
      });
    }

    return res.status(200).json({
      message: "Payroll record deleted successfully.",
      payroll: deletedPayroll,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Failed to delete payroll record.",
    });
  }
};

export const payrollController = {
  getPayrolls,
  getPayrollById,
  createPayroll,
  updatePayroll,
  deletePayroll,
};