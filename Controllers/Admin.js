const { Company } = require("../Models/Company");

/******************************************************************** */

exports.Accept_Company_Request = async (req, res) => {
  const request = await Company.findById(req?.params.Company_id);

  if (!request) {
    return res.send(" Request Is Not Found !");
  }

  if (request.IsAgree == true) {
    return res.send("Already Accepted");
  }

  await Company.findByIdAndUpdate(req?.params.Company_id, {
    $set: {
      IsAgree: true,
    },
  });

  res.send(" The Request Has Been Approved ");
};

/******************************************************************** */

exports.Rejecting_The_Request = async (req, res) => {
  const request = await Company.findById(req?.params.Company_id);

  if (!request) {
    return res.send(" Request Is Not Found !");
  }

  if (request.IsAgree == false) {
    return res.send("Already Rejected");
  }

  await Company.findByIdAndUpdate(req?.params.Company_id, {
    $set: {
      IsRejected: true,
    },
  });

  res.send(" The Request Has Been Rejected ");
};

/******************************************************************** */
exports.Remove_Company = async (req, res) => {
  const company = await Company.findById(req?.params.Company_id);

  if (!company) {
    return res.send(" Company Is Not Found !");
  }

  await Company.findByIdAndUpdate(req?.params.Company_id, {
    $set: {
      IsAgree: false,
    },
  });

  res.send(" The Company Has Been Removed ");
};
