const express = require("express");
const router = express.Router();
const EvaluationController = require("../Controllers/Evaluation");
const Auth = require("../MiddleWare/Authentication");
// const Authorization = require("../MiddleWare/Authorization");

/************************************************************************* */

router.post(
  "/Add_Evaluation/:Offer_id",
  [Auth],
  EvaluationController.Add_Evaluation
);

router.post(
  "/Create_Team/:Tender_id",
  [Auth],
  EvaluationController.Create_Team
);

router.post(
  "/Add_Member/:User_id/:Team_id",
  [Auth],
  EvaluationController.Add_Member
);

/************************************************************************* */

module.exports = router;
