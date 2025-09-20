const express = require("express");
const router = express.Router();
const AdController = require("../Controllers/Ad");
const Auth = require("../MiddleWare/Authentication");

/******************************************************************************************* */

router.post("/Add_Ad", [Auth], AdController.Add_Ad);
router.get("/Get_User_Ads", [Auth], AdController.Get_User_Ads);
router.get("/Get_All_Ads", [Auth], AdController.Get_All_Ads);
router.post("/NotifyNewAd/:Ad_id", [Auth], AdController.NotifyNewAd);
router.post("/CancelNotifyAd/:Ad_id", [Auth], AdController.CancelNotifyAd);
/******************************************************************************************* */

module.exports = router;

/******************************************************************************************* */
