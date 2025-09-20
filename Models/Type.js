const mongoose = require("mongoose");

/********************************************************** */
const TypeSchema = new mongoose.Schema({
  Name: { type: String, unique: true },
});
const Type = mongoose.model("Type", TypeSchema);

/********************************************************** */
exports.Type = Type;
