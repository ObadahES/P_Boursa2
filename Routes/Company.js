const express = require("express");
const router = express.Router();
const CompanyController = require("../Controllers/Company");
const EmployeeController = require("../Controllers/Employee");
const CompanyAdmin = require("../MiddleWare/Authorization/CompanyAdmin");
const Auth = require("../MiddleWare/Authentication");

/******************************************************************************* */

router.post(
  "/CreateCompany",
  [Auth],
  CompanyController.Create_Company_Account_Request
);

router.post(
  "/Get_All_Requests_Get_All_Companies",
  [Auth],
  CompanyController.Get_All_Requests_Companies
);

router.post(
  "/Join_Company_Request",
  [Auth],
  EmployeeController.JoinCompanyRequest
);

router.post("/Get_All_Companies", [Auth], CompanyController.Get_All_Companies);

router.post(
  "/Accept_Employee/:Employee_id",
  [Auth, CompanyAdmin.CompanyAdmin],
  EmployeeController.Accept_Employee
);

router.post(
  "/ChangeRoleStatus/:EmployeeId",
  [Auth, CompanyAdmin.CompanyAdmin],
  EmployeeController.ChangeRoleStatus
);

router.post(
  "/ChangeAdminStatus/:Employee_id",
  [Auth, CompanyAdmin.CompanyBoss],
  EmployeeController.ChangeAdminStatus
);
/******************************************************************************* */
module.exports = router;
