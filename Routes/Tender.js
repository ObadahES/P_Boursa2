const express = require("express");
const router = express.Router();
const TenderController = require("../Controllers/Tender");
const Auth = require("../MiddleWare/Authentication");
const Authorization = require("../MiddleWare/Authorization/CompanyAdmin");

/*************************************************************************** */

router.post("/Add_Tender", [Auth], TenderController.Add_Tender);
router.get(
  "/Get_All_User_Tenders",
  [Auth],
  TenderController.Get_All_User_Tenders
);
router.get("/Get_All_Tenders", [Auth], TenderController.Get_All_Tenders);
router.post(
  "/Add_Tender_Type/:Tender_id",
  [Auth],
  TenderController.Add_Tender_Type
);

router.get(
  "/AppliedTenders",
  [Auth, Authorization.CompanyAdmin],
  TenderController.AppliedTenders
);
router.post(
  "/Add_Tender_Users/:Tender_id",
  [Auth],
  TenderController.Add_Tender_Users
);
router.delete(
  "/Delete_Tender/:Tender_id",
  [Auth],
  TenderController.DeleteTender
);
router.post(
  "/SaveNewTender/:Tender_id",
  [Auth],
  TenderController.SaveNewTender
);

router.post(
  "/CancelSavedTender/:Tender_id",
  [Auth],
  TenderController.CancelSavedTender
);
router.get("/GetSavedTenders", [Auth], TenderController.SavedTenders);

/*************************************************************************** */

module.exports = router;
