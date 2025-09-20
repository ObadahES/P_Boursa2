const express = require("express");
const router = express.Router();
const Tender_C_Controller = require("../Controllers/Comments/Tender_Comment");
const Ad_C_Controller = require("../Controllers/Comments/Ad_Comment");
const Auth = require("../MiddleWare/Authentication");

/*************************************************************************** */ //Tenders Comments

router.post(
  "/Add_Tender_Comment/:Tender_id",
  [Auth],
  Tender_C_Controller.Add_Tender_Comment
);
router.post(
  "/Add_Tender_Comment_Reply/:Parent_id",
  [Auth],
  Tender_C_Controller.Add_Tender_Comment_Reply
);
router.get(
  "/Get_All_Tender_Comments/:Tender_id",
  [Auth],
  Tender_C_Controller.Get_All_Tender_Comments
);
router.get(
  "/Get_Tender_Comment_Replies/:Parent_id",
  [Auth],
  Tender_C_Controller.Get_Tender_Comment_Replies
);

/*************************************************************************** */ // Ads Comments

router.post("/Add_Ad_Comment/:Ad_id", [Auth], Ad_C_Controller.Add_Ad_Comment);
router.post(
  "/Add_Ad_Comment_Reply/:Parent_id",
  [Auth],
  Ad_C_Controller.Add_Ad_Comment_Reply
);
router.get(
  "/Get_All_Ad_Comments/:Ad_id",
  [Auth],
  Ad_C_Controller.Get_All_Ad_Comments
);
router.get(
  "/Get_Ad_Comment_Replies/:Parent_id",
  [Auth],
  Ad_C_Controller.Get_Ad_Comment_Replies
);

/*************************************************************************** */

module.exports = router;
