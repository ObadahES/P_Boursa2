const express = require("express");
const router = express.Router();
const Admin = require("../Controllers/Admin");
const Auth = require("../MiddleWare/Authentication");
const Authorization = require("../MiddleWare/Authorization/DashBoard");

/*************************************************************************** */

router.post(
  "/Accept_Company_Request/:Company_id",
  [Auth, Authorization.App_Owner],
  Admin.Accept_Company_Request
);

router.post(
  "/Remove_Company/:Company_id",
  [Auth, Authorization.App_Owner],
  Admin.Remove_Company
);

router.post(
  "/Reject_Company_Request/:Company_id",
  [Auth, Authorization.App_Owner],
  Admin.Rejecting_The_Request
);

/*************************************************************************** */
module.exports = router;
