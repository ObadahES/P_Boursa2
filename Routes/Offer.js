const express = require("express");
const router = express.Router();
const OfferController = require("../Controllers/Offer");
const Auth = require("../MiddleWare/Authentication");
const Authorization = require("../MiddleWare/Authorization/CompanyAdmin");
/************************************************************************* */

router.post(
  "/Add_Offer/:Tender_id",
  [Auth, Authorization.CompanyAdmin],
  OfferController.Add_Offer
);

router.post("/Accept_Offer/:OfferId", OfferController.Accept_Offer);
router.get(
  "/Get_Owner_Offers/:CompanyId",
  [Auth],
  OfferController.Get_Owner_Offers
);
router.get("/Get_All_Offers", OfferController.Get_All_Offers);

/************************************************************************* */

module.exports = router;
