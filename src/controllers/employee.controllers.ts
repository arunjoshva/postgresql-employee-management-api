import { Request, Response } from "express";
import { employeeService } from "../services/employee.service.js";
import { createEmployeeRequest, updateEmployeeRequest } from "../types/employee.types.js";

const getEmployees = async (req: Request, res: Response) => {
    try {
        const employees = await employeeService.findAll();

        res.status(200).json(employees);
    } catch (err) {
        console.error(err);

        res.status(500).json({
            message: "Failed to fetch employees "
        });
    }
};

const getEmployeeById = async (req: Request, res: Response) => {
    try {
        const employeeId = Number(req.params.id);

        if(Number.isNaN(employeeId)){
            return res.status(400).json({
                message: "Invalid Employee Id"
            });
        }


        const employee = await employeeService.findById(employeeId);

        if(!employee){
            return res.status(404).json({
                message: "Employee Not Found"
            });
        }

        return res.status(200).json(employee);
    } catch (error) {
        return res.status(500).json({
            message: "Failed to fetch Employee"
        });
    }
}

const createEmployee = async (req: Request, res: Response) => {
    try {
        const employee: createEmployeeRequest = req.body;

        const newEmployee = await employeeService.create(employee);

        return res.status(201).json(newEmployee);
    } catch (err) {
        console.error(err);

        return res.status(500).json({
            message: "Failed to create Employee"
        });
    }
}

const updateEmployee = async (req: Request, res: Response) => {
    try {
        const employeeId = Number(req.params.id);

        if(Number.isNaN(employeeId)){
            return res.status(400).json({
                message: "Invalid Employee Id"
            });
        }

        const employee: updateEmployeeRequest = req.body;

        const updatedEmployee = await employeeService.update(employeeId, employee);

        if(!updatedEmployee){
            return res.status(400).json({
                message: "Employee Not Found"
            })
        }

        return res.status(200).json(updatedEmployee);
    } catch (err) {
        console.error(err);

        res.status(500).json({
            message: "Failed to update Employee"
        });
    }
}

const deleteEmployee = async (req: Request, res: Response) => {
    try {

        const employeeId = Number(req.params.id);

        if(Number.isNaN(employeeId)){
            return res.status(400).json({
                message: "Invalid employee id"
            });
        }

        const deletedEmployee = await employeeService.remove(employeeId);

        if(!deletedEmployee){
            res.status(404).json({
                message: "Employee Not Found"
            });
        }

        return res.status(200).json({
            message: "Employee deleted successfully",
            employee: deletedEmployee
        });
    } catch (err){
        console.error(err);

        return res.status(500).json({
            message: "Failed to delete employee"
        });
    }
}

export const employeeController = {
    getEmployees,
    getEmployeeById,
    createEmployee,
    updateEmployee,
    deleteEmployee
};