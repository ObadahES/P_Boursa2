/**************************************************************************** */ //Models

const { PaymentAccount } = require("../Models/Payment_Account");
const { PaymentHistory } = require("../Models/Payment_History");

/**************************************************************************** */ //Validations

const {
  PaymentAccount_Validation,
  TransferMoney_Validation,
  AddBalance_Validation,
} = require("../Validations/PaymentAccount");

/**************************************************************************** */

exports.Get_All_Accounts = async (req, res) => {
  const accounts = await PaymentAccount.find();
  if (!accounts) {
    return res.send(" No Accounts Found ");
  }
  return res.send(accounts);
};

/**************************************************************************** */ //Functions
exports.CreateAccount = async (req, res) => {
  try {
    await PaymentAccount_Validation.validateAsync(req?.body);
  } catch (error) {
    return res.send(error.details[0].message);
  }
  const test = await PaymentAccount.findOne({
    Company_id: req?.params.CompanyId,
  });
  if (test) {
    return res.send(" Account Is Already Exists ");
  }
  const account = new PaymentAccount({
    Account_Number: req?.body.Account_Number,
    Balance: req?.body.Balance,
    Company_id: req?.params.CompanyId,
  });

  await account.save();
  return res.send(" Account Created Succussfully ! ");
};

/**************************************************************************** */

exports.Add_Balance = async (req, res) => {
  try {
    await AddBalance_Validation.validateAsync(req?.body);
  } catch (error) {
    return res.send(error.details[0].message);
  }

  const test = await PaymentAccount.findById(req?.params.ReceiverId);
  if (!test) {
    return res.send(" Receiver Account Is Not Found ");
  }

  const receiver = await PaymentAccount.findByIdAndUpdate(
    req?.params.ReceiverId,
    { $inc: { Balance: req?.body.Amount } },
    { new: true }
  );

  //   await account.save();
  return res.send(" Balance Updated Succussfully ! ");
};
/**************************************************************************** */

exports.TransferMoney = async (req, res) => {
  try {
    await TransferMoney_Validation.validateAsync(req?.body);
  } catch (error) {
    return res.send(error.details[0].message);
  }

  const receiver = await PaymentAccount.findById(req?.params.ReceiverId);
  if (!receiver) {
    return res.send(" Receiver Account Is Not Found ");
  }

  const sender = await PaymentAccount.findById(req?.params.SenderId);
  if (!sender) {
    return res.send("Sender Account Is Not Found ");
  }

  if (sender.Balance - req?.body.Amount < 0) {
    return res.send(" You Don't Have Enough Balance ");
  }

  await PaymentAccount.findByIdAndUpdate(req?.params.ReceiverId, {
    $inc: { Balance: req?.body.Amount },
  });

  await PaymentAccount.findByIdAndUpdate(req?.params.SenderId, {
    $inc: { Balance: -req?.body.Amount },
  });

  const history = new PaymentHistory({
    SenderId: req?.params.SenderId,
    ReceiverId: req?.params.ReceiverId,
    Amount: req?.body.Amount,
  });

  await history.save();

  return res.send(" Sent Succussfully ! ");
};
