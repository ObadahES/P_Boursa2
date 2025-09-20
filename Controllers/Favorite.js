/********************************************************************************************/ //Models
const { User } = require("../Models/User");
const { Tender } = require("../Models/Tender");
const { Favorite } = require("../Models/Favorite");
/********************************************************************************************/ //Validations
// const { Favorite_Validation } = require("../Validations/Favorite");

/********************************************************************************************/ //Functions

exports.Add_Remove_Item = async (req, res) => {
  const user = await User.findById(req?.user._id);
  if (!user) {
    res.send(" User Is Not Found ");
  }
  const tender = await Tender.findById(req?.params.TenderId);
  if (!tender) {
    res.send(" Tender Is Not Found ");
  }

  const test = await Favorite.findOne({ Tender_id: req?.params.TenderId });
  if (test) {
    await Favorite.findOneAndDelete(req?.params.TenderId);
    return res.send(" Deleted Succussfully ! ");
  }
  const item = new Favorite({
    Tender_id: req?.params.TenderId,
    User_id: req?.user._id,
  });
  await item.save();
  return res.send(" Added Succussfully ! ");
};
/************************************************************************************ */

// exports.RemoveItem = async (req, res) => {
//   const item = await Favorite.findById(req?.params.ItemId);
//   if (!item) {
//     return res.send(" Item Is Not Found ");
//   }
//   await Favorite.findByIdAndDelete(req?.params.ItemId);
//   return res.send(" Deleted Succussfully ! ");
// };
