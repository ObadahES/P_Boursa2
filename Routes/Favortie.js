const express = require("express");
const router = express.Router();
/*******************************************************************************************************/ //MiddleWare
const Auth = require("../MiddleWare/Authentication");
// const Authorization = require("../MiddleWare/Authorization");
/*******************************************************************************************************/ //Models

/*******************************************************************************************************/ //Controllers
const FavoriteController = require("../Controllers/Favorite");
/*******************************************************************************************************/ //Functions

router.post(
  "/Add_Remove_Item/:TenderId",
  [Auth],
  FavoriteController.Add_Remove_Item
);
// router.post("/Remove/:ItemId", FavoriteController.RemoveItem);

module.exports = router;
