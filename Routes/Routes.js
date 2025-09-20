const express = require("express");
const router = express.Router();

router.use("/file", require("./Upload"));
router.use("/Evaluation", require("./Evaluation"));
router.use("/Company", require("./Company"));
router.use("/Auth", require("./Auth"));
router.use("/Ad", require("./Ad"));
router.use("/Tender", require("./Tender"));
router.use("/Offer", require("./Offer"));
router.use("/Payment", require("./PaymentAccount"));
router.use("/Favorite", require("./Favortie"));
router.use("/Comment", require("./Comment"));
router.use("/Admin", require("./Admin"));
// router.use("/Artistic", require("./Artistic"));
// router.use("/Financial", require("./Financial"));

module.exports = router;
