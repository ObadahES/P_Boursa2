const express = require("express");
const router = express.Router();
/*******************************************************************************************************/ //MiddleWare
// const Authorization = require("../MiddleWare/Authorization");
/*******************************************************************************************************/ //Controllers

const PaymentController = require("../Controllers/PaymentAccount");

/******************************************************************************************************* */
/******************************************************************************************************* */

router.post("/CreateAccount/:CompanyId", PaymentController.CreateAccount);
router.post("/Add_Balance/:ReceiverId", PaymentController.Add_Balance);
router.post(
  "/TransferMoney/:ReceiverId/:SenderId",
  PaymentController.TransferMoney
);

module.exports = router;
