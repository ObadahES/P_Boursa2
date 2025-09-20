const Joi = require("joi");

/********************************************************************* */

const Artistic_Envelope_Validation = Joi.object({
  Previous_work: Joi.string(),
  The_expected_timetable_for_project_implementation: Joi.date()
    .iso()
    .required(),
  details: Joi.string().required(),
});

exports.Artistic_Envelope_Validation = Artistic_Envelope_Validation;
