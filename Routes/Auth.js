const express = require("express");
const router = express.Router();
const AuthController = require("../Controllers/Auth");

/******************************************************************************* */

router.post("/Register", AuthController.Register);
router.post("/Login", AuthController.Login);
router.get("/Get_All_Users/:tenderId", AuthController.Get_All_Users);
module.exports = router;
