/********************************************************************************** */ //Models

const { Ad } = require("../Models/Ad");
const { User } = require("../Models/User.js");
const NotifyingAds = require("../Models/NotifyingAds");

/********************************************************************************** */ //Validations

const { Ad_Validation } = require("../Validations/Ad");

/********************************************************************************** */ //Functions

exports.Add_Ad = async (req, res, next) => {
  console.log(req.body);
  try {
    await Ad_Validation.validateAsync(req?.body);
  } catch (error) {
    return res.send(error);
  }

  const ad = new Ad({
    details: req?.body.details,
    type: req?.body.Type,
    User_id: req?.user._id,
    title: req?.body.title,
    authority: req?.body.authority,
    category: req?.body.category,
    publishDate: req?.body.publishDate,
    price: req?.body.price,
  });
  await ad.save();
  res.send([{ message: " Added Successfully ", User_id: req?.user._id }]);
};

/********************************************************************************** */ //  عرض جميع الاعلانات الخاصة المستخدم

exports.Get_User_Ads = async (req, res, next) => {
  const ads = await Ad.find({ User_id: req?.user._id }).select("-__v -User_id");
  if (ads.length === 0) {
    return res.send(" Not Found ");
  }
  res.send(ads);
};

/********************************************************************************** */ // عرض جميع الاعلانات

exports.Get_All_Ads = async (req, res, next) => {
  try {
    const ads = await Ad.find().select("-__v -User_id");

    if (!ads || ads.length === 0) {
      return res.status(404).json({ error: "No ads found" });
    }

    const notifiedAds = await NotifyingAds.find({
      User_ID: req.user._id,
    });

    const notifiedIds = new Set(notifiedAds.map((na) => na.Ad_ID.toString()));

    const adsWithNotify = ads.map((ad) => {
      return {
        ...ad.toObject(),
        isNotified: notifiedIds.has(ad._id.toString()),
      };
    });

    return res.status(200).json(adsWithNotify);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

/********************************************************************************* */
/********************************************************************************************/

exports.NotifyNewAd = async (req, res) => {
  try {
    const ad = await Ad.findById(req.params.Ad_id);
    if (!ad) {
      return res.status(404).json({ error: "Ad Not Found" });
    }
    const existingNotifiedAd = await NotifyingAds.findOne({
      Ad_ID: ad._id,
      User_ID: req.user._id,
    });
    if (existingNotifiedAd) {
      return res.status(200).json({ message: "Already Notified" });
    }
    const notifiedAd = new NotifyingAds({
      Ad_ID: ad._id,
      User_ID: req.user._id,
    });
    if (!existingNotifiedAd) {
      await notifiedAd.save();
    }

    return res.status(200).json(notifiedAd);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
/********************************************************************************************/

exports.CancelNotifyAd = async (req, res) => {
  try {
    const ad = await Ad.findById(req.params.Ad_id);
    if (!ad) {
      return res.status(404).json({ error: "Ad is Not Found" });
    }
    await NotifyingAds.findOneAndDelete({
      Ad_ID: ad._id,
      User_ID: req.user._id,
    });

    return res.status(200).json({ message: "Canceled Successfully" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
