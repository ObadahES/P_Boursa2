const mongoose = require("mongoose");

/********************************************************************** */

const { FinancialSchema } = require("./Financial_envelope");
const { ArtisticSchema } = require("./Artistic_envelope");

/********************************************************************** */

const OfferSchema = new mongoose.Schema({
  Tender_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Tender",
  },
  Financial_envelope: {
    type: FinancialSchema,
  },
  Artistic_envelope: {
    type: ArtisticSchema,
  },
  Company_id: { type: mongoose.Schema.Types.ObjectId, ref: "Company" },
  Timestamps: { type: Date, default: Date.now() },
  IsAgree: { type: Boolean, default: false },
});

/********************************************************************** */

const Offer = mongoose.model("Offer", OfferSchema);
/********************************************************************** */

exports.Offer = Offer;
