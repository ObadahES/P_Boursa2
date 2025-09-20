/**************************************************************************** */ //Models
const { User } = require("../Models/User");
const { Team_User } = require("../Models/Team_User");
const { Tender } = require("../Models/Tender");
const { Offer } = require("../Models/Offer");
const { Evaluation } = require("../Models/Evaluation");
const { Team } = require("../Models/Team");
/**************************************************************************** */ //Validations
const { Team_Validation } = require("../Validations/Team");
const { Evaluation_Validation } = require("../Validations/Evaluation");

/**************************************************************************** */ //Functions

exports.Create_Team = async (req, res) => {
  try {
    await Team_Validation.validateAsync(req?.body);
  } catch (error) {
    return res.send(error);
  }
  const UserTest = await User.findById(req?.user._id);
  if (!UserTest) {
    return res.send(" User Is Not Fonud !");
  }

  const team = new Team({
    Name: req?.body.Name,
    Maximum_Members: req?.body.Maximum_Members,
  });

  await team.save();

  await Tender.findByIdAndUpdate(req?.params.Tender_id, {
    $set: {
      Team_id: team._id,
    },
  });

  return res.send(" Team Has Been Created Successfully ... ");
};

/**************************************************************************** */

exports.Add_Member = async (req, res) => {
  const UserTest = await User.findById(req?.params.User_id);
  if (!UserTest) {
    return res.send(" User Is Not Fonud !");
  }
  const TeamTest = await Team.findById(req?.params.Team_id);
  if (!TeamTest) {
    return res.send(" Team Is Not Fonud !");
  }

  if (TeamTest.MembersNumber >= TeamTest.Maximum_Members) {
    return res.send(" Members Are Complete ");
  }

  const JoinTest = await Team_User.findOne({
    Team_id: req?.params.Team_id,
    User_id: req?.params.User_id,
  });

  if (JoinTest) {
    return res.send(" User Is Already Joined This Team ");
  }

  const member = new Team_User({
    Team_id: req.params.Team_id,
    User_id: req.params.User_id,
  });

  await member.save();

  await Team.findByIdAndUpdate(req?.params.Team_id, {
    $inc: {
      MembersNumber: 1,
    },
  });

  return res.send(" Member Has Been Joined  ");
};

/**************************************************************************** */

exports.Add_Evaluation = async (req, res) => {
  try {
    await Evaluation_Validation.validateAsync(req?.body);
  } catch (error) {
    return res.send(error);
  }
  const UserTest = await User.findById(req?.user._id);

  if (!UserTest) {
    return res.send(" User Is Not Fonud !");
  }
  const offer = await Offer.findById(req?.params.Offer_id);

  if (!offer) {
    return res.send("Offer Is Not Found !");
  }

  const tender = await Tender.findById(offer.Tender_id);

  const JoinTest = await Team_User.findOne({
    User_id: req?.user._id,
    Team_id: tender.Team_id,
  });

  if (!JoinTest) {
    return res.send(" You Are Not A Member In This Tender Team ");
  }

  const EvaluationTest = await Evaluation.findOne({
    User_id: req?.user._id,
    Offer_id: req?.params.Offer_id,
  });

  if (EvaluationTest) {
    await Evaluation.findByIdAndUpdate(EvaluationTest._id, {
      $set: { Rate: req?.body.Rate, Description: req?.body.Description },
    });
    return res.send(" Evauation Updated Successfully ! ");
  }

  const evaluation = new Evaluation({
    Description: req?.body.Description,
    Rate: req?.body.Rate,
    User_id: req?.user._id,
    Offer_id: req?.params.Offer_id,
    Team_id: req?.params.Team_id,
  });

  await evaluation.save();
  return res.send(" Evaluated Successfully ... ");
};

/**************************************************************************** */
