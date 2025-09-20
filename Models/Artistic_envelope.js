const mongoose = require("mongoose");

/************************************************************************** */

const ArtisticSchema = new mongoose.Schema({
  Previous_work: { type: String },
  The_expected_timetable_for_project_implementation: {
    type: Date,
  },
  details: { type: String },
  // Bid_id: { type: mongoose.Schema.Types.ObjectId, ref: "Bid" },
});

// const Artistic_envelope = mongoose.model("Artistic_envelope", ArtisticSchema);

exports.ArtisticSchema = ArtisticSchema;
// exports.Artistic_envelope = Artistic_envelope;
