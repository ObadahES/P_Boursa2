/********************************************************************************** */ //Models
const { Offer } = require("../Models/Offer");
const { Tender } = require("../Models/Tender");
const { AppliedTenders } = require("../Models/AppliedTenders");

/********************************************************************************** */ //Validations

const { OfferValidation } = require("../Validations/Offer");
const {
  Financial_Envelope_Validation,
} = require("../Validations/Financial_envelope");
const {
  Artistic_Envelope_Validation,
} = require("../Validations/Artistic_envelope");
const { Company } = require("../Models/Company");
const { AppliedTender } = require("./Tender");

/********************************************************************************** */ //Functions
exports.Add_Offer = async (req, res) => {
  try {
    await OfferValidation.validateAsync(req?.body);

    const user = req?.user;

    const company = await Company.findOne({ Owner_id: user?._id });
    if (!company) {
      return res.status(403).send("You Are Not A Company");
    }
    if (!company.IsAgree) {
      return res.status(403).send("You Are Not An Accepted Company");
    }

    const tender = await Tender.findById(req?.params.Tender_id);
    if (!tender) {
      return res.status(404).send("Tender Not Found");
    }

    const offer = new Offer({
      Tender_id: req?.params.Tender_id,
      Financial_envelope: req?.body.Financial_envelope,
      Artistic_envelope: req?.body.Artistic_envelope,
      Company_id: company._id,
      Mobile: req?.body.Mobile,
    });
    await offer.save();
    const appliedTender = new AppliedTenders({
      Tender_id: tender.id,
      Company_id: company._id,
      Offer_id: offer._id,
    });
    await appliedTender.save();

    return res.send({
      message: "Offer Created/Updated Successfully",
      offer,
    });
  } catch (error) {
    return res.status.send(error.details?.[0]?.message || error.message);
  }
};

/********************************************************************************** */ //Functions
// exports.Add_Offer = async (req, res) => {
//   try {
//     await OfferValidation.validateAsync(req?.body);
//   } catch (error) {
//     return res.status(400).send(error);
//   }

//   const type = req?.query.type;
//   const user = req?.user;

//   const company = await Company.findOne({ Owner_id: user?._id });
//   if (!company) {
//     return res.status(403).send("You Are Not A Company");
//   }
//   if (!company.IsAgree) {
//     return res.status(403).send("You Are Not An Accepted Company");
//   }

//   const tender = await Tender.findById(req?.params.Tender_id);
//   if (!tender) {
//     return res.status(404).send("Tender Not Found");
//   }

//   // البحث عن عرض سابق لنفس الشركة والمناقصة
//   let offer = await Offer.findOne({
//     Tender_id: req?.params.Tender_id,
//     Company_id: company._id,
//   });

//   // تحديث أو إنشاء العرض حسب النوع
//   if (type === "Financial") {
//     try {
//       await Financial_Envelope_Validation.validateAsync(
//         req?.body.Financial_envelope
//       );

//       if (offer) {
//         // تعديل فقط المظروف المالي
//         offer.Financial_envelope = req?.body.Financial_envelope;
//       } else {
//         // إنشاء عرض جديد بمظروف مالي فقط
//         offer = new Offer({
//           Tender_id: req?.params.Tender_id,
//           Financial_envelope: req?.body.Financial_envelope,
//           Company_id: company._id,
//         });
//       }
//     } catch (error) {
//       return res.status(400).send(error);
//     }
//   } else if (type === "Artistic") {
//     try {
//       await Artistic_Envelope_Validation.validateAsync(
//         req?.body.Artistic_envelope
//       );

//       if (offer) {
//         // تعديل فقط المظروف الفني
//         offer.Artistic_envelope = req?.body.Artistic_envelope;
//       } else {
//         // إنشاء عرض جديد بمظروف فني فقط
//         offer = new Offer({
//           Tender_id: req?.params.Tender_id,
//           Artistic_envelope: req?.body.Artistic_envelope,
//           Company_id: company._id,
//         });
//       }
//     } catch (error) {
//       return res.status(400).send(error);
//     }
//   } else {
//     return res
//       .status(400)
//       .send("Invalid offer type, must be Financial or Artistic");
//   }

//   await offer.save();
//   const appliedTender = new AppliedTenders({
//     Tender_id: tender.id,
//     Company_id: company._id,
//     Offer_id: offer._id,
//   });
//   await appliedTender.save();

//   return res.send({
//     message: "Offer Created/Updated Successfully",
//     offer,
//   });
// };

/********************************************************************************** */

exports.Get_All_Offers = async (req, res) => {
  const offers = await Offer.find()
    .sort({ Offer_Price: 1 })
    .populate("Financial_envelope")
    .populate("Artistic_envelope");
  if (!offers) {
    return res.send(" Offer Not Found ");
  }
  return res.send(offers);
};

/********************************************************************************** */

exports.Accept_Offer = async (req, res) => {
  const offer = await Offer.findById(req?.params.OfferId);
  if (!offer) {
    return res.send(" Offer Is Not Found ");
  }

  await offer.findByIdAndUpdate(
    req?.params.OfferId,
    { $set: { IsAgree: true } },
    { new: true }
  );

  return res.send(" Accepted successfully ... ! ");
};

/********************************************************************************** */

exports.Get_Owner_Offers = async (req, res) => {
  const offers = await Offer.find({ Company_id: req?.params.CompanyId }).sort({
    Offer_Price: 1,
  });
  if (!offers) {
    return res.send(" Not Found !");
  }
  res.send(offers);
};
