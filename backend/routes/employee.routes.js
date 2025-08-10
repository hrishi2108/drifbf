const express = require("express");
const router = express.Router();
const employeeController = require("../controllers/employee.controller");

router.post("/", employeeController.addEmployee);
router.get("/", employeeController.getEmployees);
router.get("/:id", employeeController.getEmployeeById);
router.put("/:id", employeeController.updateEmployee);

module.exports = router;
