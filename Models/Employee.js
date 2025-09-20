const mongoose = require("mongoose");

/************************************************************************************** */

const EmployeeSchema = new mongoose.Schema({
  // First_Name: { type: String },
  // Last_Name: { type: String },
  Occupation: { type: String },
  Company_id: { type: mongoose.Schema.Types.ObjectId, ref: "Company" },
  User_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  Role: {
    type: String,
    enum: ["Financial officer", "Agent", "Deputy", "Employee"],
    default: "Employee",
  },
  IsAgree: { type: Boolean, default: false },
  IsAdmin: { type: Boolean, default: false },
  IsBoss: { type: Boolean, default: false },
});

const Employee = mongoose.model("Employee", EmployeeSchema);

/************************************************************************************** */

exports.Employee = Employee;
