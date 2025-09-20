const mongoose = require("mongoose");

/********************************************************************** */

const AccountSchema = new mongoose.Schema({
  Balance: { type: Number },
  // Account_Type: {type:String},
  Company_id: { type: mongoose.Schema.Types.ObjectId, ref: "Company" },
});

const PaymentAccount = new mongoose.model("PaymentAccount", AccountSchema);

exports.PaymentAccount = PaymentAccount;
