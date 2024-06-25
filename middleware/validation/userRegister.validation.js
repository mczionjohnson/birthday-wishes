const Joi = require("joi");

const registerSchema = Joi.object({
  name_text: Joi.string()
    .pattern(new RegExp("^[A-Za-z]+$"))
    .required()
    .messages({
      "string.pattern.base":
        "name can contain only letters and should be Sentence Case.",
    }),
  email_text: Joi.string().email().required(),
  day_text: Joi.string()
    .pattern(new RegExp("^(0?[1-9]|[12][0-9]|3[01])$"))
    .required()
    .messages({
      "string.pattern.base":
        "day of birth can contain only numbers and be between 1 and 31.",
    }),
  month_text: Joi.string()

    .pattern(
      new RegExp(
        "^(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec|jan|feb|mar|apr|may|jun|jul|sep|oct|nov|dec)+$"
      )
    )
    .required()
    .messages({
      // .pattern(new RegExp("^[A-Za-z]{3}$")).required().messages({
      "string.pattern.base":
        "month of birth can contain only be between Jan to Dec in this format.",
    }),
});

module.exports = registerSchema;
